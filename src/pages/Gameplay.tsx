import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import { levels } from '../data/levels';
import { getQuestionsForLevel, Question } from '../data/questions';
import { ChevronRight, Timer, Lightbulb, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function Gameplay() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { saveLevelResult, unlockBadge } = useProgress();

  const id = parseInt(levelId ?? '1', 10);
  const level = levels.find(l => l.id === id);
  const questions = getQuestionsForLevel(id);

  const [current,     setCurrent]     = useState(0);
  const [selected,    setSelected]    = useState<number | null>(null);
  const [showResult,  setShowResult]  = useState(false);
  const [showHint,    setShowHint]    = useState(false);
  const [timeLeft,    setTimeLeft]    = useState(level?.timeLimit ?? 30);
  const [score,       setScore]       = useState(0);
  const [correctCount,setCorrectCount]= useState(0);
  const [finished,    setFinished]    = useState(false);

  const q: Question | undefined = questions[current];
  const totalXP = level?.xpReward ?? 100;
  const perQ = q?.xp ?? 20;

  const advance = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
      setShowHint(false);
      setTimeLeft(level?.timeLimit ?? 30);
    }
  }, [current, questions.length, level]);

  // Timer
  useEffect(() => {
    if (showResult || finished || !q) return;
    if (timeLeft <= 0) {
      setShowResult(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, showResult, finished, q]);

  // Save and redirect when finished
  useEffect(() => {
    if (!finished || !level) return;
    const maxScore = questions.reduce((a, q) => a + q.xp, 0);
    const { stars, xpEarned } = saveLevelResult(id, score, maxScore, totalXP);

    // Unlock badges based on level
    if (id === 1) unlockBadge('phishing-defender');
    if (id === 2 && stars === 3) unlockBadge('password-master');
    if (id === 3) unlockBadge('privacy-protector');
    if (id === 4) unlockBadge('safe-browser');
    if (id === 5) unlockBadge('scam-spotter');
    if (id === 7) unlockBadge('cyber-kindness');
    if (score === questions.reduce((a, q) => a + q.xp, 0)) unlockBadge('perfect-score');

    navigate('/results', {
      state: {
        levelId: id,
        score,
        maxScore,
        stars,
        xpEarned,
        correctCount,
        totalQuestions: questions.length,
        levelTitle: level.title,
      },
      replace: true,
    });
  }, [finished]);

  const handleSelect = (idx: number) => {
    if (showResult || selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    const correct = idx === q!.correctIndex;
    if (correct) {
      setScore(s => s + perQ);
      setCorrectCount(c => c + 1);
    }
  };

  if (!level || questions.length === 0) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-64">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Level not found or no questions available.</p>
            <button onClick={() => navigate('/levels')} className="mt-4 px-6 py-2.5 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors">
              Back to Levels
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!q) return null;

  const timerPct = (timeLeft / (level.timeLimit)) * 100;
  const timerColor = timerPct > 50 ? 'bg-teal-500' : timerPct > 25 ? 'bg-amber-400' : 'bg-red-500';

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 bg-gradient-to-br ${level.gradient} rounded-xl flex items-center justify-center text-lg`}>
            {level.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">{level.topic}</p>
            <h1 className="font-bold text-gray-800">{level.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Score</p>
            <p className="font-black text-teal-600 text-xl">{score}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <ProgressBar
            current={current}
            max={questions.length}
            color={`bg-gradient-to-r ${level.gradient}`}
            labelLeft={`Question ${current + 1} of ${questions.length}`}
            labelRight={`${correctCount} correct`}
            showLabel={false}
          />
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3 mb-5 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <Timer className={`w-5 h-5 ${timerPct < 25 ? 'text-red-500' : 'text-gray-500'}`} />
          <div className="flex-1">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className={`h-2 ${timerColor} rounded-full transition-all duration-1000`} style={{ width: `${timerPct}%` }} />
            </div>
          </div>
          <span className={`font-bold tabular-nums w-10 text-right ${timerPct < 25 ? 'text-red-500' : 'text-gray-700'}`}>{timeLeft}s</span>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          {/* Scenario */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
            <p className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">Scenario</p>
            <p className="text-sm text-blue-900 leading-relaxed">{q.scenario}</p>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-5">{q.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let style = 'border-2 border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50';
              if (showResult) {
                if (idx === q.correctIndex) style = 'border-2 border-green-400 bg-green-50 text-green-800';
                else if (idx === selected) style = 'border-2 border-red-400 bg-red-50 text-red-800';
                else style = 'border-2 border-gray-100 text-gray-400 bg-gray-50';
              } else if (selected === idx) {
                style = 'border-2 border-teal-400 bg-teal-50 text-teal-800';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-3 ${style}`}
                >
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${showResult && idx === q.correctIndex ? 'border-green-400 text-green-600' : showResult && idx === selected ? 'border-red-400 text-red-600' : 'border-current'}`}>
                    {showResult && idx === q.correctIndex ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : showResult && idx === selected && idx !== q.correctIndex ? <XCircle className="w-4 h-4 text-red-500" /> : String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setShowHint(h => !h)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
          >
            <Lightbulb className="w-4 h-4" /> {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        </div>

        {showHint && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <span className="font-bold">Hint: </span>{q.tip}
            </p>
          </div>
        )}

        {/* Feedback */}
        {showResult && (
          <div className={`rounded-2xl p-5 mb-5 border ${selected === q.correctIndex ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-3 mb-3">
              {selected === q.correctIndex
                ? <><CheckCircle2 className="w-6 h-6 text-green-500" /><span className="font-bold text-green-700">Correct! +{perQ} XP</span></>
                : <><XCircle className="w-6 h-6 text-red-500" /><span className="font-bold text-red-700">Not quite right</span></>}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-2"><span className="font-bold">Explanation: </span>{q.explanation}</p>
            <p className="text-sm text-gray-600"><span className="font-bold">💡 Tip: </span>{q.tip}</p>
          </div>
        )}

        {showResult && (
          <button
            onClick={advance}
            className={`w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity bg-gradient-to-r ${level.gradient}`}
          >
            {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </Layout>
  );
}
