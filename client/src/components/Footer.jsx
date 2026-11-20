import React from 'react';
import { ShieldCheck, BarChart3, Database, Globe, Sparkles, TrendingUp } from 'lucide-react';

export default function Footer({ onNavigate, currentPage }) {
  return (
    <footer className="no-print" style={{
      marginTop: 'auto',
      background: 'rgba(8, 12, 26, 0.92)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      borderTop: '1px solid rgba(168, 85, 247, 0.25)',
      boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.45), 0 0 20px rgba(168, 85, 247, 0.1)',
      padding: '44px 28px 32px',
      color: '#cbd5e1'
    }}>
      <div style={{
        maxWidth: 1600,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 36
      }}>
        {/* Main Footer Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 36
        }}>
          {/* Brand & Mission */}
          <div style={{ maxWidth: 460 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #f59e0b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(168, 85, 247, 0.4), 0 0 8px rgba(245, 158, 11, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <TrendingUp size={18} color="#ffffff" />
              </div>
              <div>
                <span className="font-grelify" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.035em' }}>
                  Earnings Desk
                </span>
                <span
                  className="text-gold-gradient"
                  style={{
                    marginLeft: 10,
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  JH Analytics
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Precision financial intelligence by JH Analytics.
              Every claim formulated across specialist agents strictly traces to extracted figures with 100% provenance verification.
            </p>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                Navigation
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem' }}>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentPage === 'home' ? '#c084fc' : '#cbd5e1',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'home' ? 700 : 500,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    Home Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate('desk')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentPage === 'desk' ? '#fbbf24' : '#cbd5e1',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'desk' ? 700 : 500,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    Analysis Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate('about')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentPage === 'about' ? '#ffffff' : '#cbd5e1',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'about' ? 700 : 500,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    About JH Analytics
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                Core Capabilities
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem', color: '#cbd5e1' }}>
                <li>✦ Zero-Hallucination Gate (100% Provenance)</li>
                <li>✦ Fan-Out / Fan-In Multi-Agent Architecture</li>
                <li>✦ What-If Sensitivity Stress Testing</li>
                <li>✦ Grounded Natural-Language Q&A</li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                Deployment Status
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#34d399' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                  <span style={{ fontWeight: 600 }}>Vercel Serverless Ready</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#e9d5ff' }}>
                  <Database size={15} color="#c084fc" />
                  <span style={{ fontWeight: 600 }}>SQLite Embedded Database</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with subtle purple and silver glow */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, rgba(168, 85, 247, 0) 0%, rgba(168, 85, 247, 0.4) 30%, rgba(251, 191, 36, 0.4) 70%, rgba(168, 85, 247, 0) 100%)'
        }} />

        {/* Bottom Copyright & Disclaimer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: '0.85rem'
        }}>
          <div style={{ color: '#ffffff' }}>
            © {new Date().getFullYear()} <strong className="text-gold-gradient">JH Analytics</strong>. All rights reserved.
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
            Confidential financial intelligence. All claims mathematically validated against primary report filings.
          </div>
        </div>
      </div>
    </footer>
  );
}
