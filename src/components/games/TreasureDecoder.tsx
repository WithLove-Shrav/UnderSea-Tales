import { useState } from 'react';
import { motion } from 'framer-motion';
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
        <p className="text-xl md:text-2xl font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 w-full">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="w-full text-left rounded-3xl px-6 py-5 font-semibold text-sm md:text-base cursor-pointer relative overflow-visible focus:outline-none focus:ring-2 focus:ring-sky-400"
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
            onMouseEnter={() => !answered && setHoveredId(option.id)}
            onMouseLeave={() => !answered && setHoveredId(null)}
            onClick={() => handleSelect(option)}
            whileHover={!answered ? { backgroundColor: '#f8fafc' } : {}}
            whileTap={!answered ? { scale: 0.99 } : {}}
            disabled={answered}
            aria-label={`Option ${option.id}: ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            {/* Thought Bubble Trail */}
            <div className="absolute top-1/2 -left-6 md:-left-8 -translate-y-1/2 flex gap-1.5 md:gap-2 items-center z-[-1]">
              <div 
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                style={{
                  background: answered && option.isCorrect ? '#dcfce7' : answered && selectedId === option.id && !option.isCorrect ? '#fee2e2' : 'white',
                  border: '1px solid ' + (answered && option.isCorrect ? '#86efac' : answered && selectedId === option.id ? '#fca5a5' : hoveredId === option.id ? '#0284c7' : '#e2e8f0')
                }}
              />
              <div 
                className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full"
                style={{
                  background: answered && option.isCorrect ? '#dcfce7' : answered && selectedId === option.id && !option.isCorrect ? '#fee2e2' : 'white',
                  border: '1px solid ' + (answered && option.isCorrect ? '#86efac' : answered && selectedId === option.id ? '#fca5a5' : hoveredId === option.id ? '#0284c7' : '#e2e8f0')
                }}
              />
            </div>
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
