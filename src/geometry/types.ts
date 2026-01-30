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
