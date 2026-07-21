import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
        <p className="text-xl md:text-2xl font-bold leading-relaxed text-center" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Wife reaction list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full mt-4 md:mt-6">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="w-full text-left cursor-pointer focus:outline-none flex items-center gap-5 p-4 rounded-3xl transition-colors relative"
            style={{
              background: answered && option.isCorrect
                ? 'rgba(134, 239, 172, 0.2)'
                : answered && selectedId === option.id && !option.isCorrect
                ? 'rgba(248, 113, 113, 0.15)'
                : hoveredId === option.id
                ? 'rgba(241, 245, 249, 0.8)'
                : 'transparent',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: answered && !option.isCorrect && selectedId !== option.id ? 0.3 : 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            onClick={() => !answered && onAnswer(option.isCorrect, option.id)}
            onHoverStart={() => setHoveredId(option.id)}
            onHoverEnd={() => setHoveredId(null)}
            disabled={answered}
            aria-label={`Option ${option.id}: ${option.feeling} — ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            {/* Reaction Image */}
            <div className="flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-white/50 rounded-2xl shadow-sm border border-slate-100">
              {option.image ? (
                <motion.img
                  src={option.image}
                  alt={option.feeling}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain"
                  animate={answered && option.isCorrect ? { scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] } : hoveredId === option.id && !answered ? { scale: 1.1 } : {}}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <motion.div
                  className="text-5xl md:text-6xl"
                  animate={answered && option.isCorrect ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : hoveredId === option.id && !answered ? { scale: 1.1 } : {}}
                  transition={{ duration: 0.4 }}
                  aria-hidden="true"
                >
                  {option.emoji}
                </motion.div>
              )}
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-center py-2">
              <div
                className="text-lg font-bold mb-1 flex items-center gap-2"
                style={{ color: '#1e3a5f', fontFamily: 'Fredoka One, cursive' }}
              >
                {option.feeling}
                {answered && option.isCorrect && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="text-emerald-500 text-xl"
                  >
                    ✅
                  </motion.span>
                )}
                {answered && selectedId === option.id && !option.isCorrect && (
                  <span className="text-red-500 text-xl">❌</span>
                )}
              </div>
              <div
                className="text-base md:text-lg text-slate-600 font-semibold leading-snug"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {option.text}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
