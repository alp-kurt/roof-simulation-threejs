import { materialPresets } from './render/palette';

export const defaultTrussState = {
  width: 20,
  pitchDeg: 17,
  maxVerticalSpacing: 1.5,
  memberSize: 0.2,
  materialPreset: 'Steel' as keyof typeof materialPresets,
};

export const spanPresets = [
  { label: 'Small', width: 12, pitch: 20, spacing: 1.2 },
  { label: 'Medium', width: 20, pitch: 17, spacing: 1.5 },
  { label: 'Large', width: 30, pitch: 14, spacing: 2.0 },
];

export const rendererDefaults = {
  minDistance: 2,
  maxDistance: 80,
  grid: {
    size: 100,
    divisions: 20,
    color1: '#2a3342',
    color2: '#1f2733',
  },
  axesSize: 5,
  groundColor: '#999999',
  ridgeColor: '#cccccc',
  elevationOffset: 8,
};
