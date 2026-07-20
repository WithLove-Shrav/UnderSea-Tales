import { motion, AnimatePresence } from 'framer-motion';

interface PearlRewardProps {
  show: boolean;
  pearlColor: string;
  pearlGradient: string;
  pearlEmoji: string;
  pearlName: string;
  message: string;
  explanation?: string;
  onComplete: () => void;
}

// Confetti particle
function ConfettiPiece({ x, color, delay }: { x: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute top-0 rounded-sm pointer-events-none"
      style={{ left: `${x}%`, width: 8, height: 8, background: color }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{ y: 300, rotate: 720, opacity: 0 }}
      transition={{ duration: 1.5, delay, ease: 'easeIn' }}
      aria-hidden="true"
    />
  );
}

const confettiColors = ['#fb7185', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f97316'];

export default function PearlReward({ show, pearlColor, pearlGradient: _pearlGradient, pearlEmoji, pearlName, message, explanation, onComplete }: PearlRewardProps) {
  const confetti = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    color: confettiColors[i % confettiColors.length],
    delay: i * 0.05,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="alert"
          aria-live="polite"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)' }}
          />

          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden">
            {confetti.map((c, i) => <ConfettiPiece key={i} {...c} />)}
          </div>

          {/* Pearl burst card */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4 px-10 py-8 rounded-3xl text-center"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: `3px solid ${pearlColor}`,
              boxShadow: `0 0 60px 20px ${pearlColor}44`,
            }}
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {/* Flying pearl */}
            <motion.div
              className="text-7xl"
              animate={{
                scale: [0.5, 1.3, 1],
                rotate: [0, 360, 0],
                y: [20, -10, 0],
              }}
              transition={{ duration: 0.8, times: [0, 0.5, 1] }}
              aria-hidden="true"
            >
              {pearlEmoji}
            </motion.div>

            {/* Pearl glow ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 100,
                height: 100,
                background: 'transparent',
                border: `4px solid ${pearlColor}`,
                top: '50%',
                left: '50%',
                marginLeft: -50,
                marginTop: -80,
              }}
              animate={{ scale: [1, 2], opacity: [0.8, 0] }}
              transition={{ duration: 0.8, repeat: 2 }}
              aria-hidden="true"
            />

            <div>
              <motion.h2
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: 'Fredoka One, cursive', color: '#1e3a5f' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ✨ {pearlName} Collected! ✨
              </motion.h2>
              <motion.p
                className="text-base font-semibold"
                style={{ fontFamily: 'Nunito, sans-serif', color: '#475569' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {message}
              </motion.p>
            </div>

            {/* Explanation Section */}
            {explanation && (
              <motion.div
                className="mt-2 bg-white/50 px-6 py-4 rounded-2xl border border-white max-w-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm font-semibold text-blue-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <span className="font-bold text-blue-700 block mb-1">Why is this correct?</span>
                  {explanation}
                </p>
              </motion.div>
            )}

            {/* Continue Button */}
            <motion.button
              className="mt-2 px-8 py-3 rounded-full font-bold text-white shadow-lg cursor-pointer"
              style={{
                fontFamily: 'Fredoka One, cursive',
                background: `linear-gradient(135deg, ${pearlColor}, #2563eb)`,
                border: '2px solid rgba(255,255,255,0.6)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              aria-label="Continue to next question"
            >
              Continue ✨
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
