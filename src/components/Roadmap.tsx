import { useNavigate } from 'react-router-dom';
import type { GameProgress } from '../utils/storage';
import { roadmapLevels } from '../data/roadmapLevels';
import { RoadmapNode } from './RoadmapNode';
import type { NodeState } from './RoadmapNode';
import { LevelPath } from './LevelPath';

// Node center coordinates in the 600×580 SVG/map space.
// Snake layout: row1 L→R, row2 R→L, row3 L→R, row4 R→L
const NODE_POSITIONS = [
  { x: 80,  y: 80  },  // L1
  { x: 300, y: 80  },  // L2
  { x: 520, y: 80  },  // L3
  { x: 520, y: 220 },  // L4
  { x: 300, y: 220 },  // L5
  { x: 80,  y: 220 },  // L6
  { x: 80,  y: 360 },  // L7
  { x: 300, y: 360 },  // L8
  { x: 520, y: 360 },  // L9
  { x: 520, y: 500 },  // L10
  { x: 300, y: 500 },  // L11
  { x: 80,  y: 500 },  // L12
];

interface RoadmapProps {
  progress: GameProgress;
}

export function Roadmap({ progress }: RoadmapProps) {
  const navigate = useNavigate();

  const completedCount = Object.values(progress.levelProgress).filter(lp => lp.completed).length;

  const getNodeState = (levelId: number): NodeState => {
    if (progress.levelProgress[levelId]?.completed) return 'completed';
    if (progress.unlockedLevels.includes(levelId)) return 'current';
    return 'locked';
  };

  const getStars = (levelId: number) => progress.levelProgress[levelId]?.stars ?? 0;

  // Find the first unlocked-but-not-completed level for "Continue" button
  const continueLevel = roadmapLevels.find(l => getNodeState(l.id) === 'current');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h2 className="font-black text-gray-800 text-lg flex items-center gap-2">
            🗺️ Cyber Safety Journey
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Complete each challenge to unlock the next cyber skill.
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-black text-purple-600 leading-none">
            {completedCount}
            <span className="text-gray-300 font-light"> / </span>
            <span className="text-gray-400 text-lg">12</span>
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Levels Completed</p>
        </div>
      </div>

      {/* Map — fixed 600×580; scrolls horizontally on narrow viewports */}
      <div className="overflow-x-auto rounded-xl">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            width: 600,
            height: 580,
            background:
              'linear-gradient(145deg, #e0f2fe 0%, #f0fdf4 30%, #ede9fe 65%, #fce7f3 100%)',
          }}
        >
          {/* Subtle radial overlay for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 20% 20%, rgba(167,139,250,0.10) 0%, transparent 55%),' +
                'radial-gradient(ellipse at 80% 80%, rgba(96,165,250,0.10) 0%, transparent 55%)',
            }}
          />

          {/* Winding dotted path + decorations */}
          <LevelPath />

          {/* Level nodes */}
          {roadmapLevels.map((level, i) => (
            <RoadmapNode
              key={level.id}
              level={level}
              state={getNodeState(level.id)}
              stars={getStars(level.id)}
              x={NODE_POSITIONS[i].x}
              y={NODE_POSITIONS[i].y}
              onClick={() => navigate(level.route)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-500">
          {completedCount === 0
            ? '🚀 Start your cyber safety journey with Level 1!'
            : completedCount === 12
              ? '🏆 All levels completed — you are a Cyber Defender!'
              : `${12 - completedCount} level${12 - completedCount !== 1 ? 's' : ''} remaining to become a Cyber Defender`}
        </p>
        {continueLevel && (
          <button
            onClick={() => navigate(continueLevel.route)}
            className="shrink-0 font-bold px-5 py-2.5 rounded-xl text-white text-sm transition-all shadow-md hover:shadow-purple-200 hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            }}
          >
            Continue Journey ▶
          </button>
        )}
      </div>
    </div>
  );
}
