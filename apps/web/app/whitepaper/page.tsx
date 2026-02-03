'use client';

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getWhitepaperContent } from "@/lib/i18n/whitepaper";
import { ParticleBackground } from "../components/ParticleBackground";
import { ScrollReveal } from "../components/ScrollReveal";
import { MagneticElement } from "../components/MagneticElement";
import { CountUp } from "../components/CountUp";
import { useState } from "react";

export default function WhitepaperPage() {
  const { language } = useLanguage();
  const content = getWhitepaperContent(language);
  const [activeSection, setActiveSection] = useState(0);

  const handleTocClick = (index: number) => {
    setActiveSection(index);
    const element = document.getElementById(`section-${index + 1}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#030305]">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(255,107,107,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(78,205,196,0.08),transparent_50%)]" />
        <ParticleBackground />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <section className="text-center mb-20 pt-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-sm mb-8">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-emerald-500 blur-md animate-pulse" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400 block" />
              </div>
              <span className="text-sm font-medium text-white/80 tracking-wide">{content.meta.badge}</span>
              <span className="text-white/30">·</span>
              <span className="text-sm font-mono text-emerald-400">{content.meta.version}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <MagneticElement strength={0.05}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                  {content.hero.title}
                </span>
                <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  {content.hero.subtitle}
                </span>
              </h1>
            </MagneticElement>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
              {content.hero.description}
            </p>
          </ScrollReveal>

          {/* Decorative Stats */}
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { value: 130000, label: 'USDC', prefix: '$' },
                { value: 90, label: 'Unlock Pool', suffix: '%' },
                { value: 12, label: 'LP Lock', suffix: ' mo' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold font-mono bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {stat.prefix}<CountUp end={stat.value} duration={2000} />{stat.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Floating TOC - Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <ScrollReveal>
                <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/[0.05] overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/[0.05] bg-gradient-to-r from-white/[0.03] to-transparent">
                    <h2 className="text-sm font-semibold text-white/80 uppercase tracking-[0.15em]">{content.toc.title}</h2>
                  </div>
                  <nav className="p-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {content.toc.items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleTocClick(i)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group ${
                          activeSection === i 
                            ? 'bg-gradient-to-r from-rose-500/20 to-fuchsia-500/10 text-white' 
                            : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
                        }`}
                      >
                        <span className={`font-mono text-xs w-5 ${activeSection === i ? 'text-rose-400' : 'text-white/30 group-hover:text-white/50'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="truncate">{item}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </ScrollReveal>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* Section 1: Overview */}
            <ScrollReveal>
              <section id="section-1" className="content-section group">
                <SectionHeader number="01" title={content.sections.overview.title} />
                <p className="text-white/70 leading-relaxed mb-8">{content.sections.overview.intro}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="h-1 w-6 bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full" />
                    {content.sections.overview.goals.title}
                  </h3>
                  <div className="grid gap-3">
                    {content.sections.overview.goals.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05] hover:border-white/10 transition-colors">
                        <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 flex items-center justify-center">
                          <span className="text-rose-400 text-sm font-bold">{i + 1}</span>
                        </div>
                        <p className="text-white/70 pt-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Section 2: Roles */}
            <ScrollReveal>
              <section id="section-2" className="content-section">
                <SectionHeader number="02" title={content.sections.roles.title} />
                
                <h3 className="subsection-title">{content.sections.roles.rolesTitle}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {content.sections.roles.roles.map((role, i) => (
                    <div key={i} className="group relative p-5 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] hover:border-white/15 transition-all duration-300 hover:-translate-y-0.5">
                      <div className="absolute top-4 right-4 text-4xl font-bold text-white/[0.03] font-mono">{String(i + 1).padStart(2, '0')}</div>
                      <h4 className="text-white font-semibold mb-2">{role.name}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{role.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title">{content.sections.roles.flowTitle}</h3>
                <div className="relative">
                  <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-rose-500/50 via-fuchsia-500/50 to-indigo-500/50" />
                  <div className="space-y-4">
                    {content.sections.roles.flows.map((flow, i) => (
                      <div key={i} className="flex items-start gap-5 pl-1">
                        <div className="relative z-10 flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-white/80">{i + 1}</span>
                        </div>
                        <p className="text-white/70 pt-2">{flow}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Section 3: Tokenomics */}
            <ScrollReveal>
              <section id="section-3" className="content-section">
                <SectionHeader number="03" title={content.sections.tokenomics.title} />
                
                <h3 className="subsection-title">{content.sections.tokenomics.params.title}</h3>
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {content.sections.tokenomics.params.items.map((item, i) => (
                    <div key={i} className="text-center p-5 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06]">
                      <div className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">{item.label}</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">{item.value}</div>
                      <div className="text-xs text-white/40">{item.desc}</div>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title">{content.sections.tokenomics.distribution.title}</h3>
                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/[0.03]">
                        <th className="text-left p-4 text-white/60 font-medium">Category</th>
                        <th className="text-center p-4 text-white/60 font-medium">%</th>
                        <th className="text-left p-4 text-white/60 font-medium">Usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.sections.tokenomics.distribution.items.map((item, i) => (
                        <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 text-white/80 font-medium">{item.category}</td>
                          <td className="p-4 text-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 text-rose-400 font-bold font-mono text-sm">
                              {item.percent}
                            </span>
                          </td>
                          <td className="p-4 text-white/60">{item.usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-white/40 text-sm mt-4 italic pl-4 border-l-2 border-white/10">{content.sections.tokenomics.distribution.note}</p>
              </section>
            </ScrollReveal>

            {/* Section 4: ICO */}
            <ScrollReveal>
              <section id="section-4" className="content-section">
                <SectionHeader number="04" title={content.sections.ico.title} />
                
                <h3 className="subsection-title">{content.sections.ico.rounds.title}</h3>
                <div className="overflow-hidden rounded-xl border border-white/[0.06] mb-10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/[0.03]">
                        {content.sections.ico.rounds.headers.map((h, i) => (
                          <th key={i} className={`p-4 text-white/60 font-medium ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.sections.ico.rounds.rows.map((row, i) => (
                        <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 text-white/80 font-mono font-bold">{row.round}</td>
                          <td className="p-4 text-center text-white/70">{row.percent}</td>
                          <td className="p-4 text-center">
                            <span className="font-mono text-emerald-400">${row.amount}</span>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-white/10 bg-gradient-to-r from-emerald-500/10 to-teal-500/5">
                        <td className="p-4 text-white font-bold">{content.sections.ico.rounds.total.label}</td>
                        <td className="p-4 text-center text-white font-bold">{content.sections.ico.rounds.total.percent}</td>
                        <td className="p-4 text-center">
                          <span className="font-mono text-lg font-bold text-emerald-400">${content.sections.ico.rounds.total.amount}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="subsection-title">{content.sections.ico.budget.title}</h3>
                <div className="grid gap-4">
                  {content.sections.ico.budget.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.06] hover:border-white/10 transition-all group">
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.usage}</h4>
                        <p className="text-white/50 text-sm">{item.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold font-mono bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                          ${item.amount}
                        </span>
                        <span className="block text-xs text-white/40 mt-1">USDC</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-sm mt-4 italic pl-4 border-l-2 border-emerald-500/30">{content.sections.ico.budget.note}</p>
              </section>
            </ScrollReveal>

            {/* Section 5: FDV */}
            <ScrollReveal>
              <section id="section-5" className="content-section">
                <SectionHeader number="05" title={content.sections.fdv.title} />
                <p className="text-white/70 leading-relaxed mb-8">{content.sections.fdv.intro}</p>
                
                <h3 className="subsection-title">{content.sections.fdv.definition.title}</h3>
                <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 border border-white/[0.08] mb-4">
                  <code className="text-xl sm:text-2xl font-mono font-bold text-white">{content.sections.fdv.definition.formula}</code>
                </div>
                <p className="text-white/50 text-sm mb-8 pl-4 border-l-2 border-indigo-500/50">{content.sections.fdv.definition.note}</p>

                <h3 className="subsection-title">{content.sections.fdv.oracle.title}</h3>
                <p className="text-white/70 mb-4">{content.sections.fdv.oracle.intro}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20">
                    <span className="text-xs uppercase tracking-[0.15em] text-rose-400 font-semibold">{content.sections.fdv.oracle.primary.label}</span>
                    <p className="text-white/70 mt-2">{content.sections.fdv.oracle.primary.desc}</p>
                  </div>
                  <div className="p-5 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08]">
                    <span className="text-xs uppercase tracking-[0.15em] text-white/50 font-semibold">{content.sections.fdv.oracle.secondary.label}</span>
                    <p className="text-white/60 mt-2">{content.sections.fdv.oracle.secondary.desc}</p>
                  </div>
                </div>
                <p className="text-white/40 text-sm italic">{content.sections.fdv.oracle.purpose}</p>
              </section>
            </ScrollReveal>

            {/* Section 6: Unlock */}
            <ScrollReveal>
              <section id="section-6" className="content-section">
                <SectionHeader number="06" title={content.sections.unlock.title} />
                
                <h3 className="subsection-title">{content.sections.unlock.mechanism.title}</h3>
                <p className="text-white/70 mb-4">{content.sections.unlock.mechanism.desc}</p>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8 flex items-start gap-3">
                  <span className="text-amber-400 text-lg">⚠</span>
                  <p className="text-amber-200/80 text-sm">{content.sections.unlock.mechanism.warning}</p>
                </div>

                {/* High-Water Mark */}
                <h3 className="subsection-title">{content.sections.unlock.highWaterMark.title}</h3>
                <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/20 flex items-center justify-center">
                      <span className="text-cyan-400 text-lg">📈</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-medium">{content.sections.unlock.highWaterMark.rule}</p>
                      <p className="text-white/60 text-sm">{content.sections.unlock.highWaterMark.reason}</p>
                      <p className="text-cyan-300/70 text-sm italic">{content.sections.unlock.highWaterMark.note}</p>
                    </div>
                  </div>
                </div>

                <h3 className="subsection-title">{content.sections.unlock.milestones.title}</h3>
                <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-4">
                  <table className="w-full text-sm min-w-[700px]">
                    <thead>
                      <tr className="bg-gradient-to-r from-white/[0.05] to-white/[0.02]">
                        {content.sections.unlock.milestones.headers.map((h, i) => (
                          <th key={i} className={`p-4 text-white/70 font-semibold ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.sections.unlock.milestones.rows.map((row, i) => (
                        <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 font-mono font-bold text-rose-400">{row.fdv}</td>
                          <td className="p-4 text-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">{row.unlockable}</span>
                          </td>
                          <td className="p-4 text-center text-white/60">{row.locked}</td>
                          <td className="p-4 text-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-mono font-semibold">{row.rate}</span>
                          </td>
                          <td className="p-4 text-white/50 text-sm">{row.logic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-white/40 text-sm italic">{content.sections.unlock.milestones.note}</p>
              </section>
            </ScrollReveal>

            {/* Section 7: Daily Cap */}
            <ScrollReveal>
              <section id="section-7" className="content-section">
                <SectionHeader number="07" title={content.sections.dailyCap.title} />
                
                <h3 className="subsection-title">{content.sections.dailyCap.goals.title}</h3>
                <div className="grid gap-3 mb-10">
                  {content.sections.dailyCap.goals.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500" />
                      <p className="text-white/70">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Execution Flow */}
                <h3 className="subsection-title">{content.sections.dailyCap.executionFlow.title}</h3>
                <div className="relative mb-10">
                  <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-rose-500 via-fuchsia-500 to-indigo-500 rounded-full" />
                  <div className="space-y-4">
                    {content.sections.dailyCap.executionFlow.steps.map((step, i) => (
                      <div key={i} className="flex gap-5 pl-1">
                        <div className="relative z-10 flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{i + 1}</span>
                        </div>
                        <div className="flex-1 p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05]">
                          <span className="text-white font-semibold">{step.step}</span>
                          <p className="text-white/60 text-sm mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="subsection-title">{content.sections.dailyCap.formula.title}</h3>
                <p className="text-white/70 mb-4">{content.sections.dailyCap.formula.intro}</p>
                <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 border border-white/[0.08] mb-6 overflow-x-auto">
                  <code className="text-base sm:text-lg font-mono font-bold text-white whitespace-nowrap">{content.sections.dailyCap.formula.formula}</code>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  {content.sections.dailyCap.formula.params.map((param, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <code className="text-xs font-mono text-fuchsia-400 block mb-2">{param.name}</code>
                      <p className="text-white/60 text-sm">{param.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Priority Queue */}
                <h3 className="subsection-title">{content.sections.dailyCap.priority.title}</h3>
                <p className="text-white/70 mb-4">{content.sections.dailyCap.priority.intro}</p>
                <div className="grid gap-4 mb-10">
                  {content.sections.dailyCap.priority.items.map((item, i) => {
                    const colors = ['from-emerald-500/20 to-emerald-500/5 border-emerald-500/30', 'from-blue-500/20 to-blue-500/5 border-blue-500/30', 'from-slate-500/20 to-slate-500/5 border-slate-500/30'];
                    const textColors = ['text-emerald-400', 'text-blue-400', 'text-slate-400'];
                    return (
                      <div key={i} className={`flex items-center gap-5 p-5 rounded-xl bg-gradient-to-r ${colors[i]} border`}>
                        <div className={`flex-shrink-0 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center ${textColors[i]} font-bold text-xl`}>
                          {item.order}
                        </div>
                        <div className="flex-1">
                          <span className="text-white font-semibold">{item.name}</span>
                          <p className="text-white/50 text-sm mt-1">{item.reason}</p>
                        </div>
                        <div className="text-white/20 text-2xl">→</div>
                      </div>
                    );
                  })}
                </div>

                <h3 className="subsection-title">{content.sections.dailyCap.cooldown.title}</h3>
                <div className="space-y-2">
                  {content.sections.dailyCap.cooldown.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70">
                      <span className="text-rose-400">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Section 8: Treasury */}
            <ScrollReveal>
              <section id="section-8" className="content-section">
                <SectionHeader number="08" title={content.sections.treasury.title} />
                
                <h3 className="subsection-title">{content.sections.treasury.duties.title}</h3>
                <div className="grid gap-2 mb-10">
                  {content.sections.treasury.duties.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 text-white/70">
                      <span className="h-6 w-6 rounded-md bg-white/5 flex items-center justify-center text-xs font-mono text-white/50">{i + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title">{content.sections.treasury.vaults.title}</h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  {content.sections.treasury.vaults.items.map((vault, i) => {
                    const colors = {
                      blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
                      green: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
                      purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
                    }[vault.color] || 'from-white/10 to-white/5 border-white/20 text-white/80';
                    return (
                      <div key={i} className={`p-5 rounded-xl bg-gradient-to-br ${colors.split(' ').slice(0, 2).join(' ')} border ${colors.split(' ')[2]} text-center`}>
                        <span className={`text-xs uppercase tracking-[0.15em] font-semibold ${colors.split(' ')[3]}`}>{vault.name}</span>
                        <p className="text-white/70 mt-2">{vault.purpose}</p>
                      </div>
                    );
                  })}
                </div>

                <h3 className="subsection-title">{content.sections.treasury.transparency.title}</h3>
                <div className="space-y-2">
                  {content.sections.treasury.transparency.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70">
                      <span className="text-emerald-400">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Section 9: Reserve */}
            <ScrollReveal>
              <section id="section-9" className="content-section">
                <SectionHeader number="09" title={content.sections.reserve.title} />
                
                <h3 className="subsection-title">{content.sections.reserve.definition.title}</h3>
                <p className="text-white/70 mb-4">{content.sections.reserve.definition.intro}</p>
                <div className="p-8 rounded-xl bg-gradient-to-r from-rose-500/10 via-fuchsia-500/10 to-indigo-500/10 border border-white/[0.08] text-center mb-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">{content.sections.reserve.definition.target}</span>
                  <span className="text-white/50 ml-2">{content.sections.reserve.definition.targetNote}</span>
                  <p className="text-white/50 mt-3">{content.sections.reserve.definition.desc}</p>
                </div>

                <h3 className="subsection-title">{content.sections.reserve.methods.title}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20">
                    <span className="text-rose-400 font-semibold">{content.sections.reserve.methods.hardLock.title}</span>
                    <p className="text-white/60 mt-2 text-sm">{content.sections.reserve.methods.hardLock.desc}</p>
                    <p className="text-emerald-400 text-xs mt-3">{content.sections.reserve.methods.hardLock.recommend}</p>
                  </div>
                  <div className="p-5 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08]">
                    <span className="text-white/80 font-semibold">{content.sections.reserve.methods.multisig.title}</span>
                    <p className="text-white/60 mt-2 text-sm">{content.sections.reserve.methods.multisig.desc}</p>
                    <p className="text-white/40 text-xs mt-3">{content.sections.reserve.methods.multisig.recommend}</p>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Section 10: Liquidity */}
            <ScrollReveal>
              <section id="section-10" className="content-section">
                <SectionHeader number="10" title={content.sections.liquidity.title} />
                
                <h3 className="subsection-title">{content.sections.liquidity.launch.title}</h3>
                <p className="text-white/70 mb-8">{content.sections.liquidity.launch.desc}</p>

                <h3 className="subsection-title">{content.sections.liquidity.lock.title}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 border border-indigo-500/30">
                    <span className="text-3xl font-bold font-mono text-white">{content.sections.liquidity.lock.duration}</span>
                  </div>
                  <p className="text-white/60">{content.sections.liquidity.lock.durationNote}</p>
                </div>
                <p className="text-white/70 mb-3">{content.sections.liquidity.lock.requirements}</p>
                <div className="space-y-2">
                  {content.sections.liquidity.lock.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70">
                      <span className="text-indigo-400">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Section 11: Buyback */}
            <ScrollReveal>
              <section id="section-11" className="content-section">
                <SectionHeader number="11" title={content.sections.buyback.title} />
                
                <h3 className="subsection-title">{content.sections.buyback.distribution.title}</h3>
                <p className="text-white/70 mb-4">{content.sections.buyback.distribution.intro}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 text-center">
                    <span className="text-4xl font-bold text-emerald-400">{content.sections.buyback.distribution.company.percent}</span>
                    <p className="text-white/60 mt-2">{content.sections.buyback.distribution.company.label}</p>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 text-center">
                    <span className="text-4xl font-bold text-rose-400">{content.sections.buyback.distribution.buyback.percent}</span>
                    <p className="text-white/60 mt-2">{content.sections.buyback.distribution.buyback.label}</p>
                  </div>
                </div>

                {/* Flywheel Mechanism */}
                <h3 className="subsection-title">{content.sections.buyback.flywheel.title}</h3>
                <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-amber-500/20 mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 flex items-center justify-center">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{content.sections.buyback.flywheel.desc}</p>
                      <p className="text-amber-300/80 text-sm mt-1">{content.sections.buyback.flywheel.highlight}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-rose-400 font-mono text-sm">日抛 (+供应)</span>
                    <span className="text-white/30">⇄</span>
                    <span className="text-emerald-400 font-mono text-sm">回购 (-供应)</span>
                    <span className="text-white/30">=</span>
                    <span className="text-amber-400 font-semibold">动态平衡</span>
                  </div>
                  <p className="text-white/50 text-sm mt-4 text-center">{content.sections.buyback.flywheel.mechanism}</p>
                </div>

                <h3 className="subsection-title">{content.sections.buyback.execution.title}</h3>
                <p className="text-white/70 mb-3">{content.sections.buyback.execution.intro}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {content.sections.buyback.execution.uses.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-white/70">
                      <span className={i === 0 ? 'text-red-400' : 'text-blue-400'}>{i === 0 ? '🔥' : '🔒'}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-sm italic">{content.sections.buyback.execution.note}</p>
              </section>
            </ScrollReveal>

            {/* Section 12: Governance */}
            <ScrollReveal>
              <section id="section-12" className="content-section">
                <SectionHeader number="12" title={content.sections.governance.title} />
                
                <h3 className="subsection-title">{content.sections.governance.multisig.title}</h3>
                <div className="space-y-2 mb-10">
                  {content.sections.governance.multisig.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70">
                      <span className="text-fuchsia-400">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title">{content.sections.governance.pause.title}</h3>
                <div className="p-5 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/5 border border-red-500/20">
                  <p className="text-white/70 mb-2">{content.sections.governance.pause.trigger}</p>
                  <p className="text-red-300/80 text-sm">{content.sections.governance.pause.effect}</p>
                </div>
              </section>
            </ScrollReveal>

            {/* Section 13: Risks */}
            <ScrollReveal>
              <section id="section-13" className="content-section border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
                <SectionHeader number="13" title={content.sections.risks.title} color="amber" />
                <p className="text-amber-200/70 mb-6">{content.sections.risks.disclaimer}</p>
                <div className="grid gap-3">
                  {content.sections.risks.items.map((risk, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-amber-400 mt-0.5">⚠</span>
                      <span>
                        <span className="text-white font-semibold">{risk.type}：</span>
                        <span className="text-white/60">{risk.desc}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Section 14: Roadmap */}
            <ScrollReveal>
              <section id="section-14" className="content-section">
                <SectionHeader number="14" title={content.sections.roadmap.title} />
                <div className="relative">
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-rose-500 via-fuchsia-500 to-indigo-500 rounded-full" />
                  <div className="space-y-6">
                    {content.sections.roadmap.phases.map((phase, i) => (
                      <div key={i} className="flex gap-6 pl-1">
                        <div className="relative z-10 flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{i + 1}</span>
                        </div>
                        <div className="flex-1 p-5 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.06] hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-rose-400 font-mono font-semibold">{phase.phase}</span>
                            <span className="text-white/30">—</span>
                            <span className="text-white font-semibold">{phase.name}</span>
                          </div>
                          <p className="text-white/60 text-sm">{phase.items}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Section 15: Glossary */}
            <ScrollReveal>
              <section id="section-15" className="content-section">
                <SectionHeader number="15" title={content.sections.glossary.title} />
                <div className="divide-y divide-white/[0.05]">
                  {content.sections.glossary.terms.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 py-4">
                      <span className="font-mono font-bold text-fuchsia-400 min-w-[130px]">{item.term}</span>
                      <div>
                        {item.full && <span className="text-white/40 text-sm block">{item.full}</span>}
                        <span className="text-white/70 text-sm">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-white/30 text-sm">
          <p>{content.footer}</p>
        </footer>
      </div>

      <style jsx>{`
        .content-section {
          @apply p-6 sm:p-8 rounded-2xl backdrop-blur-sm bg-white/[0.02] border border-white/[0.05];
        }
        .subsection-title {
          @apply text-lg font-semibold text-white/90 mb-4 mt-8 first:mt-0 flex items-center gap-2;
        }
        .subsection-title::before {
          content: '';
          @apply h-4 w-1 bg-gradient-to-b from-rose-500 to-fuchsia-500 rounded-full;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
}

function SectionHeader({ number, title, color = 'rose' }: { number: string; title: string; color?: string }) {
  const gradients = {
    rose: 'from-rose-500 to-fuchsia-500',
    amber: 'from-amber-500 to-orange-500',
  };
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradients[color as keyof typeof gradients] || gradients.rose} flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold font-mono">{number}</span>
      </div>
      <h2 className="text-2xl font-display font-bold text-white">{title}</h2>
    </div>
  );
}
