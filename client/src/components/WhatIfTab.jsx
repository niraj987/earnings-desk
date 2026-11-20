import React, { useState, useEffect } from 'react';
import { Sliders, RotateCcw, Play, Check, Zap, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function WhatIfTab({ report, onRunWhatIf, onResetFigures, loading }) {
  if (!report) return null;

  const [figures, setFigures] = useState(
    (report.figures || []).map(f => ({ ...f }))
  );
  const [scenarioName, setScenarioName] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFigures((report.figures || []).map(f => ({ ...f })));
  }, [report.figures]);

  const handleValueChange = (id, newVal) => {
    setFigures(prev =>
      prev.map(f => (f.id === id ? { ...f, value: Number(newVal) } : f))
    );
  };

  const applyPreset = (presetType) => {
    if (presetType === 'stress') {
      // Stress test: decrease revenue guidance, double debt
      setFigures(prev => prev.map(f => {
        if (f.key === 'guidance_rev_low') return { ...f, value: Math.round(f.value * 0.9) };
        if (f.key === 'guidance_rev_high') return { ...f, value: Math.round(f.value * 0.9) };
        if (f.key === 'debt') return { ...f, value: Math.round(f.value * 1.6) };
        if (f.key === 'operating_margin') return { ...f, value: Math.max(1, Number((f.value - 3).toFixed(1))) };
        return f;
      }));
      setScenarioName('Bear Case: Reduced Guidance & Elevated Debt');
    } else if (presetType === 'bull') {
      // Bull case: boost guidance, increase cash
      setFigures(prev => prev.map(f => {
        if (f.key === 'guidance_rev_low') return { ...f, value: Math.round(f.value * 1.1) };
        if (f.key === 'guidance_rev_high') return { ...f, value: Math.round(f.value * 1.12) };
        if (f.key === 'cash') return { ...f, value: Math.round(f.value * 1.3) };
        if (f.key === 'operating_margin') return { ...f, value: Number((f.value + 2.5).toFixed(1)) };
        return f;
      }));
      setScenarioName('Bull Case: Accelerated Expansion & Margin Lift');
    }
  };

  const handleRunSimulation = () => {
    onRunWhatIf(figures, scenarioName);
    if (scenarioName.trim()) {
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setScenarioName('');
      }, 2500);
    }
  };

  const scenarios = report.scenarios || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Intro Box */}
      <div className="glass-panel tile-interactive tile-gold" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sliders size={24} color="#fbbf24" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Interactive What-If Sensitivity Simulator
            </h3>
          </div>

          {/* Quick preset stress testing buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => applyPreset('stress')}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: 'rgba(244, 63, 94, 0.45)', color: '#fb7185' }}
            >
              <TrendingDown size={14} />
              <span>Stress Test (Bear Case)</span>
            </button>
            <button
              onClick={() => applyPreset('bull')}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: 'rgba(251, 191, 36, 0.45)', color: '#fbbf24' }}
            >
              <TrendingUp size={14} />
              <span>Expansion (Bull Case)</span>
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
          Modify extracted inputs below to observe how the multi-agent system responds in real time.
          All 4 analyst agents will re-evaluate their mathematical formulas, re-rate their stances, and generate a new synthesized note.
        </p>

        {/* Action bar */}
        <div style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Scenario name (e.g. 'Guidance Cut 10%')"
              value={scenarioName}
              onChange={e => setScenarioName(e.target.value)}
              style={{
                background: 'rgba(9, 13, 28, 0.85)',
                color: '#ffffff',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                borderRadius: 8,
                padding: '10px 16px',
                fontSize: '0.88rem',
                minWidth: 280,
                outline: 'none',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
              }}
            />
            <button
              onClick={handleRunSimulation}
              disabled={loading}
              className="btn btn-purple btn-sm"
            >
              <Play size={14} />
              <span>{loading ? 'Recalculating...' : 'Re-run Analysts with Edited Figures'}</span>
            </button>
            {saveSuccess && (
              <span style={{ fontSize: '0.82rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700 }}>
                <Check size={15} /> Scenario saved to SQLite!
              </span>
            )}
          </div>

          <button
            onClick={onResetFigures}
            className="btn btn-silver btn-sm"
          >
            <RotateCcw size={14} />
            <span>Reset to Original Facts</span>
          </button>
        </div>
      </div>

      {/* Editable Figures Grid Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(168, 85, 247, 0.25)' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
            Extracted Figure Inputs (Live Editable)
          </h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="desk-table">
            <thead>
              <tr>
                <th style={{ width: 85 }}>ID</th>
                <th style={{ width: 220 }}>Metric</th>
                <th style={{ width: 200 }}>Value (Edit Live)</th>
                <th style={{ width: 100 }}>Unit</th>
                <th>Source Sentence from Press Release</th>
              </tr>
            </thead>
            <tbody>
              {figures.map(f => (
                <tr key={f.id}>
                  <td>
                    <span className="ref-pill">{f.id}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#ffffff' }}>{f.label}</td>
                  <td>
                    <input
                      type="number"
                      step="any"
                      value={f.value}
                      onChange={e => handleValueChange(f.id, e.target.value)}
                      style={{
                        background: 'rgba(9, 13, 28, 0.9)',
                        color: '#fbbf24',
                        fontWeight: 800,
                        border: '1px solid rgba(251, 191, 36, 0.4)',
                        borderRadius: 8,
                        padding: '8px 12px',
                        width: '100%',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxShadow: '0 0 10px rgba(251, 191, 36, 0.15)'
                      }}
                    />
                  </td>
                  <td style={{ color: '#cbd5e1' }}>{f.unit}</td>
                  <td style={{ fontSize: '0.82rem', color: '#cbd5e1', fontStyle: 'italic' }}>
                    {f.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved Scenarios in SQLite */}
      {scenarios.length > 0 && (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(168, 85, 247, 0.25)' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
              Scenario History in SQLite ({scenarios.length})
            </h4>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="desk-table">
              <thead>
                <tr>
                  <th>Scenario Name</th>
                  <th>Verdict</th>
                  <th>Coverage</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700, color: '#ffffff' }}>{s.name}</td>
                    <td>
                      <span className={`badge ${s.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : s.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-gold'}`}>
                        {s.verdict}
                      </span>
                    </td>
                    <td style={{ color: '#34d399', fontWeight: 800 }}>{s.coverage}%</td>
                    <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                      {new Date(s.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
