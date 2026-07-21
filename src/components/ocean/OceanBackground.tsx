import { motion } from 'framer-motion';

// Floating bubble component
function Bubble({ size, left, delay, duration }: { size: number; left: string; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        bottom: -20,
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(56,189,248,0.2))`,
        border: '1px solid rgba(255,255,255,0.4)',
      }}
      animate={{
        y: [0, -(window.innerHeight + 60)],
        x: [0, (Math.random() - 0.5) * 60],
        opacity: [0, 0.7, 0.5, 0],
        scale: [0.5, 1, 1.1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  );
}

// Sun rays from top
function SunRay({ angle, left }: { angle: number; left: string }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left,
        width: 60,
        height: '45%',
        background: 'linear-gradient(to bottom, rgba(255,230,100,0.25), transparent)',
        transformOrigin: 'top center',
        transform: `rotate(${angle}deg)`,
        borderRadius: '0 0 50% 50%',
      }}
      animate={{ opacity: [0.05, 0.15, 0.05] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
      aria-hidden="true"
    />
  );
}

// Minimalist background creature
function SwimmingCreature({ emoji, top, delay, duration, direction, scale }: { emoji: string; top: string; delay: number; duration: number; direction: 1 | -1; scale: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none drop-shadow-sm select-none"
      style={{
        top,
        fontSize: '3rem', // Increased size
        opacity: 0.4, // Standard opacity property
        transform: `scaleX(${direction}) scale(${scale})`,
        zIndex: 1,
      }}
      initial={{ left: direction === 1 ? '-20%' : '120%' }}
      animate={{
        left: direction === 1 ? '110%' : '-10%',
        y: [0, -15, 0, 15, 0], // Gentle bobbing
      }}
      transition={{
        left: { duration, delay, repeat: Infinity, ease: 'linear' },
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
      }}
      aria-hidden="true"
    >
      {emoji}
    </motion.div>
  );
}

// Simplified premium background — no cartoons

export default function OceanBackground({ children }: { children?: React.ReactNode }) {

  const bubbles = Array.from({ length: 20 }, (_) => ({
    size: 8 + Math.random() * 24,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
  }));



  const sunRays = [
    { angle: -15, left: '15%' },
    { angle: -5, left: '30%' },
    { angle: 5, left: '45%' },
    { angle: 12, left: '60%' },
    { angle: -8, left: '70%' },
  ];

  const creatures = [
    { emoji: '🐟', top: '15%', delay: 0, duration: 45, direction: 1 as const, scale: 0.8 },
    { emoji: '🐠', top: '40%', delay: 15, duration: 55, direction: -1 as const, scale: 0.9 },
    { emoji: '🐢', top: '75%', delay: 5, duration: 80, direction: 1 as const, scale: 1.2 },
    { emoji: '🦑', top: '60%', delay: 25, duration: 60, direction: -1 as const, scale: 0.7 },
    { emoji: '🐡', top: '30%', delay: 35, duration: 50, direction: 1 as const, scale: 0.85 },
    { emoji: '🐳', top: '80%', delay: 45, duration: 90, direction: -1 as const, scale: 1.5 },
    { emoji: '🦀', top: '90%', delay: 10, duration: 70, direction: 1 as const, scale: 0.6 },
    { emoji: '🐙', top: '50%', delay: 50, duration: 65, direction: 1 as const, scale: 0.9 },
    { emoji: '🐬', top: '25%', delay: 20, duration: 40, direction: -1 as const, scale: 1.1 },
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #bae6fd 0%, #0ea5e9 100%)', // Light, airy, premium blue gradient
      }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Soft overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Sun rays */}
      {sunRays.map((ray, i) => <SunRay key={i} {...ray} />)}

      {/* Subtle slow bubbles */}
      {bubbles.map((b, i) => <Bubble key={i} {...b} />)}

      {/* Minimal background creatures */}
      {creatures.map((c, i) => <SwimmingCreature key={`creature-${i}`} {...c} />)}

      {/* Page content layer */}
      <div className="relative z-10 w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}
