# Double-Howe Roof Truss Designer

A React + Three.js tool for generating a **parametric Double‑Howe roof truss**.
It produces a deterministic list of truss members and renders them in 3D so you
can explore proportions, spacing, and member sizing.

## Features

- Parametric geometry generator for Double‑Howe trusses
- Origin-centered, symmetric layout with deterministic output
- Adjustable span, pitch, vertical spacing, and member size
- Box‑section rendering with material palette presets
- Viewport helpers (recenter, elevation, grid/axes toggles, zoom limits)

## Core Inputs

- **Total Span Width (m)**: overall horizontal distance between supports
- **Roof Pitch (deg)**: angle from horizontal to top chord
- **Max Vertical Spacing (m)**: maximum distance between vertical members
- **Member Size (m)**: square section size for visualization

## Geometry Summary

- Bottom chord midpoint is fixed at the origin `(0, 0, 0)`
- Ridge height is computed as `(width / 2) × tan(pitch)`
- Panelization uses `ceil(width / maxVerticalSpacing)`
- Even panel count is enforced to keep a center node and avoid ridge crossing
- Double‑Howe diagonal pattern mirrors about `x = 0`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Notes

- This tool is **geometry only**—no structural analysis or physics.
- All coordinates are generated in the X–Y plane (Z = 0).

## Project Guidance

- Design brief: `INSTRUCTIONS.md`
- Delivery plan: `ROADMAP.md`
- Agent roles: `AGENTS.md`

## Author

Alp Kurt
