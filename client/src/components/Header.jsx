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
          <span style={{ color: '#fbbf24', fontWeight: 700, marginRight: 32 }}>
            JH ANALYTICS FINANCIAL FEED
          </span>
          <span style={{ color: '#e2e8f0', marginRight: 32 }}>
            ACME TECHNOLOGIES: <span style={{ color: '#ffffff', fontWeight: 600 }}>$4.82B</span> (+12.0% YoY) · Stable Core Operations
          </span>
          <span style={{ color: '#f43f5e', marginRight: 32 }}>
            ACME RISK PROFILE: 1.62x Leverage · 38% Top-Customer Concentration
          </span>
          <span style={{ color: '#e2e8f0', marginRight: 32 }}>
            CLOUDSCALE AI: <span style={{ color: '#10b981', fontWeight: 600 }}>$2.40B</span> (+36.0% YoY) · 74.5% GM · Zero Debt
          </span>
          <span style={{ color: '#f43f5e', marginRight: 32 }}>
            NOVARETAIL: $6.10B (-2.0% YoY) · 4.1x Debt/Cash · Margin Pressure
          </span>
          <span style={{ color: '#94a3b8', marginRight: 32 }}>
            GROUNDING AUDIT: 100.0% Verified Primary Filings
          </span>

          {/* Loop repeat */}
          <span style={{ color: '#fbbf24', fontWeight: 700, marginRight: 32 }}>
            JH ANALYTICS FINANCIAL FEED
          </span>
          <span style={{ color: '#e2e8f0', marginRight: 32 }}>
            ACME TECHNOLOGIES: <span style={{ color: '#ffffff', fontWeight: 600 }}>$4.82B</span> (+12.0% YoY) · Stable Core Operations
          </span>
          <span style={{ color: '#f43f5e', marginRight: 32 }}>
            ACME RISK PROFILE: 1.62x Leverage · 38% Top-Customer Concentration
          </span>
          <span style={{ color: '#e2e8f0', marginRight: 32 }}>
            CLOUDSCALE AI: <span style={{ color: '#10b981', fontWeight: 600 }}>$2.40B</span> (+36.0% YoY) · 74.5% GM · Zero Debt
          </span>
          <span style={{ color: '#f43f5e', marginRight: 32 }}>
            NOVARETAIL: $6.10B (-2.0% YoY) · 4.1x Debt/Cash · Margin Pressure
          </span>
        </div>
      </div>

      <header style={{
        background: 'rgba(10, 14, 23, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{
          maxWidth: 1280,
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
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
            }}>
              <TrendingUp size={20} color="#ffffff" />
            </div>
            <div>
              <div className="font-grelify" style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.15
              }}>
                Earnings Desk
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#fbbf24',
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
            gap: 4,
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '4px',
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: currentPage === 'home' ? '#312e81' : 'transparent',
                color: currentPage === 'home' ? '#ffffff' : '#94a3b8',
                fontWeight: currentPage === 'home' ? 600 : 500,
                fontSize: '0.84rem'
              }}
            >
              <Home size={14} color={currentPage === 'home' ? '#ffffff' : '#94a3b8'} />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('desk')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: currentPage === 'desk' ? '#312e81' : 'transparent',
                color: currentPage === 'desk' ? '#ffffff' : '#94a3b8',
                fontWeight: currentPage === 'desk' ? 600 : 500,
                fontSize: '0.84rem'
              }}
            >
              <BarChart3 size={14} color={currentPage === 'desk' ? '#ffffff' : '#94a3b8'} />
              <span>Analysis Desk</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: currentPage === 'about' ? '#312e81' : 'transparent',
                color: currentPage === 'about' ? '#ffffff' : '#94a3b8',
                fontWeight: currentPage === 'about' ? 600 : 500,
                fontSize: '0.84rem'
              }}
            >
              <Info size={14} color={currentPage === 'about' ? '#ffffff' : '#94a3b8'} />
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
                      padding: '5px 10px',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      background: isSelected ? 'rgba(79, 70, 229, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                      border: `1px solid ${isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.08)'}`,
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{p.label}</span>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '1px 5px',
                      borderRadius: 3,
                      background: `${p.color}20`,
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
                className="btn btn-silver btn-sm no-print"
                title="Print or Save PDF Executive Brief"
              >
                <Printer size={14} color="#e2e8f0" />
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
              <Database size={14} color="#94a3b8" />
              <span>Database</span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
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

            {/* Connection Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 10px',
              background: connected ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
              border: `1px solid ${connected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
              borderRadius: 6,
              fontSize: '0.72rem',
              color: connected ? '#10b981' : '#f43f5e',
              fontWeight: 600
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
