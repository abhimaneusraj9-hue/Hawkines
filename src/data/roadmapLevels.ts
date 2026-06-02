export interface RoadmapLevel {
  id: number;
  title: string;
  icon: string;
  route: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  xpReward: number;
  color: string;
}

export const roadmapLevels: RoadmapLevel[] = [
  { id: 1,  title: 'Phishing Alert',           icon: '🎣', route: '/challenge/phishing',      difficulty: 'Beginner', xpReward: 100, color: '#ef4444' },
  { id: 2,  title: 'Password Safety',           icon: '🔐', route: '/challenge/password',      difficulty: 'Beginner', xpReward: 120, color: '#8b5cf6' },
  { id: 3,  title: 'Online Privacy',            icon: '🛡️', route: '/challenge/privacy',       difficulty: 'Easy',     xpReward: 120, color: '#3b82f6' },
  { id: 4,  title: 'Secure Browsing',           icon: '🌐', route: '/challenge/browsing',      difficulty: 'Medium',   xpReward: 150, color: '#10b981' },
  { id: 5,  title: 'Scam Detection',            icon: '⚠️', route: '/gameplay/5',             difficulty: 'Medium',   xpReward: 150, color: '#f97316' },
  { id: 6,  title: 'Social Media Safety',       icon: '📱', route: '/gameplay/3',             difficulty: 'Easy',     xpReward: 130, color: '#6366f1' },
  { id: 7,  title: 'Data Protection',           icon: '🗄️', route: '/gameplay/6',             difficulty: 'Medium',   xpReward: 160, color: '#ec4899' },
  { id: 8,  title: 'Cyberbullying Awareness',   icon: '💬', route: '/challenge/cyberbullying', difficulty: 'Easy',     xpReward: 130, color: '#14b8a6' },
  { id: 9,  title: 'Safe Online Shopping',      icon: '🛒', route: '/gameplay/8',             difficulty: 'Medium',   xpReward: 160, color: '#22c55e' },
  { id: 10, title: 'Public Wi-Fi Safety',       icon: '📶', route: '/gameplay/9',             difficulty: 'Hard',     xpReward: 200, color: '#0ea5e9' },
  { id: 11, title: 'Two-Factor Auth',           icon: '🔑', route: '/gameplay/10',            difficulty: 'Hard',     xpReward: 200, color: '#a855f7' },
  { id: 12, title: 'Cyber Defender Test',       icon: '🏆', route: '/gameplay/12',            difficulty: 'Expert',   xpReward: 300, color: '#f59e0b' },
];
