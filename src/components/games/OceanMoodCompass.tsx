import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';

interface OceanMoodCompassProps {
  options: QuestionOption[];
  questionText: string;
  onAnswer: (isCorrect: boolean, optionId: string) => void;
  answered: boolean;
}

export default function OceanMoodCompass({
  options,
  questionText,
  onAnswer,
  answered
}: OceanMoodCompassProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (option: QuestionOption) => {
    if (answered) return;
    setSelectedId(option.id);
    onAnswer(option.isCorrect, option.id);
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      
      {/* Question Stem */}
      <motion.div
        className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 w-full mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl md:text-2xl font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Grid of Options */}
      <div className="grid grid-cols-2 gap-6 md:gap-10 w-full max-w-4xl">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="flex flex-col items-center justify-center p-10 md:p-14 rounded-3xl bg-white/95 shadow-lg border-2 cursor-pointer relative overflow-hidden"
            style={{
              fontFamily: 'Nunito, sans-serif',
              borderColor: answered && option.isCorrect
                ? '#86efac' // green-300
                : answered && selectedId === option.id && !option.isCorrect
                ? '#fca5a5' // red-300
                : hoveredId === option.id
                ? '#7dd3fc' // sky-300
                : 'transparent',
              background: answered && option.isCorrect
                ? '#dcfce7' // green-100
                : answered && selectedId === option.id && !option.isCorrect
                ? '#fee2e2' // red-100
                : 'white',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1, type: 'spring' }}
            onMouseEnter={() => !answered && setHoveredId(option.id)}
            onMouseLeave={() => !answered && setHoveredId(null)}
            onClick={() => handleSelect(option)}
            whileHover={!answered ? { scale: 1.05 } : {}}
            whileTap={!answered ? { scale: 0.95 } : {}}
            disabled={answered}
          >
            {/* Status indicator */}
            <AnimatePresence>
              {answered && option.isCorrect && (
                <motion.div
                  className="absolute top-3 right-3 text-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  ✅
                </motion.div>
              )}
              {answered && selectedId === option.id && !option.isCorrect && (
                <motion.div
                  className="absolute top-3 right-3 text-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  ❌
                </motion.div>
              )}
            </AnimatePresence>

            <span className="text-6xl md:text-7xl mb-6 drop-shadow-sm">{option.emoji || '✨'}</span>
            <span className="text-lg md:text-xl font-bold text-slate-700 text-center leading-tight">
              {option.text}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
