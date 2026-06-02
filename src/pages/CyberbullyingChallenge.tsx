import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, XCircle, MessageCircle, ChevronRight } from 'lucide-react';

interface Option { label: string; safe: boolean; explanation: string; }
interface Scenario { id: number; context: string; message: string; sender: string; question: string; options: Option[]; }

const scenarios: Scenario[] = [
  {
    id: 1,
    context: "You're in an online gaming chat when another player starts sending you threatening messages.",
    message: "ur so bad at this game, quit now loser. nobody wants u here. ill find out who u are 🤡",
    sender: 'Gamer_Rage99',
    question: "What is the BEST first response?",
    options: [
      { label: 'Reply with equally harsh insults to defend yourself',          safe: false, explanation: 'Retaliating escalates the conflict and can make you look like the aggressor, reducing your ability to report effectively.' },
      { label: 'Block the user, screenshot the messages, and report to platform', safe: true,  explanation: 'Correct! Block to stop further contact, screenshot for evidence, then report through the game\'s reporting system. This is the safest and most effective response.' },
      { label: 'Quit the game permanently to avoid the bully',                 safe: false, explanation: 'You should not have to give up activities you enjoy because of a bully\'s behaviour. Report and block instead.' },
      { label: 'Share their username publicly to shame them',                  safe: false, explanation: 'This could escalate the situation and may violate platform rules. Use official reporting tools instead.' },
    ],
  },
  {
    id: 2,
    context: "Your friend messages you saying someone has been posting mean comments on all their social media posts for two weeks.",
    message: "Everyone saw what u posted last week and they all think ur pathetic. ur not welcome here",
    sender: 'Unknown_User',
    question: "What should your friend do FIRST?",
    options: [
      { label: 'Delete all their social media accounts immediately',           safe: false, explanation: 'Deleting accounts destroys your evidence and rewards the bully by removing you from the platform. Report first.' },
      { label: 'Screenshot and save all evidence, then report to the platform',safe: true,  explanation: 'Correct! Evidence is critical for effective reporting. Save screenshots with timestamps before doing anything else.' },
      { label: 'Confront the person directly in real life',                    safe: false, explanation: 'Physical confrontation can escalate to real danger. Online issues should be handled through official channels.' },
      { label: 'Keep it private and hope it stops on its own',                 safe: false, explanation: 'Cyberbullying rarely stops on its own and often escalates. Reporting is important and can prevent others from being targeted too.' },
    ],
  },
  {
    id: 3,
    context: "Someone has been repeatedly sending private and humiliating photos of your classmate without permission to a group chat.",
    message: "[Photo shared without consent] Look at this everyone 😂",
    sender: 'ClassChat_Member',
    question: "What should you do as a bystander?",
    options: [
      { label: 'React with a laugh emoji since everyone else is',              safe: false, explanation: 'Reacting normalises the behaviour and adds to the victim\'s humiliation. As a bystander, your response matters.' },
      { label: 'Stay silent to avoid getting involved',                        safe: false, explanation: 'Silence enables bullying. You don\'t have to confront the person directly, but reporting is always an option.' },
      { label: 'Report the message to the platform and inform the victim privately', safe: true, explanation: 'Correct! Report the content (image-based abuse is illegal in Australia) and let the victim know privately that you\'re supporting them. The eSafety Commissioner can also help.' },
      { label: 'Forward it to others so they know what\'s happening',          safe: false, explanation: 'Forwarding spreads the harm further and could make you legally liable for distributing the content.' },
    ],
  },
  {
    id: 4,
    context: "You receive a series of threatening direct messages from an anonymous account claiming to know where you live.",
    message: "I know where u live. Better watch out. This isn't over.",
    sender: 'Anonymous_1337',
    question: "This message constitutes a threat. What should you do?",
    options: [
      { label: 'Reply asking who they are',                                    safe: false, explanation: 'Engaging with a threatening account confirms your profile is active and may escalate the threats.' },
      { label: 'Screenshot, block, report to platform, and report to police',  safe: true,  explanation: 'Correct! Threatening messages (especially those involving knowledge of your location) are potentially criminal. Document everything and report to both the platform and police.' },
      { label: 'Change your username and hope they don\'t find you',           safe: false, explanation: 'This doesn\'t address the threat. A police report creates an official record and may prevent escalation to physical harm.' },
      { label: 'Challenge them publicly to show you\'re not scared',           safe: false, explanation: 'This escalates the situation and puts you at risk. Safety should always come first.' },
    ],
  },
];

export default function CyberbullyingChallenge() {
  const navigate = useNavigate();
  const { saveLevelResult, unlockBadge, incrementMiniGames } = useProgress();
  const [current,   setCurrent]   = useState(0);
  const [selected,  setSelected]  = useState<number | null>(null);
  const [showFeed,  setShowFeed]  = useState(false);
  const [score,     setScore]     = useState(0);
  const [finished,  setFinished]  = useState(false);

  const scenario = scenarios[current];

  const handleSelect = (idx: number) => {
    if (showFeed) return;
    setSelected(idx);
    setShowFeed(true);
    if (scenario.options[idx].safe) setScore(s => s + 25);
  };

  const advance = () => {
    if (current + 1 >= scenarios.length) {
      setFinished(true);
      incrementMiniGames();
      if (score + (selected !== null && scenario.options[selected].safe ? 25 : 0) >= 75) unlockBadge('cyber-kindness');
      saveLevelResult(7, score, 100, 130);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowFeed(false);
    }
  };

  if (finished) {
    const total = score;
    return (
      <Layout>
        <div className="p-6 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-3xl p-8 text-white text-center mb-6 shadow-xl">
            <div className="text-5xl mb-3">💙</div>
            <h1 className="text-2xl font-black mb-1">{total >= 75 ? 'Cyber Kindness Hero!' : 'Good Effort!'}</h1>
            <p className="text-white/80">You scored {total}% on the cyberbullying awareness challenge</p>
            <div className="mt-4 bg-white/20 rounded-2xl px-8 py-4 inline-block">
              <p className="text-4xl font-black">{total}%</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
            <h3 className="font-bold text-gray-800 mb-3">Key Reminders:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {['Always save evidence (screenshots) before blocking or reporting.', 'Use platform reporting tools — they work. Platforms take safety seriously.', 'Serious threats should be reported to police as well as platforms.', 'If you witness bullying, report it — being a bystander matters.', 'Visit esafety.gov.au for Australian cyberbullying support.'].map(t => (
                <li key={t} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">Dashboard</button>
            <button onClick={() => navigate('/results', { state: { levelId:7, score:total, maxScore:100, stars:total>=90?3:total>=70?2:1, xpEarned:Math.round(total*1.3), correctCount:Math.round(total/25), totalQuestions:scenarios.length, levelTitle:'Cyberbullying Awareness Challenge', isMiniGame:true } })} className="flex-1 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-bold shadow-md hover:opacity-90">View Results</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center text-lg">💬</div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Interactive Challenge</p>
            <h1 className="font-bold text-gray-800">Cyberbullying Awareness</h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Scenario {current + 1} / {scenarios.length}</p>
            <p className="font-black text-pink-600">{score} pts</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-5">
          {scenarios.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < current ? 'bg-green-400' : i === current ? 'bg-pink-400' : 'bg-gray-200'}`} />
          ))}
        </div>

        {/* Context */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Situation</p>
          <p className="text-sm text-gray-700 leading-relaxed">{scenario.context}</p>
        </div>

        {/* Chat message mock */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-700">{scenario.sender}</p>
              <p className="text-xs text-gray-400">Now</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm">
            <p className="text-sm text-gray-800">{scenario.message}</p>
          </div>
        </div>

        {/* Question */}
        <h2 className="font-bold text-gray-800 mb-4">{scenario.question}</h2>

        {/* Options */}
        <div className="space-y-3 mb-5">
          {scenario.options.map((opt, idx) => {
            let style = 'border-2 border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50';
            if (showFeed) {
              if (opt.safe) style = 'border-2 border-green-400 bg-green-50 text-green-800';
              else if (idx === selected) style = 'border-2 border-red-400 bg-red-50 text-red-800';
              else style = 'border-2 border-gray-100 text-gray-400 bg-gray-50';
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showFeed}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-medium text-sm flex items-center gap-3 transition-all ${style}`}
              >
                <span className="shrink-0">
                  {showFeed && opt.safe ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : showFeed && idx === selected ? <XCircle className="w-5 h-5 text-red-500" /> : <span className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center text-xs font-bold">{String.fromCharCode(65+idx)}</span>}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>

        {showFeed && selected !== null && (
          <div className={`rounded-2xl p-5 mb-5 border ${scenario.options[selected].safe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="font-bold text-sm mb-1 flex items-center gap-2">
              {scenario.options[selected].safe ? <><CheckCircle2 className="w-5 h-5 text-green-500" /> Correct response! +25 points</> : <><XCircle className="w-5 h-5 text-red-500" /> Not the safest choice</>}
            </p>
            <p className="text-sm text-gray-700">{scenario.options[selected].explanation}</p>
            {scenario.options[selected].safe === false && (
              <p className="text-sm text-green-700 mt-2 font-medium">Best answer: <em>{scenario.options.find(o => o.safe)?.label}</em></p>
            )}
          </div>
        )}

        {showFeed && (
          <button onClick={advance} className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90">
            {current + 1 >= scenarios.length ? 'See Results' : 'Next Scenario'}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </Layout>
  );
}
