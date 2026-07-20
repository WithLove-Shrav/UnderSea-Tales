import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';

interface TreasureDecoderProps {
  options: QuestionOption[];
  questionText: string;
  contextText?: string;
  onAnswer: (isCorrect: boolean, optionId: string) => void;
  answered: boolean;
  selectedId: string | null;
}

export default function TreasureDecoder({
  options,
  questionText,
  onAnswer,
  answered,
  selectedId
}: TreasureDecoderProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelect = (option: QuestionOption) => {
    if (answered) return;
    onAnswer(option.isCorrect, option.id);
  };

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      
      {/* Question Stem */}
      <motion.div
        className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 w-full mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-base md:text-lg font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 w-full">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="w-full text-left rounded-2xl px-6 py-5 font-semibold text-sm md:text-base cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400"
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            onMouseEnter={() => !answered && setHoveredId(option.id)}
            onMouseLeave={() => !answered && setHoveredId(null)}
            onClick={() => handleSelect(option)}
            whileHover={!answered ? { scale: 1.01 } : {}}
            whileTap={!answered ? { scale: 0.99 } : {}}
            disabled={answered}
            aria-pressed={selectedId === option.id}
          >
            {/* Status indicator on the left side when answered */}
            <AnimatePresence>
              {answered && option.isCorrect && (
                <motion.span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-bold"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  ✓
                </motion.span>
              )}
              {answered && selectedId === option.id && !option.isCorrect && (
                <motion.span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 font-bold"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  ✗
                </motion.span>
              )}
            </AnimatePresence>

            <span className={answered && (option.isCorrect || selectedId === option.id) ? "ml-6 transition-all" : "transition-all"}>
              {option.text}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
