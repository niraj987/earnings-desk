import React, { useState } from 'react';
import { Upload, FileText, X, Sparkles, RefreshCw, Play } from 'lucide-react';

export default function NewReportModal({
  isOpen,
  onClose,
  onAnalyze,
  loading
}) {
  const [reportText, setReportText] = useState('');
  const [priorText, setPriorText] = useState('');
  const [useLlm, setUseLlm] = useState(false);
  const [activeTab, setActiveTab] = useState('paste'); // 'paste' | 'upload'
  const [uploadFileName, setUploadFileName] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e, isPrior = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        if (isPrior) {
          setPriorText(content);
        } else {
          setReportText(content);
          setUploadFileName(file.name);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSample = async () => {
    try {
      const res = await fetch('/api/samples');
      const data = await res.json();
      if (data.current_text) setReportText(data.current_text);
      if (data.prior_text) setPriorText(data.prior_text);
    } catch (err) {
      console.error('Failed to load sample:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportText.trim() || loading) return;
    onAnalyze(reportText.trim(), priorText.trim(), useLlm);
  };

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
        maxWidth: 840,
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e2e8f0',
        background: '#ffffff'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
              Analyze New Earnings Report
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Multi-agent extraction across specialist agents and Grounding Gate verification
            </p>
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

        {/* Preset helper bar */}
        <div style={{
          padding: '12px 24px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setActiveTab('paste')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'paste' ? '#0284c7' : '#ffffff',
                color: activeTab === 'paste' ? '#ffffff' : '#334155',
                border: activeTab === 'paste' ? '1px solid #0284c7' : '1px solid #cbd5e1',
                fontWeight: 600
              }}
            >
              <FileText size={14} /> Paste Report Text
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'upload' ? '#0284c7' : '#ffffff',
                color: activeTab === 'upload' ? '#ffffff' : '#334155',
                border: activeTab === 'upload' ? '1px solid #0284c7' : '1px solid #cbd5e1',
                fontWeight: 600
              }}
            >
              <Upload size={14} /> Upload Files
            </button>
          </div>

          <button
            onClick={handleLoadSample}
            type="button"
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={14} /> Load Acme Sample
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {activeTab === 'upload' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{
                border: '2px dashed #cbd5e1',
                borderRadius: 8,
                padding: 24,
                textAlign: 'center',
                background: '#f8fafc'
              }}>
                <Upload size={32} color="#0284c7" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>Current Quarter Report</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 12 }}>TXT, MD files</div>
                <input
                  type="file"
                  accept=".txt,.md,.pdf"
                  onChange={e => handleFileUpload(e, false)}
                  style={{ fontSize: '0.8rem', color: '#475569' }}
                />
                {reportText && (
                  <div style={{ marginTop: 10, fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                    ✓ Loaded ({reportText.length} chars)
                  </div>
                )}
              </div>

              <div style={{
                border: '2px dashed #cbd5e1',
                borderRadius: 8,
                padding: 24,
                textAlign: 'center',
                background: '#f8fafc'
              }}>
                <Upload size={32} color="#8b5cf6" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>Previous Quarter (Optional)</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 12 }}>Enables Comparison Agent</div>
                <input
                  type="file"
                  accept=".txt,.md,.pdf"
                  onChange={e => handleFileUpload(e, true)}
                  style={{ fontSize: '0.8rem', color: '#475569' }}
                />
                {priorText && (
                  <div style={{ marginTop: 10, fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                    ✓ Loaded ({priorText.length} chars)
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                  Current Quarter Earnings Report (Required):
                </label>
                <textarea
                  rows={8}
                  placeholder="Paste press release text here (e.g. Acme Technologies reported revenue of $4.82 billion, up 12% YoY...)"
                  value={reportText}
                  onChange={e => setReportText(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    padding: '12px 14px',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Previous Quarter Report (Optional — enables Comparison Agent QoQ deltas):
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste previous quarter text here (e.g. Acme reported revenue of $4.55 billion, up 9% YoY...)"
                  value={priorText}
                  onChange={e => setPriorText(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    padding: '12px 14px',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            </>
          )}

          {/* LLM toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: 8
          }}>
            <input
              type="checkbox"
              id="llmCheckbox"
              checked={useLlm}
              onChange={e => setUseLlm(e.target.checked)}
              style={{ cursor: 'pointer', width: 16, height: 16 }}
            />
            <label htmlFor="llmCheckbox" style={{ fontSize: '0.85rem', color: '#0369a1', cursor: 'pointer' }}>
              <strong>LLM Polish for Executive Summary:</strong> Use Claude / GPT to polish phrasing (requires API key, validated against registry). Unchecked runs fully offline & deterministic.
            </label>
          </div>

          {/* Modal Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
            marginTop: 10
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !reportText.trim()}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Executing 5 Agents & Saving...</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Run Multi-Agent Desk</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

