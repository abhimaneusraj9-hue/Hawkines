import { useState, useCallback } from 'react';
import { getSettings, saveSettings, GameSettings } from '../utils/storage';

export function useSettings() {
  const [settings, setSettings] = useState<GameSettings>(getSettings());

  const update = useCallback((patch: Partial<GameSettings>) => {
    const next = { ...getSettings(), ...patch };
    saveSettings(next);
    setSettings(next);
  }, []);

  return { settings, update };
}
