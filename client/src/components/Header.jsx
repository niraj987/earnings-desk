import React from 'react';
import { Database, Plus, Printer, Home, BarChart3, Info, TrendingUp } from 'lucide-react';

export default function Header({
  currentPage = 'home',
  onNavigate,
  reports = [],
  currentReportId,
  onSelectReport,
  onOpenNewModal,
  onOpenDbModal,
  onLoadPreset,
  loading,
  connected
}) {
  const currentReport = reports.find(r => r.id === currentReportId);

  const presets = [
    { key: 'Acme', label: 'Acme Tech', badge: 'Balanced', color: '#f59e0b' },
    { key: 'CloudScale', label: 'CloudScale AI', badge: 'Bullish', color: '#10b981' },
    { key: 'NovaRetail', label: 'NovaRetail', badge: 'High Risk', color: '#f43f5e' }
  ];

  return (
    <>
      {/* Sleek Understated Financial Feed */}
      <div className="ticker-wrap no-print">
        <div className="ticker-content">
          <span style={{ color: '#d97706', fontWeight: 700, marginRight: 32 }}>
            JH ANALYTICS FINANCIAL FEED
          </span>
          <span style={{ color: '#334155', marginRight: 32 }}>
            ACME TECHNOLOGIES: <span style={{ color: '#0f172a', fontWeight: 700 }}>$4.82B</span> (+12.0% YoY) · Stable Core Operations
          </span>
          <span style={{ color: '#e11d48', marginRight: 32 }}>
            ACME RISK PROFILE: 1.62x Leverage · 38% Top-Customer Concentration
          </span>
          <span style={{ color: '#334155', marginRight: 32 }}>
            CLOUDSCALE AI: <span style={{ color: '#059669', fontWeight: 700 }}>$2.40B</span> (+36.0% YoY) · 74.5% GM · Zero Debt
          </span>
          <span style={{ color: '#e11d48', marginRight: 32 }}>
            NOVARETAIL: $6.10B (-2.0% YoY) · 4.1x Debt/Cash · Margin Pressure
          </span>
          <span style={{ color: '#64748b', marginRight: 32 }}>
            GROUNDING AUDIT: 100.0% Verified Primary Filings
          </span>

          {/* Loop repeat */}
          <span style={{ color: '#d97706', fontWeight: 700, marginRight: 32 }}>
            JH ANALYTICS FINANCIAL FEED
          </span>
          <span style={{ color: '#334155', marginRight: 32 }}>
            ACME TECHNOLOGIES: <span style={{ color: '#0f172a', fontWeight: 700 }}>$4.82B</span> (+12.0% YoY) · Stable Core Operations
          </span>
          <span style={{ color: '#e11d48', marginRight: 32 }}>
            ACME RISK PROFILE: 1.62x Leverage · 38% Top-Customer Concentration
          </span>
          <span style={{ color: '#334155', marginRight: 32 }}>
            CLOUDSCALE AI: <span style={{ color: '#059669', fontWeight: 700 }}>$2.40B</span> (+36.0% YoY) · 74.5% GM · Zero Debt
          </span>
          <span style={{ color: '#e11d48', marginRight: 32 }}>
            NOVARETAIL: $6.10B (-2.0% YoY) · 4.1x Debt/Cash · Margin Pressure
          </span>
        </div>
      </div>

      <header className="glass-header-curved no-print" style={{
        padding: '12px 24px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          {/* Brand Logo & Title with JH Analytics Subtitle */}
          <div
            onClick={() => onNavigate && onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          >
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(79, 70, 229, 0.25)',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
            }}>
              <TrendingUp size={20} color="#ffffff" />
            </div>
            <div>
              <div className="font-grelify" style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.025em',
                lineHeight: 1.15
              }}>
                Earnings Desk
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#d97706',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: 1
                }}
              >
                JH Analytics
              </div>
            </div>
          </div>

          {/* Navigation Pages: Home | Analysis Desk | About */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#f1f5f9',
            padding: '4px 6px',
            borderRadius: 9999,
            border: '1px solid #e2e8f0',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)'
          }}>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 16px',
                borderRadius: 9999,
                border: currentPage === 'home' ? '1px solid #0284c7' : '1px solid transparent',
                background: currentPage === 'home' 
                  ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' 
                  : 'transparent',
                color: currentPage === 'home' ? '#ffffff' : '#64748b',
                fontWeight: currentPage === 'home' ? 600 : 500,
                fontSize: '0.84rem',
                boxShadow: currentPage === 'home' ? '0 2px 10px rgba(2, 132, 199, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Home size={14} color={currentPage === 'home' ? '#ffffff' : '#64748b'} />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('desk')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 16px',
                borderRadius: 9999,
                border: currentPage === 'desk' ? '1px solid #0284c7' : '1px solid transparent',
                background: currentPage === 'desk' 
                  ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' 
                  : 'transparent',
                color: currentPage === 'desk' ? '#ffffff' : '#64748b',
                fontWeight: currentPage === 'desk' ? 600 : 500,
                fontSize: '0.84rem',
                boxShadow: currentPage === 'desk' ? '0 2px 10px rgba(2, 132, 199, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <BarChart3 size={14} color={currentPage === 'desk' ? '#ffffff' : '#64748b'} />
              <span>Analysis Desk</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 16px',
                borderRadius: 9999,
                border: currentPage === 'about' ? '1px solid #0284c7' : '1px solid transparent',
                background: currentPage === 'about' 
                  ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' 
                  : 'transparent',
                color: currentPage === 'about' ? '#ffffff' : '#64748b',
                fontWeight: currentPage === 'about' ? 600 : 500,
                fontSize: '0.84rem',
                boxShadow: currentPage === 'about' ? '0 2px 10px rgba(2, 132, 199, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Info size={14} color={currentPage === 'about' ? '#ffffff' : '#64748b'} />
              <span>About</span>
            </button>
          </nav>

          {/* Quick Portfolio Presets (Active in Desk) */}
          {currentPage === 'desk' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Select:
              </span>
              {presets.map(p => {
                const matchedReport = reports.find(r => r.company?.toLowerCase().includes(p.key.toLowerCase()));
                const isSelected = currentReport?.company?.toLowerCase().includes(p.key.toLowerCase());

                return (
                  <button
                    key={p.key}
                    onClick={() => {
                      if (matchedReport) {
                        onSelectReport(matchedReport.id);
                      } else if (onLoadPreset) {
                        onLoadPreset(p.key.toLowerCase());
                      }
                    }}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 9999,
                      fontSize: '0.75rem',
                      background: isSelected ? 'rgba(2, 132, 199, 0.12)' : '#ffffff',
                      border: `1px solid ${isSelected ? '#0284c7' : '#cbd5e1'}`,
                      color: isSelected ? '#0369a1' : '#334155',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{p.label}</span>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '1px 6px',
                      borderRadius: 9999,
                      background: `${p.color}15`,
                      color: p.color,
                      fontWeight: 700
                    }}>
                      {p.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Actions Suite */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {currentPage === 'desk' && (
              <button
                onClick={() => window.print()}
                className="btn btn-secondary btn-sm no-print"
                title="Print or Save PDF Executive Brief"
              >
                <Printer size={14} color="#64748b" />
                <span>Print PDF</span>
              </button>
            )}

            <button
              onClick={onOpenDbModal}
              className="btn btn-secondary btn-sm no-print"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Database size={14} color="#64748b" />
              <span>Database</span>
              <span style={{
                background: '#e2e8f0',
                color: '#0f172a',
                borderRadius: 4,
                padding: '1px 6px',
                fontSize: '0.7rem',
                fontWeight: 600
              }}>
                {reports?.length || 0}
              </span>
            </button>

            {currentPage === 'desk' && (
              <button
                onClick={onOpenNewModal}
                disabled={loading}
                className="btn btn-primary btn-sm no-print"
              >
                <Plus size={14} />
                <span>New Analysis</span>
              </button>
            )}

            {/* Connection Status - Clean without box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.75rem',
              color: connected ? '#10b981' : '#f43f5e',
              fontWeight: 600,
              padding: '0 4px'
            }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: connected ? '#10b981' : '#f43f5e'
              }} />
              <span>{connected ? 'Connected' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
