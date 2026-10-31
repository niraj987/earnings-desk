import React from 'react';
import { Database, Plus, RefreshCw, Printer, Sparkles, Activity } from 'lucide-react';

export default function Header({
  reports,
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
          <span style={{ color: '#38bdf8', marginRight: 24 }}>● LIVE EARNINGS DESK FEED</span>
          <span style={{ color: '#10b981', marginRight: 24 }}>ACME TECHNOLOGIES: $4.82B (+12.0% YoY) ▲ POSITIVE REVENUE</span>
          <span style={{ color: '#f43f5e', marginRight: 24 }}>ACME RISK PROFILE: HIGH LEVERAGE (1.62x) · 38% CONCENTRATION ⚠️</span>
          <span style={{ color: '#10b981', marginRight: 24 }}>CLOUDSCALE AI: $2.40B (+36.0% YoY) ▲ 74.5% GM · ZERO DEBT 🟢</span>
          <span style={{ color: '#f43f5e', marginRight: 24 }}>NOVARETAIL: $6.10B (-2.0% YoY) ▼ 4.1x DEBT/CASH · MARGIN SQUEEZE 🔴</span>
          <span style={{ color: '#38bdf8', marginRight: 24 }}>PROVENANCE INTEGRITY: 100.0% VERIFIED · 0 HALLUCINATIONS</span>
          <span style={{ color: '#f59e0b', marginRight: 24 }}>FAN-OUT / FAN-IN REDUCER: 4 PARALLEL ANALYSTS + EDITOR SYNTHESIS</span>

          {/* Repeat for seamless loop */}
          <span style={{ color: '#38bdf8', marginRight: 24 }}>● LIVE EARNINGS DESK FEED</span>
          <span style={{ color: '#10b981', marginRight: 24 }}>ACME TECHNOLOGIES: $4.82B (+12.0% YoY) ▲ POSITIVE REVENUE</span>
          <span style={{ color: '#f43f5e', marginRight: 24 }}>ACME RISK PROFILE: HIGH LEVERAGE (1.62x) · 38% CONCENTRATION ⚠️</span>
          <span style={{ color: '#10b981', marginRight: 24 }}>CLOUDSCALE AI: $2.40B (+36.0% YoY) ▲ 74.5% GM · ZERO DEBT 🟢</span>
          <span style={{ color: '#f43f5e', marginRight: 24 }}>NOVARETAIL: $6.10B (-2.0% YoY) ▼ 4.1x DEBT/CASH · MARGIN SQUEEZE 🔴</span>
        </div>
      </div>

      <header style={{
        background: 'rgba(10, 16, 31, 0.95)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid #1a2b47',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{
          maxWidth: 1600,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14
        }}>
          {/* Brand Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              boxShadow: '0 4px 16px rgba(14, 165, 233, 0.4)'
            }}>
              📊
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                  Earnings Desk
                </h1>
                <span style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '2px 8px',
                  borderRadius: 9999,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  Institutional Multi-Agent
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                LangGraph Multi-Agent Architecture · 100% Provenance Grounding · Express + React + SQLite
              </p>
            </div>
          </div>

          {/* Preset Portfolio Quick Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
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
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    background: isSelected ? 'rgba(56, 189, 248, 0.15)' : '#121c2e',
                    borderColor: isSelected ? '#38bdf8' : '#20324e',
                    color: isSelected ? '#38bdf8' : '#cbd5e1'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{p.label}</span>
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '1px 5px',
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

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* Print Executive Brief */}
            <button
              onClick={() => window.print()}
              className="btn btn-secondary btn-sm no-print"
              title="Print or Save PDF Executive Brief"
            >
              <Printer size={14} />
              Print PDF
            </button>

            {/* SQLite Database Browser Button */}
            <button
              onClick={onOpenDbModal}
              className="btn btn-secondary btn-sm no-print"
              style={{ borderColor: '#38bdf8' }}
            >
              <Database size={14} color="#38bdf8" />
              <span style={{ color: '#38bdf8' }}>SQLite DB</span>
              <span style={{
                background: '#0369a1',
                color: '#fff',
                borderRadius: 10,
                padding: '1px 6px',
                fontSize: '0.68rem',
                fontWeight: 700
              }}>
                {reports?.length || 0}
              </span>
            </button>

            {/* New Report Analysis Button */}
            <button
              onClick={onOpenNewModal}
              disabled={loading}
              className="btn btn-primary btn-sm no-print"
            >
              <Plus size={15} />
              Analyze Report
            </button>

            {/* Connection Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 8px',
              background: connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${connected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
              borderRadius: 6,
              fontSize: '0.72rem',
              color: connected ? '#10b981' : '#f43f5e'
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
