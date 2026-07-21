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

      {/* Wife reaction cards */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="rounded-2xl p-5 md:p-6 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 relative overflow-hidden bg-white shadow-sm flex flex-col items-center justify-center"
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
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={!answered ? { backgroundColor: '#f8fafc' } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            onClick={() => !answered && onAnswer(option.isCorrect, option.id)}
            onHoverStart={() => setHoveredId(option.id)}
            onHoverEnd={() => setHoveredId(null)}
            disabled={answered}
            aria-label={`Option ${option.id}: ${option.emoji} ${option.feeling} — ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            {/* Reaction Image or Emoji */}
            {option.image ? (
              <motion.img
                src={option.image}
                alt={option.feeling}
                className="w-28 h-28 object-contain mb-3"
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
    </div>
  );
}
