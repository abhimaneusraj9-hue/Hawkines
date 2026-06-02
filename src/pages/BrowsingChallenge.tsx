import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, XCircle, Shield, AlertTriangle, Ban, ChevronRight } from 'lucide-react';

type Safety = 'safe' | 'suspicious' | 'dangerous';

interface Site {
  id: string;
  url: string;
  description: string;
  preview: string;
  correct: Safety;
  explanation: string;
}

const sites: Site[] = [
  { id:'s1', url:'https://www.westpac.com.au/login',           description:'Australian bank login page with padlock icon',        preview:'🏦 Westpac Banking — Secure Login',   correct:'safe',       explanation:'Legitimate bank URL with HTTPS and correct domain. The padlock confirms the encrypted connection.' },
  { id:'s2', url:'http://paypa1-secure.net/verify',            description:'Payment processing login, HTTP only, no padlock',      preview:'💳 PayPal Secure Verification',       correct:'dangerous',  explanation:'Two red flags: "paypa1" (1 not l) is a fake domain, and HTTP (no encryption) means your data is unprotected.' },
  { id:'s3', url:'https://amazon.com.au/deals',                description:'Popular online store with deals section',              preview:'🛒 Amazon Australia — Today\'s Deals', correct:'safe',       explanation:'Legitimate Amazon Australia URL with HTTPS. The structure amazon.com.au is correct for Australia.' },
  { id:'s4', url:'https://netf1ix-free-account.com/signup',    description:'Free Netflix account offer, unknown domain',           preview:'🎬 Netflix Free Account — Sign Up Now!', correct:'dangerous', explanation:'Netflix does not give free accounts via third-party sites. This fake domain mimics Netflix to steal credentials.' },
  { id:'s5', url:'http://download-free-software.net/office365',description:'Free Office 365 download from unofficial site',        preview:'💻 Download Microsoft Office 365 FREE!', correct:'dangerous', explanation:'Software downloads from unofficial sites almost always contain malware. Download only from microsoft.com.' },
  { id:'s6', url:'https://www.ato.gov.au/individuals',         description:'Australian government tax office, official .gov.au',   preview:'🏛️ ATO — Individual Tax Return',       correct:'safe',       explanation:'The .gov.au domain is reserved for Australian government agencies — it is a reliable trust signal.' },
  { id:'s7', url:'https://bit.ly/w1n-iph0ne-prize',           description:'Shortened URL claiming you won an iPhone',              preview:'🎁 YOU WON AN IPHONE! Click to claim!', correct:'dangerous', explanation:'Prize scam using a shortened URL to hide the real destination. Legitimate businesses don\'t use bit.ly for prizes.' },
  { id:'s8', url:'https://www.canva.com/templates',            description:'Graphic design tool, reputable service',               preview:'🎨 Canva — Free Design Templates',      correct:'safe',       explanation:'Canva is a legitimate, well-known design platform with HTTPS and a correct domain.' },
];

const safetyConfig = {
  safe:       { label: 'Safe',       icon: Shield,        color: 'text-green-700',  bg: 'bg-green-100',  border: 'border-green-400' },
  suspicious: { label: 'Suspicious', icon: AlertTriangle, color: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-400' },
  dangerous:  { label: 'Dangerous',  icon: Ban,           color: 'text-red-700',    bg: 'bg-red-100',    border: 'border-red-400' },
};

export default function BrowsingChallenge() {
  const navigate = useNavigate();
  const { saveLevelResult, unlockBadge, incrementMiniGames } = useProgress();
  const [answers,   setAnswers]   = useState<Record<string, Safety>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered  = Object.keys(answers).length === sites.length;
  const correctCount = submitted ? sites.filter(s => answers[s.id] === s.correct).length : 0;

  const handleAnswer = (id: string, safety: Safety) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [id]: safety }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    incrementMiniGames();
    const score = Math.round((correctCount / sites.length) * 100);
    if (score >= 90) unlockBadge('safe-browser');
    saveLevelResult(4, score, 100, 150);
  };

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center text-lg">🌐</div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Interactive Challenge</p>
            <h1 className="font-bold text-gray-800">Secure Browsing Challenge</h1>
          </div>
          {submitted && <div className="text-right"><p className="text-xs text-gray-500">Score</p><p className="font-black text-teal-600 text-xl">{correctCount}/{sites.length}</p></div>}
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-5 text-sm text-teal-800">
          <span className="font-bold">Your Mission: </span>For each website below, decide if it is <strong>Safe</strong>, <strong>Suspicious</strong>, or <strong>Dangerous</strong> based on the URL and description.
        </div>

        {/* Legend */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {(Object.entries(safetyConfig) as [Safety, typeof safetyConfig.safe][]).map(([key, cfg]) => (
            <div key={key} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${cfg.bg} ${cfg.color}`}>
              <cfg.icon className="w-3.5 h-3.5" /> {cfg.label}
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          {sites.map(site => {
            const chosen  = answers[site.id];
            const isRight = submitted && chosen === site.correct;
            const isWrong = submitted && chosen && chosen !== site.correct;
            const cfg     = safetyConfig[site.correct];
            return (
              <div key={site.id} className={`bg-white rounded-2xl shadow-sm border-2 p-4 transition-all ${isRight ? 'border-green-300' : isWrong ? 'border-red-300' : 'border-transparent shadow-sm'}`}>
                {/* Browser bar mock */}
                <div className="bg-gray-100 rounded-xl p-2.5 mb-3 flex items-center gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <code className="text-xs text-gray-600 flex-1 truncate font-mono">{site.url}</code>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <p className="text-sm font-medium text-gray-700">{site.preview}</p>
                  <p className="text-xs text-gray-400 mt-1">{site.description}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  {(Object.keys(safetyConfig) as Safety[]).map(safety => {
                    const c = safetyConfig[safety];
                    const selected = chosen === safety;
                    return (
                      <button
                        key={safety}
                        onClick={() => handleAnswer(site.id, safety)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border-2 ${selected ? `${c.bg} ${c.color} ${c.border}` : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'}`}
                      >
                        <c.icon className="w-3.5 h-3.5" /> {c.label}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-3 rounded-xl p-3 border ${isRight ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {isRight ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      <span className={`text-xs font-bold ${isRight ? 'text-green-700' : 'text-red-700'}`}>
                        {isRight ? 'Correct!' : `Incorrect — this is ${site.correct.toUpperCase()}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{site.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {submitted ? (
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-5 text-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-teal-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-800">Challenge Complete!</h3>
            <p className="text-gray-600 text-sm mt-1">You correctly identified <strong>{correctCount} / {sites.length}</strong> websites!</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => navigate('/dashboard')} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">Dashboard</button>
              <button onClick={() => navigate('/results', { state: { levelId:4, score:Math.round((correctCount/sites.length)*100), maxScore:100, stars:correctCount>=7?3:correctCount>=5?2:1, xpEarned:correctCount*15, correctCount, totalQuestions:sites.length, levelTitle:'Secure Browsing Challenge', isMiniGame:true } })} className="flex-1 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-500 text-white rounded-xl font-bold shadow-md hover:opacity-90 flex items-center justify-center gap-2">
                View Results <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allAnswered ? 'Submit My Answers' : `Answer all websites (${Object.keys(answers).length}/${sites.length} done)`}
          </button>
        )}
      </div>
    </Layout>
  );
}
