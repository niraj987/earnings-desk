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
  Search,
  Target,
  Clock
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
      tag: 'Primary Synthesis',
      title: 'Analyst Research Note',
      icon: FileText,
      color: '#38bdf8',
      desc: 'One-page executive synthesis linking every financial claim directly to primary SEC disclosure figures with 100% provenance verification.',
      action: 'note'
    },
    {
      num: '02',
      tag: 'Parallel Concurrency',
      title: 'Specialist Multi-Agent Concurrency',
      icon: GitBranch,
      color: '#60a5fa',
      desc: 'Four dedicated agents evaluate disclosures in parallel: Revenue, Risk Lexicon, Forward Guidance, and QoQ Sequential Comparison.',
      action: 'views'
    },
    {
      num: '03',
      tag: 'Real-Time Simulation',
      title: 'What-If Sensitivity Simulation',
      icon: Sliders,
      color: '#fbbf24',
      desc: 'Stress-test revenue, gross margins, and debt ratios interactively. Derived formulas and overall stance recalculate in real-time.',
      action: 'whatif'
    },
    {
      num: '04',
      tag: 'Verifiable Q&A',
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

      {/* 2. Four Platform Core Options - Animated with FundsIndia Category Pill Badges */}
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

        {/* 4 Options Grid - Animated Tool Cards with Hover Lift */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 36
        }}>
          {fourOptions.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.num}
                onClick={() => onOpenDesk && onOpenDesk()}
                className={`tool-card-animated animate-fade-in-up animate-delay-${idx + 1}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  borderTop: `3px solid ${opt.color}`,
                  paddingTop: 22
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: opt.color, letterSpacing: '-0.03em' }}>
                    {opt.num}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: opt.color,
                    background: `${opt.color}18`,
                    border: `1px solid ${opt.color}35`,
                    padding: '3px 10px',
                    borderRadius: 9999
                  }}>
                    {opt.tag}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="tool-icon-wrap" style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `${opt.color}15`,
                    border: `1px solid ${opt.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={20} color={opt.color} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
                    {opt.title}
                  </h3>
                </div>

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
                  <ArrowRight size={14} className="tool-arrow" />
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

      {/* 5. Value Proposition Grid (FundsIndia Image 2 Style) */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 56,
          alignItems: 'center'
        }}>
          {/* Left Insight Showcase Card */}
          <div style={{
            position: 'relative',
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(8, 20, 50, 0.75) 0%, rgba(2, 6, 23, 0.9) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            padding: '38px 32px',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#38bdf8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 12
            }}>
              JH Analytics Provenance Engine
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: 16 }}>
              Deterministic Truth <br />
              <span style={{ color: 'rgba(224, 242, 254, 0.55)', fontWeight: 400 }}>for Capital Decisions</span>
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 28 }}>
              In earnings research and valuation models, generic LLM predictions fail when figures are hallucinated.
              Our deterministic grounding gate audits every single analytical sentence against primary SEC filings.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              paddingTop: 20,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>100%</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Provenance Verified</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>24/7</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Filing Auditing</div>
              </div>
            </div>
          </div>

          {/* Right 4 Value Pillars */}
          <div>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#fbbf24',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 10
            }}>
              The Grounding Advantage
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: 18
            }}>
              Choosing financial data is easy.<br />
              <span style={{ color: 'rgba(224, 242, 254, 0.55)', fontWeight: 400 }}>
                Choosing verified truth isn't.
              </span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 32 }}>
              That’s where mathematical provenance makes the difference. Grounded intelligence helps you allocate capital with absolute confidence and verifiable clarity.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                {
                  title: 'Understand Filing Truth',
                  desc: 'Extracted directly from primary SEC 10-Q press releases, eliminating narrative drift and speculative bias.',
                  color: '#38bdf8',
                  icon: Target
                },
                {
                  title: 'Research-Backed Verification',
                  desc: 'Every operating margin, YoY delta, and EPS metric links to verbatim source sentence IDs in disclosures.',
                  color: '#60a5fa',
                  icon: CheckCircle2
                },
                {
                  title: 'Powered by Multi-Agent Concurrency',
                  desc: 'Revenue, Risk, Guidance, and QoQ specialists deliberate simultaneously to cross-examine filing inconsistencies.',
                  color: '#fbbf24',
                  icon: Cpu
                },
                {
                  title: 'Stay Ahead with Interactive Stress-Testing',
                  desc: 'Real-time what-if simulations to evaluate upside, base, and downside scenarios in milliseconds.',
                  color: '#10b981',
                  icon: Sliders
                }
              ].map((v, idx) => {
                const VIcon = v.icon;
                return (
                  <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${v.color}18`,
                      border: `1px solid ${v.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2
                    }}>
                      <VIcon size={20} color={v.color} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
                        {v.title}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* 6. Visual Comparison Bar Section (FundsIndia Image 3 Style) */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 16px' }}>
        <div style={{
          borderRadius: 24,
          background: 'linear-gradient(135deg, #091e4a 0%, #034694 50%, #0284c7 100%)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          padding: '44px 40px',
          boxShadow: '0 24px 50px -12px rgba(2, 132, 199, 0.35)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40,
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#e0f2fe',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 12
            }}>
              Performance & Grounding Integrity
            </div>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: 18
            }}>
              Our Grounded Architecture eliminates generative hallucinations across company earnings.
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#e0f2fe', opacity: 0.9, lineHeight: 1.65, marginBottom: 28, maxWidth: 520 }}>
              Generic language models average a 42% hallucination rate on non-standard financial disclosures.
              JH Analytics enforces mathematical grounding with 100% verified citations.
            </p>

            <button
              onClick={() => onOpenDesk && onOpenDesk()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 10,
                background: '#ffffff',
                color: '#034694',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)'
              }}
            >
              <span>Explore Grounded Architecture</span>
              <ArrowRight size={16} />
            </button>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', opacity: 0.75, marginTop: 14 }}>
              * Comparative audit benchmark against 100 standardized SEC quarterly filings.
            </div>
          </div>

          {/* Visual Comparison Bars */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 36, minHeight: 260 }}>
            {/* Bar 1: Generic LLMs */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fca5a5' }}>42%</div>
              <div style={{
                width: 90,
                height: 140,
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 12
              }}>
                <span style={{ fontSize: '0.72rem', color: '#fca5a5', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center', padding: '0 6px' }}>
                  Risk
                </span>
              </div>
              <div style={{ textAlign: 'center', maxWidth: 110 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Generic LLMs</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Hallucination Risk</div>
              </div>
            </div>

            {/* Bar 2: JH Analytics */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4ade80' }}>100%</div>
              <div style={{
                width: 96,
                height: 220,
                background: 'linear-gradient(180deg, #22c55e 0%, #16a34a 100%)',
                border: '1px solid #86efac',
                borderRadius: '16px 16px 0 0',
                boxShadow: '0 0 25px rgba(34, 197, 94, 0.45)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 14
              }}>
                <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', padding: '0 6px' }}>
                  Verified
                </span>
              </div>
              <div style={{ textAlign: 'center', maxWidth: 120 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>JH Analytics</div>
                <div style={{ fontSize: '0.72rem', color: '#86efac', fontWeight: 600 }}>100% Provenance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* 7. Covered Portfolio Companies - UNBOXED Directly on Full Webpage */}
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

      {/* Divider */}
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* 8. Insights & Research Showcase (FundsIndia Image 4 Style) */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#38bdf8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 8
          }}>
            Primary Intelligence Desk
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.025em'
          }}>
            Insights & Research
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: 4, maxWidth: 640, margin: '6px auto 0' }}>
            We believe capital decisions are built on trust, clarity, and zero hallucination. Explore grounded research briefs.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          marginBottom: 36
        }}>
          {[
            {
              title: 'CloudScale AI: Accelerating Gross Margin Expansion to 74.5%',
              company: 'CloudScale AI Systems',
              readTime: '3 mins read',
              badge: 'Bullish Stance',
              badgeColor: '#10b981',
              gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 12, 30, 0.8) 100%)'
            },
            {
              title: 'Acme Technologies: Enterprise Concentration vs 12% Top-line Growth',
              company: 'Acme Technologies',
              readTime: '4 mins read',
              badge: 'Balanced Stance',
              badgeColor: '#f59e0b',
              gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(6, 12, 30, 0.8) 100%)'
            },
            {
              title: 'NovaRetail Group: Debt Amortization Pressures & Freight Headwinds',
              company: 'NovaRetail Group',
              readTime: '3 mins read',
              badge: 'High Risk',
              badgeColor: '#f43f5e',
              gradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(6, 12, 30, 0.8) 100%)'
            },
            {
              title: 'SEC 10-Q Grounding Standards: Why Deterministic Extraction Replaces Guesswork',
              company: 'Acme Technologies',
              readTime: '2 mins read',
              badge: 'Architecture Brief',
              badgeColor: '#38bdf8',
              gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(6, 12, 30, 0.8) 100%)'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCompany ? onSelectCompany(card.company) : onOpenDesk && onOpenDesk()}
              style={{
                cursor: 'pointer',
                borderRadius: 16,
                background: 'rgba(8, 16, 36, 0.65)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="tool-card-animated"
            >
              {/* Thumbnail Gradient Area */}
              <div style={{
                height: 110,
                background: card.gradient,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: card.badgeColor,
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '4px 10px',
                  borderRadius: 9999,
                  border: `1px solid ${card.badgeColor}40`
                }}>
                  {card.badge}
                </span>
                <TrendingUp size={16} color={card.badgeColor} />
              </div>

              {/* Content Area */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>
                  {card.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.78rem',
                  color: '#94a3b8',
                  marginTop: 'auto'
                }}>
                  <Clock size={13} color="#64748b" />
                  <span>{card.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            className="btn btn-secondary"
            style={{ padding: '12px 28px', fontSize: '0.9rem', borderRadius: 10 }}
          >
            <span>View All Research in Terminal</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
