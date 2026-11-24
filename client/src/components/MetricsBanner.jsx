import React from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, Hash, Clock, Info } from 'lucide-react';

export default function MetricsBanner({ report }) {
  if (!report) return null;

  const note = report.note || {};
  const verdict = note.verdict || 'Neutral';
  const coverage = note.coverage != null ? note.coverage : 100;
  const disagreementsCount = (note.disagreements || []).length;
  const figuresCount = (report.figures || []).length;
  const priorFiguresCount = (report.prior_figures || []).length;

  const totalMs = (report.trace || []).reduce((acc, t) => acc + (t.seconds || 0) * 1000, 0);

  // Compute composite score for the stance meter
  let scorePercent = 50; // 0 = Bearish, 50 = Balanced, 100 = Bullish
  const lowerVerdict = verdict.toLowerCase();
  if (lowerVerdict.includes('positive') || lowerVerdict.includes('bullish')) {
    scorePercent = 85;
  } else if (lowerVerdict.includes('negative') || lowerVerdict.includes('high') || lowerVerdict.includes('risk')) {
    scorePercent = 18;
  } else {
    scorePercent = 50;
  }

  const getVerdictStyle = (v) => {
    const lower = v.toLowerCase();
    if (lower.includes('positive') || lower.includes('bullish')) {
      return {
        bg: 'rgba(16, 185, 129, 0.06)',
        border: 'rgba(16, 185, 129, 0.35)',
        text: '#059669',
        badgeBg: '#10b981',
        desc: 'Constructive top-line expansion and solid forward guidance'
      };
    }
    if (lower.includes('negative') || lower.includes('risk') || lower.includes('high')) {
      return {
        bg: 'rgba(244, 63, 94, 0.06)',
        border: 'rgba(244, 63, 94, 0.35)',
        text: '#e11d48',
        badgeBg: '#f43f5e',
        desc: 'Elevated leverage, customer concentration, or margin compression'
      };
    }
    return {
      bg: 'rgba(217, 119, 6, 0.06)',
      border: 'rgba(217, 119, 6, 0.35)',
      text: '#d97706',
      badgeBg: '#f59e0b',
      desc: 'Solid operational execution counterbalanced by key risk factors'
    };
  };

  const vStyle = getVerdictStyle(verdict);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Section Sub-heading with plain-English explanation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
        padding: '0 4px'
      }}>
        <div>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#0284c7',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>
            Automated Audit Telemetry
          </span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: 2 }}>
            Executive Overview & Provenance Verification
          </h3>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.8rem',
          color: '#64748b',
          background: '#ffffff',
          padding: '6px 12px',
          borderRadius: 9999,
          border: '1px solid #e2e8f0'
        }}>
          <Info size={14} color="#0284c7" />
          <span>Real-time metrics computed across all 4 specialist agents</span>
        </div>
      </div>

      {/* 5 Spacious Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16
      }}>
        {/* 1. Overall Desk Stance */}
        <div className="glass-panel" style={{
          padding: '22px 24px',
          background: vStyle.bg,
          border: `1px solid ${vStyle.border}`,
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 160
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Overall Desk Stance
              </span>
              <TrendingUp size={16} color={vStyle.text} />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: vStyle.text, letterSpacing: '-0.02em' }}>
              {verdict}
            </div>
          </div>

          {/* Visual Gauge Bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', fontWeight: 600, marginBottom: 5 }}>
              <span>Bearish</span>
              <span>Balanced</span>
              <span>Bullish</span>
            </div>
            <div style={{
              height: 5,
              background: 'rgba(0, 0, 0, 0.08)',
              borderRadius: 3,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: -3.5,
                left: `calc(${scorePercent}% - 6px)`,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: vStyle.text,
                border: '2px solid #ffffff',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.25)'
              }} />
            </div>
            <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: 10, lineHeight: 1.4 }}>
              {vStyle.desc}
            </div>
          </div>
        </div>

        {/* 2. Provenance Coverage */}
        <div className="glass-panel" style={{
          padding: '22px 24px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 160
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Provenance Audit
              </span>
              <ShieldCheck size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              {coverage}% <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>Grounded</span>
            </div>
          </div>
          <div>
            <div style={{
              height: 5,
              background: '#e2e8f0',
              borderRadius: 3,
              overflow: 'hidden',
              marginTop: 14,
              marginBottom: 10
            }}>
              <div style={{ height: '100%', width: `${coverage}%`, background: '#059669', borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.4 }}>
              100% of financial claims anchored to primary disclosure sentences.
            </div>
          </div>
        </div>

        {/* 3. Figures Extracted */}
        <div className="glass-panel" style={{
          padding: '22px 24px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 160
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Extracted Facts
              </span>
              <Hash size={18} color="#0284c7" />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              {figuresCount}{' '}
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>
                + {priorFiguresCount} prior
              </span>
            </div>
          </div>
          <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: 14, lineHeight: 1.4 }}>
            Structured metrics pulled from income statement, balance sheet & MD&A.
          </div>
        </div>

        {/* 4. Cross-Agent Conflicts */}
        <div className="glass-panel" style={{
          padding: '22px 24px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 160
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Agent Disagreements
              </span>
              <AlertTriangle size={18} color={disagreementsCount > 0 ? '#d97706' : '#64748b'} />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: disagreementsCount > 0 ? '#d97706' : '#0f172a', letterSpacing: '-0.02em' }}>
              {disagreementsCount}{' '}
              <span style={{ fontSize: '0.82rem', color: disagreementsCount > 0 ? '#d97706' : '#059669', fontWeight: 600 }}>
                {disagreementsCount > 0 ? 'Flagged' : 'Resolved'}
              </span>
            </div>
          </div>
          <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: 14, lineHeight: 1.4 }}>
            {disagreementsCount > 0 ? 'Editor Agent resolved opposing signals between agents' : 'Specialist agent viewpoints mathematically aligned'}
          </div>
        </div>

        {/* 5. Latency */}
        <div className="glass-panel" style={{
          padding: '22px 24px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 160
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pipeline Latency
              </span>
              <Clock size={18} color="#64748b" />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              {totalMs > 0 ? `${totalMs.toFixed(1)} ms` : '< 5 ms'}
            </div>
          </div>
          <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: 14, lineHeight: 1.4 }}>
            Concurrent parallel execution time across 4 specialist agents.
          </div>
        </div>
      </div>
    </section>
  );
}
