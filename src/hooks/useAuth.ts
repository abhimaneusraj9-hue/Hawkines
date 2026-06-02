import { useState, useEffect } from 'react';
import { getUser, isAuthenticated } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState(getUser());
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const sync = () => {
      setUser(getUser());
      setAuthenticated(isAuthenticated());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return { user, authenticated };
}
