import React, { useMemo } from 'react';
import './App.css';
import { TrussPreview } from './Truss.Preview';
import { generateDoubleHoweTruss, Member } from './ITrussSpecification';
import { materialPresets } from './render/palette';
import { InputsPanel } from './ui/InputsPanel';

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
          <InputsPanel
            trussWidth={trussWidth}
            pitch={pitch}
            maxVerticalMemberSpacing={maxVerticalMemberSpacing}
            memberSize={memberSize}
            materialPreset={materialPreset}
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
