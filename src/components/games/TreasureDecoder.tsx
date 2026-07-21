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

// Decorative undersea element
function SeaFloorDecor() {
  return (
    <div className="flex items-end justify-center gap-4 py-3 pointer-events-none select-none" aria-hidden="true">
      <span className="text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,100,150,0.3))' }}>🌿</span>
      <span className="text-2xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,100,150,0.3))' }}>🐚</span>
      <span className="text-3xl" style={{ transform: 'scaleX(-1)', filter: 'drop-shadow(0 2px 4px rgba(0,100,150,0.3))' }}>🌿</span>
      <span className="text-2xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,100,150,0.3))' }}>⭐</span>
      <span className="text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,100,150,0.3))' }}>🌿</span>
      <span className="text-2xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,100,150,0.3))' }}>🪸</span>
      <span className="text-3xl" style={{ transform: 'scaleX(-1)', filter: 'drop-shadow(0 2px 4px rgba(0,100,150,0.3))' }}>🌿</span>
    </div>
  );
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

      {/* Undersea decorative strip */}
      <motion.div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(14,165,233,0.15) 0%, rgba(3,105,161,0.2) 100%)',
          border: '1px solid rgba(56,189,248,0.25)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <SeaFloorDecor />
      </motion.div>

      {/* Options — ocean bubble style */}
      <div className="grid grid-cols-1 gap-3 w-full">
        {options.map((option, i) => (
          <motion.button
            key={option.id}
            className="w-full text-left rounded-full px-7 py-4 font-semibold text-sm md:text-base cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-1"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: answered && option.isCorrect
                ? 'linear-gradient(135deg, rgba(134,239,172,0.9), rgba(74,222,128,0.7))'
                : answered && selectedId === option.id && !option.isCorrect
                ? 'linear-gradient(135deg, rgba(252,165,165,0.9), rgba(248,113,113,0.7))'
                : hoveredId === option.id
                ? 'linear-gradient(135deg, rgba(186,230,253,0.9), rgba(125,211,252,0.8))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(224,242,254,0.75))',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: answered && option.isCorrect
                ? '1.5px solid rgba(74,222,128,0.8)'
                : answered && selectedId === option.id
                ? '1.5px solid rgba(248,113,113,0.8)'
                : hoveredId === option.id
                ? '1.5px solid rgba(56,189,248,0.8)'
                : '1.5px solid rgba(186,230,253,0.6)',
              color: '#1e3a5f',
              boxShadow: answered && option.isCorrect
                ? '0 4px 20px rgba(74,222,128,0.35), inset 0 1px 0 rgba(255,255,255,0.6)'
                : answered && selectedId === option.id
                ? '0 4px 20px rgba(248,113,113,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                : '0 4px 16px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{
              opacity: answered && !option.isCorrect && selectedId !== option.id ? 0.45 : 1,
              y: 0,
              scale: 1,
            }}
            transition={{ delay: i * 0.06, duration: 0.35, type: 'spring', stiffness: 260, damping: 22 }}
            onMouseEnter={() => !answered && setHoveredId(option.id)}
            onMouseLeave={() => !answered && setHoveredId(null)}
            onClick={() => handleSelect(option)}
            whileHover={!answered ? { scale: 1.015, y: -1 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            disabled={answered}
            aria-label={`Option ${option.id}: ${option.text}`}
            aria-pressed={selectedId === option.id}
          >
            {/* Bubble shine glare */}
            <div className="absolute top-0 left-4 right-4 h-px bg-white/70 pointer-events-none" />
            <div className="absolute top-1 left-6 w-8 h-2 rounded-full bg-white/40 pointer-events-none" style={{ filter: 'blur(3px)' }} />

            <div className="flex items-center gap-3 relative z-10">
              {/* Label bubble */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                style={{
                  background: answered && option.isCorrect
                    ? 'rgba(21,128,61,0.8)'
                    : answered && selectedId === option.id
                    ? 'rgba(185,28,28,0.8)'
                    : 'rgba(14,165,233,0.25)',
                  color: answered && (option.isCorrect || selectedId === option.id) ? 'white' : '#0369a1',
                  fontFamily: 'Fredoka One, cursive',
                  border: '1px solid rgba(255,255,255,0.5)',
                }}
              >
                {answered && option.isCorrect ? '✓' : answered && selectedId === option.id ? '✗' : option.id}
              </div>
              <span className="leading-snug">{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
