import { useNavigate } from 'react-router-dom';
import { Shield, Play, Settings, ChevronRight, Lock, Wifi, Eye, AlertTriangle } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';

export default function Welcome() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const features = [
    { icon: AlertTriangle, label: 'Phishing Detection',   color: 'bg-red-100 text-red-600'    },
    { icon: Lock,          label: 'Password Safety',       color: 'bg-purple-100 text-purple-600' },
    { icon: Eye,           label: 'Online Privacy',        color: 'bg-blue-100 text-blue-600'  },
    { icon: Wifi,          label: 'Network Security',      color: 'bg-teal-100 text-teal-600'  },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <div className="fixed top-20 left-10 w-72 h-72 bg-teal-100 rounded-full opacity-30 blur-3xl" />
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full opacity-30 blur-3xl" />

      <div className="w-full max-w-2xl text-center relative">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl shadow-2xl mb-6 animate-bounce-slow">
          <Shield className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-5xl font-black text-gray-800 leading-tight">
          Cyber<span className="text-teal-500">Smart</span>
          <br /><span className="text-3xl font-extrabold text-gray-600">Challenge</span>
        </h1>
        <p className="text-teal-600 font-bold text-lg mt-2 tracking-widest uppercase">Learn · Detect · Defend</p>

        <p className="text-gray-600 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          Master cybersecurity skills through interactive challenges, mini-games, and real-world scenarios.
          Earn badges, climb the leaderboard, and become a <strong>Cyber Defender</strong>.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {features.map(({ icon: Icon, label, color }) => (
            <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-full ${color} text-sm font-semibold`}>
              <Icon className="w-4 h-4" />
              {label}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <button
            onClick={() => navigate(loggedIn ? '/dashboard' : '/login')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl text-lg font-bold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 fill-white" />
            {loggedIn ? 'Continue Game' : 'Start Game'}
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all shadow-md"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto">
          {[['12', 'Levels'], ['10+', 'Topics'], ['8', 'Badges']].map(([n, l]) => (
            <div key={l} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-3xl font-black text-teal-500">{n}</p>
              <p className="text-sm text-gray-500 font-medium">{l}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-8">503IT – Communication and Collaboration · University Project</p>
      </div>
    </div>
  );
}
