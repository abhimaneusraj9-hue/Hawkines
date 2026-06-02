import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, Info, Globe, Users, Lock } from 'lucide-react';

type PrivacyLevel = 'public' | 'friends' | 'private' | null;

interface ProfileItem {
  id: string;
  label: string;
  icon: string;
  correct: PrivacyLevel;
  explanation: string;
  selected: PrivacyLevel;
}

const initialItems: ProfileItem[] = [
  { id:'phone',   label:'Phone Number',   icon:'📱', correct:'private', explanation:'Your phone number should be private — it can be used for SIM swapping attacks and spam calls.',         selected:null },
  { id:'address', label:'Home Address',   icon:'🏠', correct:'private', explanation:'Never make your home address public — this is a serious safety risk that can enable stalking or burglary.', selected:null },
  { id:'birthday',label:'Birthday',       icon:'🎂', correct:'friends', explanation:'Your full birthday is used for identity verification. Keep it friends-only at most, never fully public.',   selected:null },
  { id:'photo',   label:'Profile Picture',icon:'📸', correct:'friends', explanation:'A profile photo on friends-only prevents strangers from using it to impersonate you elsewhere.',            selected:null },
  { id:'email',   label:'Email Address',  icon:'✉️', correct:'private', explanation:'A public email address attracts spam and phishing. Keep it private or use a secondary one for public use.', selected:null },
  { id:'uni',     label:'University',     icon:'🎓', correct:'friends', explanation:'University name is relatively low-risk but still better kept to friends — scammers target students.',        selected:null },
  { id:'location',label:'Live Location',  icon:'📍', correct:'private', explanation:'Live location sharing with the public is extremely dangerous — it tells anyone exactly where you are.',      selected:null },
  { id:'posts',   label:'Regular Posts',  icon:'📝', correct:'friends', explanation:'Keeping posts friends-only limits who can track your activities, opinions, and daily life.',                  selected:null },
];

const btnStyles: Record<Exclude<PrivacyLevel, null>, string> = {
  public:  'bg-red-100 text-red-700 border-2 border-red-300',
  friends: 'bg-blue-100 text-blue-700 border-2 border-blue-300',
  private: 'bg-green-100 text-green-700 border-2 border-green-300',
};

export default function PrivacyChallenge() {
  const navigate = useNavigate();
  const { saveLevelResult, unlockBadge, incrementMiniGames } = useProgress();
  const [items,     setItems]     = useState<ProfileItem[]>(initialItems);
  const [submitted, setSubmitted] = useState(false);
  const [showExpl,  setShowExpl]  = useState<string | null>(null);

  const allSelected = items.every(i => i.selected !== null);
  const correctCount = items.filter(i => i.selected === i.correct).length;

  const setPrivacy = (id: string, level: PrivacyLevel) => {
    if (submitted) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, selected: level } : i));
    setShowExpl(null);
  };

  const handleSubmit = () => {
    if (!allSelected) return;
    setSubmitted(true);
    incrementMiniGames();
    const score = Math.round((correctCount / items.length) * 100);
    if (score >= 90) unlockBadge('privacy-protector');
    saveLevelResult(3, score, 100, 120);
  };

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-lg">🛡️</div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Interactive Challenge</p>
            <h1 className="font-bold text-gray-800">Online Privacy Settings</h1>
          </div>
          {submitted && <div className="text-right"><p className="text-xs text-gray-500">Score</p><p className="font-black text-teal-600 text-xl">{correctCount}/{items.length}</p></div>}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">For each item on your social media profile, choose the safest privacy setting: <strong>Public</strong>, <strong>Friends Only</strong>, or <strong>Private</strong>.</p>
        </div>

        {/* Legend */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {[['Public', 'text-red-600', Globe], ['Friends Only', 'text-blue-600', Users], ['Private', 'text-green-600', Lock]].map(([label, color, Icon]: any) => (
            <div key={label} className={`flex items-center gap-1.5 text-xs font-semibold ${color}`}><Icon className="w-3.5 h-3.5" /> {label}</div>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-3 mb-6">
          {items.map(item => {
            const isCorrect = submitted && item.selected === item.correct;
            const isWrong   = submitted && item.selected !== item.correct;
            return (
              <div key={item.id} className={`bg-white rounded-2xl shadow-sm border p-4 transition-all ${isCorrect ? 'border-green-300' : isWrong ? 'border-red-300' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="font-semibold text-gray-800 flex-1">{item.label}</p>
                  {submitted && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isCorrect ? '✓ Correct' : `✗ Best: ${item.correct}`}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {(['public', 'friends', 'private'] as PrivacyLevel[]).map(level => {
                    if (!level) return null;
                    const labels = { public: 'Public', friends: 'Friends Only', private: 'Private' };
                    const selected = item.selected === level;
                    return (
                      <button
                        key={level}
                        onClick={() => setPrivacy(item.id, level)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${selected ? btnStyles[level] : 'bg-gray-50 text-gray-500 border-2 border-transparent hover:bg-gray-100'}`}
                      >
                        {labels[level]}
                      </button>
                    );
                  })}
                </div>
                {submitted && isWrong && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-800"><span className="font-bold">Why:</span> {item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {submitted ? (
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-5 text-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-teal-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-800">Challenge Complete!</h3>
            <p className="text-gray-600 text-sm mt-1">You got <strong>{correctCount} / {items.length}</strong> privacy settings correct!</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => navigate('/dashboard')} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">Dashboard</button>
              <button onClick={() => navigate('/results', { state: { levelId:3, score:Math.round((correctCount/items.length)*100), maxScore:100, stars:correctCount>=7?3:correctCount>=5?2:1, xpEarned:correctCount*15, correctCount, totalQuestions:items.length, levelTitle:'Privacy Settings Challenge', isMiniGame:true } })} className="flex-1 py-2.5 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-xl font-bold shadow-md hover:opacity-90">View Results</button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allSelected}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allSelected ? 'Submit My Privacy Settings' : `Select all settings (${items.filter(i=>i.selected).length}/${items.length} done)`}
          </button>
        )}
      </div>
    </Layout>
  );
}
