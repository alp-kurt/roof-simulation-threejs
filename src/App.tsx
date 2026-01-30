import React, { useMemo } from 'react';
import './App.css';
import { TrussPreview } from './Truss.Preview';
import { ITrussSpecification, Point } from './ITrussSpecification';

function App() {

  const [trussWidth, setTrussWidth] = React.useState(20);
  const [pitch, setPitch] = React.useState(17);
  const [maxVerticalMemberSpacing, setMaxVerticalMemberSpacing] = React.useState(1.5);

  const trussSpecification: ITrussSpecification = useMemo(() => {
    const width = Math.max(0.1, trussWidth);
    const spacing = Math.max(0.1, maxVerticalMemberSpacing);
    const pitchRadians = (Math.max(1, pitch) * Math.PI) / 180;

    const half = width / 2;
    const rise = Math.tan(pitchRadians) * half;

    const bottomLeft: Point = { x: -half, y: 0 };
    const bottomRight: Point = { x: half, y: 0 };
    const topLeft: Point = { x: -half, y: 0 };
    const topApex: Point = { x: 0, y: rise };
    const topRight: Point = { x: half, y: 0 };

    const topChords: [Point, Point][] = [
      [topLeft, topApex],
      [topApex, topRight],
    ];

    const bottomChord: [Point, Point] = [bottomLeft, bottomRight];

    const verticalMembers: [Point, Point][] = [];
    const diagonalMembers: [Point, Point][] = [];

    const segments = Math.max(2, Math.ceil(width / spacing));
    const step = width / segments;

    const topYAt = (x: number) => {
      if (x <= 0) return rise * (1 + x / half);
      return rise * (1 - x / half);
    };

    const nodes: Point[] = [];
    for (let i = 0; i <= segments; i++) {
      const x = -half + step * i;
      nodes.push({ x, y: 0 });
      verticalMembers.push([{ x, y: 0 }, { x, y: topYAt(x) }]);
    }

    for (let i = 0; i < segments; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      const topA: Point = { x: a.x, y: topYAt(a.x) };
      const topB: Point = { x: b.x, y: topYAt(b.x) };
      diagonalMembers.push([a, topB]);
      diagonalMembers.push([b, topA]);
    }

    return {
      topChords,
      verticalMembers,
      diagonalMembers,
      bottomChord,
    };
  }, [trussWidth, pitch, maxVerticalMemberSpacing]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{margin: "10px"}}>
            <label>
              Truss Width (m):
              <input 
                type="number" 
                value={trussWidth} 
                onChange={(e) => setTrussWidth(Number(e.target.value))} 
                style={{marginLeft: "10px"}}
              />
            </label>
          </div>
          <div style={{margin: "10px"}}>
            <label>
              Pitch (degrees):
              <input 
                type="number" 
                value={pitch} 
                onChange={(e) => setPitch(Number(e.target.value))} 
                style={{marginLeft: "10px"}}
              />
            </label>
          </div>
          <div style={{margin: "10px"}}>
            <label>
              Max Vertical Member Spacing (m):
              <input 
                type="number" 
                value={maxVerticalMemberSpacing} 
                onChange={(e) => setMaxVerticalMemberSpacing(Number(e.target.value))} 
                style={{marginLeft: "10px"}}
              />
            </label>
          </div>
        </div>
        <TrussPreview trussSpecification={trussSpecification} />
      </header>
    </div>
  );
}

export default App;
