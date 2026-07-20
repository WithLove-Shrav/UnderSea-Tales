import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';

interface EmotionShellGameProps {
  options: QuestionOption[];
  questionText: string;
  contextText?: string;
  onAnswer: (isCorrect: boolean, optionId: string) => void;
  answered: boolean;
  selectedId: string | null;
}

function Shell({ option, index, onSelect, answered, isCorrect, isSelected, isWrong }: {
  option: QuestionOption;
  index: number;
  onSelect: (option: QuestionOption) => void;
  answered: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  isWrong: boolean;
}) {
  const shellEmojis = ['🐚', '🌀', '💫'];
  const shellEmoji = shellEmojis[index % shellEmojis.length];

  return (
    <motion.button
      className="flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 relative"
      style={{
        background: isCorrect
          ? 'linear-gradient(135deg, #fef3c7, #fde68a)'
          : isWrong
          ? 'linear-gradient(135deg, #fee2e2, #fecaca)'
          : 'rgba(255,255,255,0.92)',
        border: isCorrect
          ? '2px solid #f59e0b'
          : isWrong
          ? '2px solid #f87171'
          : '2px solid rgba(148,163,184,0.3)',
        boxShadow: isCorrect ? '0 0 20px rgba(251,191,36,0.4)' : 'none',
        opacity: answered && !isCorrect && !isSelected ? 0.5 : 1,
      }}
      onClick={() => !answered && onSelect(option)}
      disabled={answered}
      whileHover={!answered ? { y: -6, scale: 1.04 } : {}}
      whileTap={!answered ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: answered && !isCorrect && !isSelected ? 0.5 : 1,
        y: 0,
        x: isWrong ? [0, -8, 8, -4, 4, 0] : 0,
      }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 300 }}
      aria-label={`Shell: "${option.text}" — ${option.feeling}`}
      aria-pressed={isSelected}
    >
      {/* Wave animation under shell */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)' }}
        animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Shell emoji */}
      <motion.div
        className="text-4xl select-none"
        animate={isCorrect
          ? { rotate: [0, 360], scale: [1, 1.3, 1] }
          : { y: [0, -4, 0] }}
        transition={isCorrect
          ? { duration: 0.6 }
          : { duration: 2 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {isCorrect ? '✨' : shellEmoji}
      </motion.div>

      {/* Sentence */}
      <p
        className="text-xs font-semibold text-center leading-snug"
        style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f', maxWidth: 140 }}
      >
        {option.text}
      </p>

      {/* Feeling label */}
      {option.feeling && (
        <div
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            fontFamily: 'Fredoka One, cursive',
            background: isCorrect ? '#f59e0b' : 'rgba(148,163,184,0.2)',
            color: isCorrect ? 'white' : '#64748b',
          }}
        >
          {option.feeling}
        </div>
      )}

      {/* Result badge */}
      {answered && isCorrect && (
        <motion.div
          className="absolute -top-2 -right-2 text-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          ✨
        </motion.div>
      )}
    </motion.button>
  );
}

export default function EmotionShellGame({ options, questionText, contextText, onAnswer, answered, selectedId }: EmotionShellGameProps) {
  // targetRef removed
  const [glowing, setGlowing] = useState(false);

  const handleSelect = (option: QuestionOption) => {
    if (answered) return;
    if (option.isCorrect) setGlowing(true);
    onAnswer(option.isCorrect, option.id);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Question */}
      <motion.div
        className="bg-white/95 rounded-2xl p-4 shadow-lg"
        style={{ border: '2px solid rgba(251,191,36,0.4)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* "Oh, well" target phrase */}
      <motion.div
        className="relative rounded-2xl p-4 text-center overflow-hidden"
        style={{
          background: glowing
            ? 'linear-gradient(135deg, #fef3c7, #fde68a, #fbbf24)'
            : 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))',
          border: `2px solid ${glowing ? '#f59e0b' : 'rgba(251,191,36,0.4)'}`,
          boxShadow: glowing ? '0 0 30px 10px rgba(251,191,36,0.4)' : 'none',
        }}
        animate={glowing ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5, repeat: glowing ? 2 : 0 }}
      >
        {/* Ocean wave background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.1) 50%, transparent 100%)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <p className="text-xs font-semibold text-amber-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {contextText || 'The crab says in the comic:'}
          </p>
          <motion.p
            className="text-2xl font-bold"
            style={{ fontFamily: 'Fredoka One, cursive', color: '#92400e' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            "Oh, well."
          </motion.p>
          <p className="text-xs text-amber-600 mt-1 font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Find the shell with the SAME feeling ↓
          </p>
        </div>
      </motion.div>

      {/* Floating shells */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, i) => (
          <Shell
            key={option.id}
            option={option}
            index={i}
            onSelect={handleSelect}
            answered={answered}
            isCorrect={answered && option.isCorrect}
            isSelected={selectedId === option.id}
            isWrong={answered && selectedId === option.id && !option.isCorrect}
          />
        ))}
      </div>

      {/* Ocean brightening effect */}
      <AnimatePresence>
        {glowing && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.15), transparent 70%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
