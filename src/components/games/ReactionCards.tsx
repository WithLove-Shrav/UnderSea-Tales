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
        className="bg-white/95 rounded-2xl p-4 shadow-lg"
        style={{ border: '2px solid rgba(52,211,153,0.4)' }}
        initial={{ opacity: 0, y: 20 }}
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
            <p className="text-xs font-semibold text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
              What if the shark had opened the package FIRST?
            </p>
            <motion.button
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={handleOpen}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Open the package to see what happens"
            >
              <motion.div
                className="text-6xl"
                animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                aria-hidden="true"
              >
                📦
              </motion.div>
              <motion.div
                className="px-4 py-2 rounded-full font-bold text-sm"
                style={{
                  fontFamily: 'Fredoka One, cursive',
                  background: 'linear-gradient(135deg, #34d399, #10b981)',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(16,185,129,0.4)',
                }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🦈 Tap to Open!
              </motion.div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="shark-opened"
            className="flex items-center gap-3 bg-white/90 rounded-2xl p-3 shadow-lg"
            style={{ border: '2px solid rgba(52,211,153,0.4)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
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
            className="rounded-2xl p-3 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 relative overflow-hidden"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: answered && option.isCorrect
                ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)'
                : answered && selectedId === option.id && !option.isCorrect
                ? 'linear-gradient(135deg, #fee2e2, #fecaca)'
                : hoveredId === option.id
                ? 'rgba(255,255,255,0.98)'
                : 'rgba(255,255,255,0.9)',
              border: answered && option.isCorrect
                ? '2px solid #22c55e'
                : answered && selectedId === option.id
                ? '2px solid #f87171'
                : hoveredId === option.id
                ? '2px solid #34d399'
                : '2px solid rgba(148,163,184,0.3)',
              boxShadow: answered && option.isCorrect ? '0 0 20px rgba(34,197,94,0.3)' : 'none',
              opacity: answered && !option.isCorrect && selectedId !== option.id ? 0.5 : 1,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: answered && !option.isCorrect && selectedId !== option.id ? 0.5 : 1, y: 0, scale: 1 }}
            transition={{ delay: packageOpened ? i * 0.1 : 0, type: 'spring', stiffness: 300 }}
            whileHover={!answered ? { scale: 1.04, y: -3 } : {}}
            whileTap={!answered ? { scale: 0.96 } : {}}
            onClick={() => !answered && onAnswer(option.isCorrect, option.id)}
            onHoverStart={() => setHoveredId(option.id)}
            onHoverEnd={() => setHoveredId(null)}
            disabled={answered || !packageOpened}
            aria-label={`Option ${option.id}: ${option.emoji} ${option.feeling} — ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            {/* Emoji face */}
            <motion.div
              className="text-4xl mb-1"
              animate={answered && option.isCorrect ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            >
              {option.emoji}
            </motion.div>
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
          className="text-center text-xs text-white/70 font-semibold"
          style={{ fontFamily: 'Nunito, sans-serif' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          👆 Open the package first to unlock the reaction cards!
        </motion.p>
      )}
    </div>
  );
}
