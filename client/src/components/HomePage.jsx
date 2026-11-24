import React from 'react';
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
  Layers
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
      risk: 'Zero Debt · Strong Free Cash Flow',
      summary: 'Accelerating enterprise cloud AI infrastructure demand driving significant operating leverage and upward forward guidance revisions.'
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
      summary: 'Solid top-line expansion across enterprise software, offset by elevated top-customer concentration and ongoing patent litigation.'
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
      risk: '4.1x Debt/Cash · Freight Cost Pressures',
      summary: 'Sequential revenue contraction and compressed operating margins driven by consumer demand softness and heavy debt amortization obligations.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: '16px 0 48px' }}>
      {/* Hero Section - Clean, Spacious & Explainable */}
      <section className="glass-panel" style={{
        padding: '52px 40px',
        textAlign: 'center',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 14px',
            borderRadius: 9999,
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#c7d2fe',
            marginBottom: 20
          }}>
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>JH Analytics</span>
            <span style={{ color: '#64748b' }}>·</span>
            <span>Quantitative Research Platform</span>
          </div>

          <h1 className="font-neuron" style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: '#f8fafc',
            marginBottom: 18
          }}>
            Earnings Desk with Provable Grounding
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: '#94a3b8',
            lineHeight: 1.65,
            maxWidth: 720,
            margin: '0 auto 32px'
          }}>
            Transform complex quarterly earnings releases into clear executive research notes.
            Every figure, variance, and qualitative claim is verified against primary disclosures
            with deterministic mathematical provenance.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenDesk && onOpenDesk()}
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.92rem' }}
            >
              <span>Launch Analysis Desk</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onOpenDesk && onOpenDesk('Acme Technologies')}
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '0.92rem' }}
            >
              <span>View Acme Tech Sample</span>
            </button>
            <button
              onClick={() => onOpenDesk && onOpenDesk('CloudScale AI Systems')}
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '0.92rem' }}
            >
              <span>View CloudScale AI Sample</span>
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Companies Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Covered Companies
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: 4 }}>
              Select a company to inspect verified notes, sensitivity simulations, and agent views.
            </p>
          </div>
          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            className="btn btn-secondary btn-sm"
          >
            <span>Open Desk</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20
        }}>
          {portfolio.map(p => (
            <div
              key={p.id}
              className="glass-panel tile-interactive"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 20
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                      {p.company}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.period}</span>
                  </div>
                  <span className="badge" style={{
                    background: `${p.color}15`,
                    borderColor: `${p.color}35`,
                    color: p.color
                  }}>
                    {p.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 16 }}>
                  {p.summary}
                </p>

                {/* KPI metrics grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: 8,
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                      Revenue
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginTop: 2 }}>
                      {p.revenue}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: p.color, fontWeight: 600 }}>
                      {p.growth}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                      Profitability & Health
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0', marginTop: 2 }}>
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
                  padding: '10px 16px'
                }}
              >
                <span>View Full Analysis</span>
                <ArrowRight size={14} color={p.color} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How the Architecture Works - Simple & Explainable */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            How JH Analytics Works
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: 4 }}>
            A four-step architecture designed to deliver verifiable research with zero generative hallucination.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18
        }}>
          {/* Step 1 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              01
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                Primary Filing Ingestion
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginTop: 6 }}>
                Extracts raw revenue, margins, net income, cash, debt, and guidance ranges.
                Each figure receives an immutable reference ID (<code style={{ color: '#c7d2fe' }}>F1..Fn</code>) linked to verbatim text.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              02
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                Specialist Agent Review
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginTop: 6 }}>
                Dedicated agents for Revenue, Risk, Outlook, and Sequential trends analyze disclosures
                independently, preventing bias and maintaining analytical rigor.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              03
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                Grounding Verification Gate
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginTop: 6 }}>
                The Editor synthesizes agent findings into an executive note. Any claim that cannot
                be mathematically anchored to an extracted figure is dropped.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              04
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                Sensitivity & What-If
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginTop: 6 }}>
                Stress-test guidance assumptions in real time. Adjust revenue growth, debt, or costs
                to watch derived formulas and stance dynamically recompute.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
