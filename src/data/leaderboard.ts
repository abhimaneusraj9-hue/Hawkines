export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  levelsCompleted: number;
  badges: number;
  weeklyScore: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export const staticLeaderboard: LeaderboardEntry[] = [
  { rank:1,  name:'Alex Chen',       score:4850, levelsCompleted:12, badges:9, weeklyScore:950, avatar:'🏆' },
  { rank:2,  name:'Priya Sharma',    score:4720, levelsCompleted:12, badges:8, weeklyScore:820, avatar:'🥈' },
  { rank:3,  name:'Jordan Lee',      score:4500, levelsCompleted:11, badges:8, weeklyScore:780, avatar:'🥉' },
  { rank:4,  name:'Maya Patel',      score:4200, levelsCompleted:10, badges:7, weeklyScore:650, avatar:'🎓' },
  { rank:5,  name:'Sam Wilson',      score:3950, levelsCompleted:10, badges:7, weeklyScore:620, avatar:'🎯' },
  { rank:6,  name:'Emma Davis',      score:3700, levelsCompleted:9,  badges:6, weeklyScore:580, avatar:'🌟' },
  { rank:7,  name:'Chris Park',      score:3400, levelsCompleted:8,  badges:5, weeklyScore:500, avatar:'🎮' },
  { rank:8,  name:'Zara Ahmed',      score:3100, levelsCompleted:7,  badges:5, weeklyScore:480, avatar:'🔐' },
  { rank:9,  name:'Ryan Torres',     score:2800, levelsCompleted:6,  badges:4, weeklyScore:420, avatar:'🛡️' },
];
