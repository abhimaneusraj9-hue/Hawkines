import { Layout } from '../components/Layout';
import { BadgeCard } from '../components/BadgeCard';
import { useProgress } from '../hooks/useProgress';
import { badges } from '../data/badges';
import { Award, Lock } from 'lucide-react';

export default function Achievements() {
  const { progress } = useProgress();
  const unlocked = progress.unlockedBadges;
  const unlockedCount = unlocked.length;

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800">Achievements</h1>
          <p className="text-gray-500 mt-1">Collect badges by completing levels and challenges.</p>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-5 text-white mb-6 shadow-md flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
            🏆
          </div>
          <div>
            <p className="text-white/80 text-sm">Badges Collected</p>
            <p className="text-4xl font-black">{unlockedCount} <span className="text-2xl text-white/60">/ {badges.length}</span></p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div className="h-2 bg-white rounded-full" style={{ width: `${(unlockedCount / badges.length) * 100}%` }} />
              </div>
              <span className="text-sm font-bold">{Math.round((unlockedCount / badges.length) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Unlocked */}
        {unlockedCount > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Unlocked ({unlockedCount})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.filter(b => unlocked.includes(b.id)).map(b => (
                <BadgeCard key={b.id} badge={b} unlocked={true} />
              ))}
            </div>
          </div>
        )}

        {/* Locked */}
        {unlockedCount < badges.length && (
          <div>
            <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-400" /> Locked ({badges.length - unlockedCount})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.filter(b => !unlocked.includes(b.id)).map(b => (
                <BadgeCard key={b.id} badge={b} unlocked={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
