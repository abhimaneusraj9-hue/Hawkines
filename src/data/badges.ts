export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  xpBonus: number;
  requirement: string;
}

export const badges: Badge[] = [
  { id:'first-login',       title:'First Login',           description:'Welcomed into Cyber Smart. Your journey begins!',             icon:'🎮', color:'text-blue-700',   bgColor:'bg-blue-100',   xpBonus:50,  requirement:'Log in for the first time'            },
  { id:'phishing-defender', title:'Phishing Defender',     description:'Successfully identified phishing threats in Level 1.',        icon:'🎣', color:'text-red-700',    bgColor:'bg-red-100',    xpBonus:100, requirement:'Complete Level 1'                     },
  { id:'password-master',   title:'Password Master',       description:'Mastered the art of creating uncrackable passwords.',         icon:'🔐', color:'text-purple-700', bgColor:'bg-purple-100', xpBonus:150, requirement:'Complete Level 2 with 3 stars'         },
  { id:'privacy-protector', title:'Privacy Protector',     description:'Knows how to safeguard personal information online.',         icon:'🛡️', color:'text-blue-700',   bgColor:'bg-blue-100',   xpBonus:120, requirement:'Complete Level 3'                     },
  { id:'safe-browser',      title:'Safe Browser',          description:'Certified in identifying dangerous websites.',                icon:'🌐', color:'text-teal-700',   bgColor:'bg-teal-100',   xpBonus:150, requirement:'Complete Level 4'                     },
  { id:'scam-spotter',      title:'Scam Spotter',          description:'Expert at recognising scams and fraudulent messages.',        icon:'🔍', color:'text-orange-700', bgColor:'bg-orange-100', xpBonus:150, requirement:'Complete Level 5'                     },
  { id:'cyber-kindness',    title:'Cyber Kindness Hero',   description:'Champion of kindness and safety in digital spaces.',         icon:'💙', color:'text-pink-700',   bgColor:'bg-pink-100',   xpBonus:130, requirement:'Complete Level 7'                     },
  { id:'data-guardian',     title:'Data Guardian',         description:'Master of protecting personal and sensitive data.',          icon:'🗄️', color:'text-indigo-700', bgColor:'bg-indigo-100', xpBonus:200, requirement:'Complete Levels 6 and 11'             },
  { id:'cyber-champion',    title:'Cyber Smart Champion',  description:'Completed all 12 levels. True cybersecurity mastery!',       icon:'🏆', color:'text-amber-700',  bgColor:'bg-amber-100',  xpBonus:500, requirement:'Complete all 12 levels'               },
  { id:'perfect-score',     title:'Perfectionist',         description:'Achieved a perfect score on any level.',                     icon:'⭐', color:'text-yellow-700', bgColor:'bg-yellow-100', xpBonus:100, requirement:'Score 100% on any level'              },
];
