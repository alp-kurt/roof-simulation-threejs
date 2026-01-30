import { generateDoubleHoweTruss } from './doubleHowe';

const approx = (value: number, target: number, tolerance = 1e-6) =>
  Math.abs(value - target) <= tolerance;

test('bottom chord midpoint at origin', () => {
  const members = generateDoubleHoweTruss({ width: 20, pitchDeg: 20, maxVerticalSpacing: 2 });
  const bottomMembers = members.filter((member) => member.type === 'bottom');
  const minX = Math.min(...bottomMembers.map((member) => member.start.x));
  const maxX = Math.max(...bottomMembers.map((member) => member.end.x));
  const mid = (minX + maxX) / 2;
  expect(approx(mid, 0)).toBe(true);
});

test('ridge height matches pitch', () => {
  const width = 18;
  const pitchDeg = 15;
  const members = generateDoubleHoweTruss({ width, pitchDeg, maxVerticalSpacing: 2 });
  const topMembers = members.filter((member) => member.type === 'top');
  const maxY = Math.max(...topMembers.map((member) => Math.max(member.start.y, member.end.y)));
  const expected = (width / 2) * Math.tan((pitchDeg * Math.PI) / 180);
  expect(approx(maxY, expected)).toBe(true);
});

test('output ordering is deterministic', () => {
  const inputs = { width: 16, pitchDeg: 22, maxVerticalSpacing: 1.6 };
  const first = generateDoubleHoweTruss(inputs);
  const second = generateDoubleHoweTruss(inputs);
  expect(first).toEqual(second);
});
