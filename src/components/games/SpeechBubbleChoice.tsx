import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';
import crabImg from '../../assets/crab.png';
import BubblePop from './BubblePop';

interface SpeechBubbleChoiceProps {
  options: QuestionOption[];
  questionText: string;
  onAnswer: (isCorrect: boolean, optionId: string) => void;
  answered: boolean;
  selectedId: string | null;
  attempts?: number;
}

export default function SpeechBubbleChoice({ options, questionText, onAnswer, answered, selectedId, attempts = 0 }: SpeechBubbleChoiceProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // poppedId is NEVER cleared — keeps the button hidden after pop so it can't reappear
  const [poppedId, setPoppedId] = useState<string | null>(null);

  const handleSelect = useCallback((option: QuestionOption) => {
    if (answered || poppedId) return;

    const isFinal = option.isCorrect || attempts >= 1;
    if (isFinal) {
      setPoppedId(option.id);  // hide button instantly, start pop overlay
      setTimeout(() => onAnswer(option.isCorrect, option.id), 80);
    } else {
      onAnswer(option.isCorrect, option.id);
    }
  }, [answered, poppedId, attempts, onAnswer]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Question */}
      <motion.div
        className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl md:text-2xl font-bold leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
          {questionText}
        </p>
      </motion.div>

      {/* Crab image with speech bubble panel */}
      <motion.div
        className="relative flex items-start gap-6 bg-white/90 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <img
          src={crabImg}
          alt="Crab character"
          className="w-16 h-16 md:w-20 md:h-20 object-contain select-none flex-shrink-0"
          aria-hidden="true"
        />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedId && answered ? (
              <motion.div
                key="answered"
                className="rounded-2xl px-6 py-4 relative"
                style={{
                  background: options.find(o => o.id === selectedId)?.isCorrect ? '#dcfce7' : '#fee2e2',
                  border: `1px solid ${options.find(o => o.id === selectedId)?.isCorrect ? '#86efac' : '#fca5a5'}`,
                }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <p className="text-sm md:text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e293b' }}>
                  {options.find(o => o.id === selectedId)?.text}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="border-2 border-dashed border-slate-300 rounded-2xl px-6 py-5 text-center"
                style={{ background: 'rgba(248,250,252,0.6)', minHeight: 60 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-sm font-medium text-slate-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  💬 Tap an option below to fill in what the crab says
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Options — ocean bubble style */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, i) => {
          const isPopped       = poppedId === option.id;
          const isCorrect      = option.isCorrect;
          const isWrongSelected = answered && selectedId === option.id && !isCorrect;

          return (
            // Wrapper div preserves layout height even when button is visibility:hidden
            <div key={option.id} className="relative">
              <motion.button
                className="w-full text-left rounded-full px-7 py-4 font-semibold text-sm md:text-base cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-1"
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  // visibility:hidden keeps layout space but makes the element invisible
                  // — crucially, Framer Motion can't "reappear" it because CSS visibility
                  // is outside the motion value system
                  visibility: isPopped ? 'hidden' : 'visible',
                  background: answered && isCorrect
                    ? 'linear-gradient(135deg, rgba(134,239,172,0.9), rgba(74,222,128,0.7))'
                    : isWrongSelected
                    ? 'linear-gradient(135deg, rgba(252,165,165,0.9), rgba(248,113,113,0.7))'
                    : hoveredId === option.id
                    ? 'linear-gradient(135deg, rgba(186,230,253,0.9), rgba(125,211,252,0.8))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(224,242,254,0.75))',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: answered && isCorrect
                    ? '1.5px solid rgba(74,222,128,0.8)'
                    : isWrongSelected
                    ? '1.5px solid rgba(248,113,113,0.8)'
                    : hoveredId === option.id
                    ? '1.5px solid rgba(56,189,248,0.8)'
                    : '1.5px solid rgba(186,230,253,0.6)',
                  color: '#1e3a5f',
                  boxShadow: answered && isCorrect
                    ? '0 4px 20px rgba(74,222,128,0.35), inset 0 1px 0 rgba(255,255,255,0.6)'
                    : isWrongSelected
                    ? '0 4px 20px rgba(248,113,113,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                    : '0 4px 16px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.7)',
                }}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{
                  opacity: answered && !isCorrect && selectedId !== option.id ? 0.35 : 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{ delay: i * 0.06, duration: 0.35, type: 'spring', stiffness: 260, damping: 22 }}
                whileHover={!answered && !poppedId ? { scale: 1.015, y: -1 } : {}}
                whileTap={!answered && !poppedId ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(option)}
                onHoverStart={() => !answered && !poppedId && setHoveredId(option.id)}
                onHoverEnd={() => setHoveredId(null)}
                disabled={answered || !!poppedId}
                aria-label={`Option ${option.id}: ${option.text}`}
                aria-pressed={selectedId === option.id}
              >
                {/* Bubble shine glare */}
                <div className="absolute top-0 left-4 right-4 h-px bg-white/70 pointer-events-none" />
                <div className="absolute top-1 left-6 w-8 h-2 rounded-full bg-white/40 pointer-events-none" style={{ filter: 'blur(3px)' }} />

                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                    style={{
                      background: answered && isCorrect
                        ? 'rgba(21,128,61,0.8)'
                        : isWrongSelected
                        ? 'rgba(185,28,28,0.8)'
                        : 'rgba(14,165,233,0.25)',
                      color: answered && (isCorrect || isWrongSelected) ? 'white' : '#0369a1',
                      fontFamily: 'Fredoka One, cursive',
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}
                  >
                    {answered && isCorrect ? '✓' : isWrongSelected ? '✗' : option.id}
                  </div>
                  <span className="leading-snug">{option.text}</span>
                </div>
              </motion.button>

              {/* Pop effect — sibling div, absolutely centered on the button, can overflow freely */}
              <AnimatePresence>
                {isPopped && (
                  <BubblePop key="pop" variant={isCorrect ? 'correct' : 'wrong'} />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
