import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProgressBar } from '../components/ProgressBar';
import { Roadmap } from '../components/Roadmap';
import { useProgress } from '../hooks/useProgress';
import { getUser } from '../utils/auth';
import { getXPBracket, getPlayerLevel } from '../utils/scoring';
import { getTodaysTip } from '../data/tips';
import { badges } from '../data/badges';
import { staticLeaderboard } from '../data/leaderboard';
import { Star, Bell, Lightbulb, Trophy, Target, Gamepad2, Award, Zap } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const user = getUser();
  const xp = getXPBracket(progress.totalXP);
  const playerLevel = getPlayerLevel(progress.totalXP);
  const tip = getTodaysTip();
  const recentBadge = badges.find(b => progress.unlockedBadges.includes(b.id));
  const topPlayers = staticLeaderboard.slice(0, 3);

  const statsData = [
    { label: 'Missions Completed', value: progress.missionsCompleted, icon: Target,  color: 'text-teal-600',   bg: 'bg-teal-50'   },
    { label: 'Mini Games Played',  value: progress.miniGamesPlayed,   icon: Gamepad2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Achievements',       value: progress.unlockedBadges.length, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'XP Earned',          value: progress.totalXP,           icon: Zap,     color: 'text-blue-600',   bg: 'bg-blue-50'   },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm font-medium">Welcome back,</p>
            <h1 className="text-2xl font-black text-gray-800">{user?.name ?? 'Student Player'} 👋</h1>
          </div>
          <button className="relative w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full text-white text-xs flex items-center justify-center">1</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* Left main content */}
          <div className="col-span-12 xl:col-span-8 space-y-5">

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statsData.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-2`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p className={`text-2xl font-black ${color}`}>{value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <Roadmap progress={progress} />

            {/* Daily challenge */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-5 shadow-md text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm">⭐</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">DAILY CHALLENGE</span>
                  </div>
                  <h3 className="font-bold text-lg">Complete today's mission to earn bonus XP!</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="h-2 bg-white rounded-full" style={{ width: `${(progress.missionsCompleted > 0 ? 1 : 0) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold">{Math.min(progress.missionsCompleted, 1)} / 1 Completed</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/challenge/phishing')}
                  className="bg-white text-amber-600 font-bold px-5 py-2.5 rounded-xl hover:bg-amber-50 transition-colors shrink-0 text-sm shadow-sm"
                >
                  View Challenge
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 xl:col-span-4 space-y-5">
            {/* Player card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
                  {user?.avatar ?? '🎓'}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{user?.name ?? 'Student Player'}</p>
                  <p className="text-teal-500 text-xs font-semibold">Level {playerLevel}</p>
                </div>
              </div>
              <ProgressBar
                current={xp.current}
                max={xp.nextXP - xp.levelXP}
                color="bg-gradient-to-r from-teal-400 to-cyan-500"
                labelLeft={`${progress.totalXP} XP`}
                labelRight={`${xp.nextXP} XP`}
                showLabel={false}
              />
              <p className="text-xs text-gray-400 mt-2 text-center">{(xp.nextXP - xp.levelXP) - xp.current} XP to next level</p>
            </div>

            {/* Stats (mobile extra) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Stats</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Missions Completed', value: progress.missionsCompleted },
                  { label: 'Mini Games Played',  value: progress.miniGamesPlayed   },
                  { label: 'Achievements',        value: progress.unlockedBadges.length },
                  { label: 'XP Earned',           value: progress.totalXP           },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{label}</span>
                    <span className="font-bold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement unlock */}
            {recentBadge && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-green-600 text-xs mb-3 uppercase tracking-wider">Achievement Unlocked</h3>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${recentBadge.bgColor} rounded-xl flex items-center justify-center text-xl`}>{recentBadge.icon}</div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{recentBadge.title}</p>
                    <p className="text-xs text-gray-500">{recentBadge.description.slice(0, 50)}…</p>
                    <span className="text-xs text-green-600 font-bold">✓ COMPLETED</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tip of the day */}
            <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-2xl border border-sky-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-gray-700 text-sm">Tip of the Day</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
            </div>

            {/* Mini leaderboard */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-400" /> Top Players</h3>
                <button onClick={() => navigate('/leaderboard')} className="text-teal-500 text-xs font-semibold hover:underline">View all</button>
              </div>
              <div className="space-y-2.5">
                {topPlayers.map(p => (
                  <div key={p.rank} className="flex items-center gap-3">
                    <span className="text-lg w-7 text-center">{p.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.score.toLocaleString()} pts</p>
                    </div>
                    <span className={`text-xs font-bold ${p.rank === 1 ? 'text-amber-500' : p.rank === 2 ? 'text-gray-500' : 'text-orange-500'}`}>#{p.rank}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
