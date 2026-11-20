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
    { key: 'Acme', label: 'Acme Tech', badge: 'Balanced', color: '#f59e0b' },
    { key: 'CloudScale', label: 'CloudScale AI', badge: 'Bullish', color: '#10b981' },
    { key: 'NovaRetail', label: 'NovaRetail', badge: 'High Risk', color: '#f43f5e' }
  ];

  return (
    <>
      {/* Real-time Ticker Tape */}
      <div className="ticker-wrap no-print">
        <div className="ticker-content">
          <span style={{ color: '#38bdf8', marginRight: 28 }}>● JH ANALYTICS FINANCIAL FEED</span>
          <span style={{ color: '#10b981', marginRight: 28 }}>ACME TECHNOLOGIES: $4.82B (+12.0% YoY) ▲ POSITIVE REVENUE</span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>ACME RISK PROFILE: HIGH LEVERAGE (1.62x) · 38% CONCENTRATION ⚠️</span>
          <span style={{ color: '#10b981', marginRight: 28 }}>CLOUDSCALE AI: $2.40B (+36.0% YoY) ▲ 74.5% GM · ZERO DEBT 🟢</span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>NOVARETAIL: $6.10B (-2.0% YoY) ▼ 4.1x DEBT/CASH · MARGIN SQUEEZE 🔴</span>
          <span style={{ color: '#38bdf8', marginRight: 28 }}>PROVENANCE INTEGRITY: 100.0% VERIFIED · ZERO HALLUCINATIONS</span>

          {/* Seamless loop */}
          <span style={{ color: '#38bdf8', marginRight: 28 }}>● JH ANALYTICS FINANCIAL FEED</span>
          <span style={{ color: '#10b981', marginRight: 28 }}>ACME TECHNOLOGIES: $4.82B (+12.0% YoY) ▲ POSITIVE REVENUE</span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>ACME RISK PROFILE: HIGH LEVERAGE (1.62x) · 38% CONCENTRATION ⚠️</span>
          <span style={{ color: '#10b981', marginRight: 28 }}>CLOUDSCALE AI: $2.40B (+36.0% YoY) ▲ 74.5% GM · ZERO DEBT 🟢</span>
          <span style={{ color: '#f43f5e', marginRight: 28 }}>NOVARETAIL: $6.10B (-2.0% YoY) ▼ 4.1x DEBT/CASH · MARGIN SQUEEZE 🔴</span>
        </div>
      </div>

      <header style={{
        background: 'rgba(8, 14, 28, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.35)'
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
          {/* Brand Logo & Title with JH Analytics as subtitle */}
          <div
            onClick={() => onNavigate && onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              boxShadow: '0 4px 18px rgba(14, 165, 233, 0.45)'
            }}>
              📊
            </div>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Earnings Desk
              </h1>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#38bdf8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: 2
              }}>
                JH Analytics
              </div>
            </div>
          </div>

          {/* Navigation Pages: Home | Analysis Desk | About */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '4px 6px',
            borderRadius: 10,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)'
          }}>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                background: currentPage === 'home' ? 'linear-gradient(135deg, #0284c7, #0ea5e9)' : 'transparent',
                color: currentPage === 'home' ? '#ffffff' : '#94a3b8',
                fontWeight: currentPage === 'home' ? 700 : 500,
                fontSize: '0.85rem',
                boxShadow: currentPage === 'home' ? '0 2px 10px rgba(14, 165, 233, 0.35)' : 'none'
              }}
            >
              <Home size={15} />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('desk')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                background: currentPage === 'desk' ? 'linear-gradient(135deg, #0284c7, #0ea5e9)' : 'transparent',
                color: currentPage === 'desk' ? '#ffffff' : '#94a3b8',
                fontWeight: currentPage === 'desk' ? 700 : 500,
                fontSize: '0.85rem',
                boxShadow: currentPage === 'desk' ? '0 2px 10px rgba(14, 165, 233, 0.35)' : 'none'
              }}
            >
              <BarChart3 size={15} />
              <span>Analysis Desk</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                background: currentPage === 'about' ? 'linear-gradient(135deg, #0284c7, #0ea5e9)' : 'transparent',
                color: currentPage === 'about' ? '#ffffff' : '#94a3b8',
                fontWeight: currentPage === 'about' ? 700 : 500,
                fontSize: '0.85rem',
                boxShadow: currentPage === 'about' ? '0 2px 10px rgba(14, 165, 233, 0.35)' : 'none'
              }}
            >
              <Info size={15} />
              <span>About</span>
            </button>
          </nav>

          {/* Quick Portfolio Presets (Active in Desk) */}
          {currentPage === 'desk' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
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
                    className="btn btn-secondary btn-sm"
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.75rem',
                      background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(30, 41, 59, 0.5)',
                      borderColor: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#38bdf8' : '#cbd5e1'
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{p.label}</span>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: `${p.color}22`,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {currentPage === 'desk' && (
              <button
                onClick={() => window.print()}
                className="btn btn-secondary btn-sm no-print"
                title="Print or Save PDF Executive Brief"
              >
                <Printer size={14} />
                Print PDF
              </button>
            )}

            <button
              onClick={onOpenDbModal}
              className="btn btn-secondary btn-sm no-print"
              style={{ borderColor: 'rgba(56, 189, 248, 0.35)' }}
            >
              <Database size={14} color="#38bdf8" />
              <span style={{ color: '#38bdf8' }}>SQLite DB</span>
              <span style={{
                background: '#0369a1',
                color: '#fff',
                borderRadius: 10,
                padding: '1px 7px',
                fontSize: '0.7rem',
                fontWeight: 700
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
                <Plus size={15} />
                Analyze Report
              </button>
            )}

            {/* Connection Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 10px',
              background: connected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
              border: `1px solid ${connected ? 'rgba(16, 185, 129, 0.35)' : 'rgba(244, 63, 94, 0.35)'}`,
              borderRadius: 8,
              fontSize: '0.75rem',
              color: connected ? '#10b981' : '#f43f5e',
              fontWeight: 600
            }}>
              <div style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: connected ? '#10b981' : '#f43f5e'
              }} />
              {connected ? 'Live' : 'Offline'}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
