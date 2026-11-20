import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Compass, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

export default function AgentViewsTab({ report, onSelectRef }) {
  if (!report || !report.views) return null;

  const views = report.views;
  const [expanded, setExpanded] = useState({
    revenue: true,
    risk: true,
    outlook: true,
    comparison: true
  });

  const toggle = (k) => {
    setExpanded(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const renderRefs = (refs) => {
    if (!refs || refs.length === 0) return null;
    return refs.map((r, i) => (
      <button key={i} className="ref-pill" onClick={() => onSelectRef && onSelectRef(r)}>
        {r}
      </button>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 1. Revenue Analyst View */}
      {views.revenue && (
        <div className="glass-panel tile-interactive tile-gold" style={{ overflow: 'hidden', borderLeft: '5px solid #fbbf24' }}>
          <div
            onClick={() => toggle('revenue')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(245, 158, 11, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <TrendingUp size={22} color="#fbbf24" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                  Revenue Analyst
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{views.revenue.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-gold">Stance: {views.revenue.stance} ({views.revenue.score > 0 ? `+${views.revenue.score}` : views.revenue.score})</span>
              {expanded.revenue ? <ChevronUp size={18} color="#cbd5e1" /> : <ChevronDown size={18} color="#cbd5e1" />}
            </div>
          </div>

          {expanded.revenue && (
            <div style={{ padding: 22, borderTop: '1px solid rgba(251, 191, 36, 0.25)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 10 }}>
                  Formulated Claims & Provenance
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.revenue.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#ffffff', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.revenue.derived && views.revenue.derived.length > 0 && (
                <div style={{ background: 'rgba(9, 13, 28, 0.85)', padding: 14, borderRadius: 10, border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  <h5 style={{ fontSize: '0.82rem', color: '#fbbf24', marginBottom: 8, fontWeight: 800 }}>Derived Ratios:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.revenue.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#ffffff' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> <span style={{ color: '#fbbf24', fontWeight: 800 }}>{d.display}</span> <span style={{ color: '#94a3b8' }}>({d.source})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. Risk Analyst View */}
      {views.risk && (
        <div className="glass-panel tile-interactive tile-silver" style={{ overflow: 'hidden', borderLeft: '5px solid #f43f5e' }}>
          <div
            onClick={() => toggle('risk')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(244, 63, 94, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={22} color="#fb7185" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                  Risk Analyst
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{views.risk.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-negative">Risk: {views.risk.stance} (Weighted score: {views.risk.score})</span>
              {expanded.risk ? <ChevronUp size={18} color="#cbd5e1" /> : <ChevronDown size={18} color="#cbd5e1" />}
            </div>
          </div>

          {expanded.risk && (
            <div style={{ padding: 22, borderTop: '1px solid rgba(244, 63, 94, 0.25)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fb7185', textTransform: 'uppercase', marginBottom: 10 }}>
                  Flagged Red Flags & Exposure Triggers
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.risk.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#ffffff', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.risk.derived && views.risk.derived.length > 0 && (
                <div style={{ background: 'rgba(9, 13, 28, 0.85)', padding: 14, borderRadius: 10, border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                  <h5 style={{ fontSize: '0.82rem', color: '#fb7185', marginBottom: 8, fontWeight: 800 }}>Derived Leverage Metric:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.risk.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#ffffff' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> <span style={{ color: '#fb7185', fontWeight: 800 }}>{d.display}</span> <span style={{ color: '#94a3b8' }}>({d.source})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Outlook Analyst View */}
      {views.outlook && (
        <div className="glass-panel tile-interactive tile-purple" style={{ overflow: 'hidden', borderLeft: '5px solid #c084fc' }}>
          <div
            onClick={() => toggle('outlook')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(168, 85, 247, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Compass size={22} color="#c084fc" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                  Outlook Analyst
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{views.outlook.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-purple">Stance: {views.outlook.stance} ({views.outlook.score > 0 ? `+${views.outlook.score}` : views.outlook.score})</span>
              {expanded.outlook ? <ChevronUp size={18} color="#cbd5e1" /> : <ChevronDown size={18} color="#cbd5e1" />}
            </div>
          </div>

          {expanded.outlook && (
            <div style={{ padding: 22, borderTop: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginBottom: 10 }}>
                  Forward Guidance Analysis
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.outlook.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#ffffff', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.outlook.derived && views.outlook.derived.length > 0 && (
                <div style={{ background: 'rgba(9, 13, 28, 0.85)', padding: 14, borderRadius: 10, border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <h5 style={{ fontSize: '0.82rem', color: '#c084fc', marginBottom: 8, fontWeight: 800 }}>Derived Guidance Metrics:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.outlook.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#ffffff' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> <span style={{ color: '#c084fc', fontWeight: 800 }}>{d.display}</span> <span style={{ color: '#94a3b8' }}>({d.source})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. Comparison Agent View */}
      {views.comparison && (
        <div className="glass-panel tile-interactive tile-silver" style={{ overflow: 'hidden', borderLeft: '5px solid #ffffff' }}>
          <div
            onClick={() => toggle('comparison')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(226, 232, 240, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ArrowUpDown size={22} color="#ffffff" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                  Comparison Agent (QoQ Delta)
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{views.comparison.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-silver">Delta: {views.comparison.stance}</span>
              {expanded.comparison ? <ChevronUp size={18} color="#cbd5e1" /> : <ChevronDown size={18} color="#cbd5e1" />}
            </div>
          </div>

          {expanded.comparison && (
            <div style={{ padding: 22, borderTop: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: 10 }}>
                  Quarter-over-Quarter Variance Claims
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.comparison.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#ffffff', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.comparison.table && views.comparison.table.length > 0 && (
                <div style={{ overflowX: 'auto', marginTop: 8 }}>
                  <table className="desk-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Prior Quarter</th>
                        <th>Current Quarter</th>
                        <th>Delta</th>
                        <th>Trend</th>
                        <th>Refs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {views.comparison.table.map((row, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 700, color: '#ffffff' }}>{row.metric}</td>
                          <td style={{ color: '#cbd5e1' }}>{row.prior}</td>
                          <td style={{ fontWeight: 800, color: '#ffffff' }}>{row.current}</td>
                          <td style={{ fontWeight: 700, color: row.change?.startsWith('+') ? '#34d399' : row.change?.startsWith('-') ? '#fb7185' : '#cbd5e1' }}>
                            {row.change}
                          </td>
                          <td>{row.dir}</td>
                          <td>
                            {Array.isArray(row.refs) ? renderRefs(row.refs) : renderRefs(row.refs ? [row.refs] : [])}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

