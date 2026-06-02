import { Layout } from '../components/Layout';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import { getUser } from '../utils/auth';
import { getXPBracket, getPlayerLevel } from '../utils/scoring';
import { levels } from '../data/levels';
import { badges } from '../data/badges';
import { Star, Award, Target, Zap } from 'lucide-react';

export default function Profile() {
  const { progress } = useProgress();
  const user = getUser();
  const xpInfo = getXPBracket(progress.totalXP);
  const playerLevel = getPlayerLevel(progress.totalXP);
  const completedLevels = Object.values(progress.levelProgress).filter(p => p.completed).length;
  const totalStars = Object.values(progress.levelProgress).reduce((a, p) => a + (p.stars ?? 0), 0);
  const unlockedBadgeCount = progress.unlockedBadges.length;

  const stats = [
    { icon: Target, label: 'Missions Completed',  value: progress.missionsCompleted, color: 'text-teal-500',   bg: 'bg-teal-50' },
    { icon: Zap,    label: 'Total XP Earned',      value: progress.totalXP,           color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Star,   label: 'Stars Earned',          value: totalStars,                 color: 'text-amber-500',  bg: 'bg-amber-50' },
    { icon: Award,  label: 'Badges Unlocked',       value: unlockedBadgeCount,         color: 'text-blue-500',   bg: 'bg-blue-50' },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-black text-gray-800 mb-6">My Profile</h1>

        {/* Profile card */}
        <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl p-6 text-white mb-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
              {user?.avatar ?? '🎓'}
            </div>
            <div className="flex-1">
              <p className="text-white/70 text-sm font-medium">{user?.role ?? 'Cyber Learner'}</p>
              <h2 className="text-2xl font-black">{user?.name ?? 'Student Player'}</h2>
              <p className="text-white/80 text-sm">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">Level {playerLevel}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">{progress.totalXP} XP</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <ProgressBar
              current={xpInfo.current}
              max={xpInfo.nextXP - xpInfo.levelXP}
              color="bg-white"
              height="h-2"
              labelLeft={`Level ${playerLevel}`}
              labelRight={`Level ${playerLevel + 1} — ${xpInfo.nextXP - xpInfo.levelXP - xpInfo.current} XP to go`}
              showLabel={false}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {stats.map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">Level Progress</h3>
          <div className="space-y-3">
            {levels.slice(0, 6).map(level => {
              const lp = progress.levelProgress[level.id];
              return (
                <div key={level.id} className="flex items-center gap-3">
                  <span className="text-lg w-8 text-center">{level.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{level.title}</span>
                      <span className="text-gray-400">{lp?.stars ?? 0}/3 ⭐</span>
                    </div>
                    <ProgressBar
                      current={lp?.score ?? 0}
                      max={lp?.maxScore ?? 100}
                      color={`bg-gradient-to-r ${level.gradient}`}
                      showLabel={false}
                      height="h-2"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
