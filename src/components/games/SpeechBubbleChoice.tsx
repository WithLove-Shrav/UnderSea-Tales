import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';

interface SpeechBubbleChoiceProps {
  options: QuestionOption[];
  questionText: string;
  onAnswer: (isCorrect: boolean, optionId: string) => void;
  answered: boolean;
  selectedId: string | null;
}

export default function SpeechBubbleChoice({ options, questionText, onAnswer, answered, selectedId }: SpeechBubbleChoiceProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [flyingId, setFlyingId] = useState<string | null>(null);

  const handleSelect = (option: QuestionOption) => {
    if (answered) return;
    setFlyingId(option.id);
    setTimeout(() => {
      setFlyingId(null);
      onAnswer(option.isCorrect, option.id);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Question */}
      <motion.div
        className="bg-white/95 rounded-2xl p-4 shadow-lg"
        style={{ border: '2px solid rgba(96,165,250,0.4)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Comic crab with empty bubble */}
      <motion.div
        className="relative flex items-start gap-4 bg-white/90 rounded-2xl p-4 shadow-lg"
        style={{ border: '2px solid rgba(96,165,250,0.3)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-5xl select-none" aria-hidden="true">🦀</div>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedId && answered ? (
              <motion.div
                key="answered"
                className="rounded-2xl px-4 py-3 relative"
                style={{
                  background: options.find(o => o.id === selectedId)?.isCorrect
                    ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)'
                    : 'linear-gradient(135deg, #fee2e2, #fecaca)',
                  border: `2px solid ${options.find(o => o.id === selectedId)?.isCorrect ? '#22c55e' : '#f87171'}`,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-sm font-bold" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
                  {options.find(o => o.id === selectedId)?.text}
                </p>
                <div className="absolute top-1 right-2 text-lg">
                  {options.find(o => o.id === selectedId)?.isCorrect ? '😊' : '😅'}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="border-2 border-dashed border-sky-400 rounded-2xl px-4 py-4 text-center"
                style={{ background: 'rgba(186,230,253,0.3)', minHeight: 60 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-xs font-semibold text-sky-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  💬 Tap a bubble below to fill in what the crab says!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating speech bubble options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="w-full text-left rounded-2xl px-4 py-3 font-semibold text-sm cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: answered && option.isCorrect
                ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)'
                : answered && selectedId === option.id && !option.isCorrect
                ? 'linear-gradient(135deg, #fee2e2, #fecaca)'
                : 'rgba(255,255,255,0.92)',
              border: answered && option.isCorrect
                ? '2px solid #22c55e'
                : answered && selectedId === option.id
                ? '2px solid #f87171'
                : hoveredId === option.id
                ? '2px solid #38bdf8'
                : '2px solid rgba(148,163,184,0.3)',
              color: '#1e3a5f',
              boxShadow: flyingId === option.id ? '0 0 30px 8px rgba(96,165,250,0.6)' : 'none',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: answered && !option.isCorrect && selectedId !== option.id ? 0.5 : 1,
              y: 0,
              x: flyingId === option.id ? [0, -10, 10, 0] : 0,
              scale: flyingId === option.id ? [1, 1.05, 1] : 1,
            }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            whileHover={!answered ? { scale: 1.02, y: -2 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(option)}
            onHoverStart={() => setHoveredId(option.id)}
            onHoverEnd={() => setHoveredId(null)}
            disabled={answered}
            aria-label={`Option ${option.id}: ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            <div className="flex items-center gap-3">
              {/* Bubble indicator */}
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  background: answered && option.isCorrect
                    ? '#22c55e'
                    : answered && selectedId === option.id
                    ? '#f87171'
                    : 'rgba(56,189,248,0.2)',
                  color: answered && (option.isCorrect || selectedId === option.id) ? 'white' : '#0ea5e9',
                  fontFamily: 'Fredoka One, cursive',
                }}
              >
                {answered && option.isCorrect ? '✓' : answered && selectedId === option.id ? '✗' : option.id}
              </motion.div>
              <span>{option.text}</span>
            </div>

            {/* Bubble float animation for unselected */}
            {!answered && (
              <motion.div
                className="absolute top-1 right-2 text-xs opacity-30"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                🫧
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
