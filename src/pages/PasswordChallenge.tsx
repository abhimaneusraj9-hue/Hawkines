import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useProgress } from '../hooks/useProgress';
import { Eye, EyeOff, CheckCircle2, XCircle, Shield } from 'lucide-react';

// Passwords entered here are never stored anywhere.
// This feature is only used for educational demonstration purposes.

interface Check { label: string; passed: boolean; }

function analysePassword(pw: string): { checks: Check[]; strength: number; label: string; color: string; barColor: string } {
  const checks: Check[] = [
    { label: 'At least 12 characters',          passed: pw.length >= 12     },
    { label: 'Contains uppercase letter (A-Z)',  passed: /[A-Z]/.test(pw)    },
    { label: 'Contains lowercase letter (a-z)',  passed: /[a-z]/.test(pw)    },
    { label: 'Contains a number (0-9)',          passed: /\d/.test(pw)       },
    { label: 'Contains special character (!@#)', passed: /[^a-zA-Z0-9]/.test(pw) },
    { label: 'No obvious personal info',         passed: pw.length > 0 && !/^(password|123456|qwerty|admin)/i.test(pw) },
  ];
  const passed = checks.filter(c => c.passed).length;
  if (passed <= 1) return { checks, strength: passed, label: 'Very Weak',  color: 'text-red-600',    barColor: 'bg-red-500'    };
  if (passed <= 2) return { checks, strength: passed, label: 'Weak',       color: 'text-orange-600', barColor: 'bg-orange-500' };
  if (passed <= 3) return { checks, strength: passed, label: 'Fair',       color: 'text-yellow-600', barColor: 'bg-yellow-500' };
  if (passed <= 4) return { checks, strength: passed, label: 'Good',       color: 'text-blue-600',   barColor: 'bg-blue-500'   };
  if (passed <= 5) return { checks, strength: passed, label: 'Strong',     color: 'text-teal-600',   barColor: 'bg-teal-500'   };
  return { checks, strength: passed, label: 'Very Strong', color: 'text-green-600', barColor: 'bg-green-500' };
}

export default function PasswordChallenge() {
  const navigate = useNavigate();
  const { saveLevelResult, unlockBadge, incrementMiniGames } = useProgress();
  const [password,  setPassword]  = useState('');
  const [showPw,    setShowPw]    = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const analysis = useMemo(() => analysePassword(password), [password]);

  const handleSubmit = () => {
    if (password.length === 0) return;
    setSubmitted(true);
    incrementMiniGames();
    const score = Math.round((analysis.strength / 6) * 100);
    if (analysis.strength === 6) unlockBadge('password-master');
    saveLevelResult(2, score, 100, 120);
  };

  const examples = [
    { pw: 'P@ssw0rd', label: 'Weak example (common pattern)' },
    { pw: 'T#9mK$vL2@pQ!', label: 'Strong example (random mix)' },
    { pw: 'correct-horse-battery-staple', label: 'Passphrase example (4 random words)' },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center text-lg">🔐</div>
          <div>
            <p className="text-xs text-gray-500">Interactive Challenge</p>
            <h1 className="font-bold text-gray-800">Password Safety</h1>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <span className="font-bold">🔒 Privacy Notice: </span>
          Passwords typed here are never stored or transmitted anywhere. This is purely for educational demonstration.
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <h2 className="font-bold text-gray-800 mb-4">Create a password and see how strong it is</h2>
          <div className="relative mb-4">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Type a password to test its strength…"
              className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-sm transition-colors font-mono"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Strength meter */}
          {password.length > 0 && (
            <>
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium">Password Strength</span>
                  <span className={`text-sm font-black ${analysis.color}`}>{analysis.label}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`h-3 ${analysis.barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${(analysis.strength / 6) * 100}%` }}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {analysis.checks.map(c => (
                  <div key={c.label} className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${c.passed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                    {c.passed
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      : <XCircle className="w-4 h-4 text-gray-300 shrink-0" />}
                    {c.label}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-purple-500" /> Password Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">•</span> Use a password manager to generate and store complex passwords.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">•</span> Never reuse passwords across different accounts.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">•</span> Passphrases (4+ random words) are both secure and memorable.</li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold">•</span> Enable two-factor authentication for critical accounts.</li>
          </ul>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Try these examples:</p>
            {examples.map(e => (
              <button key={e.pw} onClick={() => setPassword(e.pw)} className="block w-full text-left bg-gray-50 hover:bg-purple-50 rounded-xl px-3 py-2 transition-colors">
                <span className="font-mono text-sm text-purple-600">{e.pw}</span>
                <span className="text-xs text-gray-400 ml-2">← {e.label}</span>
              </button>
            ))}
          </div>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <h3 className="font-bold text-green-700">Challenge Complete!</h3>
            <p className="text-green-600 text-sm mt-1">Your password scored: <strong>{analysis.label}</strong></p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => navigate('/dashboard')} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">Dashboard</button>
              <button onClick={() => navigate('/results', { state: { levelId:2, score:Math.round((analysis.strength/6)*100), maxScore:100, stars:analysis.strength>=6?3:analysis.strength>=4?2:1, xpEarned:analysis.strength*20, correctCount:analysis.strength, totalQuestions:6, levelTitle:'Password Safety Challenge', isMiniGame:true } })} className="flex-1 py-2.5 bg-gradient-to-r from-purple-400 to-violet-500 text-white rounded-xl font-bold shadow-md hover:opacity-90">View Results</button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={password.length === 0}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-2xl font-bold text-lg shadow-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Submit Password for Score
          </button>
        )}
      </div>
    </Layout>
  );
}
