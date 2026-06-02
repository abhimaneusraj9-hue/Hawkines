// This authentication system is for prototype/demo purposes only.
// In production, use secure authentication such as Supabase Auth, Firebase Auth,
// Auth0, or a custom backend with encrypted passwords and JWT/session handling.

const DEMO_EMAIL = 'student@cybersmart.com';
const DEMO_PASSWORD = 'Cyber123!';
const AUTH_KEY = 'cybersmart_auth';

export const DEMO_USER = {
  id: 'demo-user-1',
  name: 'Student Player',
  email: 'student@cybersmart.com',
  role: 'Cyber Learner',
  avatar: '🎓',
};

export function login(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const session = { user: DEMO_USER, loggedInAt: new Date().toISOString() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function getUser() {
  return getSession()?.user ?? null;
}
