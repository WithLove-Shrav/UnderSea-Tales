import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import charactersImg from '../../assets/characters.png';

const tutorialSteps = [
  {
    turtle: "Hello Explorer! 🌊 I'm Tully the Turtle!",
    sub: "Welcome to the magical reef!",
  },
  {
    turtle: "Today we're diving into a funny comic called...",
    sub: "Undersea Tales!",
  },
  {
    turtle: "Read carefully... hidden inside are FOUR magical pearls! 🫧🌊🐚✨",
    sub: "Each pearl unlocks when you understand the story!",
  },
  {
    turtle: "Let's meet our comic characters first!",
    sub: "Then we'll dive into the adventure!",
  },
];

function TurtleSwimIn({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(s => s + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      {/* Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.h1
          className="text-5xl md:text-7xl drop-shadow-2xl mb-2"
          style={{ fontFamily: 'Fredoka One, cursive', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.4), 0 2px 0 rgba(0,0,0,0.2)' }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌊 UnderSea Tales
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl font-bold"
          style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Help the Reef Explorer collect magical pearls!
        </motion.p>
      </motion.div>

      {/* Pearl row */}
      <motion.div
        className="flex gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {['🫧', '🌊', '🐚', '✨'].map((p, i) => (
          <motion.div
            key={i}
            className="text-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            {p}
          </motion.div>
        ))}
      </motion.div>

      {/* Turtle with speech bubble */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={step}
            className="flex flex-col items-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative bg-white rounded-[3rem] px-10 md:px-24 py-8 md:py-12 shadow-2xl w-[95%] max-w-3xl text-center mx-auto"
              style={{ border: '4px solid rgba(6,182,212,0.4)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <p className="text-xl font-bold mb-1" style={{ fontFamily: 'Fredoka One, cursive', color: '#1e3a5f' }}>
                {tutorialSteps[step].turtle}
              </p>
              <p className="text-sm font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#475569' }}>
                {tutorialSteps[step].sub}
              </p>
              {/* Tail */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{ borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '16px solid white' }}
              />
            </motion.div>

            {/* Turtle */}
            <motion.div
              className="text-8xl select-none"
              animate={{
                x: step === 0 ? [-200, 0] : 0,
                y: [0, -8, 0],
              }}
              transition={{
                x: { duration: 1, type: 'spring' },
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              aria-hidden="true"
            >
              🐢
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step dots */}
      <div className="flex gap-2 mb-6">
        {tutorialSteps.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: i === step ? 24 : 8,
              height: 8,
              background: i === step ? 'white' : 'rgba(255,255,255,0.4)',
            }}
            animate={{ width: i === step ? 24 : 8 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        className="px-10 py-4 rounded-full font-bold text-xl shadow-2xl cursor-pointer"
        style={{
          fontFamily: 'Fredoka One, cursive',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          color: '#1e3a5f',
          border: '3px solid rgba(255,255,255,0.5)',
          boxShadow: '0 8px 32px rgba(251,191,36,0.5)',
        }}
        whileHover={{ scale: 1.07, boxShadow: '0 12px 40px rgba(251,191,36,0.7)' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        aria-label={step < tutorialSteps.length - 1 ? 'Next' : 'Meet the characters'}
      >
        {step < tutorialSteps.length - 1 ? '✨ Next →' : "🐠 Meet the Characters!"}
      </motion.button>
    </div>
  );
}

function CharacterIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <motion.div
        className="rounded-3xl overflow-hidden shadow-2xl mb-6 max-w-lg w-full"
        style={{ border: '4px solid rgba(255,255,255,0.6)' }}
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <img
          src={charactersImg}
          alt="Meet the Characters: Shark and Crab from Sherman's Lagoon"
          className="w-full"
        />
      </motion.div>

      <motion.div
        className="bg-white rounded-3xl px-8 py-5 shadow-xl text-center max-w-md mb-6"
        style={{ border: '2px solid rgba(6,182,212,0.3)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <p className="text-lg font-bold mb-1" style={{ fontFamily: 'Fredoka One, cursive', color: '#1e3a5f' }}>
          These are your comic characters!
        </p>
        <p className="text-sm font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#475569' }}>
          The <strong>Shark</strong> and the <strong>Crab</strong> are having a funny conversation underwater. Read carefully to collect all 4 magical pearls! 🎉
        </p>
      </motion.div>

      <motion.button
        className="px-12 py-4 rounded-full font-bold text-xl shadow-2xl cursor-pointer"
        style={{
          fontFamily: 'Fredoka One, cursive',
          background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
          color: 'white',
          border: '3px solid rgba(255,255,255,0.5)',
          boxShadow: '0 8px 32px rgba(6,182,212,0.5)',
        }}
        whileHover={{ scale: 1.07, boxShadow: '0 12px 40px rgba(6,182,212,0.7)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        aria-label="Start the adventure"
      >
        🚢 START ADVENTURE!
      </motion.button>
    </div>
  );
}

export default function HomeScreen() {
  const { dispatch } = useGame();
  const [phase, setPhase] = useState<'intro' | 'characters'>('intro');

  return (
    <AnimatePresence mode="wait">
      {phase === 'intro' ? (
        <motion.div key="intro" exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
          <TurtleSwimIn onNext={() => setPhase('characters')} />
        </motion.div>
      ) : (
        <motion.div key="characters" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <CharacterIntro onStart={() => dispatch({ type: 'GO_TO_SCREEN', screen: 'comic' })} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
