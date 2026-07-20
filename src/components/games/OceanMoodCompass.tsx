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
  const [stagedOption, setStagedOption] = useState<QuestionOption | null>(null);

  const handleSelect = (option: QuestionOption) => {
    if (answered) return;
    setStagedOption(option);
  };

  const handleConfirm = () => {
    if (stagedOption && !answered) {
      onAnswer(stagedOption.isCorrect, stagedOption.id);
    }
  };

  // Compass positions for 4 items
  const getCompassPosition = (index: number, isStaged: boolean) => {
    if (isStaged) {
      return { x: 0, y: 120, scale: 1.1 };
    }
    
    const distance = 140; // distance from center
    switch (index) {
      case 0: return { x: 0, y: -distance, scale: 1 }; // North
      case 1: return { x: distance, y: 0, scale: 1 };  // East
      case 2: return { x: 0, y: distance, scale: 1 };  // South
      case 3: return { x: -distance, y: 0, scale: 1 }; // West
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[500px] relative">
      
      {/* Question Text */}
      <h2 className="absolute top-0 text-xl md:text-2xl font-bold text-slate-800 text-center z-20 px-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
        {questionText}
      </h2>

      {/* Center Label */}
      <motion.div
        className="absolute z-10 bg-white/90 backdrop-blur-md rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-md border border-slate-200"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-4xl mb-1">🐚</span>
        <span className="font-bold text-slate-700 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Conversation
        </span>
      </motion.div>

      {/* Floating Shell Cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {options.map((option, i) => {
          const isStaged = stagedOption?.id === option.id;
          const pos = getCompassPosition(i, isStaged);

          // If another option is staged, fade this one out slightly
          const fadeOut = stagedOption && !isStaged;

          return (
            <motion.button
              key={option.id}
              className={`absolute pointer-events-auto flex flex-col items-center justify-center bg-white rounded-2xl p-4 w-36 h-36 border transition-colors ${
                isStaged ? 'border-sky-300 bg-sky-50 shadow-lg z-20' : 'border-slate-200 shadow-sm'
              }`}
              style={{
                fontFamily: 'Nunito, sans-serif',
                opacity: fadeOut ? 0.3 : 1,
              }}
              initial={getCompassPosition(i, false)}
              animate={pos}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => handleSelect(option)}
              whileHover={!isStaged && !answered ? { scale: 1.05, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2)' } : {}}
            >
              <span className="text-4xl mb-2">{option.emoji || '✨'}</span>
              <span className="text-sm font-bold text-slate-700 text-center leading-tight">
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Confirm Button */}
      <AnimatePresence>
        {stagedOption && !answered && (
          <motion.button
            className="absolute bottom-4 z-30 px-8 py-3 rounded-full text-white font-bold text-sm shadow-md"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleConfirm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Confirm Choice
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
