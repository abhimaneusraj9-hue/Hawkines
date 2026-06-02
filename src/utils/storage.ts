const PROGRESS_KEY = 'cybersmart_progress';
const SETTINGS_KEY = 'cybersmart_settings';

export interface LevelProgress {
  levelId: number;
  completed: boolean;
  score: number;
  maxScore: number;
  stars: number;
  xpEarned: number;
  completedAt: string;
  attempts: number;
}

export interface GameProgress {
  totalXP: number;
  currentLevel: number;
  levelProgress: Record<number, LevelProgress>;
  unlockedLevels: number[];
  unlockedBadges: string[];
  totalScore: number;
  missionsCompleted: number;
  miniGamesPlayed: number;
  lastActivity: string;
}

export const defaultProgress: GameProgress = {
  totalXP: 0,
  currentLevel: 1,
  levelProgress: {},
  unlockedLevels: [1],
  unlockedBadges: ['first-login'],
  totalScore: 0,
  missionsCompleted: 0,
  miniGamesPlayed: 0,
  lastActivity: new Date().toISOString(),
};

export function getProgress(): GameProgress {
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) return { ...defaultProgress };
  try { return { ...defaultProgress, ...JSON.parse(raw) }; }
  catch { return { ...defaultProgress }; }
}

export function saveProgress(p: GameProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

export function resetProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
}

export interface GameSettings {
  sound: boolean;
  music: boolean;
  accessibility: boolean;
  largeText: boolean;
  colorFriendly: boolean;
}

export const defaultSettings: GameSettings = {
  sound: true,
  music: true,
  accessibility: false,
  largeText: false,
  colorFriendly: false,
};

export function getSettings(): GameSettings {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return { ...defaultSettings };
  try { return { ...defaultSettings, ...JSON.parse(raw) }; }
  catch { return { ...defaultSettings }; }
}

export function saveSettings(s: GameSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}
