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
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        border: '1px solid #38bdf8'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Database size={22} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                SQLite Embedded Database Management
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Tables: reports · analyses · figures · agent_views · scenarios · qa_history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1.4rem',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Database info banner */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(15, 23, 42, 0.6)',
          borderBottom: '1px solid #1e293b',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Database Engine</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>Node.js Native SQLite (`node:sqlite`)</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>DB File Path</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#38bdf8' }}>server/earnings_desk.db</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Stored Reports</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#10b981' }}>{reports.length} Reports</div>
          </div>
        </div>

        {/* Reports Table in SQLite */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>
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
                      <tr key={r.id} style={{ background: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'transparent' }}>
                        <td style={{ fontWeight: 600, color: '#38bdf8' }}>#{r.id}</td>
                        <td style={{ fontWeight: 600, color: '#f8fafc' }}>{r.company}</td>
                        <td style={{ color: '#cbd5e1' }}>{r.period}</td>
                        <td>
                          <span className={`badge ${r.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : r.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-mixed'}`}>
                            {r.verdict || 'Mixed'}
                          </span>
                        </td>
                        <td style={{ color: '#10b981', fontWeight: 600 }}>{r.coverage}%</td>
                        <td style={{ color: '#94a3b8' }}>{r.figure_count}</td>
                        <td style={{ color: '#a855f7' }}>{r.scenario_count}</td>
                        <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
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
                                borderColor: isSelected ? '#38bdf8' : '#334155',
                                color: isSelected ? '#38bdf8' : '#e2e8f0'
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
                              style={{ borderColor: '#e11d48', color: '#fb7185' }}
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
          borderTop: '1px solid #1e293b',
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

