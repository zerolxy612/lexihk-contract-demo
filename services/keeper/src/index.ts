import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import fs from "node:fs";
import path from "node:path";

type KeeperConfig = {
  rpcUrl: string;
  programId: string;
  keypairPath: string;
  idlPath: string;
  priceE6?: number;
  twapHttpUrl?: string;
  pythPriceAccount?: string;
  dryRun: boolean;
};

function loadConfig(): KeeperConfig {
  return {
    rpcUrl: process.env.RPC_URL ?? "http://127.0.0.1:8899",
    programId: process.env.PROGRAM_ID ?? "",
    keypairPath:
      process.env.KEYPAIR_PATH ??
      path.resolve(process.cwd(), "programs/protocol/target/deploy/protocol-keypair.json"),
    idlPath:
      process.env.IDL_PATH ??
      path.resolve(process.cwd(), "programs/protocol/target/idl/protocol.json"),
    priceE6: process.env.PRICE_E6 ? Number(process.env.PRICE_E6) : undefined,
    twapHttpUrl: process.env.TWAP_HTTP_URL,
    pythPriceAccount: process.env.PYTH_PRICE_ACCOUNT,
    dryRun: process.env.DRY_RUN === "true",
  };
}

function loadKeypair(filePath: string): Keypair {
  const raw = fs.readFileSync(filePath, "utf8");
  const secret = Uint8Array.from(JSON.parse(raw));
  return Keypair.fromSecretKey(secret);
}

async function fetchPriceE6(config: KeeperConfig): Promise<number> {
  if (typeof config.priceE6 === "number" && Number.isFinite(config.priceE6)) {
    return config.priceE6;
  }

  if (config.twapHttpUrl) {
    const res = await fetch(config.twapHttpUrl);
    if (!res.ok) {
      throw new Error(`TWAP request failed: ${res.status}`);
    }
    const data = (await res.json()) as { priceE6?: number };
    if (typeof data.priceE6 !== "number") {
      throw new Error("TWAP response missing priceE6");
    }
    return data.priceE6;
  }

  throw new Error("PRICE_E6 or TWAP_HTTP_URL is required");
}

async function main() {
  const config = loadConfig();
  if (!config.programId) {
    throw new Error("PROGRAM_ID is required");
  }

  const keypair = loadKeypair(config.keypairPath);
  const connection = new Connection(config.rpcUrl, "confirmed");
  const wallet = new anchor.Wallet(keypair);
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  anchor.setProvider(provider);

  const programId = new PublicKey(config.programId);
  const idl = JSON.parse(fs.readFileSync(config.idlPath, "utf8"));
  const program = new anchor.Program(idl as anchor.Idl, programId, provider);

  const [configPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("config"), keypair.publicKey.toBuffer()],
    programId
  );
  const [unlockPoolPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("unlock_pool"), keypair.publicKey.toBuffer()],
    programId
  );
  const [treasuryPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("treasury"), keypair.publicKey.toBuffer()],
    programId
  );

  const priceE6 = await fetchPriceE6(config);
  console.log("keeper price_e6", priceE6);

  if (config.dryRun) {
    console.log("dry run: skipping transactions");
    return;
  }

  if (config.pythPriceAccount) {
    await program.methods
      .updatePriceWithPyth(new anchor.BN(priceE6))
      .accounts({
        config: configPda,
        oracleAuthority: keypair.publicKey,
        pythPriceAccount: new PublicKey(config.pythPriceAccount),
      })
      .signers([keypair])
      .rpc();
  } else {
    await program.methods
      .updatePrice(new anchor.BN(priceE6))
      .accounts({
        config: configPda,
        oracleAuthority: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();
  }

  const configAccount = await program.account.config.fetch(configPda);
  const unlockPoolVault = new PublicKey(configAccount.unlockPoolVault);
  const treasuryVault = new PublicKey(configAccount.treasuryVault);

  await program.methods
    .unlockToTreasury()
    .accounts({
      config: configPda,
      authority: keypair.publicKey,
      unlockPool: unlockPoolPda,
      treasury: treasuryPda,
      unlockPoolVault,
      treasuryVault,
      tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
    })
    .signers([keypair])
    .rpc();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
