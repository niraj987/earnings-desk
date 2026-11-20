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
  Compass,
  Sparkles,
  Layers
} from 'lucide-react';

export default function HomePage({ onOpenDesk, onSelectCompany, reports = [] }) {
  const portfolio = [
    {
      id: 'cloudscale',
      company: 'CloudScale AI Systems',
      period: 'Q3 FY2026',
      badge: 'Constructive / Bullish',
      color: '#10b981',
      tileClass: 'tile-purple',
      topBorder: '4px solid #c084fc',
      accentColor: '#c084fc',
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
      color: '#fbbf24',
      tileClass: 'tile-gold',
      topBorder: '4px solid #fbbf24',
      accentColor: '#fbbf24',
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
      tileClass: 'tile-silver',
      topBorder: '4px solid #f43f5e',
      accentColor: '#f43f5e',
      revenue: '$6.10B',
      growth: '-2.0% YoY',
      margin: '31.5% Gross Margin',
      risk: '4.1x Debt/Cash · Freight Headwinds',
      summary: 'Revenue contraction with compressed operating margins, elevated debt burdens, and macroeconomic consumer softness.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56, padding: '24px 0 60px' }}>
      {/* Hero Section - Glowing Purple, Gold & White Backdrop */}
      <section className="glass-panel" style={{
        padding: '68px 48px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(20, 16, 44, 0.85) 0%, rgba(10, 14, 30, 0.92) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.65), 0 0 40px rgba(168, 85, 247, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow ambient background lights */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          left: '20%',
          width: '60%',
          height: '160%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(245, 158, 11, 0.12) 40%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 940, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 18px',
            borderRadius: 9999,
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.45)',
            boxShadow: '0 0 18px rgba(245, 158, 11, 0.25)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 24
          }}>
            <Sparkles size={16} color="#fbbf24" />
            <span className="text-gold-gradient">JH Analytics</span>
            <span style={{ color: '#e2e8f0', opacity: 0.6 }}>·</span>
            <span style={{ color: '#ffffff' }}>Financial Intelligence Desk</span>
          </div>

          <h2 className="font-neuron" style={{
            fontSize: '3.1rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.18,
            color: '#ffffff',
            marginBottom: 22,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)'
          }}>
            Earnings Desk with{' '}
            <span className="text-gold-gradient">Provable Grounding</span>
          </h2>

          <p style={{
            fontSize: '1.18rem',
            color: '#e2e8f0',
            lineHeight: 1.75,
            maxWidth: 820,
            margin: '0 auto 40px'
          }}>
            Transform complex earnings releases into executive research notes with <strong style={{ color: '#ffffff', textShadow: '0 0 12px rgba(255,255,255,0.4)' }}>zero generative hallucination</strong>.
            Every single claim formulated by our specialist agents is mathematically anchored to verified figures, formulas, and verbatim filings.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenDesk && onOpenDesk()}
              className="btn btn-purple"
              style={{ padding: '14px 34px', fontSize: '1rem', borderRadius: 10 }}
            >
              <span>Launch Analysis Desk</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onOpenDesk && onOpenDesk('Acme Technologies')}
              className="btn btn-gold"
              style={{ padding: '14px 30px', fontSize: '1rem', borderRadius: 10 }}
            >
              <Sparkles size={18} color="#000000" />
              <span>Explore Balanced Case (Acme)</span>
            </button>
            <button
              onClick={() => onOpenDesk && onOpenDesk('CloudScale AI Systems')}
              className="btn btn-silver"
              style={{ padding: '14px 30px', fontSize: '1rem', borderRadius: 10 }}
            >
              <TrendingUp size={18} color="#34d399" />
              <span>Bullish Case (CloudScale)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Companies Section with Interactive Tiles */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ★ Coverage Universe
              </span>
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Portfolio Company Intelligence
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginTop: 4 }}>
              Instantly explore distinct market profiles across different sectors, capital structures, and risk stances.
            </p>
          </div>
          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            className="btn btn-silver btn-sm"
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
              className={`glass-panel tile-interactive ${p.tileClass}`}
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: p.topBorder,
                gap: 22
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                      {p.company}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>{p.period}</span>
                  </div>
                  <span className="badge" style={{
                    background: `${p.color}20`,
                    borderColor: `${p.color}60`,
                    color: p.color,
                    boxShadow: `0 0 12px ${p.color}30`
                  }}>
                    {p.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: 20 }}>
                  {p.summary}
                </p>

                {/* Key Metrics Chips as Glowing Inner Tiles */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  padding: '16px',
                  background: 'rgba(9, 13, 28, 0.75)',
                  borderRadius: 12,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.08)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                      Revenue
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                      {p.revenue}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: p.color, fontWeight: 700 }}>
                      {p.growth}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                      Profitability & Health
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0' }}>
                      {p.margin}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: 2 }}>
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
                  padding: '12px 20px',
                  borderColor: p.accentColor ? `${p.accentColor}50` : 'rgba(255,255,255,0.15)'
                }}
              >
                <span style={{ fontWeight: 700 }}>Open Full Analysis & What-If</span>
                <ArrowRight size={16} color={p.color} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Core Architectural Pillars - 4 Stylized Glowing Tiles */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ✦ Multi-Agent System Design
            </span>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            The JH Analytics Architecture
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginTop: 4 }}>
            Four architectural mechanisms designed to eliminate financial misinformation and hallucination.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24
        }}>
          {/* Pillar 1 - Silver / Platinum Tile */}
          <div className="glass-panel tile-interactive tile-silver" style={{
            padding: '34px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(226, 232, 240, 0.2) 0%, rgba(148, 163, 184, 0.3) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(226, 232, 240, 0.25)'
            }}>
              <ShieldCheck size={28} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                Audit Integrity
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                100% Provenance Audit Trail
              </h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Every claim rendered in the final note must point to primary figures or verbatim sentences from the SEC filing.
              Ungrounded claims are systematically dropped at the Editor gate.
            </p>
          </div>

          {/* Pillar 2 - Cosmic Purple Tile */}
          <div className="glass-panel tile-interactive tile-purple" style={{
            padding: '34px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(124, 58, 237, 0.4) 100%)',
              border: '1px solid rgba(192, 132, 252, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(168, 85, 247, 0.35)'
            }}>
              <Cpu size={28} color="#e9d5ff" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                Agent Concurrency
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                Specialist Agent Fan-Out
              </h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Dedicated agents for Revenue, Risk, Outlook, and QoQ Comparison run in parallel, preventing cognitive dilution.
              The Editor Manager synthesizes and flags stance conflicts.
            </p>
          </div>

          {/* Pillar 3 - Imperial Gold Tile */}
          <div className="glass-panel tile-interactive tile-gold" style={{
            padding: '34px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.4) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(245, 158, 11, 0.35)'
            }}>
              <Sliders size={28} color="#fef08a" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                Dynamic Simulation
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                What-If Sensitivity Simulation
              </h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Stress-test company guidance, cut revenue, or double debt in real time.
              All specialist agents dynamically recompute derived formulas and update the stance in milliseconds.
            </p>
          </div>

          {/* Pillar 4 - Royal Violet & White Tile */}
          <div className="glass-panel tile-interactive tile-purple" style={{
            padding: '34px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(245, 158, 11, 0.25) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(168, 85, 247, 0.3)'
            }}>
              <MessageSquare size={28} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                Natural Language Intelligence
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                Zero-Hallucination Q&A
              </h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Ask natural-language questions about free cash flow, debt levels, or legal risks.
              Answers are retrieved strictly from the factual registry with source sentences and IDs attached.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
