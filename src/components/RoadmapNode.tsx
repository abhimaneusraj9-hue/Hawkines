import { useState } from 'react';
import type { RoadmapLevel } from '../data/roadmapLevels';
import { StarRating } from './StarRating';

export type NodeState = 'completed' | 'current' | 'locked';

interface RoadmapNodeProps {
  level: RoadmapLevel;
  state: NodeState;
  stars: number;
  x: number;
  y: number;
  onClick: () => void;
}

export function RoadmapNode({ level, state, stars, x, y, onClick }: RoadmapNodeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isLocked    = state === 'locked';
  const isCompleted = state === 'completed';
  const isCurrent   = state === 'current';

  const handleClick = () => {
    if (isLocked) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
    } else {
      onClick();
    }
  };

  const boxShadow = isCurrent
    ? `0 0 0 4px white, 0 0 0 8px ${level.color}, 0 6px 24px ${level.color}70`
    : isCompleted
      ? `0 4px 16px ${level.color}60`
      : '0 2px 8px rgba(0,0,0,0.18)';

  return (
    <div
      className="absolute"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)', zIndex: isCurrent ? 10 : 5 }}
    >
      <div className="flex flex-col items-center">

        {/* Pulsing ring behind the button for current level */}
        <div className="relative flex items-center justify-center">
          {isCurrent && (
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: 72,
                height: 72,
                backgroundColor: level.color,
                opacity: 0.28,
              }}
            />
          )}

          <button
            onClick={handleClick}
            className={`relative flex items-center justify-center rounded-full transition-transform duration-150 ${
              isLocked ? 'cursor-not-allowed' : 'hover:scale-110 active:scale-95 cursor-pointer'
            }`}
            style={{
              width: 64,
              height: 64,
              backgroundColor: isLocked ? '#d1d5db' : level.color,
              boxShadow,
              opacity: isLocked ? 0.62 : 1,
            }}
          >
            {/* Icon */}
            <span
              className="text-2xl select-none"
              style={{ filter: isLocked ? 'grayscale(100%) brightness(1.2)' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}
            >
              {isLocked ? '🔒' : level.icon}
            </span>

            {/* Green check badge for completed */}
            {isCompleted && (
              <div
                className="absolute flex items-center justify-center rounded-full text-white text-xs font-black shadow-md"
                style={{ top: -4, right: -4, width: 20, height: 20, backgroundColor: '#22c55e', fontSize: 10 }}
              >
                ✓
              </div>
            )}

            {/* Level number badge */}
            <div
              className="absolute flex items-center justify-center rounded-full text-white font-black shadow-md"
              style={{
                bottom: -4,
                left: -4,
                width: 20,
                height: 20,
                fontSize: 10,
                backgroundColor: isLocked ? '#9ca3af' : '#1e293b',
              }}
            >
              {level.id}
            </div>
          </button>
        </div>

        {/* Stars for completed */}
        {isCompleted && <StarRating stars={stars} />}

        {/* Label */}
        <div className="text-center mt-1.5" style={{ width: 88 }}>
          <p
            className="font-semibold leading-tight"
            style={{
              fontSize: 11,
              color: isLocked ? '#9ca3af' : '#374151',
              textShadow: '0 1px 2px rgba(255,255,255,0.9)',
            }}
          >
            {level.title}
          </p>
          {!isLocked && (
            <p style={{ fontSize: 10, color: level.color, fontWeight: 700 }}>
              {level.xpReward} XP
            </p>
          )}
        </div>

        {/* Locked tooltip */}
        {showTooltip && (
          <div
            className="absolute pointer-events-none z-30"
            style={{ bottom: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)' }}
          >
            <div
              className="text-white rounded-xl px-3 py-2 text-center shadow-2xl whitespace-nowrap"
              style={{ backgroundColor: '#1e293b', fontSize: 11, fontWeight: 600 }}
            >
              Complete the previous level first! 🔒
            </div>
            <div className="flex justify-center mt-1">
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid #1e293b',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
