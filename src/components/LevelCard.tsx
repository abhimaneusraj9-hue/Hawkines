import { useNavigate } from 'react-router-dom';
import { Lock, Star, PlayCircle } from 'lucide-react';
import { Level } from '../data/levels';
import { LevelProgress } from '../utils/storage';

interface Props {
  level: Level;
  unlocked: boolean;
  progress?: LevelProgress;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Easy: 'bg-blue-100 text-blue-700',
  Medium: 'bg-orange-100 text-orange-700',
  Hard: 'bg-red-100 text-red-700',
  Expert: 'bg-purple-100 text-purple-700',
};

export function LevelCard({ level, unlocked, progress }: Props) {
  const navigate = useNavigate();
  const stars = progress?.stars ?? 0;
  return (
    <div className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 ${unlocked ? 'bg-white border-transparent shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
      <div className={`h-2 bg-gradient-to-r ${level.gradient}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.gradient} flex items-center justify-center text-xl`}>
            {unlocked ? level.icon : <Lock className="w-5 h-5 text-white" />}
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[level.difficulty]}`}>{level.difficulty}</span>
        </div>
        <p className="text-xs text-gray-400 font-medium">Level {level.id}</p>
        <h3 className="font-bold text-gray-800 text-sm mt-0.5">{level.title}</h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{level.description}</p>
        <div className="flex items-center gap-1 mt-3">
          {[1,2,3].map(s => <Star key={s} className={`w-4 h-4 ${s <= stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />)}
          <span className="text-xs text-gray-400 ml-auto">+{level.xpReward} XP</span>
        </div>
        <button
          disabled={!unlocked}
          onClick={() => navigate(`/gameplay/${level.id}`)}
          className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${unlocked ? `bg-gradient-to-r ${level.gradient} text-white hover:opacity-90 shadow-sm` : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          {unlocked ? <><PlayCircle className="w-4 h-4" />{progress?.completed ? 'Replay' : 'Start'}</> : <><Lock className="w-4 h-4" /> Locked</>}
        </button>
      </div>
    </div>
  );
}
