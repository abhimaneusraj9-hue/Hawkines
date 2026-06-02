export interface Level {
  id: number;
  title: string;
  topic: string;
  description: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  icon: string;
  gradient: string;
  textColor: string;
  xpReward: number;
  timeLimit: number;
}

export const levels: Level[] = [
  { id:1,  title:'Spot the Phishing Email',     topic:'Phishing Detection',       description:'Learn to identify fake emails designed to steal your information.',       difficulty:'Beginner', icon:'🎣', gradient:'from-red-400 to-rose-500',       textColor:'text-red-600',    xpReward:100, timeLimit:30 },
  { id:2,  title:'Build a Strong Password',      topic:'Password Safety',           description:'Discover what makes a password secure and hard to crack.',                difficulty:'Easy',     icon:'🔐', gradient:'from-purple-400 to-violet-500',  textColor:'text-purple-600', xpReward:120, timeLimit:30 },
  { id:3,  title:'Protect Your Social Media',   topic:'Online Privacy',            description:'Understand what information to share and keep private online.',            difficulty:'Easy',     icon:'🛡️', gradient:'from-blue-400 to-cyan-500',      textColor:'text-blue-600',   xpReward:120, timeLimit:30 },
  { id:4,  title:'Avoid Fake Websites',         topic:'Secure Browsing',           description:'Learn to spot dangerous websites and stay safe while browsing.',           difficulty:'Medium',   icon:'🌐', gradient:'from-teal-400 to-emerald-500',   textColor:'text-teal-600',   xpReward:150, timeLimit:25 },
  { id:5,  title:'Identify Scam Messages',      topic:'Scam Detection',            description:'Recognise common scam tactics used in messages and calls.',                difficulty:'Medium',   icon:'⚠️', gradient:'from-orange-400 to-amber-500',   textColor:'text-orange-600', xpReward:150, timeLimit:25 },
  { id:6,  title:'Secure Your Personal Data',   topic:'Data Protection',           description:'Learn how to keep your personal information safe from breaches.',          difficulty:'Medium',   icon:'🗄️', gradient:'from-indigo-400 to-blue-500',    textColor:'text-indigo-600', xpReward:160, timeLimit:25 },
  { id:7,  title:'Report Cyberbullying',        topic:'Cyberbullying Awareness',   description:'Understand how to handle and report online harassment.',                  difficulty:'Easy',     icon:'💬', gradient:'from-pink-400 to-rose-400',      textColor:'text-pink-600',   xpReward:130, timeLimit:30 },
  { id:8,  title:'Safe Online Shopping',        topic:'Secure Transactions',       description:'Stay safe when making purchases online.',                                 difficulty:'Medium',   icon:'🛒', gradient:'from-green-400 to-teal-500',     textColor:'text-green-600',  xpReward:160, timeLimit:25 },
  { id:9,  title:'Public Wi-Fi Safety',         topic:'Network Security',          description:'Protect yourself when using public internet connections.',                difficulty:'Hard',     icon:'📶', gradient:'from-cyan-400 to-sky-500',       textColor:'text-cyan-600',   xpReward:200, timeLimit:20 },
  { id:10, title:'Two-Factor Authentication',   topic:'Account Security',          description:'Set up extra layers of protection for your accounts.',                    difficulty:'Hard',     icon:'🔑', gradient:'from-violet-400 to-purple-500',  textColor:'text-violet-600', xpReward:200, timeLimit:20 },
  { id:11, title:'Data Privacy Challenge',      topic:'Privacy Rights',            description:'Learn your rights and responsibilities around data privacy.',             difficulty:'Hard',     icon:'🔏', gradient:'from-rose-400 to-pink-500',      textColor:'text-rose-600',   xpReward:220, timeLimit:20 },
  { id:12, title:'Final Cyber Defender Test',   topic:'All Topics',                description:'The ultimate test combining all cybersecurity knowledge.',                difficulty:'Expert',   icon:'🏆', gradient:'from-amber-400 to-yellow-500',   textColor:'text-amber-600',  xpReward:300, timeLimit:20 },
];
