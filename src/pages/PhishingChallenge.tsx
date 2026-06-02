import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, AlertTriangle, Flag, Info } from 'lucide-react';

interface RedFlag {
  id: string;
  label: string;
  description: string;
  found: boolean;
  highlightClass: string;
}

const initialFlags: RedFlag[] = [
  { id:'sender',      label:'Fake Sender Address',        description:'The email comes from "amazon-security@gmail.com". Real Amazon emails come from @amazon.com, not Gmail.',         found:false, highlightClass:'border-b-2 border-red-500 bg-red-50 cursor-pointer hover:bg-red-100' },
  { id:'urgency',     label:'Urgent Warning Message',     description:'Phrases like "IMMEDIATE ACTION REQUIRED" and "24 HOURS" are pressure tactics designed to make you panic.',       found:false, highlightClass:'border-b-2 border-orange-500 bg-orange-50 cursor-pointer hover:bg-orange-100' },
  { id:'link',        label:'Suspicious Link',            description:'Hovering reveals "http://amaz0n-secure.net" — a fake domain using "0" instead of "o" to mimic Amazon.',          found:false, highlightClass:'border-b-2 border-purple-500 bg-purple-50 cursor-pointer hover:bg-purple-100' },
  { id:'attachment',  label:'Unknown Attachment',         description:'Executable files (.exe) in emails are almost always malware. Never open attachments from suspicious emails.',      found:false, highlightClass:'border-b-2 border-pink-500 bg-pink-50 cursor-pointer hover:bg-pink-100' },
  { id:'grammar',     label:'Spelling / Grammar Issue',   description:'"Immediatley" is misspelled. Professional companies proofread their communications carefully.',                   found:false, highlightClass:'border-b-2 border-yellow-500 bg-yellow-50 cursor-pointer hover:bg-yellow-100' },
  { id:'password',    label:'Request for Password',       description:'Amazon will NEVER ask for your password via email. Any such request is a definitive sign of phishing.',          found:false, highlightClass:'border-b-2 border-blue-500 bg-blue-50 cursor-pointer hover:bg-blue-100' },
];

export default function PhishingChallenge() {
  const navigate = useNavigate();
  const { saveLevelResult, unlockBadge, incrementMiniGames } = useProgress();
  const [flags,     setFlags]     = useState<RedFlag[]>(initialFlags);
  const [feedback,  setFeedback]  = useState<RedFlag | null>(null);
  const [reported,  setReported]  = useState(false);
  const [finished,  setFinished]  = useState(false);

  const foundCount = flags.filter(f => f.found).length;

  const handleClick = (id: string) => {
    if (reported) return;
    const flag = flags.find(f => f.id === id)!;
    if (!flag.found) {
      setFlags(prev => prev.map(f => f.id === id ? { ...f, found: true } : f));
    }
    setFeedback(flag);
  };

  const handleReport = () => {
    if (foundCount === 0) return;
    setReported(true);
    setFinished(true);
    incrementMiniGames();
    const score = (foundCount / flags.length) * 100;
    saveLevelResult(1, Math.round(score), 100, 100);
    unlockBadge('phishing-defender');
  };

  if (finished) {
    const pct = Math.round((foundCount / flags.length) * 100);
    return (
      <Layout>
        <div className="p-6 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-red-400 to-rose-500 rounded-3xl p-8 text-white text-center mb-6 shadow-xl">
            <div className="text-5xl mb-3">🎣</div>
            <h1 className="text-2xl font-black mb-1">{pct >= 80 ? 'Excellent Detective Work!' : 'Good Effort!'}</h1>
            <p className="text-white/80">You identified {foundCount} of {flags.length} red flags</p>
            <div className="mt-4 bg-white/20 rounded-2xl px-8 py-4 inline-block">
              <p className="text-4xl font-black">{pct}%</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
            <h3 className="font-bold text-gray-800 mb-3">Red Flags in This Email:</h3>
            <div className="space-y-3">
              {initialFlags.map(f => (
                <div key={f.id} className={`flex items-start gap-3 p-3 rounded-xl ${flags.find(fl => fl.id === f.id)?.found ? 'bg-green-50' : 'bg-red-50'}`}>
                  {flags.find(fl => fl.id === f.id)?.found ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{f.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex-1 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">Dashboard</button>
            <button onClick={() => navigate('/results', { state: { levelId:1, score:foundCount*17, maxScore:100, stars: pct>=90?3:pct>=70?2:1, xpEarned:foundCount*10, correctCount:foundCount, totalQuestions:flags.length, levelTitle:'Phishing Alert Challenge', isMiniGame:true } })} className="flex-1 py-3.5 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl font-bold shadow-md hover:opacity-90">View Results</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center text-lg">🎣</div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Interactive Challenge</p>
            <h1 className="font-bold text-gray-800">Phishing Alert</h1>
          </div>
          <div className="ml-auto bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-xl text-sm">{foundCount} / {flags.length} found</div>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Your Mission</p>
            <p className="text-amber-700 text-sm mt-1">Click on the <strong>suspicious parts</strong> of this email to identify the {flags.length} red flags. Then click <strong>Report Phishing</strong> to complete the challenge.</p>
          </div>
        </div>

        {/* Fake email */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-5">
          {/* Email header */}
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-500 w-12">From:</span>
                  <span
                    onClick={() => handleClick('sender')}
                    className={`font-medium transition-all rounded px-1 ${flags.find(f=>f.id==='sender')?.found ? 'bg-red-100 text-red-800 line-through' : 'text-gray-800 hover:bg-red-50 cursor-pointer'}`}
                  >
                    amazon-security@gmail.com
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-12">To:</span>
                  <span className="text-gray-700">you@email.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-12">Subject:</span>
                  <span className="font-semibold text-gray-800">⚠️ Your Amazon account has been compromised</span>
                </div>
              </div>
              <span className="text-xs text-gray-400">Today, 9:42 AM</span>
            </div>
          </div>

          {/* Email body */}
          <div className="p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>Dear Valued Customer,</p>
            <p>
              <span
                onClick={() => handleClick('urgency')}
                className={`font-bold uppercase transition-all rounded px-1 ${flags.find(f=>f.id==='urgency')?.found ? 'bg-orange-100 text-orange-800' : 'text-red-600 hover:bg-orange-50 cursor-pointer'}`}
              >
                ⚠️ IMMEDIATE ACTION REQUIRED WITHIN 24 HOURS ⚠️
              </span>
            </p>
            <p>
              We have detected unusual activity on your Amazon account. To protect your account, you must verify your identity{' '}
              <span
                onClick={() => handleClick('urgency')}
                className="font-bold text-red-600 cursor-pointer"
              >
                immediatley
              </span>
              {' '}— or{' '}
              <span
                onClick={() => handleClick('grammar')}
                className={`underline transition-all rounded px-1 ${flags.find(f=>f.id==='grammar')?.found ? 'bg-yellow-100 text-yellow-800 no-underline' : 'hover:bg-yellow-50 cursor-pointer'}`}
              >
                immediatley
              </span>.
            </p>
            <p>Please click the secure link below to verify your account:</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span
                onClick={() => handleClick('link')}
                className={`text-blue-600 underline cursor-pointer transition-all rounded px-1 ${flags.find(f=>f.id==='link')?.found ? 'bg-purple-100 text-purple-800 no-underline' : 'hover:bg-purple-50'}`}
              >
                Click here to verify your Amazon account
              </span>
              <p className="text-xs text-gray-400 mt-1">http://amaz0n-secure.net/verify/account</p>
            </div>
            <p>
              For security purposes, please provide your{' '}
              <span
                onClick={() => handleClick('password')}
                className={`font-bold cursor-pointer transition-all rounded px-1 ${flags.find(f=>f.id==='password')?.found ? 'bg-blue-100 text-blue-800' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                current password and payment details
              </span>
              {' '}to complete the verification process.
            </p>
            <p>Best regards,<br />Amazon Security Team</p>

            {/* Attachment */}
            <div
              onClick={() => handleClick('attachment')}
              className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all ${flags.find(f=>f.id==='attachment')?.found ? 'border-pink-300 bg-pink-50' : 'border-gray-200 hover:bg-pink-50 hover:border-pink-200'}`}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg">📎</div>
              <div>
                <p className="font-medium text-gray-800 text-sm">VerifyAccount_Amazon.exe</p>
                <p className="text-xs text-gray-400">2.4 MB • Click to open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback panel */}
        {feedback && (
          <div className={`rounded-xl p-4 mb-5 border ${feedback.found ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold text-green-700 text-sm">Red Flag Found: {feedback.label}</span>
            </div>
            <p className="text-sm text-gray-700">{feedback.description}</p>
          </div>
        )}

        {/* Flag checklist */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
          <h3 className="font-bold text-gray-700 text-sm mb-3">Red Flags Checklist:</h3>
          <div className="grid grid-cols-2 gap-2">
            {flags.map(f => (
              <div key={f.id} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${f.found ? 'bg-green-50 text-green-700' : 'text-gray-400'}`}>
                {f.found ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <div className="w-4 h-4 border-2 border-gray-300 rounded-full shrink-0" />}
                <span className={f.found ? 'line-through' : ''}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleReport}
          disabled={foundCount === 0}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          <Flag className="w-6 h-6" />
          Report Phishing Email ({foundCount} flag{foundCount !== 1 ? 's' : ''} found)
        </button>
      </div>
    </Layout>
  );
}
