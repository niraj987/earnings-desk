import React from 'react';
import EarthHero from './EarthHero';
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Sliders,
  MessageSquare,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  BarChart3,
  Activity,
  Lock,
  Globe
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 72, paddingBottom: 60 }}>
      {/* 1. Earth from Space Hero with Scroll Zoom & Horizon Glow (Screenshot 2 style) */}
      <EarthHero onOpenDesk={onOpenDesk} />

      {/* 2. Visual Architecture Roadmap (Screenshot 1 Section 1 Style) */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 12px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="cinematic-pill" style={{ marginBottom: 16 }}>
            <span className="cinematic-pill-dot" />
            <span>Multi-Agent System Pipeline</span>
          </div>
          <h2 className="cinematic-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: 12 }}>
            Execution Architecture Roadmap
          </h2>
          <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            A structured, deterministic approach to extracting, analyzing, and synthesizing financial filings with mathematical provenance.
          </p>
        </div>

        {/* 3 Orbital Connected Circles (Inspired by Roadmap in Screenshot 1) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          position: 'relative'
        }}>
          {/* Orbital connecting line in background */}
          <div style={{
            position: 'absolute',
            top: '48px',
            left: '10%',
            right: '10%',
            height: '1px',
            borderTop: '1px dashed rgba(56, 189, 248, 0.25)',
            zIndex: 0,
            display: 'none' // fallback for small screens, shown in css
          }} />

          {/* Stage 1: Ingestion */}
          <div
            className="cinematic-card"
            style={{
              padding: '36px 28px',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
              borderTop: '3px solid #38bdf8'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Stage 01
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4 }}>
                Primary Extraction
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
                Verbatim Ingestion
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Extracts raw revenue, margins, net income, EPS, cash, debt, and forward guidance intervals from 10-Q/10-K releases.
              </p>
            </div>

            {/* Pill Nodes like in Screenshot 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" />
                <span>Verbatim SEC Text Parsing</span>
              </div>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" />
                <span>Fact Registry (F1..Fn IDs)</span>
              </div>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" />
                <span>Sentence Grounding Indexing</span>
              </div>
            </div>
          </div>

          {/* Stage 2: Concurrency */}
          <div
            className="cinematic-card"
            style={{
              padding: '36px 28px',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
              borderTop: '3px solid #60a5fa'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Stage 02
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4 }}>
                Parallel Agents
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
                Specialist Fan-Out
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Four independent specialist agents concurrently inspect disclosures without cognitive interference or narrative bias.
              </p>
            </div>

            {/* Pill Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" style={{ background: '#60a5fa' }} />
                <span>Revenue & Growth Analyst</span>
              </div>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" style={{ background: '#f43f5e' }} />
                <span>Risk Lexicon & Leverage Scanner</span>
              </div>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" style={{ background: '#fbbf24' }} />
                <span>Outlook & Sequential Deltas</span>
              </div>
            </div>
          </div>

          {/* Stage 3: Grounding Gate */}
          <div
            className="cinematic-card"
            style={{
              padding: '36px 28px',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
              borderTop: '3px solid #10b981'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Stage 03
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4 }}>
                Verification Gate
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
                Deterministic Synthesis
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                The Editor enforces the Grounding Gate: any statement lacking verified citations is dropped, delivering 100% audit integrity.
              </p>
            </div>

            {/* Pill Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" style={{ background: '#10b981' }} />
                <span>100% Provenance Audit</span>
              </div>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" style={{ background: '#10b981' }} />
                <span>Cross-Agent Conflict Resolution</span>
              </div>
              <div className="cinematic-pill" style={{ width: '100%' }}>
                <span className="cinematic-pill-dot" style={{ background: '#10b981' }} />
                <span>Interactive What-If Simulation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Terminal Interface & Circular Gauge Showcase (Screenshot 1 Section 2 Style) */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 12px' }}>
        <div
          className="cinematic-card"
          style={{
            padding: '52px 44px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(8, 20, 52, 0.75) 0%, rgba(3, 7, 18, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 45px rgba(56, 189, 248, 0.12)'
          }}
        >
          {/* Subtle Watermark typography in background (Image 1 style) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(5rem, 14vw, 12rem)',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.02)',
              letterSpacing: '0.1em',
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              zIndex: 0
            }}
          >
            JH ANALYTICS
          </div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
            alignItems: 'center'
          }}>
            {/* Left: Huge Stat Typography & Explanation */}
            <div>
              <div className="cinematic-pill" style={{ marginBottom: 20 }}>
                <span className="cinematic-pill-dot" />
                <span>Deterministic Grounding Core</span>
              </div>

              <h2 className="cinematic-heading" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', marginBottom: 18 }}>
                Autonomous Finance{' '}
                <span className="cinematic-subheading" style={{ display: 'block' }}>
                  is Grounded.
                </span>
              </h2>

              <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 28 }}>
                Standard AI models hallucinate financial growth rates and confuse capital structures.
                JH Analytics mathematically verifies every extracted metric against the company's original regulatory filing.
              </p>

              {/* Stat Highlights (Big/Small Contrast) */}
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.03em' }}>
                    100.0%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                    Grounding Provenance
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>
                    0.0
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                    Hallucinated Claims
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '-0.03em' }}>
                    &lt; 5 ms
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                    What-If Recalculation
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Circular Gauge Card (Like 75% Circle in Image 1 Section 2) */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  background: 'rgba(8, 18, 44, 0.85)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: 24,
                  padding: '36px 32px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
                  maxWidth: 360,
                  width: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20
                }}
              >
                {/* Circular Telemetry SVG Progress Gauge */}
                <div style={{ position: 'relative', width: 140, height: 140 }}>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r="58"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="58"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="8"
                      strokeDasharray="364"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      style={{
                        filter: 'drop-shadow(0 0 8px #38bdf8)'
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
                    <span style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff' }}>100%</span>
                    <span style={{ fontSize: '0.65rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Audit Passed
                    </span>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
                    Provenance Verification Ring
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    Real-time validation against extracted fact tokens (<code style={{ color: '#bae6fd' }}>F1..Fn</code>).
                  </p>
                </div>

                <button
                  onClick={() => onOpenDesk && onOpenDesk()}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px 18px', fontSize: '0.9rem' }}
                >
                  <span>Launch Live Desk</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Companies Section - Clean, High-Contrast Cards */}
      <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div className="cinematic-pill" style={{ marginBottom: 12 }}>
              <span className="cinematic-pill-dot" style={{ background: '#fbbf24' }} />
              <span>Coverage Universe</span>
            </div>
            <h2 className="cinematic-heading" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)' }}>
              Covered Portfolio Companies
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: 4 }}>
              Inspect live analyst notes, sensitivity simulations, and agent views across different financial stances.
            </p>
          </div>

          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            className="btn btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <span>View All in Analysis Desk</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 24
        }}>
          {portfolio.map(p => (
            <div
              key={p.id}
              className="cinematic-card tile-interactive"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 24
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
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

                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 20 }}>
                  {p.summary}
                </p>

                {/* Big Display Numbers (High-Impact Typography) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  padding: '16px',
                  background: 'rgba(5, 12, 30, 0.65)',
                  borderRadius: 12,
                  border: '1px solid rgba(56, 189, 248, 0.12)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                      Revenue
                    </div>
                    <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                      {p.revenue}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: p.color, fontWeight: 700 }}>
                      {p.growth}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                      Margin & Health
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e0f2fe', marginTop: 2 }}>
                      {p.margin}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>
                      {p.risk}
                    </div>
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
                  borderColor: 'rgba(56, 189, 248, 0.25)'
                }}
              >
                <span style={{ fontWeight: 600 }}>Open Analysis & What-If</span>
                <ArrowRight size={15} color={p.color} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
