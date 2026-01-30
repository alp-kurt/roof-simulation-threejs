import { Member } from '../geometry/types';

export const getBounds = (members: Member[]) =>
  members.reduce(
    (acc, member) => {
      acc.minX = Math.min(acc.minX, member.start.x, member.end.x);
      acc.maxX = Math.max(acc.maxX, member.start.x, member.end.x);
      acc.maxY = Math.max(acc.maxY, member.start.y, member.end.y);
      return acc;
    },
    { minX: Infinity, maxX: -Infinity, maxY: -Infinity }
  );
