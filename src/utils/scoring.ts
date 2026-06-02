export function calculateStars(score: number, maxScore: number): number {
  const pct = (score / maxScore) * 100;
  if (pct >= 90) return 3;
  if (pct >= 70) return 2;
  if (pct >= 40) return 1;
  return 0;
}

export function calculateXP(score: number, maxScore: number, baseXP: number): number {
  const pct = score / maxScore;
  const bonus = pct >= 0.9 ? 1.5 : pct >= 0.7 ? 1.2 : 1.0;
  return Math.round(baseXP * pct * bonus);
}

export function getPlayerLevel(totalXP: number): number {
  const thresholds = [0, 500, 1200, 2500, 4500, 7000, 10000, 14000, 19000, 25000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (totalXP >= thresholds[i]) return i + 1;
  }
  return 1;
}

export function getXPBracket(totalXP: number): { levelXP: number; nextXP: number; current: number; percentage: number } {
  const thresholds = [0, 500, 1200, 2500, 4500, 7000, 10000, 14000, 19000, 25000];
  const level = getPlayerLevel(totalXP);
  const levelXP = thresholds[level - 1] ?? 0;
  const nextXP = thresholds[level] ?? 25000;
  const current = totalXP - levelXP;
  const span = nextXP - levelXP;
  return { levelXP, nextXP, current, percentage: Math.min((current / span) * 100, 100) };
}
