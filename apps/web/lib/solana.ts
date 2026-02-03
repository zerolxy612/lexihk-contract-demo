import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

// 网络配置
export type NetworkType = "devnet" | "mainnet-beta" | "localnet";

export const NETWORK: NetworkType =
  (process.env.NEXT_PUBLIC_SOLANA_NETWORK as NetworkType) || "devnet";

// RPC 端点
export const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  (NETWORK === "localnet"
    ? "http://localhost:8899"
    : clusterApiUrl(NETWORK));

// Connection 实例
export const connection = new Connection(RPC_ENDPOINT, "confirmed");

// 占位符公钥（用于未部署的合约）
const PLACEHOLDER_PUBKEY = "11111111111111111111111111111111";

// Protocol 程序 ID（从 wang 项目迁移后更新）
// TODO: 部署后替换为真实地址
export const PROTOCOL_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROTOCOL_PROGRAM_ID || PLACEHOLDER_PUBKEY
);

// 代币 Mint 地址（初始化后需要更新）
export const TOKEN_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_TOKEN_MINT || PLACEHOLDER_PUBKEY
);

// 代币小数位数
export const TOKEN_DECIMALS = 6;

// 格式化代币数量（从链上精度转换为显示精度）
export function formatTokenAmount(amount: number | bigint): string {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return (num / Math.pow(10, TOKEN_DECIMALS)).toFixed(2);
}

// 转换为链上精度
export function toTokenAmount(amount: number): bigint {
  return BigInt(Math.floor(amount * Math.pow(10, TOKEN_DECIMALS)));
}

// 截断地址显示
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}







