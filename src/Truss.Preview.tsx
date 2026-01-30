import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Member } from "./ITrussSpecification";
import { Palette } from "./render/palette";
import { getBounds } from "./render/bounds";

export function TrussPreview({
  members,
  memberSize,
  palette,
}: {
  members: Member[];
  memberSize: number;
  palette: Palette;
}) {
  const size = Math.max(0.01, memberSize);
  const controlsRef = React.useRef<any>(null);
  const [showGrid, setShowGrid] = React.useState(true);
  const [showAxes, setShowAxes] = React.useState(false);

  const bounds = getBounds(members);
  const ridgeX = 0;
  const ridgeY = bounds.maxY;
  const groundY = -size * 2;
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = bounds.maxY / 2;

  React.useEffect(() => {
    if (!controlsRef.current || !Number.isFinite(centerX) || !Number.isFinite(centerY)) return;
    controlsRef.current.target.set(centerX, centerY, 0);
    controlsRef.current.update();
  }, [centerX, centerY]);

  return (
    <div className="TrussViewport">
      <div className="Viewport-toolbar">
        <button
          type="button"
          onClick={() => {
            if (!controlsRef.current) return;
            controlsRef.current.reset();
            controlsRef.current.target.set(centerX, centerY, 0);
            controlsRef.current.update();
          }}
        >
          Recenter
        </button>
        <button
          type="button"
          onClick={() => {
            if (!controlsRef.current) return;
            controlsRef.current.object.position.set(centerX, bounds.maxY + 8, 0);
            controlsRef.current.target.set(centerX, centerY, 0);
            controlsRef.current.update();
          }}
        >
          Elevation
        </button>
        <button type="button" onClick={() => setShowGrid((prev) => !prev)}>
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
        <button type="button" onClick={() => setShowAxes((prev) => !prev)}>
          {showAxes ? "Hide Axes" : "Show Axes"}
        </button>
      </div>
      <Canvas style={{height: "100%", width: "100%"}}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 10]} intensity={0.8} />
        <OrbitControls ref={controlsRef} minDistance={2} maxDistance={80} />
        {showGrid && <gridHelper args={[100, 20, "#2a3342", "#1f2733"]} />}
        {showAxes && <axesHelper args={[5]} />}
        <group>
          <mesh position={[centerX, groundY, 0]}>
            <boxGeometry args={[Math.max(0.1, bounds.maxX - bounds.minX), size * 0.25, size * 0.25]} />
            <meshStandardMaterial color="#999999" />
          </mesh>
          <mesh position={[ridgeX, ridgeY + size * 0.75, 0]}>
            <boxGeometry args={[size * 0.5, size * 1.5, size * 0.5]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
        </group>
        {members.map((member) => {
          const dx = member.end.x - member.start.x;
          const dy = member.end.y - member.start.y;
          const length = Math.hypot(dx, dy);
          const angle = Math.atan2(dy, dx);
          const midX = (member.start.x + member.end.x) / 2;
          const midY = (member.start.y + member.end.y) / 2;

          return (
            <mesh
              key={`${member.type}-${member.start.x},${member.start.y},${member.end.x},${member.end.y}`}
              position={[midX, midY, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[length, size, size]} />
              <meshStandardMaterial color={palette[member.type]} />
            </mesh>
          );
        })}
      </Canvas>
    </div>
  );
}
