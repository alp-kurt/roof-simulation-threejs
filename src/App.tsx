import React, { useMemo } from 'react';
import './App.css';
import { TrussPreview } from './Truss.Preview';
import { generateDoubleHoweTruss, Member } from './ITrussSpecification';
import { materialPresets } from './render/palette';
import { InputsPanel } from './ui/InputsPanel';
import { defaultTrussState, spanPresets, rendererDefaults } from './config';
import { normalizeInputs } from './geometry/validation';

function App() {

  const [trussWidth, setTrussWidth] = React.useState(defaultTrussState.width);
  const [pitch, setPitch] = React.useState(defaultTrussState.pitchDeg);
  const [maxVerticalMemberSpacing, setMaxVerticalMemberSpacing] = React.useState(defaultTrussState.maxVerticalSpacing);
  const [memberSize, setMemberSize] = React.useState(defaultTrussState.memberSize);
  const [materialPreset, setMaterialPreset] = React.useState<keyof typeof materialPresets>(
    defaultTrussState.materialPreset
  );

  const normalized = useMemo(
    () =>
      normalizeInputs({
        width: trussWidth,
        pitchDeg: pitch,
        maxVerticalSpacing: maxVerticalMemberSpacing,
      }),
    [trussWidth, pitch, maxVerticalMemberSpacing]
  );
  const trussMembers: Member[] = useMemo(
    () =>
      generateDoubleHoweTruss({
        width: normalized.width,
        pitchDeg: normalized.pitchDeg,
        maxVerticalSpacing: normalized.maxVerticalSpacing,
      }),
    [normalized]
  );
  const panelCount = Math.max(1, Math.ceil(normalized.width / normalized.maxVerticalSpacing));
  const ridgeHeight = (normalized.width / 2) * Math.tan((normalized.pitchDeg * Math.PI) / 180);

  const memberSizeMeters = Number.isFinite(memberSize) ? memberSize / 100 : defaultTrussState.memberSize / 100;

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
          <InputsPanel
            trussWidth={trussWidth}
            pitch={pitch}
            maxVerticalMemberSpacing={maxVerticalMemberSpacing}
            memberSize={memberSize}
            materialPreset={materialPreset}
            spanPresets={spanPresets}
            panelCount={panelCount}
            ridgeHeight={ridgeHeight}
            onReset={() => {
              setTrussWidth(defaultTrussState.width);
              setPitch(defaultTrussState.pitchDeg);
              setMaxVerticalMemberSpacing(defaultTrussState.maxVerticalSpacing);
              setMemberSize(defaultTrussState.memberSize);
              setMaterialPreset(defaultTrussState.materialPreset);
            }}
            onWidthChange={setTrussWidth}
            onPitchChange={setPitch}
            onSpacingChange={setMaxVerticalMemberSpacing}
            onMemberSizeChange={setMemberSize}
            onMaterialChange={setMaterialPreset}
            onPresetApply={(preset) => {
              setTrussWidth(preset.width);
              setPitch(preset.pitch);
              setMaxVerticalMemberSpacing(preset.spacing);
            }}
          />
          <section className="Preview-panel">
            <div className="Panel-header">
              <h2>Truss Preview</h2>
              <span>Three.js viewport</span>
            </div>
            <div className="Preview-frame">
              <TrussPreview
                members={trussMembers}
                memberSize={memberSizeMeters}
                palette={materialPresets[materialPreset]}
                rendererConfig={rendererDefaults}
              />
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}

export default App;
