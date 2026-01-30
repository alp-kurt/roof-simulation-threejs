export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const normalizeInputs = ({
  width,
  pitchDeg,
  maxVerticalSpacing,
}: {
  width: number;
  pitchDeg: number;
  maxVerticalSpacing: number;
}) => {
  const safeWidth = Math.max(0.1, width);
  const safePitch = clamp(pitchDeg, 1, 89);
  const safeSpacing = Math.max(0.1, maxVerticalSpacing);

  return {
    width: safeWidth,
    pitchDeg: safePitch,
    maxVerticalSpacing: safeSpacing,
  };
};
