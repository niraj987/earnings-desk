import React from 'react';
import EarthHero from './EarthHero';
import AgentTerminal from './AgentTerminal';
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Sliders,
  MessageSquare,
  ArrowRight,
  Database,
  CheckCircle2,
  FileText,
  BarChart3,
  GitBranch,
  Search
} from 'lucide-react';

export default function HomePage({ onOpenDesk, onSelectCompany, reports = [] }) {
  const portfolio = [
    {
      id: 'cloudscale',
      company: 'CloudScale AI Systems',
      period: 'Q3 FY2026',
      badge: 'Bullish',
      color: '#10b981',
      revenue: '$2.40B',
      growth: '+36.0% YoY',
      margin: '74.5% Gross Margin',
      risk: 'Zero Debt · Cash Flow Positive',
      summary: 'Accelerating enterprise cloud infrastructure demand driving operating leverage and upward forward guidance revisions.'
    },
    {
      id: 'acme',
      company: 'Acme Technologies',
      period: 'Q3 FY2026',
      badge: 'Balanced',
      color: '#f59e0b',
      revenue: '$4.82B',
      growth: '+12.0% YoY',
      margin: '41.5% Gross Margin',
      risk: '1.62x Leverage · 38% Top-Customer Exposure',
      summary: 'Solid top-line expansion in enterprise software, counterbalanced by customer concentration and active patent litigation.'
    },
    {
      id: 'novaretail',
      company: 'NovaRetail Group',
      period: 'Q3 FY2026',
      badge: 'High Risk',
      color: '#f43f5e',
      revenue: '$6.10B',
      growth: '-2.0% YoY',
      margin: '31.5% Gross Margin',
      risk: '4.1x Debt/Cash · Freight Headwinds',
      summary: 'Sequential revenue contraction and margin compression resulting from consumer softness and heavy debt amortization.'
    }
  ];

  const fourOptions = [
    {
      num: '01',
      title: 'Analyst Research Note',
      icon: FileText,
      color: '#38bdf8',
      desc: 'One-page executive synthesis linking every financial claim directly to primary SEC disclosure figures with 100% provenance verification.',
      action: 'note'
    },
    {
      num: '02',
      title: 'Specialist Multi-Agent Concurrency',
      icon: GitBranch,
      color: '#60a5fa',
      desc: 'Four dedicated agents evaluate disclosures in parallel: Revenue, Risk Lexicon, Forward Guidance, and QoQ Sequential Comparison.',
      action: 'views'
    },
    {
      num: '03',
      title: 'What-If Sensitivity Simulation',
      icon: Sliders,
      color: '#fbbf24',
      desc: 'Stress-test revenue, gross margins, and debt ratios interactively. Derived formulas and overall stance recalculate in real-time.',
      action: 'whatif'
    },
    {
      num: '04',
      title: 'Grounded Q&A Inquiry',
      icon: MessageSquare,
      color: '#10b981',
      desc: 'Natural language question-answering assistant constrained strictly to verified facts, with source sentence IDs attached to each response.',
      action: 'qa'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 76, paddingBottom: 60 }}>
      {/* 1. Earth from Space Hero with Scroll Zoom (Screenshot 2 Effect) - Blue line and pill box removed */}
      <EarthHero onOpenDesk={onOpenDesk} />

      {/* 2. Four Platform Core Options - Unboxed, Directly on Webpage Canvas */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 16px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#38bdf8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 8
          }}>
            Core Platform Capabilities
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.025em'
          }}>
            Four Built-In Intelligence Tools
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: 4, maxWidth: 640 }}>
            Everything required to analyze, stress-test, and audit quarterly company filings with zero hallucination.
          </p>
        </div>

        {/* 4 Options Grid - Directly on Webpage Canvas (NO BOXES) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 36
        }}>
          {fourOptions.map(opt => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.num}
                onClick={() => onOpenDesk && onOpenDesk()}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  borderTop: `2px solid ${opt.color}`,
                  paddingTop: 20,
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: opt.color, letterSpacing: '-0.03em' }}>
                    {opt.num}
                  </span>
                  <Icon size={20} color={opt.color} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
                  {opt.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.65 }}>
                  {opt.desc}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: opt.color,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}>
                  <span>Open Tool</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* 3. Live Multi-Agent Execution Terminal Section */}
      <AgentTerminal onOpenDesk={onOpenDesk} />

      {/* Divider */}
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* 4. Autonomous Finance is Grounded Section - UNBOXED Directly on Webpage */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48,
          alignItems: 'center'
        }}>
          {/* Left Text Column - NO BOX CONTAINER */}
          <div>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#38bdf8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 10
            }}>
              Deterministic Provenance Guarantee
            </div>

            <h2 style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              marginBottom: 18
            }}>
              Autonomous Finance{' '}
              <span style={{ color: 'rgba(224, 242, 254, 0.45)', fontWeight: 400, display: 'block' }}>
                is Grounded.
              </span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.75, marginBottom: 32 }}>
              Standard language models hallucinate company growth rates, confuse margin definitions, and fabricate guidance numbers.
              JH Analytics mathematically anchors every extracted claim to verifiable sentence evidence in the original SEC disclosure.
            </p>

            {/* Display Stats - Unboxed */}
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.03em' }}>
                  100.0%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                  Grounding Provenance
                </div>
              </div>

              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>
                  0.0
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                  Hallucinated Claims
                </div>
              </div>

              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '-0.03em' }}>
                  &lt; 5 ms
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                  What-If Recalculation
                </div>
              </div>
            </div>
          </div>

          {/* Right Circular Telemetry Ring */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                textAlign: 'center'
              }}
            >
              <div style={{ position: 'relative', width: 160, height: 160 }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="8"
                    strokeDasharray="427"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 10px #38bdf8)'
                    }}
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>100%</span>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>
                    Audit Passed
                  </span>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
                  Zero-Hallucination Gate
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: 280, lineHeight: 1.5 }}>
                  Verified mathematically against extracted fact registry tokens.
                </p>
              </div>

              <button
                onClick={() => onOpenDesk && onOpenDesk()}
                className="btn btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <span>Launch Analysis Desk</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* 5. Covered Portfolio Companies - UNBOXED Directly on Full Webpage */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <div>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#fbbf24',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 8
            }}>
              Coverage Universe
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.025em'
            }}>
              Covered Portfolio Companies
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: 4 }}>
              Select a company to inspect verified notes, sensitivity simulations, and agent views across the full platform.
            </p>
          </div>

          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            className="btn btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            <span>View All in Analysis Desk</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3 Companies Open Layout - Directly on Webpage Canvas (NO BOXES) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40
        }}>
          {portfolio.map(p => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                borderTop: `3px solid ${p.color}`,
                paddingTop: 20
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                    {p.company}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{p.period}</span>
                </div>
                <span className="badge" style={{
                  background: `${p.color}15`,
                  borderColor: `${p.color}40`,
                  color: p.color
                }}>
                  {p.badge}
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.65 }}>
                {p.summary}
              </p>

              {/* Big High-Impact Figures (No inner boxes, clean typography) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
                padding: '16px 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                    Quarterly Revenue
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: 2 }}>
                    {p.revenue}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: p.color, fontWeight: 700 }}>
                    {p.growth}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                    Margin & Capital
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e0f2fe', marginTop: 2 }}>
                    {p.margin}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>
                    {p.risk}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCompany && onSelectCompany(p.company)}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  marginTop: 'auto'
                }}
              >
                <span style={{ fontWeight: 600 }}>Open Full Analysis & What-If</span>
                <ArrowRight size={15} color={p.color} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
