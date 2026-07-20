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
import TreasureDecoder from '../games/TreasureDecoder';
import OceanMoodCompass from '../games/OceanMoodCompass';
import comicStrip from '../../assets/comic-strip.png';

// ─── Comic Zoom Modal ────────────────────────────────────────────────────────
function ComicZoomModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Comic strip zoomed view"
    >
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={comicStrip}
          alt="Full comic strip zoomed in"
          className="w-full h-auto rounded-2xl shadow-2xl"
          style={{ border: '4px solid rgba(255,255,255,0.6)' }}
        />
        <motion.button
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center cursor-pointer shadow-xl"
          style={{ background: 'white', color: '#1e3a5f', border: '2px solid rgba(6,182,212,0.4)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close zoomed comic"
        >
          ✕
        </motion.button>
        <p className="text-center text-white/70 text-xs mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Click outside or ✕ to close
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Comic Sidebar (thumbnail + click to zoom) ───────────────────────────────
function ComicSidebar({ onZoom }: { onZoom: () => void }) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <p className="text-xs font-bold text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
        📖 Refer back to the comic anytime!
      </p>

      {/* Thumbnail — click to zoom */}
      <motion.button
        className="relative rounded-2xl overflow-hidden shadow-xl flex-1 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-white/60 text-left"
        style={{ border: '3px solid rgba(255,255,255,0.4)', minHeight: 0 }}
        onClick={onZoom}
        whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.7)' }}
        whileTap={{ scale: 0.98 }}
        aria-label="Click to zoom the comic strip"
      >
        <img
          src={comicStrip}
          alt="Comic strip thumbnail — click to zoom"
          className="w-full h-full object-contain"
          draggable={false}
        />
        {/* Zoom hint overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0)' }}
          whileHover={{ background: 'rgba(0,0,0,0.18)' }}
        >
          <motion.div
            className="rounded-full px-3 py-1 text-xs font-bold opacity-0"
            style={{ fontFamily: 'Fredoka One, cursive', background: 'rgba(255,255,255,0.9)', color: '#1e3a5f' }}
            whileHover={{ opacity: 1 }}
          >
            🔍 Click to zoom
          </motion.div>
        </motion.div>
      </motion.button>

      <p className="text-xs text-white/40 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Click to enlarge
      </p>
    </div>
  );
}

// ─── Feedback Bar ────────────────────────────────────────────────────────────
function FeedbackBar({ message, type }: { message: string; type: 'wrong' | 'hint' }) {
  return (
    <motion.div
      className="rounded-2xl px-6 py-4 text-sm md:text-base font-semibold shadow-sm"
      style={{
        fontFamily: 'Nunito, sans-serif',
        background: type === 'wrong' ? 'rgba(254,226,226,0.95)' : 'rgba(255,255,255,0.9)',
        border: type === 'wrong' ? '1px solid #fca5a5' : '1px solid rgba(255,255,255,0.8)',
        color: type === 'wrong' ? '#991b1b' : '#334155',
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      role="alert"
      aria-live="polite"
    >
      {type === 'wrong' ? '❌ Incorrect. ' : '🐢 '}{message}
    </motion.div>
  );
}

// ─── Main Layout ─────────────────────────────────────────────────────────────
export default function QuestionLayout() {
  const { state, dispatch } = useGame();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'wrong' | 'hint'>('hint');
  const [questionKey, setQuestionKey] = useState(0);
  const [showZoom, setShowZoom] = useState(false);

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
      setTimeout(() => {
        setSelectedId(null);
        setFeedbackMsg(null);
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
        explanation={question.explanation}
        onComplete={handleRewardComplete}
      />

      {/* Comic Zoom Modal */}
      <AnimatePresence>
        {showZoom && <ComicZoomModal onClose={() => setShowZoom(false)} />}
      </AnimatePresence>

      <div className="flex min-h-screen p-4 md:p-8 gap-6 md:gap-8" style={{ maxHeight: '100dvh', overflow: 'hidden' }}>

        {/* LEFT — Comic sidebar */}
        <motion.div
          className="hidden md:flex flex-col"
          style={{ width: 260, flexShrink: 0 }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ComicSidebar onZoom={() => setShowZoom(true)} />
        </motion.div>

        {/* RIGHT — Question panel */}
        <motion.div
          className="flex flex-col flex-1 gap-3 overflow-y-auto"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top HUD — Pearl collection */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center justify-between gap-4 border border-white/60 shadow-sm">
            <div className="flex gap-3">
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
            className="rounded-2xl px-6 py-5 flex items-center gap-4 bg-white/70 backdrop-blur-sm border border-white shadow-sm"
            key={`pearl-${currentQ}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.span
              className="text-4xl drop-shadow-sm"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              {question.pearlEmoji}
            </motion.span>
            <div>
              <h2 className="text-lg md:text-xl font-bold" style={{ fontFamily: 'Fredoka One, cursive', color: '#0369a1' }}>
                {question.pearlName}
              </h2>
              <p className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: '#475569' }}>
                Skill: {question.skill}
              </p>
            </div>
          </motion.div>

          {/* Mobile comic strip toggle */}
          <details className="md:hidden">
            <summary
              className="text-xs font-bold text-white/80 cursor-pointer px-3 py-2 rounded-xl"
              style={{ fontFamily: 'Nunito, sans-serif', background: 'rgba(255,255,255,0.1)' }}
            >
              📖 Show/Hide Comic Strip
            </summary>
            <motion.button
              className="mt-2 w-full rounded-2xl overflow-hidden border-2 border-white/30 cursor-zoom-in"
              onClick={() => setShowZoom(true)}
              aria-label="Tap to zoom comic strip"
            >
              <img src={comicStrip} alt="Comic strip" className="w-full" />
            </motion.button>
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
              {question.gameType === 'treasure-decoder' && (
                <TreasureDecoder
                  options={question.options}
                  questionText={question.questionText}
                  contextText={question.contextText}
                  onAnswer={handleAnswer}
                  answered={answered}
                  selectedId={selectedId}
                />
              )}
              {question.gameType === 'mood-compass' && (
                <OceanMoodCompass
                  options={question.options}
                  questionText={question.questionText}
                  onAnswer={handleAnswer}
                  answered={answered}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
