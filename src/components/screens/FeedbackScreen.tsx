import { motion } from 'framer-motion';
import type { QuestionOption } from '../../data/questions';

interface FeedbackScreenProps {
  isCorrect: boolean;
  correctOption: QuestionOption;
  explanation: string;
  feedbackText: string;
  pearlEmoji: string;
  pearlName: string;
  onContinue: () => void;
}

export default function FeedbackScreen({
  isCorrect,
  correctOption,
  explanation,
  feedbackText,
  pearlEmoji,
  pearlName,
  onContinue
}: FeedbackScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 w-full h-full p-8 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-slate-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {/* Header Icon */}
      <motion.div
        className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-md"
        style={{
          background: isCorrect ? '#dcfce7' : '#fee2e2',
          border: `2px solid ${isCorrect ? '#86efac' : '#fca5a5'}`
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isCorrect ? pearlEmoji : '🐢'}
      </motion.div>

      {/* Main Title */}
      <motion.h2
        className="text-4xl font-bold text-center"
        style={{
          fontFamily: 'Fredoka One, cursive',
          color: isCorrect ? '#166534' : '#991b1b'
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isCorrect ? 'Correct!' : 'Wrong Answer'}
      </motion.h2>
      
      {/* Pearl Unlocked notification if correct */}
      {isCorrect && (
        <motion.div 
          className="bg-emerald-50 px-6 py-2 rounded-full border border-emerald-200 text-emerald-800 font-bold text-sm"
          style={{ fontFamily: 'Nunito, sans-serif' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          ✨ You unlocked the {pearlName}!
        </motion.div>
      )}

      {/* Answer & Explanation Container */}
      <motion.div
        className="flex flex-col gap-6 w-full max-w-lg mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* The Correct Answer */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
            The correct answer is:
          </p>
          <p className="text-lg font-bold text-slate-800 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {correctOption.text}
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
          <p className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {feedbackText}
          </p>
          <p className="text-base font-medium text-slate-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {explanation}
          </p>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        className="mt-6 px-12 py-4 rounded-full text-white font-bold text-lg shadow-sm border border-transparent transition-all hover:shadow-md"
        style={{
          fontFamily: 'Nunito, sans-serif',
          background: 'linear-gradient(135deg, #0ea5e9, #0284c7)'
        }}
        onClick={onContinue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Continue to Next Question →
      </motion.button>
    </motion.div>
  );
}
