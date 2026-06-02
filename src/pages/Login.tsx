import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { login } from '../utils/auth';

// This authentication system is for prototype/demo purposes only.
// In production, use Supabase Auth, Firebase Auth, Auth0, or a custom
// backend with encrypted passwords and JWT/session handling.

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    if (login(email, password)) {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 800);
    } else {
      setError('Invalid email or password. Please use the test login credentials shown below.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 flex items-center justify-center p-4">
      {/* Background circles */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-teal-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-30 blur-3xl" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl shadow-xl mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-800">
            Cyber<span className="text-teal-500">Smart</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Learn. Detect. Defend.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Sign in to your account</h2>

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-5 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Login successful! Redirecting…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@cybersmart.com"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:outline-none transition-colors text-sm"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 accent-teal-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-teal-500 font-medium hover:underline">Forgot password?</button>
            </div>
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold text-sm hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Demo credentials */}
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs font-bold text-amber-700 mb-2">🔑 Demo Credentials (for testing)</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-600">Email:</span>
              <button onClick={() => setEmail('student@cybersmart.com')} className="text-xs font-mono font-bold text-amber-800 hover:underline">student@cybersmart.com</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-600">Password:</span>
              <button onClick={() => setPassword('Cyber123!')} className="text-xs font-mono font-bold text-amber-800 hover:underline">Cyber123!</button>
            </div>
          </div>
          <p className="text-xs text-amber-500 mt-2 italic">Click the credentials to auto-fill.</p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">For demo/prototype use only. Not a real authentication system.</p>
      </div>
    </div>
  );
}
