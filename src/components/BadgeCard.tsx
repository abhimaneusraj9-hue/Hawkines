import { Badge } from '../data/badges';
import { Lock } from 'lucide-react';

interface Props {
  badge: Badge;
  unlocked: boolean;
  progress?: number;
}

export function BadgeCard({ badge, unlocked, progress = 0 }: Props) {
  return (
    <div className={`relative rounded-2xl p-5 border-2 transition-all duration-300 ${unlocked ? 'bg-white border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
      {!unlocked && (
        <div className="absolute top-3 right-3">
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
      )}
      <div className={`w-14 h-14 ${badge.bgColor} rounded-xl flex items-center justify-center text-2xl mb-3 ${!unlocked ? 'grayscale opacity-50' : ''}`}>
        {badge.icon}
      </div>
      <h3 className={`font-bold text-sm ${unlocked ? 'text-gray-800' : 'text-gray-400'}`}>{badge.title}</h3>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{badge.description}</p>
      {unlocked ? (
        <span className={`inline-block mt-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.bgColor} ${badge.color}`}>
          +{badge.xpBonus} XP Bonus
        </span>
      ) : (
        <p className="text-xs text-gray-400 mt-2 italic">{badge.requirement}</p>
      )}
    </div>
  );
}
