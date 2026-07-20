import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { questions } from '../../data/questions';

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100,
    color: ['#fb7185', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f97316', '#06b6d4'][i % 7],
    delay: Math.random() * 0.8,
    rotation: Math.random() * 720,
    size: 8 + Math.random() * 12,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-0 rounded-sm"
          style={{ left: `${p.x}%`, width: p.size, height: p.size, background: p.color }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.rotation, opacity: [1, 1, 0] }}
          transition={{ duration: 2 + Math.random() * 1, delay: p.delay, ease: 'easeIn' }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function SeaAnimalCelebration() {
  const animals = ['🐠', '🐟', '🐡', '🦀', '🐙', '🦑', '🐚', '⭐', '🌟', '🐬'];
  return (
    <div className="flex flex-wrap justify-center gap-3" aria-hidden="true">
      {animals.map((a, i) => (
        <motion.span
          key={i}
          className="text-3xl select-none"
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: [0, -12, 0] }}
          transition={{
            scale: { delay: i * 0.07, type: 'spring', stiffness: 400 },
            y: { duration: 1, delay: i * 0.07 + 0.3, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {a}
        </motion.span>
      ))}
    </div>
  );
}

function StarRating({ score }: { score: number }) {
  const stars = 4;
  return (
    <div className="flex gap-2 justify-center" aria-label={`${score} out of 4 stars`}>
      {Array.from({ length: stars }, (_, i) => (
        <motion.span
          key={i}
          className="text-4xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: i < score ? 1 : 0.4, rotate: 0, opacity: i < score ? 1 : 0.3 }}
          transition={{ delay: 0.8 + i * 0.15, type: 'spring', stiffness: 300 }}
          aria-hidden="true"
        >
          ⭐
        </motion.span>
      ))}
    </div>
  );
}

function PearlShowcase({ pearlsEarned }: { pearlsEarned: boolean[] }) {
  return (
    <div className="flex justify-center gap-4" aria-label="Pearls collected">
      {questions.map((q, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center gap-1"
          initial={{ y: 30, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 300 }}
          aria-label={`${q.pearlName}: ${pearlsEarned[i] ? 'Earned' : 'Not earned'}`}
        >
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: pearlsEarned[i] ? q.pearlGradient : 'rgba(255,255,255,0.15)',
              border: pearlsEarned[i] ? `3px solid ${q.pearlColor}` : '3px solid rgba(255,255,255,0.2)',
              boxShadow: pearlsEarned[i] ? `0 0 20px 6px ${q.pearlColor}66` : 'none',
            }}
            animate={pearlsEarned[i] ? {
              boxShadow: [`0 0 20px 6px ${q.pearlColor}44`, `0 0 30px 10px ${q.pearlColor}88`, `0 0 20px 6px ${q.pearlColor}44`],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {pearlsEarned[i] ? q.pearlEmoji : '⭕'}
          </motion.div>
          <span className="text-xs font-bold text-white/80 text-center leading-tight" style={{ fontFamily: 'Nunito, sans-serif', maxWidth: 60 }}>
            {q.pearlName.replace('Pearl of ', '')}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function ResultsScreen() {
  const { state, dispatch } = useGame();
  const [showConfetti, setShowConfetti] = useState(true);
  const [phase, setPhase] = useState(0);

  const score = state.pearlsEarned.filter(Boolean).length;
  const allCorrect = score === 4;

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setShowConfetti(false), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-5 overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Reef lights up effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: allCorrect
            ? 'radial-gradient(circle at 50% 30%, rgba(251,191,36,0.3), rgba(52,211,153,0.15) 50%, transparent 70%)'
            : 'radial-gradient(circle at 50% 30%, rgba(96,165,250,0.2), transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        aria-hidden="true"
      />

      {/* Title */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="text-center relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <motion.div
              className="text-6xl mb-2"
              animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
              transition={{ duration: 1, delay: 0.5 }}
              aria-hidden="true"
            >
              🏆
            </motion.div>
            <h1
              className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl"
              style={{ fontFamily: 'Fredoka One, cursive', textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
            >
              {allCorrect ? "Amazing Explorer!" : "Great Adventure!"}
            </h1>
            <p className="text-lg text-white/90 font-semibold mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {allCorrect
                ? "You collected ALL 4 magical pearls! The reef is glowing! 🌊✨"
                : `You collected ${score} out of 4 magical pearls! Great reading! 🌊`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pearl showcase */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PearlShowcase pearlsEarned={state.pearlsEarned} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Star rating */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <StarRating score={score} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="relative z-10 w-full max-w-md rounded-3xl p-6 text-center shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,248,220,0.95))',
              border: '4px solid rgba(251,191,36,0.6)',
              boxShadow: '0 20px 60px rgba(251,191,36,0.3)',
            }}
            initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Certificate border decoration */}
            <div className="absolute inset-2 rounded-2xl border-2 border-yellow-300/50 pointer-events-none" />

            <div className="text-3xl mb-2" aria-hidden="true">📜</div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Certificate of Achievement
            </p>
            <h2
              className="text-2xl font-bold text-amber-800 mb-2"
              style={{ fontFamily: 'Fredoka One, cursive' }}
            >
              🌊 Reef Reading Champion 🌊
            </h2>
            <div className="text-sm font-semibold text-gray-600 mb-3 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              This certifies that you have successfully completed the<br />
              <strong className="text-amber-700">UnderSea Tales</strong> reading adventure<br />
              and demonstrated excellent reading skills!
            </div>

            {/* Skill badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {['🔮 Prediction Pro', '🌊 Alt-Outcome Expert', '📚 Word Detective', '🎭 Feeling Finder'].map((badge, i) => (
                <motion.div
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    background: state.pearlsEarned[i] ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : 'rgba(148,163,184,0.2)',
                    color: state.pearlsEarned[i] ? '#92400e' : '#94a3b8',
                    border: `1px solid ${state.pearlsEarned[i] ? '#fbbf24' : 'rgba(148,163,184,0.3)'}`,
                    opacity: state.pearlsEarned[i] ? 1 : 0.5,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
                >
                  {badge}
                </motion.div>
              ))}
            </div>

            <div className="text-yellow-500 text-2xl" aria-label={`${score} stars`}>
              {'⭐'.repeat(score)}{'☆'.repeat(4 - score)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sea animal celebration */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <SeaAnimalCelebration />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play again button */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.button
            className="relative z-10 px-10 py-4 rounded-full font-bold text-xl shadow-2xl cursor-pointer"
            style={{
              fontFamily: 'Fredoka One, cursive',
              background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
              color: 'white',
              border: '3px solid rgba(255,255,255,0.5)',
              boxShadow: '0 8px 32px rgba(6,182,212,0.5)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.07, boxShadow: '0 12px 40px rgba(6,182,212,0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'RESET_GAME' })}
            aria-label="Play the game again"
          >
            🔄 Play Again!
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
