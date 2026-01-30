import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Member } from "./ITrussSpecification";

type Palette = Record<Member["type"], string>;

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
  const bounds = members.reduce(
    (acc, member) => {
      acc.minX = Math.min(acc.minX, member.start.x, member.end.x);
      acc.maxX = Math.max(acc.maxX, member.start.x, member.end.x);
      acc.maxY = Math.max(acc.maxY, member.start.y, member.end.y);
      return acc;
    },
    { minX: Infinity, maxX: -Infinity, maxY: -Infinity }
  );
  const ridgeX = 0;
  const ridgeY = bounds.maxY;
  const groundY = -size * 2;

  return (
    <Canvas style={{height: "100%", width: "100%"}}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 10]} intensity={0.8} />
      <OrbitControls />
      <group>
        <mesh position={[(bounds.minX + bounds.maxX) / 2, groundY, 0]}>
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
  );
}
