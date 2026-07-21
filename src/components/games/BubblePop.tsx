import { motion } from 'framer-motion';

interface BubblePopProps {
  /** 'green' for correct, 'red' for wrong */
  variant: 'correct' | 'wrong';
}

const COLORS = {
  correct: { main: 'rgba(74,222,128,1)', light: 'rgba(187,247,208,1)', white: 'white' },
  wrong:   { main: 'rgba(248,113,113,1)', light: 'rgba(254,202,202,1)', white: 'white' },
};

// 12 particles at even angles + small random jitter
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * 360 + (Math.random() - 0.5) * 15,
  dist:  55 + Math.random() * 35,
  size:  4 + Math.random() * 5,
  delay: Math.random() * 0.03,
  isLight: i % 3 === 0,
}));

export default function BubblePop({ variant }: BubblePopProps) {
  const c = COLORS[variant];

  return (
    // overflow:visible is critical so particles and rings can escape the button bounds
    <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible', zIndex: 40 }}>

      {/* ── 1. Instant bright white flash ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '-30%',
          background: `radial-gradient(circle, white 0%, ${c.light} 35%, transparent 70%)`,
        }}
        initial={{ scale: 0.6, opacity: 1 }}
        animate={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />

      {/* ── 2. Fast primary ring (the "burst edge") ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 0,
          border: `3px solid ${c.main}`,
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 3.2, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.05, 0.5, 0.3, 1] }}
      />

      {/* ── 3. Trailing inner ring ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '5%',
          border: `2px solid ${c.light}`,
        }}
        initial={{ scale: 1, opacity: 0.9 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut', delay: 0.04 }}
      />

      {/* ── 4. Droplet particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.isLight ? c.white : c.main,
            top: '50%',
            left: '50%',
            boxShadow: `0 0 4px ${c.main}`,
          }}
          initial={{
            x: -p.size / 2,
            y: -p.size / 2,
            scale: 1.2,
            opacity: 1,
          }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.dist - p.size / 2,
            y: Math.sin((p.angle * Math.PI) / 180) * p.dist - p.size / 2,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.38,
            ease: [0.1, 0.8, 0.4, 1],
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
