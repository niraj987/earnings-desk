import React from 'react';
import { Database, Trash2, ExternalLink, X, Shield, Table, Layers } from 'lucide-react';

export default function DatabaseModal({
  isOpen,
  onClose,
  reports,
  currentReportId,
  onSelectReport,
  onDeleteReport
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: 20
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: 960,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e2e8f0',
        background: '#ffffff'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Database size={20} color="#0284c7" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                SQLite Database Management
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Tables: reports · analyses · figures · agent_views · scenarios · qa_history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Database info banner */}
        <div style={{
          padding: '16px 28px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Database Engine</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>Node.js Native SQLite (`node:sqlite`)</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>DB File Path</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0284c7' }}>server/earnings_desk.db</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Stored Reports</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#d97706' }}>{reports.length} Reports</div>
          </div>
        </div>

        {/* Reports Table in SQLite */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: 12 }}>
            Saved Earnings Analyses ({reports.length})
          </h4>

          {reports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
              No reports found in SQLite database.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="desk-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>ID</th>
                    <th>Company</th>
                    <th>Period</th>
                    <th>Stance</th>
                    <th>Coverage</th>
                    <th>Figures</th>
                    <th>Scenarios</th>
                    <th>Created</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => {
                    const isSelected = r.id === currentReportId;
                    return (
                      <tr key={r.id} style={{ background: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'transparent' }}>
                        <td style={{ fontWeight: 600, color: '#0284c7' }}>#{r.id}</td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{r.company}</td>
                        <td style={{ color: '#475569' }}>{r.period}</td>
                        <td>
                          <span className={`badge ${r.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : r.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-mixed'}`}>
                            {r.verdict || 'Mixed'}
                          </span>
                        </td>
                        <td style={{ color: '#10b981', fontWeight: 600 }}>{r.coverage}%</td>
                        <td style={{ color: '#64748b' }}>{r.figure_count}</td>
                        <td style={{ color: '#8b5cf6' }}>{r.scenario_count}</td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button
                              onClick={() => {
                                onSelectReport(r.id);
                                onClose();
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{
                                borderColor: isSelected ? '#0284c7' : '#cbd5e1',
                                color: isSelected ? '#0284c7' : '#334155',
                                fontWeight: isSelected ? 700 : 500
                              }}
                            >
                              {isSelected ? 'Active' : 'Load'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete report #${r.id} (${r.company}) from SQLite?`)) {
                                  onDeleteReport(r.id);
                                }
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{ borderColor: '#fca5a5', color: '#e11d48' }}
                              title="Delete from SQLite"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

