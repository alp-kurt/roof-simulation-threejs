import React, { useMemo } from 'react';
import './App.css';
import { TrussPreview } from './Truss.Preview';
import { generateDoubleHoweTruss, Member } from './ITrussSpecification';

function App() {

  const [trussWidth, setTrussWidth] = React.useState(20);
  const [pitch, setPitch] = React.useState(17);
  const [maxVerticalMemberSpacing, setMaxVerticalMemberSpacing] = React.useState(1.5);

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
        <TrussPreview members={trussMembers} />
      </header>
    </div>
  );
}

export default App;
