import React from 'react';
import { materialPresets } from '../render/palette';

interface InputsPanelProps {
  trussWidth: number;
  pitch: number;
  maxVerticalMemberSpacing: number;
  memberSize: number;
  materialPreset: keyof typeof materialPresets;
  spanPresets: { label: string; width: number; pitch: number; spacing: number }[];
  panelCount: number;
  ridgeHeight: number;
  onReset: () => void;
  onWidthChange: (value: number) => void;
  onPitchChange: (value: number) => void;
  onSpacingChange: (value: number) => void;
  onMemberSizeChange: (value: number) => void;
  onMaterialChange: (value: keyof typeof materialPresets) => void;
  onPresetApply: (preset: { label: string; width: number; pitch: number; spacing: number }) => void;
}

export const InputsPanel = ({
  trussWidth,
  pitch,
  maxVerticalMemberSpacing,
  memberSize,
  materialPreset,
  spanPresets,
  panelCount,
  ridgeHeight,
  onReset,
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
          id="help-preset"
          className="Help"
          data-help="Apply a vetted span, pitch, and spacing bundle to jump-start the layout."
        >
          ?
        </span>
      </label>
      <select
        id="preset"
        aria-label="Span preset"
        aria-describedby="help-preset"
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
            {preset.label} · {preset.width}m / {preset.pitch}°
          </option>
        ))}
      </select>
    </div>
    <div className="Control-group">
      <h3>Geometry</h3>
      <div className="Control-row">
      <label htmlFor="width">
        Total Span Width (meters)
        <span
          id="help-width"
          className="Help"
          data-help="Overall horizontal distance from left support to right support."
        >
          ?
        </span>
      </label>
        <div className="Control-input">
          <input
            id="width"
            type="number"
            aria-label="Total span width in meters"
            aria-describedby="help-width"
            min={4}
            max={60}
            step={0.5}
            value={trussWidth}
            onChange={(e) => onWidthChange(Number(e.target.value))}
          />
          <span className="Unit">m</span>
        </div>
      </div>
      <div className="Control-row">
      <label htmlFor="pitch">
        Roof Pitch Angle (degrees)
        <span
          id="help-pitch"
          className="Help"
          data-help="Angle from horizontal to the top chord; controls ridge height."
        >
          ?
        </span>
      </label>
        <div className="Control-input">
          <input
            id="pitch"
            type="number"
            aria-label="Roof pitch angle in degrees"
            aria-describedby="help-pitch"
            min={5}
            max={45}
            step={0.5}
            value={pitch}
            onChange={(e) => onPitchChange(Number(e.target.value))}
          />
          <span className="Unit">°</span>
        </div>
      </div>
      <div className="Control-row">
      <label htmlFor="spacing">
        Max Vertical Spacing (meters)
        <span
          id="help-spacing"
          className="Help"
          data-help="Largest allowed gap between vertical members; sets panel count."
        >
          ?
        </span>
      </label>
        <div className="Control-input">
          <input
            id="spacing"
            type="number"
            aria-label="Maximum vertical spacing in meters"
            aria-describedby="help-spacing"
            min={0.5}
            max={4}
            step={0.1}
            value={maxVerticalMemberSpacing}
            onChange={(e) => onSpacingChange(Number(e.target.value))}
          />
          <span className="Unit">m</span>
        </div>
      </div>
    </div>
    <div className="Control-group">
      <h3>Appearance</h3>
      <div className="Control-row">
      <label htmlFor="memberSize">
        Member Size (square section, centimeters)
        <span
          id="help-member-size"
          className="Help"
          data-help="Visual thickness for each member in the 3D preview."
        >
          ?
        </span>
      </label>
        <div className="Control-input">
          <input
            id="memberSize"
            type="number"
            aria-label="Member size in centimeters"
            aria-describedby="help-member-size"
            min={5}
            max={60}
            step={1}
            value={memberSize}
            onChange={(e) => onMemberSizeChange(Number(e.target.value))}
        />
        <span className="Unit">cm</span>
      </div>
    </div>
      <div className="Control-row">
      <label htmlFor="material">
        Finish Palette
        <span
          id="help-material"
          className="Help"
          data-help="Color scheme to distinguish chord and web members quickly."
        >
          ?
        </span>
      </label>
      <select
        id="material"
        aria-label="Material palette"
        aria-describedby="help-material"
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
      <div className="Metric">
        <span>Panels</span>
        <strong>{panelCount}</strong>
      </div>
      <div className="Metric">
        <span>Ridge height</span>
        <strong>{ridgeHeight.toFixed(2)} m</strong>
      </div>
    </div>
    <div className="Panel-actions">
      <button type="button" aria-label="Reset inputs to defaults" onClick={onReset}>
        Reset to defaults
      </button>
    </div>
  </section>
);
