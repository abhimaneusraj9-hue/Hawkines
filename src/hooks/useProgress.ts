import { useState, useCallback } from 'react';
import { getProgress, saveProgress, GameProgress, LevelProgress } from '../utils/storage';
import { calculateStars, calculateXP, getPlayerLevel } from '../utils/scoring';

export function useProgress() {
  const [progress, setProgress] = useState<GameProgress>(getProgress());

  const refresh = useCallback(() => setProgress(getProgress()), []);

  const saveLevelResult = useCallback((
    levelId: number, score: number, maxScore: number, baseXP: number
  ) => {
    const cur = getProgress();
    const stars = calculateStars(score, maxScore);
    const xpEarned = calculateXP(score, maxScore, baseXP);
    const prev = cur.levelProgress[levelId];
    const isFirstCompletion = !prev?.completed;

    const levelData: LevelProgress = {
      levelId, completed: true,
      score: Math.max(score, prev?.score ?? 0),
      maxScore,
      stars: Math.max(stars, prev?.stars ?? 0),
      xpEarned: Math.max(xpEarned, prev?.xpEarned ?? 0),
      completedAt: new Date().toISOString(),
      attempts: (prev?.attempts ?? 0) + 1,
    };

    const addedXP = isFirstCompletion ? xpEarned : 0;
    const newTotalXP = cur.totalXP + addedXP;
    const newUnlocked = cur.unlockedLevels.includes(levelId + 1)
      ? cur.unlockedLevels
      : [...cur.unlockedLevels, levelId + 1];

    const updated: GameProgress = {
      ...cur,
      totalXP: newTotalXP,
      currentLevel: getPlayerLevel(newTotalXP),
      levelProgress: { ...cur.levelProgress, [levelId]: levelData },
      unlockedLevels: newUnlocked,
      totalScore: cur.totalScore + score,
      missionsCompleted: cur.missionsCompleted + (isFirstCompletion ? 1 : 0),
      lastActivity: new Date().toISOString(),
    };
    saveProgress(updated);
    setProgress(updated);
    return { stars, xpEarned: addedXP };
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    const cur = getProgress();
    if (cur.unlockedBadges.includes(badgeId)) return;
    const updated = { ...cur, unlockedBadges: [...cur.unlockedBadges, badgeId] };
    saveProgress(updated);
    setProgress(updated);
  }, []);

  const incrementMiniGames = useCallback(() => {
    const cur = getProgress();
    const updated = { ...cur, miniGamesPlayed: cur.miniGamesPlayed + 1, lastActivity: new Date().toISOString() };
    saveProgress(updated);
    setProgress(updated);
  }, []);

  return { progress, saveLevelResult, unlockBadge, incrementMiniGames, refresh };
}
