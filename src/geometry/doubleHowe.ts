import { Member, TrussInputs, Vec3 } from './types';
import { normalizeInputs } from './validation';

export const generateDoubleHoweTruss = (inputs: TrussInputs): Member[] => {
  const { width, pitchDeg, maxVerticalSpacing } = normalizeInputs(inputs);

  const pitchRadians = (pitchDeg * Math.PI) / 180;
  const half = width / 2;
  const height = half * Math.tan(pitchRadians);

  let panelCount = Math.max(1, Math.ceil(width / maxVerticalSpacing));
  if (panelCount % 2 !== 0) panelCount += 1;
  const dx = width / panelCount;

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
