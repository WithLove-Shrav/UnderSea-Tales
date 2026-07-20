import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';

interface TreasureChestSortProps {
  options: QuestionOption[];
  questionText: string;
  contextText?: string;
  onAnswer: (isCorrect: boolean, optionId: string) => void;
  answered: boolean;
  selectedId: string | null;
}

function TreasureChest({ option, isOpen, isCorrect, isWrong, onClick, answered }: {
  option: QuestionOption;
  isOpen: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  onClick: () => void;
  answered: boolean;
}) {
  return (
    <motion.button
      className="flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-2xl p-2"
      onClick={onClick}
      disabled={answered}
      whileHover={!answered ? { scale: 1.06, y: -4 } : {}}
      whileTap={!answered ? { scale: 0.94 } : {}}
      aria-label={`Chest ${option.id}: ${isOpen ? option.text : 'Click to open'}`}
      aria-pressed={isOpen}
    >
      {/* Chest */}
      <div className="relative">
        <motion.div
          className="text-5xl relative select-none"
          animate={isCorrect ? { scale: [1, 1.3, 1.1], rotate: [0, -5, 5, 0] } : isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          {isOpen ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
            >
              {isCorrect ? '💎' : isWrong ? '📭' : '📬'}
            </motion.span>
          ) : '📦'}
        </motion.div>

        {/* Glow effect for correct */}
        {isCorrect && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.6), transparent)' }}
            animate={{ scale: [1, 2], opacity: [1, 0] }}
            transition={{ duration: 1, repeat: 3 }}
          />
        )}
      </div>

      {/* Chest label */}
      <div
        className="rounded-full px-3 py-1 text-sm font-bold"
        style={{
          fontFamily: 'Fredoka One, cursive',
          background: isCorrect ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : isWrong ? '#fee2e2' : 'rgba(255,255,255,0.9)',
          color: isCorrect ? 'white' : isWrong ? '#ef4444' : '#1e3a5f',
          border: isCorrect ? '2px solid #f59e0b' : isWrong ? '2px solid #f87171' : '2px solid rgba(148,163,184,0.3)',
        }}
      >
        Chest {option.id}
      </div>

      {/* Revealed sentence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rounded-xl px-3 py-2 text-xs font-semibold text-center max-w-36"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: isCorrect ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)' : isWrong ? '#fee2e2' : 'rgba(255,255,255,0.95)',
              border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#f87171' : 'rgba(148,163,184,0.4)'}`,
              color: '#1e3a5f',
            }}
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring' }}
          >
            {option.text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function TreasureChestSort({ options, questionText, contextText, onAnswer, answered, selectedId }: TreasureChestSortProps) {
  const [openedChests, setOpenedChests] = useState<string[]>([]);

  const handleChestClick = (option: QuestionOption) => {
    if (answered) return;
    if (!openedChests.includes(option.id)) {
      setOpenedChests(prev => [...prev, option.id]);
    } else {
      // Already open — this is their answer
      onAnswer(option.isCorrect, option.id);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Context from comic */}
      <motion.div
        className="bg-white/95 rounded-2xl p-4 shadow-lg"
        style={{ border: '2px solid rgba(167,139,250,0.4)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {contextText && (
          <div className="bg-purple-50 rounded-xl px-3 py-2 mb-2 border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
              💬 From the comic: <strong>{contextText}</strong>
            </p>
          </div>
        )}
        <p className="text-sm font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.p
        className="text-center text-xs font-semibold text-white/80"
        style={{ fontFamily: 'Nunito, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {answered ? '🎉 Great work!' : openedChests.length === 0 ? '👆 Tap a chest to open it, then tap again to choose your answer!' : '👇 Tap any open chest to select your answer!'}
      </motion.p>

      {/* Treasure chests grid */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, i) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
          >
            <TreasureChest
              option={option}
              isOpen={openedChests.includes(option.id) || answered}
              isCorrect={answered && option.isCorrect}
              isWrong={answered && selectedId === option.id && !option.isCorrect}
              onClick={() => handleChestClick(option)}
              answered={answered}
            />
          </motion.div>
        ))}
      </div>

      {/* Correct answer hint after wrong */}
      {answered && selectedId && !options.find(o => o.id === selectedId)?.isCorrect && (
        <motion.div
          className="bg-amber-50 rounded-2xl p-3 border-2 border-amber-300 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs font-bold text-amber-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
            ✨ The correct chest was <strong>A</strong> — where "present" means a gift!
          </p>
        </motion.div>
      )}
    </div>
  );
}
