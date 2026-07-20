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
  const [openScrollId, setOpenScrollId] = useState<string | null>(null);
  const [chestShake, setChestShake] = useState(false);

  // Extract phrase in quotes to put on the lock
  const match = questionText.match(/"([^"]+)"/);
  const lockPhrase = match ? match[1] : 'The Secret Phrase';

  const handleScrollClick = (id: string) => {
    if (answered) return;
    setOpenScrollId(openScrollId === id ? null : id);
  };

  const handleConfirm = (option: QuestionOption) => {
    if (answered) return;
    if (!option.isCorrect) {
      setChestShake(true);
      setTimeout(() => setChestShake(false), 500);
    }
    onAnswer(option.isCorrect, option.id);
  };

  const isChestOpen = answered && options.find(o => o.id === selectedId)?.isCorrect;

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      
      {/* Question Stem */}
      <motion.div
        className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-base md:text-lg font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* The Treasure Chest */}
      <motion.div
        className="relative bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col items-center justify-center min-w-[280px]"
        animate={chestShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Animated Chest Emoji */}
        <motion.div
          className="text-8xl select-none"
          animate={isChestOpen ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {isChestOpen ? '💎' : '📦'}
        </motion.div>

        {/* The Lock */}
        {!isChestOpen && (
          <div className="mt-4 bg-slate-100 rounded-full px-6 py-2 border border-slate-300 shadow-inner flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span className="font-bold text-slate-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {lockPhrase}
            </span>
          </div>
        )}

        {/* Floating Pearl on Success */}
        <AnimatePresence>
          {isChestOpen && (
            <motion.div
              className="absolute text-5xl"
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -80, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, type: 'spring' }}
            >
              ✨
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* The Scrolls */}
      <div className="w-full max-w-lg flex flex-col gap-4 mt-2">
        {options.map((option) => {
          const isOpen = openScrollId === option.id;
          const isSelected = selectedId === option.id;
          
          // Get first 3 words
          const words = option.text.split(' ');
          const previewText = words.slice(0, 3).join(' ') + '...';

          return (
            <motion.div
              key={option.id}
              className={`rounded-2xl overflow-hidden cursor-pointer border transition-colors ${
                isOpen ? 'bg-amber-50 border-amber-200 shadow-md' : 'bg-white border-slate-200 shadow-sm hover:bg-slate-50'
              }`}
              onClick={() => handleScrollClick(option.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                opacity: answered && !isSelected && !option.isCorrect ? 0.5 : 1
              }}
            >
              {/* Scroll Header (Preview) */}
              <div className="px-6 py-4 flex items-center gap-4">
                <span className="text-2xl">📜</span>
                <p className="font-semibold text-slate-700 flex-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {isOpen ? option.text : previewText}
                </p>
              </div>

              {/* Expanded Area */}
              <AnimatePresence>
                {isOpen && !answered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 flex justify-center border-t border-amber-200/50">
                      <motion.button
                        className="px-8 py-3 rounded-full text-white font-bold shadow-sm"
                        style={{
                          fontFamily: 'Nunito, sans-serif',
                          background: 'linear-gradient(135deg, #d97706, #b45309)'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirm(option);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Choose this Scroll
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
