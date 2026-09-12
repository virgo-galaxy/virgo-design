export function getCircularFamilyOffset(
  familyIndex: number,
  anchorIndex: number,
  familyCount: number,
): number {
  let offset = familyIndex - anchorIndex;
  const half = familyCount / 2;

  if (offset > half) {
    offset -= familyCount;
  }

  if (offset < -half) {
    offset += familyCount;
  }

  return offset;
}

export function applyDistributionCurve(offset: number, familyCount: number, curve: number): number {
  if (offset === 0) {
    return 0;
  }

  const maxDistance = familyCount / 2;
  const normalizedDistance = Math.min(1, Math.abs(offset) / maxDistance);
  const curvedDistance = normalizedDistance ** curve;

  return Math.sign(offset) * curvedDistance * maxDistance;
}
