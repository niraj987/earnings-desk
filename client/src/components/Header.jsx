import React from 'react';
import { Database, Plus, RefreshCw, Printer, Sparkles, Activity, Home, BarChart3, Info } from 'lucide-react';

export default function Header({
  currentPage = 'desk',
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
    { key: 'Acme', label: 'Acme Tech', badge: 'Balanced', color: '#fbbf24' },
    { key: 'CloudScale', label: 'CloudScale AI', badge: 'Bullish', color: '#10b981' },
    { key: 'NovaRetail', label: 'NovaRetail', badge: 'High Risk', color: '#f43f5e' }
  ];

  return (
    <>
      {/* Real-time Ticker Tape with Purple, Gold, Silver & White accents */}
      <div className="ticker-wrap no-print">
        <div className="ticker-content">
          <span style={{ color: '#fbbf24', fontWeight: 800, marginRight: 28 }}>
            ★ JH ANALYTICS FINANCIAL FEED
          </span>
          <span style={{ color: '#ffffff', marginRight: 28 }}>
            ACME TECHNOLOGIES: <span style={{ color: '#fbbf24', fontWeight: 700 }}>$4.82B</span> (+12.0% YoY) ▲ POSITIVE REVENUE
          </span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>
            ACME RISK PROFILE: HIGH LEVERAGE (1.62x) · 38% CONCENTRATION ⚠️
          </span>
          <span style={{ color: '#ffffff', marginRight: 28 }}>
            CLOUDSCALE AI: <span style={{ color: '#c084fc', fontWeight: 700 }}>$2.40B</span> (+36.0% YoY) ▲ 74.5% GM · ZERO DEBT 🟢
          </span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>
            NOVARETAIL: $6.10B (-2.0% YoY) ▼ 4.1x DEBT/CASH · MARGIN SQUEEZE 🔴
          </span>
          <span style={{ color: '#e2e8f0', marginRight: 28 }}>
            PROVENANCE INTEGRITY: <span style={{ color: '#c084fc', fontWeight: 700 }}>100.0% VERIFIED</span> · ZERO HALLUCINATIONS
          </span>

          {/* Seamless loop */}
          <span style={{ color: '#fbbf24', fontWeight: 800, marginRight: 28 }}>
            ★ JH ANALYTICS FINANCIAL FEED
          </span>
          <span style={{ color: '#ffffff', marginRight: 28 }}>
            ACME TECHNOLOGIES: <span style={{ color: '#fbbf24', fontWeight: 700 }}>$4.82B</span> (+12.0% YoY) ▲ POSITIVE REVENUE
          </span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>
            ACME RISK PROFILE: HIGH LEVERAGE (1.62x) · 38% CONCENTRATION ⚠️
          </span>
          <span style={{ color: '#ffffff', marginRight: 28 }}>
            CLOUDSCALE AI: <span style={{ color: '#c084fc', fontWeight: 700 }}>$2.40B</span> (+36.0% YoY) ▲ 74.5% GM · ZERO DEBT 🟢
          </span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>
            NOVARETAIL: $6.10B (-2.0% YoY) ▼ 4.1x DEBT/CASH · MARGIN SQUEEZE 🔴
          </span>
        </div>
      </div>

      <header style={{
        background: 'rgba(8, 12, 28, 0.88)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), 0 0 20px rgba(168, 85, 247, 0.1)'
      }}>
        <div style={{
          maxWidth: 1600,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20
        }}>
          {/* Brand Logo & Title with JH Analytics as Lower Subtitle */}
          <div
            onClick={() => onNavigate && onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
          >
            <div style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #f59e0b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              boxShadow: '0 4px 20px rgba(168, 85, 247, 0.45), 0 0 12px rgba(245, 158, 11, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}>
              📊
            </div>
            <div>
              <h1 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                textShadow: '0 0 15px rgba(255, 255, 255, 0.35)'
              }}>
                Earnings Desk
              </h1>
              <div
                className="text-gold-gradient"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>JH Analytics</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>◆</span>
                <span style={{ fontSize: '0.7rem', color: '#e2e8f0', letterSpacing: '0.04em', textTransform: 'none' }}>
                  Institutional Terminal
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Pages: Home | Analysis Desk | About */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(15, 21, 42, 0.75)',
            padding: '5px 8px',
            borderRadius: 12,
            border: '1px solid rgba(168, 85, 247, 0.25)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(14px)'
          }}>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background: currentPage === 'home'
                  ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
                  : 'transparent',
                color: currentPage === 'home' ? '#ffffff' : '#cbd5e1',
                fontWeight: currentPage === 'home' ? 700 : 500,
                fontSize: '0.875rem',
                boxShadow: currentPage === 'home'
                  ? '0 2px 14px rgba(168, 85, 247, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
                  : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Home size={15} color={currentPage === 'home' ? '#ffffff' : '#a855f7'} />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('desk')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background: currentPage === 'desk'
                  ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
                  : 'transparent',
                color: currentPage === 'desk' ? '#ffffff' : '#cbd5e1',
                fontWeight: currentPage === 'desk' ? 700 : 500,
                fontSize: '0.875rem',
                boxShadow: currentPage === 'desk'
                  ? '0 2px 14px rgba(168, 85, 247, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
                  : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <BarChart3 size={15} color={currentPage === 'desk' ? '#ffffff' : '#fbbf24'} />
              <span>Analysis Desk</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background: currentPage === 'about'
                  ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
                  : 'transparent',
                color: currentPage === 'about' ? '#ffffff' : '#cbd5e1',
                fontWeight: currentPage === 'about' ? 700 : 500,
                fontSize: '0.875rem',
                boxShadow: currentPage === 'about'
                  ? '0 2px 14px rgba(168, 85, 247, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
                  : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Info size={15} color={currentPage === 'about' ? '#ffffff' : '#e2e8f0'} />
              <span>About</span>
            </button>
          </nav>

          {/* Quick Portfolio Presets (Active in Desk) */}
          {currentPage === 'desk' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Portfolio:
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
                    className="tile-interactive"
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: '0.78rem',
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(245, 158, 11, 0.15) 100%)'
                        : 'rgba(21, 28, 51, 0.65)',
                      border: `1px solid ${isSelected ? '#fbbf24' : 'rgba(255, 255, 255, 0.12)'}`,
                      color: isSelected ? '#ffffff' : '#e2e8f0',
                      boxShadow: isSelected
                        ? '0 0 16px rgba(251, 191, 36, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                        : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{p.label}</span>
                    <span style={{
                      fontSize: '0.68rem',
                      padding: '2px 7px',
                      borderRadius: 4,
                      background: `${p.color}25`,
                      color: p.color,
                      fontWeight: 800,
                      border: `1px solid ${p.color}40`
                    }}>
                      {p.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Actions Suite */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
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
                borderColor: 'rgba(168, 85, 247, 0.4)',
                background: 'rgba(88, 28, 135, 0.2)'
              }}
            >
              <Database size={14} color="#c084fc" />
              <span style={{ color: '#e9d5ff', fontWeight: 600 }}>SQLite DB</span>
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                color: '#ffffff',
                borderRadius: 10,
                padding: '1px 8px',
                fontSize: '0.72rem',
                fontWeight: 800,
                boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)'
              }}>
                {reports?.length || 0}
              </span>
            </button>

            {currentPage === 'desk' && (
              <button
                onClick={onOpenNewModal}
                disabled={loading}
                className="btn btn-gold btn-sm no-print"
              >
                <Plus size={15} />
                <span>Analyze Report</span>
              </button>
            )}

            {/* Connection Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 12px',
              background: connected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
              border: `1px solid ${connected ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
              borderRadius: 8,
              fontSize: '0.75rem',
              color: connected ? '#34d399' : '#fb7185',
              fontWeight: 700,
              boxShadow: connected ? '0 0 12px rgba(16, 185, 129, 0.2)' : 'none'
            }}>
              <div style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: connected ? '#10b981' : '#f43f5e',
                boxShadow: connected ? '0 0 8px #10b981' : '0 0 8px #f43f5e'
              }} />
              <span>{connected ? 'Live' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
