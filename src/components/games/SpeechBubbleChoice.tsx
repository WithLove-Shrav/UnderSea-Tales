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
  const handleSelect = (option: QuestionOption) => {
    if (answered) return;
    onAnswer(option.isCorrect, option.id);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Question */}
      <motion.div
        className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl md:text-2xl font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Comic crab with empty bubble */}
      <motion.div
        className="relative flex items-start gap-6 bg-white/90 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="text-5xl select-none" aria-hidden="true">🦀</div>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedId && answered ? (
              <motion.div
                key="answered"
                className="rounded-2xl px-6 py-4 relative"
                style={{
                  background: options.find(o => o.id === selectedId)?.isCorrect
                    ? '#dcfce7'
                    : '#fee2e2',
                  border: `1px solid ${options.find(o => o.id === selectedId)?.isCorrect ? '#86efac' : '#fca5a5'}`,
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-sm md:text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e293b' }}>
                  {options.find(o => o.id === selectedId)?.text}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="border-2 border-dashed border-slate-300 rounded-2xl px-6 py-5 text-center"
                style={{ background: 'rgba(248,250,252,0.6)', minHeight: 60 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-sm font-medium text-slate-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  💬 Tap an option below to fill in what the crab says
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="w-full text-left rounded-2xl px-6 py-5 font-semibold text-sm md:text-base cursor-pointer relative overflow-visible focus:outline-none focus:ring-2 focus:ring-sky-400"
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
                ? '1px solid #0284c7'
                : '1px solid #e2e8f0',
              color: '#1e3a5f',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: answered && !option.isCorrect && selectedId !== option.id ? 0.4 : 1,
              y: 0,
            }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={!answered ? { backgroundColor: '#f8fafc' } : {}}
            whileTap={!answered ? { scale: 0.99 } : {}}
            onClick={() => handleSelect(option)}
            onHoverStart={() => setHoveredId(option.id)}
            onHoverEnd={() => setHoveredId(null)}
            disabled={answered}
            aria-label={`Option ${option.id}: ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            {/* Speech Bubble Tail */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 transform rotate-45"
              style={{
                left: '-11px',
                background: answered && option.isCorrect
                  ? '#dcfce7'
                  : answered && selectedId === option.id && !option.isCorrect
                  ? '#fee2e2'
                  : 'white',
                borderLeft: answered && option.isCorrect
                  ? '1px solid #86efac'
                  : answered && selectedId === option.id
                  ? '1px solid #fca5a5'
                  : hoveredId === option.id
                  ? '1px solid #0284c7'
                  : '1px solid #e2e8f0',
                borderBottom: answered && option.isCorrect
                  ? '1px solid #86efac'
                  : answered && selectedId === option.id
                  ? '1px solid #fca5a5'
                  : hoveredId === option.id
                  ? '1px solid #0284c7'
                  : '1px solid #e2e8f0',
                borderTop: 'none',
                borderRight: 'none',
                zIndex: -1,
                borderRadius: '0 0 0 4px',
              }}
            />
            <div className="flex items-center gap-3 relative z-10">
              {/* Bubble indicator */}
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  background: answered && option.isCorrect
                    ? '#22c55e'
                    : answered && selectedId === option.id
                    ? '#ef4444'
                    : '#f1f5f9',
                  color: answered && (option.isCorrect || selectedId === option.id) ? 'white' : '#64748b',
                  fontFamily: 'Fredoka One, cursive',
                }}
              >
                {answered && option.isCorrect ? '✓' : answered && selectedId === option.id ? '✗' : option.id}
              </motion.div>
              <span>{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
