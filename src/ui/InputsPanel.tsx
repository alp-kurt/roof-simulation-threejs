import React from 'react';
import { spanPresets } from './presets';
import { materialPresets } from '../render/palette';

interface InputsPanelProps {
  trussWidth: number;
  pitch: number;
  maxVerticalMemberSpacing: number;
  memberSize: number;
  materialPreset: keyof typeof materialPresets;
  onWidthChange: (value: number) => void;
  onPitchChange: (value: number) => void;
  onSpacingChange: (value: number) => void;
  onMemberSizeChange: (value: number) => void;
  onMaterialChange: (value: keyof typeof materialPresets) => void;
  onPresetApply: (preset: (typeof spanPresets)[number]) => void;
}

export const InputsPanel = ({
  trussWidth,
  pitch,
  maxVerticalMemberSpacing,
  memberSize,
  materialPreset,
  onWidthChange,
  onPitchChange,
  onSpacingChange,
  onMemberSizeChange,
  onMaterialChange,
  onPresetApply,
}: InputsPanelProps) => (
  <section className="Controls-panel">
    <div className="Panel-header">
      <h2>Inputs</h2>
      <span>Architect Controls</span>
    </div>
    <div className="Control-row">
      <label htmlFor="preset">
        Span Preset (quick start)
        <span
          className="Help"
          data-help="Apply a vetted span, pitch, and spacing bundle to jump-start the layout."
        >
          ?
        </span>
      </label>
      <select
        id="preset"
        value=""
        onChange={(e) => {
          const preset = spanPresets.find((item) => item.label === e.target.value);
          if (!preset) return;
          onPresetApply(preset);
        }}
      >
        <option value="" disabled>
          Select preset
        </option>
        {spanPresets.map((preset) => (
          <option key={preset.label} value={preset.label}>
            {preset.label}
          </option>
        ))}
      </select>
    </div>
    <div className="Control-row">
      <label htmlFor="width">
        Total Span Width (meters)
        <span className="Help" data-help="Overall horizontal distance from left support to right support.">
          ?
        </span>
      </label>
      <input
        id="width"
        type="number"
        value={trussWidth}
        onChange={(e) => onWidthChange(Number(e.target.value))}
      />
    </div>
    <div className="Control-row">
      <label htmlFor="pitch">
        Roof Pitch Angle (degrees)
        <span className="Help" data-help="Angle from horizontal to the top chord; controls ridge height.">
          ?
        </span>
      </label>
      <input
        id="pitch"
        type="number"
        value={pitch}
        onChange={(e) => onPitchChange(Number(e.target.value))}
      />
    </div>
    <div className="Control-row">
      <label htmlFor="spacing">
        Max Vertical Spacing (meters)
        <span className="Help" data-help="Largest allowed gap between vertical members; sets panel count.">
          ?
        </span>
      </label>
      <input
        id="spacing"
        type="number"
        value={maxVerticalMemberSpacing}
        onChange={(e) => onSpacingChange(Number(e.target.value))}
      />
    </div>
    <div className="Control-row">
      <label htmlFor="memberSize">
        Member Size (square section, meters)
        <span className="Help" data-help="Visual thickness for each member in the 3D preview.">
          ?
        </span>
      </label>
      <input
        id="memberSize"
        type="number"
        value={memberSize}
        onChange={(e) => onMemberSizeChange(Number(e.target.value))}
      />
    </div>
    <div className="Control-row">
      <label htmlFor="material">
        Finish Palette
        <span className="Help" data-help="Color scheme to distinguish chord and web members quickly.">
          ?
        </span>
      </label>
      <select
        id="material"
        value={materialPreset}
        onChange={(e) => onMaterialChange(e.target.value as keyof typeof materialPresets)}
      >
        {Object.keys(materialPresets).map((preset) => (
          <option key={preset} value={preset}>
            {preset}
          </option>
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
        <strong>{pitch} deg</strong>
      </div>
    </div>
  </section>
);
