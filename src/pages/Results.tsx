import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Star, Trophy, RotateCcw, ChevronRight, Home, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { levels } from '../data/levels';

interface ResultState {
  levelId: number;
  score: number;
  maxScore: number;
  stars: number;
  xpEarned: number;
  correctCount: number;
  totalQuestions: number;
  levelTitle: string;
  isMiniGame?: boolean;
}

export default function Results() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const state     = location.state as ResultState;

  if (!state) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-64">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No results to show.</p>
            <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 bg-teal-500 text-white rounded-xl font-semibold">Back to Dashboard</button>
          </div>
        </div>
      </Layout>
    );
  }

  const { levelId, score, maxScore, stars, xpEarned, correctCount, totalQuestions, levelTitle, isMiniGame } = state;
  const pct = Math.round((score / maxScore) * 100);
  const nextLevel = levels.find(l => l.id === levelId + 1);
  const currentLevel = levels.find(l => l.id === levelId);

  const getMessage = () => {
    if (stars === 3) return { text: 'Perfect Score! 🎉', sub: 'Outstanding cybersecurity knowledge!', color: 'text-amber-500' };
    if (stars === 2) return { text: 'Great Job! 👏',    sub: 'You have solid security instincts.',     color: 'text-teal-500'  };
    if (stars === 1) return { text: 'Good Effort! 💪',  sub: 'Keep practising to earn more stars.',   color: 'text-blue-500'  };
    return { text: 'Keep Trying! 🔄',               sub: 'Review the tips and try again.',           color: 'text-gray-500'  };
  };

  const msg = getMessage();

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        {/* Top card */}
        <div className={`bg-gradient-to-br ${currentLevel?.gradient ?? 'from-teal-400 to-cyan-500'} rounded-3xl p-8 text-white text-center mb-6 shadow-xl`}>
          <div className="text-5xl mb-3">{currentLevel?.icon ?? '🏆'}</div>
          <p className="text-white/80 text-sm mb-1">{levelTitle}</p>
          <h1 className={`text-3xl font-black mb-1 ${msg.color === 'text-amber-500' ? 'text-amber-300' : 'text-white'}`}>{msg.text}</h1>
          <p className="text-white/80">{msg.sub}</p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-3 my-6">
            {[1, 2, 3].map(s => (
              <Star key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-amber-300 fill-amber-300 scale-110' : 'text-white/30 fill-white/10'}`} />
            ))}
          </div>

          {/* Score circle */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block">
            <p className="text-4xl font-black">{pct}%</p>
            <p className="text-white/80 text-sm">{score} / {maxScore} points</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: CheckCircle2, label: 'Correct',   value: correctCount,   color: 'text-green-600', bg: 'bg-green-50' },
            { icon: XCircle,      label: 'Incorrect', value: totalQuestions - correctCount, color: 'text-red-600', bg: 'bg-red-50' },
            { icon: Zap,          label: 'XP Earned', value: xpEarned,       color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Safety summary */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-gray-800">Cybersecurity Lesson Summary</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" /> Always verify the sender before clicking links in emails or messages.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" /> Urgency and pressure are red flags of scams and phishing attacks.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" /> Use unique, complex passwords and enable two-factor authentication.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" /> Dashboard
          </button>
          {!isMiniGame && (
            <button
              onClick={() => navigate(`/gameplay/${levelId}`)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-teal-200 text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-colors"
            >
              <RotateCcw className="w-5 h-5" /> Retry Level
            </button>
          )}
          {nextLevel && (
            <button
              onClick={() => navigate(`/gameplay/${nextLevel.id}`)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r ${currentLevel?.gradient ?? 'from-teal-400 to-cyan-500'} text-white rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity`}
            >
              Next Level <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
