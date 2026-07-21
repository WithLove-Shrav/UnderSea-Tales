import { motion } from 'framer-motion';

interface BubblePopProps {
  variant: 'correct' | 'wrong';
}

const COLORS = {
  correct: { primary: '#4ade80', secondary: '#bbf7d0', glow: 'rgba(74,222,128,0.9)' },
  wrong:   { primary: '#f87171', secondary: '#fecaca', glow: 'rgba(248,113,113,0.9)' },
};

// 16 particles — varied sizes and distances for a natural spray
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  angle:    (i / 16) * 360 + (Math.random() - 0.5) * 18,
  dist:     60 + Math.random() * 55,
  size:     3 + Math.random() * 7,
  delay:    Math.random() * 0.04,
  isWhite:  i % 4 === 0,
  duration: 0.35 + Math.random() * 0.12,
}));

export default function BubblePop({ variant }: BubblePopProps) {
  const c = COLORS[variant];

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        // Extend well beyond button bounds so particles are fully visible
        inset: '-80px',
        zIndex: 50,
        overflow: 'visible',
      }}
    >
      {/* 1 ── Shockwave: instant full-white flash that expands rapidly */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '80px', // sits exactly over the button
          background: `radial-gradient(circle, white 0%, ${c.secondary} 30%, transparent 70%)`,
        }}
        initial={{ scale: 0.7, opacity: 1 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 0.20, ease: [0, 0.8, 0.6, 1] }}
      />

      {/* 2 ── Primary burst ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '80px',
          border: `4px solid ${c.glow}`,
          boxShadow: `0 0 12px ${c.glow}`,
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 3.8, opacity: 0 }}
        transition={{ duration: 0.30, ease: [0.0, 0.6, 0.2, 1] }}
      />

      {/* 3 ── Trailing inner ring (slightly slower) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '90px',
          border: `2px solid ${c.primary}`,
        }}
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 3.0, opacity: 0 }}
        transition={{ duration: 0.26, ease: 'easeOut', delay: 0.04 }}
      />

      {/* 4 ── Particle spray */}
      {PARTICLES.map((p, i) => {
        // Origin: center of the button (inset=80px so center is at 50% of this div)
        const cx = 0; // relative to center
        const cy = 0;
        const tx = Math.cos((p.angle * Math.PI) / 180) * p.dist;
        const ty = Math.sin((p.angle * Math.PI) / 180) * p.dist;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  p.size,
              height: p.size,
              background: p.isWhite ? 'white' : c.primary,
              boxShadow: `0 0 6px ${c.glow}`,
              // Centered on the button center
              top:  '50%',
              left: '50%',
            }}
            initial={{
              x: cx - p.size / 2,
              y: cy - p.size / 2,
              scale: 1.4,
              opacity: 1,
            }}
            animate={{
              x: tx - p.size / 2,
              y: ty - p.size / 2,
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: p.duration,
              ease: [0.05, 0.9, 0.3, 1],
              delay: p.delay,
            }}
          />
        );
      })}
    </div>
  );
}
