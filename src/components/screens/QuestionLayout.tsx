import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { questions } from '../../data/questions';
import PearlBadge from '../ui/PearlBadge';
import PearlReward from '../rewards/PearlReward';
import SpeechBubbleChoice from '../games/SpeechBubbleChoice';
import ReactionCards from '../games/ReactionCards';
import TreasureChestSort from '../games/TreasureChestSort';
import EmotionShellGame from '../games/EmotionShellGame';
import comicStrip from '../../assets/comic-strip.png';

function ComicSidebar() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
          📖 Refer back to the comic anytime!
        </p>
        <motion.button
          className="text-xs px-2 py-1 rounded-full font-bold cursor-pointer"
          style={{ fontFamily: 'Fredoka One, cursive', background: 'rgba(255,255,255,0.2)', color: 'white' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setZoomed(z => !z)}
          aria-label={zoomed ? 'Zoom out comic' : 'Zoom in comic'}
        >
          {zoomed ? '🔍 Zoom Out' : '🔍 Zoom In'}
        </motion.button>
      </div>

      <motion.div
        className="rounded-2xl overflow-auto shadow-xl flex-1 cursor-zoom-in"
        style={{
          border: '3px solid rgba(255,255,255,0.4)',
          maxHeight: 'calc(100vh - 200px)',
        }}
        animate={{ scale: zoomed ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        onClick={() => setZoomed(z => !z)}
        role="button"
        aria-label="Click to zoom comic"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setZoomed(z => !z)}
      >
        <img
          src={comicStrip}
          alt="Full comic strip: Undersea Tales — Shark tells the Crab about forgetting his wife's birthday, a cake that caught fire, and a golf putter package, while the Crab says 'Oh, well.'"
          className="w-full h-auto block"
          draggable={false}
        />
      </motion.div>
      <p className="text-xs text-white/50 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Tap to zoom · Scroll to explore
      </p>
    </div>
  );
}

function FeedbackBar({ message, type }: { message: string; type: 'wrong' | 'hint' }) {
  return (
    <motion.div
      className="rounded-2xl px-4 py-3 text-sm font-semibold"
      style={{
        fontFamily: 'Nunito, sans-serif',
        background: type === 'wrong' ? 'rgba(254,226,226,0.95)' : 'rgba(254,243,199,0.95)',
        border: type === 'wrong' ? '2px solid #fca5a5' : '2px solid #fde68a',
        color: type === 'wrong' ? '#991b1b' : '#92400e',
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      role="alert"
      aria-live="polite"
    >
      {type === 'wrong' ? '💡 ' : '🐢 '}{message}
    </motion.div>
  );
}

export default function QuestionLayout() {
  const { state, dispatch } = useGame();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'wrong' | 'hint'>('hint');
  const [questionKey, setQuestionKey] = useState(0);

  const currentQ = state.currentQuestion;
  const question = questions[currentQ];

  const handleAnswer = useCallback((isCorrect: boolean, optionId: string) => {
    setSelectedId(optionId);
    dispatch({ type: 'INCREMENT_ATTEMPT', index: currentQ });

    if (isCorrect) {
      setAnswered(true);
      setFeedbackMsg(null);
      dispatch({ type: 'EARN_PEARL', index: currentQ });
      setTimeout(() => setShowReward(true), 400);
    } else {
      setFeedbackMsg(question.wrongFeedback);
      setFeedbackType('wrong');
      // Allow retry — reset selection after a moment
      setTimeout(() => {
        setSelectedId(null);
        setFeedbackMsg(question.turtleTip || null);
        setFeedbackType('hint');
      }, 2000);
    }
  }, [currentQ, dispatch, question]);

  const handleRewardComplete = () => {
    setShowReward(false);
    setTimeout(() => {
      setAnswered(false);
      setSelectedId(null);
      setFeedbackMsg(null);
      setQuestionKey(k => k + 1);
      dispatch({ type: 'NEXT_QUESTION' });
    }, 300);
  };

  if (!question) return null;

  return (
    <>
      {/* Pearl Reward Overlay */}
      <PearlReward
        show={showReward}
        pearlColor={question.pearlColor}
        pearlGradient={question.pearlGradient}
        pearlEmoji={question.pearlEmoji}
        pearlName={question.pearlName}
        message={question.correctFeedback}
        onComplete={handleRewardComplete}
      />

      <div className="flex min-h-screen p-3 gap-3" style={{ maxHeight: '100dvh', overflow: 'hidden' }}>
        {/* LEFT — Comic sidebar */}
        <motion.div
          className="hidden md:flex flex-col"
          style={{ width: 280, flexShrink: 0 }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ComicSidebar />
        </motion.div>

        {/* RIGHT — Question panel */}
        <motion.div
          className="flex flex-col flex-1 gap-3 overflow-y-auto"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top HUD — Pearl collection */}
          <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 flex-wrap">
            {/* Pearl badges */}
            <div className="flex gap-2 flex-1">
              {questions.map((q, i) => (
                <PearlBadge
                  key={i}
                  index={i}
                  earned={state.pearlsEarned[i]}
                  active={i === currentQ}
                  color={q.pearlColor}
                  gradient={q.pearlGradient}
                  emoji={q.pearlEmoji}
                  name={q.pearlName}
                  small
                />
              ))}
            </div>

            {/* Progress label */}
            <div className="text-right">
              <p className="text-xs font-bold text-white" style={{ fontFamily: 'Fredoka One, cursive' }}>
                Question {currentQ + 1} / 4
              </p>
              <p className="text-xs text-white/70" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {state.pearlsEarned.filter(Boolean).length} pearls collected
              </p>
            </div>
          </div>

          {/* Pearl title card */}
          <motion.div
            className="rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${question.pearlColor}33, ${question.pearlColor}11)`,
              border: `2px solid ${question.pearlColor}55`,
            }}
            key={`pearl-${currentQ}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
          >
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              {question.pearlEmoji}
            </motion.span>
            <div>
              <h2 className="text-base font-bold text-white" style={{ fontFamily: 'Fredoka One, cursive' }}>
                {question.pearlName}
              </h2>
              <p className="text-xs text-white/70" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Skill: {question.skill}
              </p>
            </div>
          </motion.div>

          {/* Mobile comic strip toggle */}
          <details className="md:hidden">
            <summary className="text-xs font-bold text-white/80 cursor-pointer px-2 py-1 rounded-xl" style={{ fontFamily: 'Nunito, sans-serif', background: 'rgba(255,255,255,0.1)' }}>
              📖 Show/Hide Comic Strip
            </summary>
            <div className="mt-2 rounded-2xl overflow-hidden border-2 border-white/30">
              <img src={comicStrip} alt="Comic strip" className="w-full" />
            </div>
          </details>

          {/* Feedback bar */}
          <AnimatePresence mode="wait">
            {feedbackMsg && (
              <FeedbackBar key={feedbackMsg} message={feedbackMsg} type={feedbackType} />
            )}
          </AnimatePresence>

          {/* Game component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`q-${currentQ}-${questionKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {question.gameType === 'speech-bubble' && (
                <SpeechBubbleChoice
                  options={question.options}
                  questionText={question.questionText}
                  onAnswer={handleAnswer}
                  answered={answered}
                  selectedId={selectedId}
                />
              )}
              {question.gameType === 'reaction-cards' && (
                <ReactionCards
                  options={question.options}
                  questionText={question.questionText}
                  contextText={question.contextText}
                  onAnswer={handleAnswer}
                  answered={answered}
                  selectedId={selectedId}
                />
              )}
              {question.gameType === 'treasure-chest' && (
                <TreasureChestSort
                  options={question.options}
                  questionText={question.questionText}
                  contextText={question.contextText}
                  onAnswer={handleAnswer}
                  answered={answered}
                  selectedId={selectedId}
                />
              )}
              {question.gameType === 'emotion-shells' && (
                <EmotionShellGame
                  options={question.options}
                  questionText={question.questionText}
                  contextText={question.contextText}
                  onAnswer={handleAnswer}
                  answered={answered}
                  selectedId={selectedId}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Turtle tip (always visible) */}
          <motion.div
            className="flex items-start gap-3 rounded-2xl p-3"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-2xl" aria-hidden="true">🐢</span>
            <div>
              <p className="text-xs font-bold text-white" style={{ fontFamily: 'Fredoka One, cursive' }}>
                Tully's Tip:
              </p>
              <p className="text-xs text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {question.turtleTip || "Read the comic carefully and trust your instincts!"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
