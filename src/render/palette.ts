import { Member } from '../geometry/types';

export type Palette = Record<Member['type'], string>;

export const materialPresets = {
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
