import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './context/GameContext';
import OceanBackground from './components/ocean/OceanBackground';
import HomeScreen from './components/screens/HomeScreen';
import ComicReader from './components/screens/ComicReader';
import QuestionLayout from './components/screens/QuestionLayout';
import ResultsScreen from './components/screens/ResultsScreen';
import TurtleGuide from './components/characters/TurtleGuide';
import { questions } from './data/questions';

const turtleMessages: Record<string, { msg: string; mood: 'happy' | 'thinking' | 'excited' | 'encouraging' }> = {
  home: { msg: "Hello Explorer! Ready for an undersea adventure? 🌊", mood: 'excited' },
  comic: { msg: "Read each panel carefully — the pearls are hiding in the story! 🦀", mood: 'thinking' },
  question: { msg: "You can always look at the comic on the left for clues! 🐢", mood: 'encouraging' },
  results: { msg: "Amazing reading, Explorer! You're a true Reef Champion! 🏆", mood: 'excited' },
};

export default function App() {
  const { state } = useGame();
  const { currentScreen, currentQuestion } = state;

  const showTurtle = currentScreen !== 'question'; // Q layout has inline turtle tip
  const turtleInfo = currentScreen === 'question'
    ? { msg: questions[currentQuestion]?.turtleTip || "Trust your reading skills!", mood: 'encouraging' as const }
    : turtleMessages[currentScreen] || turtleMessages.home;

  const pageVariants = {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.03 },
  };

  return (
    <OceanBackground>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-700 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <main id="main-content" className="w-full h-full">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <HomeScreen />
            </motion.div>
          )}

          {currentScreen === 'comic' && (
            <motion.div
              key="comic"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <ComicReader />
            </motion.div>
          )}

          {currentScreen === 'question' && (
            <motion.div
              key={`question-${currentQuestion}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <QuestionLayout />
            </motion.div>
          )}

          {currentScreen === 'results' && (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full min-h-screen"
            >
              <ResultsScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global turtle guide */}
      {showTurtle && (
        <TurtleGuide
          message={turtleInfo.msg}
          mood={turtleInfo.mood}
          show
          position="bottom-left"
        />
      )}
    </OceanBackground>
  );
}
