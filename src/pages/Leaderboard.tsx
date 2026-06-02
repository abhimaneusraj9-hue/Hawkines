import { Layout } from '../components/Layout';
import { useProgress } from '../hooks/useProgress';
import { staticLeaderboard } from '../data/leaderboard';
import { getPlayerLevel } from '../utils/scoring';
import { Trophy, Medal, Star } from 'lucide-react';

export default function Leaderboard() {
  const { progress } = useProgress();
  const playerLevel = getPlayerLevel(progress.totalXP);

  const liveEntry = {
    rank: staticLeaderboard.length + 1,
    name: 'Student Player',
    score: progress.totalXP,
    levelsCompleted: Object.values(progress.levelProgress).filter(p => p.completed).length,
    badges: progress.unlockedBadges.length,
    weeklyScore: progress.totalXP,
    avatar: '🎓',
    isCurrentUser: true,
  };

  const allEntries = [...staticLeaderboard, liveEntry]
    .sort((a, b) => b.score - a.score)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500 fill-amber-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />;
    return <span className="text-sm font-bold text-gray-400">#{rank}</span>;
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800">Leaderboard</h1>
          <p className="text-gray-500 mt-1">Top Cyber Smart players this week</p>
        </div>

        {/* Top 3 podium */}
        <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-end justify-center gap-4">
            {[allEntries[1], allEntries[0], allEntries[2]].map((p, i) => {
              const height = i === 1 ? 'h-24' : 'h-16';
              const size = i === 1 ? 'text-4xl' : 'text-2xl';
              return p ? (
                <div key={p.name} className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{p.avatar}</span>
                  <div className="text-center">
                    <p className="text-white font-bold text-xs">{p.name.split(' ')[0]}</p>
                    <p className="text-white/80 text-xs">{p.score.toLocaleString()} XP</p>
                  </div>
                  <div className={`${height} w-16 bg-white/20 rounded-t-xl flex items-end justify-center pb-2`}>
                    <span className={`${size} font-black text-white`}>{i === 1 ? '1' : i === 0 ? '2' : '3'}</span>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Full table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-right">Score</div>
            <div className="col-span-2 text-right">Levels</div>
            <div className="col-span-2 text-right">Badges</div>
            <div className="col-span-1 text-right">Weekly</div>
          </div>
          <div>
            {allEntries.map(entry => (
              <div
                key={`${entry.name}-${entry.rank}`}
                className={`grid grid-cols-12 items-center px-5 py-4 border-b border-gray-50 transition-colors ${entry.isCurrentUser ? 'bg-teal-50 border-l-4 border-l-teal-400' : 'hover:bg-gray-50'}`}
              >
                <div className="col-span-1 flex items-center">{rankIcon(entry.rank)}</div>
                <div className="col-span-4 flex items-center gap-3">
                  <span className="text-xl">{entry.avatar}</span>
                  <div>
                    <p className={`font-semibold text-sm ${entry.isCurrentUser ? 'text-teal-600' : 'text-gray-800'}`}>{entry.name}</p>
                    {entry.isCurrentUser && <span className="text-xs text-teal-500 font-bold">You</span>}
                  </div>
                </div>
                <div className="col-span-2 text-right font-bold text-gray-700 text-sm">{entry.score.toLocaleString()}</div>
                <div className="col-span-2 text-right text-gray-500 text-sm">{entry.levelsCompleted}</div>
                <div className="col-span-2 text-right">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {entry.badges}
                  </span>
                </div>
                <div className="col-span-1 text-right text-gray-400 text-xs">{entry.weeklyScore}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
