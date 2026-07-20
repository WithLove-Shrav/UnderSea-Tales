import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';

interface ReactionCardsProps {
  options: QuestionOption[];
  questionText: string;
  contextText?: string;
  onAnswer: (isCorrect: boolean, optionId: string) => void;
  answered: boolean;
  selectedId: string | null;
}

export default function ReactionCards({ options, questionText, contextText, onAnswer, answered, selectedId }: ReactionCardsProps) {
  const [packageOpened, setPackageOpened] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleOpen = () => {
    if (!packageOpened) setPackageOpened(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Context + Question */}
      <motion.div
        className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {contextText && (
          <p className="text-xs font-semibold text-emerald-700 mb-2 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
            📦 {contextText}
          </p>
        )}
        <p className="text-sm font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Interactive package */}
      <AnimatePresence mode="wait">
        {!packageOpened ? (
          <motion.div
            key="package"
            className="flex flex-col items-center gap-2 py-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
          >
            <p className="text-sm font-semibold text-slate-600 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              What if the shark had opened the package FIRST?
            </p>
            <motion.button
              className="flex flex-col items-center gap-3 cursor-pointer"
              onClick={handleOpen}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open the package to see what happens"
            >
              <motion.div
                className="text-6xl drop-shadow-sm"
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                📦
              </motion.div>
              <div
                className="px-6 py-3 rounded-full font-bold text-sm bg-white text-emerald-700 shadow-sm border border-emerald-100"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Tap to Open!
              </div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="shark-opened"
            className="flex items-center gap-4 bg-white/90 rounded-2xl p-5 shadow-sm border border-slate-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-4xl" aria-hidden="true">🦈</div>
            <div>
              <p className="text-xs font-bold text-emerald-700" style={{ fontFamily: 'Fredoka One, cursive' }}>
                Shark opens the package first!
              </p>
              <p className="text-xs text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                "Oh, it's my new golf putter." His wife watches...
              </p>
            </div>
            <div className="text-3xl ml-auto" aria-hidden="true">👀</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wife reaction cards */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="rounded-2xl p-5 md:p-6 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 relative overflow-hidden bg-white shadow-sm"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: answered && option.isCorrect
                ? '#dcfce7'
                : answered && selectedId === option.id && !option.isCorrect
                ? '#fee2e2'
                : 'white',
              border: answered && option.isCorrect
                ? '1px solid #86efac'
                : answered && selectedId === option.id
                ? '1px solid #fca5a5'
                : hoveredId === option.id
                ? '1px solid #10b981'
                : '1px solid #e2e8f0',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: answered && !option.isCorrect && selectedId !== option.id ? 0.4 : 1, y: 0, scale: 1 }}
            transition={{ delay: packageOpened ? i * 0.05 : 0, duration: 0.3 }}
            whileHover={!answered ? { backgroundColor: '#f8fafc' } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            onClick={() => !answered && onAnswer(option.isCorrect, option.id)}
            onHoverStart={() => setHoveredId(option.id)}
            onHoverEnd={() => setHoveredId(null)}
            disabled={answered || !packageOpened}
            aria-label={`Option ${option.id}: ${option.emoji} ${option.feeling} — ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            {/* Reaction Image or Emoji */}
            {option.image ? (
              <motion.img
                src={option.image}
                alt={option.feeling}
                className="w-16 h-16 object-contain mb-2 mx-auto"
                animate={answered && option.isCorrect ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <motion.div
                className="text-4xl mb-1"
                animate={answered && option.isCorrect ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
              >
                {option.emoji}
              </motion.div>
            )}
            <div
              className="text-xs font-bold mb-1"
              style={{ color: '#1e3a5f', fontFamily: 'Fredoka One, cursive' }}
            >
              {option.feeling}
            </div>
            <div
              className="text-xs leading-tight"
              style={{ color: '#475569', fontFamily: 'Nunito, sans-serif' }}
            >
              {option.text}
            </div>

            {/* Selection indicator */}
            {answered && option.isCorrect && (
              <motion.div
                className="absolute top-2 right-2 text-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                ✅
              </motion.div>
            )}
            {answered && selectedId === option.id && !option.isCorrect && (
              <div className="absolute top-2 right-2 text-lg">❌</div>
            )}
          </motion.button>
        ))}
      </div>

      {!packageOpened && (
        <motion.p
          className="text-center text-sm text-slate-500 font-medium"
          style={{ fontFamily: 'Nunito, sans-serif' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          👆 Open the package first to unlock the reaction cards
        </motion.p>
      )}
    </div>
  );
}
