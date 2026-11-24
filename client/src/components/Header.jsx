import React from 'react';
import { Home, BarChart3, Info, TrendingUp } from 'lucide-react';

export default function Header({
  currentPage = 'home',
  onNavigate,
  connected
}) {
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

          {/* Connection Status Indicator - Clean & Subtle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            color: connected ? '#059669' : '#e11d48',
            fontWeight: 600,
            padding: '4px 10px',
            background: connected ? 'rgba(5, 150, 105, 0.08)' : 'rgba(225, 29, 72, 0.08)',
            borderRadius: 9999,
            border: `1px solid ${connected ? 'rgba(5, 150, 105, 0.2)' : 'rgba(225, 29, 72, 0.2)'}`
          }}>
            <div style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: connected ? '#10b981' : '#f43f5e',
              boxShadow: connected ? '0 0 6px #10b981' : 'none'
            }} />
            <span>{connected ? 'Connected' : 'Offline'}</span>
          </div>
        </div>
      </header>
    </>
  );
}
