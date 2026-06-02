import { Layout } from '../components/Layout';
import { LevelCard } from '../components/LevelCard';
import { useProgress } from '../hooks/useProgress';
import { levels } from '../data/levels';
import { Lock, Star } from 'lucide-react';

export default function Levels() {
  const { progress } = useProgress();
  const totalStars = Object.values(progress.levelProgress).reduce((a, p) => a + p.stars, 0);
  const completedCount = Object.values(progress.levelProgress).filter(p => p.completed).length;

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800">Level Selection</h1>
          <p className="text-gray-500 mt-1">Complete each level to unlock the next. Earn stars and XP!</p>
        </div>

        {/* Summary bar */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-5 text-white mb-6 shadow-md flex items-center gap-6 flex-wrap">
          <div>
            <p className="text-white/70 text-sm">Progress</p>
            <p className="text-3xl font-black">{completedCount} / {levels.length}</p>
            <p className="text-white/80 text-sm">Levels Completed</p>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div>
            <p className="text-white/70 text-sm">Stars</p>
            <p className="text-3xl font-black flex items-center gap-1">{totalStars} <Star className="w-7 h-7 fill-amber-300 text-amber-300" /></p>
            <p className="text-white/80 text-sm">out of {levels.length * 3}</p>
          </div>
          <div className="flex-1 min-w-48">
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="h-3 bg-white rounded-full transition-all duration-700"
                style={{ width: `${(completedCount / levels.length) * 100}%` }}
              />
            </div>
            <p className="text-white/70 text-xs mt-1">{Math.round((completedCount / levels.length) * 100)}% complete</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-gray-500 mb-5 flex-wrap">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-teal-400 rounded-full" /> Unlocked</div>
          <div className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-gray-400" /> Locked — complete previous level first</div>
          <div className="flex items-center gap-1.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Stars earned on completion</div>
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {levels.map(level => (
            <LevelCard
              key={level.id}
              level={level}
              unlocked={progress.unlockedLevels.includes(level.id)}
              progress={progress.levelProgress[level.id]}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
