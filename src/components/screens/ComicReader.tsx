import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { comicPanels } from '../../data/comicPanels';
import comicStrip from '../../assets/comic-strip.png';

// Individual panel using CSS clipping to show 1/8 of the strip
function PanelView({ panelIndex, large = false }: { panelIndex: number; large?: boolean }) {
  const panel = comicPanels[panelIndex];
  if (!panel) return null;

  // Grid layout: 4 cols × 2 rows
  const col = panelIndex % 4;
  const row = Math.floor(panelIndex / 4);

  // We show the image cropped. We use object-fit + transform translate trick:
  // The container clips, the img is scaled 4x wide and 2x tall, then translated.
  const containerH = large ? 340 : 260;
  const containerW = large ? '100%' : '100%';

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{ width: containerW, height: containerH, flexShrink: 0 }}
      aria-label={`${panel.label}: ${panel.dialogue || ''}`}
    >
      <img
        src={comicStrip}
        alt={`Comic panel ${panelIndex + 1}: ${panel.dialogue || ''}`}
        style={{
          position: 'absolute',
          width: '400%',
          height: '200%',
          top: `${-row * 100}%`,
          left: `${-col * 100}%`,
          objectFit: 'fill',
        }}
        draggable={false}
      />
      {/* Panel number badge */}
      <div
        className="absolute top-2 left-2 rounded-full px-3 py-1 text-xs font-bold"
        style={{ background: 'rgba(0,0,0,0.55)', color: 'white', fontFamily: 'Fredoka One, cursive' }}
      >
        {panel.label}
      </div>
    </div>
  );
}

// Full strip overview
function FullStripView() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/40">
      <img
        src={comicStrip}
        alt="Full comic strip: Undersea Tales — Sherman's Lagoon by Jim Toomey. A shark and crab discuss why the crab isn't feeling crabby."
        className="w-full h-auto"
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </div>
  );
}

// Animated crab progress indicator
function CrabProgress({ current, total }: { current: number; total: number }) {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="relative flex items-center gap-3">
      {/* Track */}
      <div className="flex-1 h-4 rounded-full overflow-hidden shadow-inner" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, type: 'spring' }}
        />
      </div>
      {/* Crab */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 text-xl pointer-events-none"
        animate={{ left: `calc(${Math.max(percent - 4, 0)}% - 2px)` }}
        transition={{ duration: 0.5, type: 'spring' }}
        style={{ left: `${Math.max(percent - 4, 0)}%` }}
        aria-hidden="true"
      >
        <motion.span
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          🦀
        </motion.span>
      </motion.div>
    </div>
  );
}

export default function ComicReader() {
  const { state, dispatch, totalPanels } = useGame();
  const [showFullStrip, setShowFullStrip] = useState(false);
  const [direction, setDirection] = useState(0);

  const { currentPanel } = state;
  const isLast = currentPanel === totalPanels - 1;
  const isFirst = currentPanel === 0;

  const goNext = () => {
    if (isLast) { setShowFullStrip(true); return; }
    setDirection(1);
    dispatch({ type: 'NEXT_PANEL' });
  };

  const goPrev = () => {
    if (showFullStrip) { setShowFullStrip(false); return; }
    setDirection(-1);
    dispatch({ type: 'PREV_PANEL' });
  };

  const startChallenge = () => {
    dispatch({ type: 'GO_TO_SCREEN', screen: 'question' });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 400 : -400, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 400 : -400, opacity: 0, scale: 0.9 }),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 gap-4">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold text-white drop-shadow"
          style={{ fontFamily: 'Fredoka One, cursive', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          📖 {showFullStrip ? 'Full Comic Strip' : 'Comic Reader'}
        </h2>
        <p className="text-sm font-semibold text-white/80 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
          {showFullStrip ? "Review the whole story before your challenge!" : "Take your time — read each panel carefully!"}
        </p>
      </motion.div>

      {/* Main panel area */}
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          {showFullStrip ? (
            <motion.div
              key="full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              <FullStripView />
            </motion.div>
          ) : (
            <motion.div
              key={currentPanel}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
            >
              <PanelView panelIndex={currentPanel} large />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Panel speech bubble */}
      {!showFullStrip && comicPanels[currentPanel]?.dialogue && (
        <motion.div
          key={`speech-${currentPanel}`}
          className="bg-white/90 rounded-2xl px-5 py-3 max-w-lg text-center shadow-lg"
          style={{ border: '2px solid rgba(6,182,212,0.3)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-sm font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}>
            💬 {comicPanels[currentPanel].dialogue}
          </p>
        </motion.div>
      )}

      {/* Progress bar */}
      {!showFullStrip && (
        <div className="w-full max-w-lg px-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Panel {currentPanel + 1} of {totalPanels}
            </span>
            <span className="text-xs font-bold text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {Math.round(((currentPanel + 1) / totalPanels) * 100)}% read
            </span>
          </div>
          <CrabProgress current={currentPanel} total={totalPanels} />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-4 items-center">
        <motion.button
          className="px-6 py-3 rounded-full font-bold text-base cursor-pointer"
          style={{
            fontFamily: 'Fredoka One, cursive',
            background: isFirst && !showFullStrip ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
            color: '#1e3a5f',
            border: '2px solid rgba(255,255,255,0.5)',
          }}
          whileHover={{ scale: isFirst && !showFullStrip ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goPrev}
          disabled={isFirst && !showFullStrip}
          aria-label="Previous panel"
        >
          ← Previous
        </motion.button>

        {showFullStrip ? (
          <motion.button
            className="px-8 py-4 rounded-full font-bold text-lg shadow-2xl cursor-pointer"
            style={{
              fontFamily: 'Fredoka One, cursive',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              border: '3px solid rgba(255,255,255,0.5)',
              boxShadow: '0 8px 32px rgba(245,158,11,0.5)',
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={startChallenge}
            aria-label="Start the Pearl Challenge"
          >
            🏆 Start Pearl Challenge!
          </motion.button>
        ) : (
          <motion.button
            className="px-6 py-3 rounded-full font-bold text-base cursor-pointer"
            style={{
              fontFamily: 'Fredoka One, cursive',
              background: isLast ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.9)',
              color: isLast ? 'white' : '#1e3a5f',
              border: '2px solid rgba(255,255,255,0.5)',
              boxShadow: isLast ? '0 6px 20px rgba(245,158,11,0.5)' : 'none',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            aria-label={isLast ? "See full comic strip" : "Next panel"}
          >
            {isLast ? '📖 See Full Strip →' : 'Next →'}
          </motion.button>
        )}
      </div>

      {/* Panel dots */}
      {!showFullStrip && (
        <div className="flex gap-2" role="tablist" aria-label="Panel navigation">
          {comicPanels.map((_, i) => (
            <motion.button
              key={i}
              className="rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              style={{
                width: i === currentPanel ? 20 : 8,
                height: 8,
                background: i === currentPanel ? 'white' : i < currentPanel ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
              }}
              animate={{ width: i === currentPanel ? 20 : 8 }}
              transition={{ duration: 0.3 }}
              onClick={() => { setDirection(i > currentPanel ? 1 : -1); dispatch({ type: 'SET_PANEL', panel: i }); }}
              role="tab"
              aria-selected={i === currentPanel}
              aria-label={`Go to panel ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
