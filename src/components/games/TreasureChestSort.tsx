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
      className="flex flex-col items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-2xl p-3 bg-white/50 border border-transparent hover:bg-white hover:border-slate-200 transition-colors"
      onClick={onClick}
      disabled={answered}
      whileHover={!answered ? { scale: 1.02 } : {}}
      whileTap={!answered ? { scale: 0.98 } : {}}
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
            style={{ border: '4px solid rgba(34,197,94,0.4)', scale: 1.2 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Chest label */}
      <div
        className="rounded-full px-4 py-1.5 text-sm font-bold shadow-sm"
        style={{
          fontFamily: 'Nunito, sans-serif',
          background: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : '#ffffff',
          color: isCorrect ? '#166534' : isWrong ? '#991b1b' : '#334155',
          border: isCorrect ? '1px solid #86efac' : isWrong ? '1px solid #fca5a5' : '1px solid #cbd5e1',
        }}
      >
        Chest {option.id}
      </div>

      {/* Revealed sentence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rounded-xl px-4 py-3 text-sm font-medium text-center max-w-40 shadow-sm mt-2"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: isCorrect ? '#f0fdf4' : isWrong ? '#fef2f2' : '#ffffff',
              border: `1px solid ${isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#e2e8f0'}`,
              color: '#1e293b',
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
        className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {contextText && (
          <div className="bg-purple-50 rounded-xl px-3 py-2 mb-2 border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
              💬 From the comic: <strong>{contextText}</strong>
            </p>
          </div>
        )}
        <p className="text-xl md:text-2xl font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.p
        className="text-center text-sm font-medium text-slate-500"
        style={{ fontFamily: 'Nunito, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {answered ? '🎉 Great work!' : openedChests.length === 0 ? '👆 Tap a chest to open it, then tap again to choose your answer' : '👇 Tap any open chest to select your answer'}
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
