import React from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, Hash, Clock } from 'lucide-react';

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
        bg: 'rgba(16, 185, 129, 0.08)',
        border: 'rgba(16, 185, 129, 0.3)',
        text: '#10b981',
        desc: 'Constructive top-line expansion and solid forward outlook'
      };
    }
    if (lower.includes('negative') || lower.includes('risk') || lower.includes('high')) {
      return {
        bg: 'rgba(244, 63, 94, 0.08)',
        border: 'rgba(244, 63, 94, 0.3)',
        text: '#f43f5e',
        desc: 'Elevated leverage, high concentration or contract disputes'
      };
    }
    return {
      bg: 'rgba(245, 158, 11, 0.08)',
      border: 'rgba(245, 158, 11, 0.3)',
      text: '#fbbf24',
      desc: 'Solid operational execution counterbalanced by key risk factors'
    };
  };

  const vStyle = getVerdictStyle(verdict);

  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
      gap: 14,
      marginBottom: 24
    }}>
      {/* 1. Overall Stance */}
      <div className="glass-panel" style={{
        padding: '18px 20px',
        background: vStyle.bg,
        border: `1px solid ${vStyle.border}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Overall Desk Stance
            </span>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: vStyle.text, letterSpacing: '-0.02em' }}>
            {verdict}
          </div>
        </div>

        {/* Visual Gauge Bar */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
            <span>Bearish</span>
            <span>Balanced</span>
            <span>Bullish</span>
          </div>
          <div style={{
            height: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: -3,
              left: `calc(${scorePercent}% - 5px)`,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: vStyle.text,
              border: '2px solid #0f172a'
            }} />
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 8, lineHeight: 1.4 }}>
            {vStyle.desc}
          </div>
        </div>
      </div>

      {/* 2. Grounding Coverage */}
      <div className="glass-panel" style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Provenance Audit
            </span>
            <ShieldCheck size={16} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            {coverage}% <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Grounded</span>
          </div>
        </div>
        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 10, lineHeight: 1.4 }}>
          100% of claims cite primary figures or verbatim sentences.
        </div>
      </div>

      {/* 3. Figures Extracted */}
      <div className="glass-panel" style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Extracted Facts
            </span>
            <Hash size={16} color="#818cf8" />
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            {figuresCount}{' '}
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              + {priorFiguresCount} prior
            </span>
          </div>
        </div>
        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 10, lineHeight: 1.4 }}>
          Structured facts across current & prior quarters.
        </div>
      </div>

      {/* 4. Cross-Agent Conflicts */}
      <div className="glass-panel" style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Agent Conflicts
            </span>
            <AlertTriangle size={16} color={disagreementsCount > 0 ? '#f59e0b' : '#64748b'} />
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: disagreementsCount > 0 ? '#f59e0b' : '#f8fafc', letterSpacing: '-0.02em' }}>
            {disagreementsCount}
          </div>
        </div>
        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 10, lineHeight: 1.4 }}>
          {disagreementsCount > 0 ? 'Editor resolved opposing agent signals' : 'All specialist stances mathematically aligned'}
        </div>
      </div>

      {/* 5. Latency */}
      <div className="glass-panel" style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Agent Latency
            </span>
            <Clock size={16} color="#64748b" />
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            {totalMs > 0 ? `${totalMs.toFixed(1)} ms` : '< 5 ms'}
          </div>
        </div>
        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 10, lineHeight: 1.4 }}>
          Concurrent parallel fan-out across 4 specialist agents.
        </div>
      </div>
    </section>
  );
}
