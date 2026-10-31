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
import {
  FileText,
  GitBranch,
  Sliders,
  Users,
  Search,
  MessageSquare,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function App() {
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

  const tabs = [
    { id: 'note', label: '📝 Analyst Note', icon: FileText },
    { id: 'workflow', label: '🕸 Workflow', icon: GitBranch },
    { id: 'whatif', label: '🔢 Figures & What-If', icon: Sliders },
    { id: 'views', label: '🧑‍💼 Agent Views', icon: Users },
    { id: 'tracer', label: '🔍 Trace a Claim', icon: Search },
    { id: 'qa', label: '💬 Ask the Desk', icon: MessageSquare }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App Header */}
      <Header
        reports={reports}
        currentReportId={currentReportId}
        onSelectReport={handleSelectReport}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenDbModal={() => setIsDbModalOpen(true)}
        onLoadSample={handleLoadSample}
        onLoadPreset={handleLoadPreset}
        loading={loading}
        connected={connected}
      />

      {/* Main Container */}
      <main style={{ flex: 1, maxWidth: 1600, width: '100%', margin: '0 auto', padding: '24px' }}>
        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid #f43f5e',
            color: '#f43f5e',
            padding: '14px 20px',
            borderRadius: 8,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {initialLoading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>📊</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f8fafc' }}>
              Initializing Earnings Intelligence Desk...
            </div>
            <div style={{ fontSize: '0.85rem', marginTop: 6 }}>
              Connecting to Express API and SQLite database
            </div>
          </div>
        ) : !currentReport ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <FileText size={48} color="#38bdf8" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>
              No Earnings Reports Found in Database
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: 500, margin: '0 auto 20px', fontSize: '0.9rem' }}>
              Load the pre-packaged Acme Technologies Q3/Q2 sample or paste a new report to run the multi-agent analysis.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={handleLoadSample} className="btn btn-primary">
                Load Acme Technologies Sample
              </button>
              <button onClick={() => setIsNewModalOpen(true)} className="btn btn-secondary">
                Upload or Paste Report
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Top Metrics Cards */}
            <MetricsBanner report={currentReport} />

            {/* Navigation Tabs Bar */}
            <div style={{
              display: 'flex',
              gap: 8,
              borderBottom: '1px solid #1e293b',
              marginBottom: 24,
              overflowX: 'auto',
              paddingBottom: 4
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
                      padding: '10px 18px',
                      borderRadius: '8px 8px 0 0',
                      border: 'none',
                      background: isActive ? '#1e293b' : 'transparent',
                      color: isActive ? '#38bdf8' : '#94a3b8',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.9rem',
                      borderBottom: isActive ? '2px solid #38bdf8' : '2px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
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
          </>
        )}
      </main>

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

