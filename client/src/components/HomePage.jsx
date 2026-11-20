import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Sliders,
  MessageSquare,
  ArrowRight,
  Database,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Compass
} from 'lucide-react';

export default function HomePage({ onOpenDesk, onSelectCompany, reports = [] }) {
  const portfolio = [
    {
      id: 'cloudscale',
      company: 'CloudScale AI Systems',
      period: 'Q3 FY2026',
      badge: 'Constructive / Bullish',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.35)',
      revenue: '$2.40B',
      growth: '+36.0% YoY',
      margin: '74.5% Gross Margin',
      risk: 'Zero Debt · Low Risk',
      summary: 'Surging enterprise AI workload demand driving strong operating leverage and raised Q4 guidance intervals.'
    },
    {
      id: 'acme',
      company: 'Acme Technologies',
      period: 'Q3 FY2026',
      badge: 'Balanced / Mixed',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.35)',
      revenue: '$4.82B',
      growth: '+12.0% YoY',
      margin: '41.5% Gross Margin',
      risk: '1.62x Leverage · 38% Top-Customer Concentration',
      summary: 'Solid top-line expansion counterbalanced by customer concentration risk, patent litigation, and supply chain constraints.'
    },
    {
      id: 'novaretail',
      company: 'NovaRetail Group',
      period: 'Q3 FY2026',
      badge: 'Cautious / High Risk',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.1)',
      border: 'rgba(244, 63, 94, 0.35)',
      revenue: '$6.10B',
      growth: '-2.0% YoY',
      margin: '31.5% Gross Margin',
      risk: '4.1x Debt/Cash · Freight Headwinds',
      summary: 'Revenue contraction with compressed operating margins, elevated debt burdens, and macroeconomic consumer softness.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56, padding: '24px 0 60px' }}>
      {/* Hero Section - Spacious & Glassmorphic */}
      <section className="glass-panel" style={{
        padding: '64px 48px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(10, 16, 31, 0.85) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow ambient background circles */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '30%',
          width: '40%',
          height: '140%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 9999,
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 20
          }}>
            <ShieldCheck size={16} />
            JH Analytics Financial Intelligence
          </div>

          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: '#ffffff',
            marginBottom: 20
          }}>
            Institutional Earnings Desk with Provable Grounding
          </h2>

          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            lineHeight: 1.7,
            maxWidth: 780,
            margin: '0 auto 36px'
          }}>
            Turn complex earnings releases and 10-Qs into executive research notes with <strong style={{ color: '#f8fafc' }}>zero generative hallucination</strong>.
            Every single claim formulated by our specialist agents is backed by verified figures and source sentences.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenDesk && onOpenDesk()}
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 10 }}
            >
              <span>Launch Analysis Desk</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onOpenDesk && onOpenDesk('CloudScale AI Systems')}
              className="btn btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 10 }}
            >
              <TrendingUp size={18} color="#10b981" />
              <span>Explore Bullish Case</span>
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Companies Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Portfolio Company Intelligence
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: 4 }}>
              Instantly explore distinct market profiles across different sectors and risk stances.
            </p>
          </div>
          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            className="btn btn-secondary btn-sm"
          >
            <span>View All in Analysis Desk</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 28
        }}>
          {portfolio.map(p => (
            <div
              key={p.id}
              className="glass-panel"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `4px solid ${p.color}`,
                gap: 20
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                      {p.company}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{p.period}</span>
                  </div>
                  <span className="badge" style={{ background: p.bg, borderColor: p.border, color: p.color }}>
                    {p.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>
                  {p.summary}
                </p>

                {/* Key Metrics Chips */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  padding: '16px',
                  background: 'rgba(10, 16, 31, 0.65)',
                  borderRadius: 10,
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Revenue</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>{p.revenue}</div>
                    <div style={{ fontSize: '0.75rem', color: p.color, fontWeight: 700 }}>{p.growth}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Profitability</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e2e8f0' }}>{p.margin}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>{p.risk}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCompany && onSelectCompany(p.company)}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '12px 18px' }}
              >
                <span style={{ fontWeight: 600 }}>Open Full Analysis & What-If</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            The JH Analytics Architecture
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: 4 }}>
            Four institutional mechanisms designed to eliminate financial misinformation and hallucination.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24
        }}>
          {/* Pillar 1 */}
          <div className="glass-panel" style={{ padding: '32px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={26} color="#10b981" />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              100% Provenance Audit Trail
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Every claim rendered in the final note must point to one or more primary figures or verbatim sentences from the SEC filing.
              Ungrounded claims are systematically dropped.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel" style={{ padding: '32px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(14, 165, 233, 0.15)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={26} color="#38bdf8" />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              Specialist Agent Fan-Out
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Dedicated agents for Revenue, Risk, Outlook, and QoQ Comparison run in parallel, avoiding cognitive dilution.
              The Editor Manager synthesizes and flags stance conflicts.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel" style={{ padding: '32px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sliders size={26} color="#a855f7" />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              What-If Sensitivity Simulation
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Stress-test company guidance, cut revenue, or double debt in real time.
              All specialist agents dynamically recompute derived formulas and update the stance in milliseconds.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="glass-panel" style={{ padding: '32px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageSquare size={26} color="#f59e0b" />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              Zero-Hallucination Q&A
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Ask natural-language questions about free cash flow, debt levels, or legal risks.
              Answers are retrieved strictly from the factual registry with source sentences and IDs attached.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
