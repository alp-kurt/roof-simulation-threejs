import React, { useMemo } from 'react';
import './App.css';
import { TrussPreview } from './Truss.Preview';
import { generateDoubleHoweTruss, Member } from './ITrussSpecification';

const spanPresets = [
  { label: 'Small', width: 12, pitch: 20, spacing: 1.2 },
  { label: 'Medium', width: 20, pitch: 17, spacing: 1.5 },
  { label: 'Large', width: 30, pitch: 14, spacing: 2.0 },
];

const materialPresets = {
  Steel: {
    bottom: '#f7c948',
    top: '#e74c3c',
    vertical: '#2ecc71',
    diagonal: '#3498db',
  },
  Timber: {
    bottom: '#d8a15d',
    top: '#c17c3a',
    vertical: '#b88652',
    diagonal: '#8e6a3e',
  },
  Concept: {
    bottom: '#f5f5f5',
    top: '#f28cb1',
    vertical: '#9ee6cf',
    diagonal: '#9cb7ff',
  },
} as const;

function App() {

  const [trussWidth, setTrussWidth] = React.useState(20);
  const [pitch, setPitch] = React.useState(17);
  const [maxVerticalMemberSpacing, setMaxVerticalMemberSpacing] = React.useState(1.5);
  const [memberSize, setMemberSize] = React.useState(0.2);
  const [materialPreset, setMaterialPreset] = React.useState<keyof typeof materialPresets>('Steel');

  const trussMembers: Member[] = useMemo(
    () =>
      generateDoubleHoweTruss({
        width: trussWidth,
        pitchDeg: pitch,
        maxVerticalSpacing: maxVerticalMemberSpacing,
      }),
    [trussWidth, pitch, maxVerticalMemberSpacing]
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">
          <div>
            <div className="App-eyebrow">Double-Howe Roof Truss</div>
            <h1>Parametric Roof Truss Designer</h1>
            <p>Adjust proportions and member sizing to visualize the structural rhythm.</p>
          </div>
          <div className="App-badge">Live Geometry</div>
        </div>
        <div className="App-grid">
          <section className="Controls-panel">
            <div className="Panel-header">
              <h2>Inputs</h2>
              <span>Architect Controls</span>
            </div>
            <div className="Control-row">
              <label htmlFor="preset">
                Span Preset (quick start)
                <span className="Help" data-help="Apply a vetted span, pitch, and spacing bundle to jump-start the layout.">?</span>
              </label>
              <select
                id="preset"
                value=""
                onChange={(e) => {
                  const preset = spanPresets.find((item) => item.label === e.target.value);
                  if (!preset) return;
                  setTrussWidth(preset.width);
                  setPitch(preset.pitch);
                  setMaxVerticalMemberSpacing(preset.spacing);
                }}
              >
                <option value="" disabled>Select preset</option>
                {spanPresets.map((preset) => (
                  <option key={preset.label} value={preset.label}>{preset.label}</option>
                ))}
              </select>
            </div>
            <div className="Control-row">
              <label htmlFor="width">
                Total Span Width (meters)
                <span className="Help" data-help="Overall horizontal distance from left support to right support.">?</span>
              </label>
              <input 
                id="width"
                type="number" 
                value={trussWidth} 
                onChange={(e) => setTrussWidth(Number(e.target.value))} 
              />
            </div>
            <div className="Control-row">
              <label htmlFor="pitch">
                Roof Pitch Angle (degrees)
                <span className="Help" data-help="Angle from horizontal to the top chord; controls ridge height.">?</span>
              </label>
              <input 
                id="pitch"
                type="number" 
                value={pitch} 
                onChange={(e) => setPitch(Number(e.target.value))} 
              />
            </div>
            <div className="Control-row">
              <label htmlFor="spacing">
                Max Vertical Spacing (meters)
                <span className="Help" data-help="Largest allowed gap between vertical members; sets panel count.">?</span>
              </label>
              <input 
                id="spacing"
                type="number" 
                value={maxVerticalMemberSpacing} 
                onChange={(e) => setMaxVerticalMemberSpacing(Number(e.target.value))} 
              />
            </div>
            <div className="Control-row">
              <label htmlFor="memberSize">
                Member Size (square section, meters)
                <span className="Help" data-help="Visual thickness for each member in the 3D preview.">?</span>
              </label>
              <input 
                id="memberSize"
                type="number" 
                value={memberSize} 
                onChange={(e) => setMemberSize(Number(e.target.value))} 
              />
            </div>
            <div className="Control-row">
              <label htmlFor="material">
                Finish Palette
                <span className="Help" data-help="Color scheme to distinguish chord and web members quickly.">?</span>
              </label>
              <select
                id="material"
                value={materialPreset}
                onChange={(e) => setMaterialPreset(e.target.value as keyof typeof materialPresets)}
              >
                {Object.keys(materialPresets).map((preset) => (
                  <option key={preset} value={preset}>{preset}</option>
                ))}
              </select>
            </div>
            <div className="Panel-footer">
              <div className="Metric">
                <span>Span</span>
                <strong>{trussWidth} m</strong>
              </div>
              <div className="Metric">
                <span>Pitch</span>
                <strong>{pitch}°</strong>
              </div>
            </div>
          </section>
          <section className="Preview-panel">
            <div className="Panel-header">
              <h2>Truss Preview</h2>
              <span>Three.js viewport</span>
            </div>
            <div className="Preview-frame">
              <TrussPreview
                members={trussMembers}
                memberSize={memberSize}
                palette={materialPresets[materialPreset]}
              />
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}

export default App;
