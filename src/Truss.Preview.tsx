import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { Member } from "./ITrussSpecification";

const memberColors: Record<Member["type"], string> = {
  bottom: "yellow",
  top: "red",
  vertical: "green",
  diagonal: "blue",
};

export function TrussPreview({ members }: { members: Member[] }) {
  return (
    <Canvas style={{height: 500}}>
        <OrbitControls />
        {members.map((member) => (
            <Line
            key={`${member.type}-${member.start.x},${member.start.y},${member.end.x},${member.end.y}`}
            points={[
              [member.start.x, member.start.y, member.start.z],
              [member.end.x, member.end.y, member.end.z],
            ]}
            color={memberColors[member.type]}
        />
        ))}
    </Canvas>
  );
}
