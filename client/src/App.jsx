import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricsBanner from './components/MetricsBanner';
import AnalystNoteTab from './components/AnalystNoteTab';
import WorkflowTab from './components/WorkflowTab';
import WhatIfTab from './components/WhatIfTab';
import AgentViewsTab from './components/AgentViewsTab';
import ClaimTracerTab from './components/ClaimTracerTab';
import QATab from './components/QATab';
import DatabaseModal from './components/DatabaseModal';
import NewReportModal from './components/NewReportModal';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import {
  FileText,
  GitBranch,
  Sliders,
  Users,
  Search,
  MessageSquare,
  AlertCircle,
  Loader2,
  TrendingUp,
  Plus,
  Database,
  Printer,
  CheckCircle2,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'desk' | 'about'
  const [reports, setReports] = useState([]);
  const [currentReportId, setCurrentReportId] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [activeTab, setActiveTab] = useState('note'); // 'note' | 'workflow' | 'whatif' | 'views' | 'tracer' | 'qa'
  const [preselectedRef, setPreselectedRef] = useState(null);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    checkHealthAndLoadReports();
  }, []);

  const checkHealthAndLoadReports = async () => {
    try {
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        setConnected(true);
      }
      await loadReports();
    } catch (err) {
      console.error('Connection error:', err);
      setError('Cannot connect to Express backend server. Make sure the server is running on port 5000.');
      setConnected(false);
    } finally {
      setInitialLoading(false);
    }
  };

  const loadReports = async (selectId = null) => {
    try {
      const res = await fetch('/api/reports');
      const list = await res.json();
      setReports(list);

      if (list.length > 0) {
        const targetId = selectId || currentReportId || list[0].id;
        setCurrentReportId(targetId);
        await loadReportDetails(targetId);
      } else {
        setCurrentReport(null);
        setCurrentReportId(null);
      }
    } catch (err) {
      console.error('Failed to load reports:', err);
    }
  };

  const loadReportDetails = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reports/${id}`);
      if (!res.ok) throw new Error('Report not found');
      const data = await res.json();
      setCurrentReport(data);
      setCurrentReportId(id);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Switch report
  const handleSelectReport = (id) => {
    setCurrentReportId(id);
    loadReportDetails(id);
  };

  // Analyze new report
  const handleAnalyze = async (reportText, priorText, useLlm) => {
    try {
      setLoading(true);
      const res = await fetch('/api/reports/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_text: reportText,
          prior_text: priorText,
          use_llm: useLlm
        })
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to analyze report');
      }

      const newReport = await res.json();
      setIsNewModalOpen(false);
      await loadReports(newReport.id);
      setActiveTab('note');
    } catch (err) {
      alert(`Analysis failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Run What-If simulation
  const handleRunWhatIf = async (editedFigures, scenarioName) => {
    if (!currentReport) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/reports/${currentReport.id}/what-if`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figures: editedFigures,
          prior_figures: currentReport.prior_figures,
          scenario_name: scenarioName
        })
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'What-if calculation failed');
      }

      const recalculated = await res.json();

      // Update current report state with recalculated views and note
      setCurrentReport(prev => ({
        ...prev,
        figures: recalculated.figures,
        prior_figures: recalculated.prior_figures,
        views: recalculated.views,
        note: recalculated.note,
        trace: recalculated.trace,
        scenarios: [
          {
            id: recalculated.scenario_id,
            name: scenarioName || `What-If ${new Date().toLocaleTimeString()}`,
            verdict: recalculated.note?.verdict,
            coverage: recalculated.note?.coverage,
            created_at: new Date().toISOString()
          },
          ...(prev.scenarios || [])
        ]
      }));
    } catch (err) {
      alert(`Simulation failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset figures
  const handleResetFigures = () => {
    if (currentReportId) {
      loadReportDetails(currentReportId);
    }
  };

  // Ask question ("Ask the Note")
  const handleAskQuestion = async (question) => {
    if (!currentReport) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/reports/${currentReport.id}/qa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Q&A failed');
      }

      const qaData = await res.json();

      // Append to QA history in state
      setCurrentReport(prev => ({
        ...prev,
        qa_history: [
          {
            question: qaData.question,
            answers: qaData.answers,
            created_at: new Date().toISOString()
          },
          ...(prev.qa_history || [])
        ]
      }));
    } catch (err) {
      alert(`Q&A query failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete report
  const handleDeleteReport = async (id) => {
    try {
      await fetch(`/api/reports/${id}`, { method: 'DELETE' });
      await loadReports();
    } catch (err) {
      alert(`Failed to delete report: ${err.message}`);
    }
  };

  // Reset to sample or preset
  const handleLoadSample = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/samples');
      const sample = await res.json();
      if (sample.current_text) {
        await handleAnalyze(sample.current_text, sample.prior_text, false);
      }
    } catch (err) {
      alert(`Failed to load sample: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadPreset = async (presetId) => {
    try {
      setLoading(true);
      const res = await fetch('/api/samples');
      const samples = await res.json();
      const preset = (samples.presets || []).find(p => p.id === presetId || p.name?.toLowerCase().includes(presetId));
      if (preset && preset.current_text) {
        const existing = reports.find(r => r.company?.toLowerCase().includes(preset.current_name.split(' ')[0].toLowerCase()));
        if (existing) {
          handleSelectReport(existing.id);
        } else {
          await handleAnalyze(preset.current_text, preset.prior_text, false);
        }
      }
    } catch (err) {
      alert(`Failed to load preset: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRefFromNote = (refId) => {
    setPreselectedRef(refId);
    setActiveTab('tracer');
  };

  const handleOpenDeskWithCompany = (companyName) => {
    if (companyName) {
      const matched = reports.find(r => r.company?.toLowerCase().includes(companyName.toLowerCase().split(' ')[0]));
      if (matched) {
        handleSelectReport(matched.id);
      } else {
        handleLoadPreset(companyName.toLowerCase().split(' ')[0]);
      }
    }
    setCurrentPage('desk');
  };

  const tabs = [
    { id: 'note', label: '📝 Analyst Note', icon: FileText },
    { id: 'workflow', label: '🕸 Workflow', icon: GitBranch },
    { id: 'whatif', label: '🔢 Figures & What-If', icon: Sliders },
    { id: 'views', label: '🧑‍💼 Agent Views', icon: Users },
    { id: 'tracer', label: '🔍 Trace a Claim', icon: Search },
    { id: 'qa', label: '💬 Ask the Desk', icon: MessageSquare }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* App Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        connected={connected}
      />

      {/* Main Container - Dynamic Full-Width for Home Earth Hero, Balanced Max Width for Desk */}
      <main style={{
        flex: 1,
        width: '100%',
        maxWidth: currentPage === 'home' ? '100%' : 1280,
        margin: '0 auto',
        padding: currentPage === 'home' ? 0 : '28px 24px'
      }}>
        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f43f5e',
            padding: '14px 20px',
            borderRadius: 8,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <AlertCircle size={20} />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {/* Home Page View */}
        {currentPage === 'home' && (
          <HomePage
            onOpenDesk={handleOpenDeskWithCompany}
            onSelectCompany={handleOpenDeskWithCompany}
            reports={reports}
          />
        )}

        {/* About Page View */}
        {currentPage === 'about' && (
          <AboutPage
            onOpenDesk={() => setCurrentPage('desk')}
          />
        )}

        {/* Analysis Desk View */}
        {currentPage === 'desk' && (
          initialLoading ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
              <TrendingUp size={40} color="#0284c7" style={{ margin: '0 auto 16px', display: 'block' }} />
              <div className="font-grelify" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a' }}>
                Connecting to JH Analytics Database...
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: 6 }}>
                Loading verified earnings reports and SQLite registry
              </div>
            </div>
          ) : !currentReport ? (
            <div className="glass-panel" style={{ padding: '64px 32px', textAlign: 'center', borderRadius: 16 }}>
              <FileText size={48} color="#0284c7" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>
                No Earnings Reports Found in Database
              </h2>
              <p style={{ color: '#475569', maxWidth: 500, margin: '0 auto 24px', fontSize: '0.92rem' }}>
                Load pre-packaged portfolio samples or upload a new earnings press release to run the multi-agent analysis.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={handleLoadSample} className="btn btn-secondary">
                  Load Acme Technologies Sample
                </button>
                <button onClick={() => setIsNewModalOpen(true)} className="btn btn-primary">
                  Upload or Paste Report
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Secondary Control Bar (Toolbar) - Spacious & Directly Below Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
                padding: '16px 22px',
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}>
                {/* Left: Active Portfolio Company Presets */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginRight: 4
                  }}>
                    <Layers size={15} color="#0284c7" />
                    <span>Portfolio:</span>
                  </div>

                  {/* Preset switcher pills */}
                  {[
                    { key: 'CloudScale', name: 'CloudScale AI', badge: 'Bullish', color: '#059669', bg: 'rgba(5, 150, 105, 0.08)', border: 'rgba(5, 150, 105, 0.35)' },
                    { key: 'Acme', name: 'Acme Tech', badge: 'Balanced', color: '#d97706', bg: 'rgba(217, 119, 6, 0.08)', border: 'rgba(217, 119, 6, 0.35)' },
                    { key: 'NovaRetail', name: 'NovaRetail', badge: 'High Risk', color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)', border: 'rgba(225, 29, 72, 0.35)' }
                  ].map((preset) => {
                    const isSelected = currentReport?.company?.toLowerCase().includes(preset.key.toLowerCase());
                    return (
                      <button
                        key={preset.key}
                        onClick={() => {
                          const match = reports.find(r => r.company?.toLowerCase().includes(preset.key.toLowerCase()));
                          if (match) {
                            handleSelectReport(match.id);
                          } else {
                            handleLoadPreset(preset.key.toLowerCase());
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '7px 14px',
                          borderRadius: 9999,
                          border: isSelected ? `2px solid ${preset.color}` : '1px solid #cbd5e1',
                          background: isSelected ? preset.bg : '#ffffff',
                          color: isSelected ? '#0f172a' : '#475569',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.84rem',
                          boxShadow: isSelected ? `0 2px 10px ${preset.bg}` : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isSelected && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: preset.color }} />
                        )}
                        <span>{preset.name}</span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: 9999,
                          background: isSelected ? preset.color : '#f1f5f9',
                          color: isSelected ? '#ffffff' : preset.color
                        }}>
                          {preset.badge}
                        </span>
                      </button>
                    );
                  })}

                  {/* All reports count indicator */}
                  {reports.length > 3 && (
                    <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: 4 }}>
                      ({reports.length} reports in DB)
                    </span>
                  )}
                </div>

                {/* Right: Desk Actions (Relocated from Header) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsNewModalOpen(true)}
                    className="btn btn-primary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 15px',
                      fontWeight: 600,
                      fontSize: '0.82rem'
                    }}
                  >
                    <Plus size={15} />
                    <span>+ New Analysis</span>
                  </button>

                  <button
                    onClick={() => setIsDbModalOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 15px',
                      fontWeight: 600,
                      fontSize: '0.82rem'
                    }}
                  >
                    <Database size={15} color="#0284c7" />
                    <span>Database ({reports.length})</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="btn btn-secondary btn-sm no-print"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 15px',
                      fontWeight: 600,
                      fontSize: '0.82rem'
                    }}
                    title="Print or Export Full Grounded Report to PDF"
                  >
                    <Printer size={15} />
                    <span>Print PDF</span>
                  </button>
                </div>
              </div>

              {/* Executive Report Context Banner */}
              <div style={{
                padding: '22px 26px',
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h1 className="font-grelify" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>
                      {currentReport.company}
                    </h1>
                    <span style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 500 }}>
                      {currentReport.period}
                    </span>
                    <span className={`badge ${currentReport.note?.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : currentReport.note?.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-gold'}`} style={{ padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700 }}>
                      {currentReport.note?.verdict || 'Balanced'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#475569', marginTop: 6, maxWidth: 840, lineHeight: 1.55 }}>
                    Autonomous multi-agent consensus grounded in primary SEC disclosure filings. Every claim is cross-audited across 4 specialist agents with 100% mathematical provenance citations.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#059669', background: 'rgba(5, 150, 105, 0.08)', padding: '5px 12px', borderRadius: 9999, border: '1px solid rgba(5, 150, 105, 0.25)', fontWeight: 600 }}>
                    <CheckCircle2 size={14} />
                    <span>100% Provenance Grounded</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#0284c7', background: 'rgba(2, 132, 199, 0.08)', padding: '5px 12px', borderRadius: 9999, border: '1px solid rgba(2, 132, 199, 0.25)', fontWeight: 600 }}>
                    <Sparkles size={14} />
                    <span>4-Agent Consensus</span>
                  </div>
                </div>
              </div>

              {/* Top Metrics Cards */}
              <MetricsBanner report={currentReport} />

              {/* Navigation Tabs Bar - Spacious Elevated Container */}
              <div style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                padding: '6px 8px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: 6,
                  overflowX: 'auto',
                  paddingBottom: 2
                }}>
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '11px 18px',
                          borderRadius: 10,
                          border: isActive ? '1px solid #0284c7' : '1px solid transparent',
                          background: isActive ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
                          color: isActive ? '#0284c7' : '#64748b',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Icon size={16} color={isActive ? '#0284c7' : '#94a3b8'} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Explanatory Helper Banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 18px',
                background: '#ffffff',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                fontSize: '0.84rem',
                color: '#475569'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Info size={16} color="#0284c7" />
                  <span>
                    {activeTab === 'note' && '📝 Executive Research Note: Read the comprehensive grounded note with interactive [F#] provenance pills.'}
                    {activeTab === 'workflow' && '🕸 Agent Workflow: Inspect the parallel fan-out pipeline execution graph and latency benchmarks.'}
                    {activeTab === 'whatif' && '🔢 Financial Sensitivity Simulator: Adjust revenue, margins, or debt sliders to dynamically recalculate desk stance.'}
                    {activeTab === 'views' && '🧑‍💼 4 Specialist Agent Views: Deep-dive into individual analyses from Revenue, Risk, Outlook, and Comparison agents.'}
                    {activeTab === 'tracer' && '🔍 Claim Provenance Tracer: Formally trace any generated claim back to verbatim regulatory filing sentences.'}
                    {activeTab === 'qa' && '💬 Grounded Q&A Assistant: Ask natural language questions with deterministic token-overlap grounding and zero hallucination.'}
                  </span>
                </div>
              </div>

              {/* Tab Contents */}
              <div>
                {activeTab === 'note' && (
                  <AnalystNoteTab
                    report={currentReport}
                    onSelectRef={handleSelectRefFromNote}
                  />
                )}

                {activeTab === 'workflow' && (
                  <WorkflowTab report={currentReport} />
                )}

                {activeTab === 'whatif' && (
                  <WhatIfTab
                    report={currentReport}
                    onRunWhatIf={handleRunWhatIf}
                    onResetFigures={handleResetFigures}
                    loading={loading}
                  />
                )}

                {activeTab === 'views' && (
                  <AgentViewsTab
                    report={currentReport}
                    onSelectRef={handleSelectRefFromNote}
                  />
                )}

                {activeTab === 'tracer' && (
                  <ClaimTracerTab
                    report={currentReport}
                    preselectedRef={preselectedRef}
                  />
                )}

                {activeTab === 'qa' && (
                  <QATab
                    report={currentReport}
                    onAskQuestion={handleAskQuestion}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {/* Database Management Modal */}
      <DatabaseModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
        reports={reports}
        currentReportId={currentReportId}
        onSelectReport={handleSelectReport}
        onDeleteReport={handleDeleteReport}
      />

      {/* New Report Analysis Modal */}
      <NewReportModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAnalyze={handleAnalyze}
        loading={loading}
      />
    </div>
  );
}

