export type MemberType = 'bottom' | 'top' | 'vertical' | 'diagonal';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface TrussInputs {
  width: number;
  pitchDeg: number;
  maxVerticalSpacing: number;
}

export interface Member {
  start: Vec3;
  end: Vec3;
  type: MemberType;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const generateDoubleHoweTruss = ({
  width,
  pitchDeg,
  maxVerticalSpacing,
}: TrussInputs): Member[] => {
  const safeWidth = Math.max(0.1, width);
  const safePitch = clamp(pitchDeg, 1, 89);
  const safeSpacing = Math.max(0.1, maxVerticalSpacing);

  const pitchRadians = (safePitch * Math.PI) / 180;
  const half = safeWidth / 2;
  const height = half * Math.tan(pitchRadians);

  let panelCount = Math.max(1, Math.ceil(safeWidth / safeSpacing));
  if (panelCount % 2 !== 0) panelCount += 1;
  const dx = safeWidth / panelCount;

  const bottomNodes: Vec3[] = [];
  const topNodes: Vec3[] = [];

  for (let i = 0; i <= panelCount; i++) {
    const x = -half + i * dx;
    const t = Math.abs(x) / half;
    const yTop = height * (1 - t);
    bottomNodes.push({ x, y: 0, z: 0 });
    topNodes.push({ x, y: yTop, z: 0 });
  }

  const members: Member[] = [];

  for (let i = 0; i < panelCount; i++) {
    members.push({
      start: bottomNodes[i],
      end: bottomNodes[i + 1],
      type: 'bottom',
    });
  }

  for (let i = 0; i < panelCount; i++) {
    members.push({
      start: topNodes[i],
      end: topNodes[i + 1],
      type: 'top',
    });
  }

  for (let i = 0; i <= panelCount; i++) {
    members.push({
      start: bottomNodes[i],
      end: topNodes[i],
      type: 'vertical',
    });
  }

  const mid = panelCount / 2;
  for (let i = 0; i < panelCount; i++) {
    if (i < mid) {
      members.push({
        start: bottomNodes[i],
        end: topNodes[i + 1],
        type: 'diagonal',
      });
    } else {
      members.push({
        start: bottomNodes[i + 1],
        end: topNodes[i],
        type: 'diagonal',
      });
    }
  }

  return members;
};
