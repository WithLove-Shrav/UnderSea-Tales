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

type Behaviour = 'wiggle' | 'jump' | 'pulse' | 'scuttle' | 'dart' | 'drift';

interface CreatureProps {
  emoji: string;
  top: string;
  delay: number;
  duration: number;
  direction: 1 | -1;
  scale: number;
  behaviour: Behaviour;
}

function SwimmingCreature({ emoji, top, delay, duration, direction, behaviour }: CreatureProps) {
  // Each behaviour gets its own y + rotate keyframe signature
  const yAnim: Record<Behaviour, number[]> = {
    wiggle: [0, -10, 0, 10, 0],            // gentle swim wave
    jump:   [0, -60, -80, -60, 0, 0, 0],   // dolphin leap
    pulse:  [0, -8, 0, -8, 0],             // octopus drift with pulse
    scuttle:[0, -4, 0, -4, 0],             // crab scuttle stays low
    dart:   [0, -20, -20, 0, 0],           // squid dart and glide
    drift:  [0, -20, 0, 20, 0],            // whale slow drift
  };

  const rotateAnim: Record<Behaviour, number[]> = {
    wiggle:  [0, 8, 0, -8, 0],             // fish wags body
    jump:    [0, -20, 0, 20, 0, 0, 0],     // dolphin rotation through leap
    pulse:   [0, 0, 0, 0, 0],
    scuttle: [0, 5, -5, 5, 0],             // crab tips side to side
    dart:    [-10, 0, 0, 10, 0],           // squid tilts on burst
    drift:   [0, 3, 0, -3, 0],             // whale gentle list
  };

  const scaleAnim: Record<Behaviour, number[]> = {
    wiggle:  [1, 1, 1, 1, 1],
    jump:    [1, 1.1, 1.2, 1.1, 1, 1, 1],  // dolphin grows at peak
    pulse:   [1, 1.15, 0.9, 1.1, 1],        // octopus contracts/expands
    scuttle: [1, 1, 1, 1, 1],
    dart:    [1, 1.1, 1, 0.95, 1],
    drift:   [1, 1.02, 1, 0.98, 1],
  };

  const yDuration: Record<Behaviour, number> = {
    wiggle: 2.0,
    jump:   4.5,
    pulse:  1.8,
    scuttle:1.2,
    dart:   2.5,
    drift:  8.0,
  };

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        top,
        fontSize: '3rem',
        opacity: 0.38,
        zIndex: 20,
        // flip direction; rotate added via animate below so we use originX/Y
        transformOrigin: 'center center',
      }}
      initial={{ left: direction === 1 ? '-15%' : '115%', scaleX: direction }}
      animate={{
        left: direction === 1 ? '115%' : '-15%',
        y: yAnim[behaviour],
        rotate: rotateAnim[behaviour].map(r => r * direction), // mirror for left-facing creatures
        scale: scaleAnim[behaviour],
      }}
      transition={{
        left: { duration, delay, repeat: Infinity, ease: 'linear' },
        y: { duration: yDuration[behaviour], repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
        rotate: { duration: yDuration[behaviour], repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
        scale: { duration: yDuration[behaviour] * (behaviour === 'pulse' ? 1 : 1), repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
      }}
      aria-hidden="true"
    >
      {emoji}
    </motion.div>
  );
}

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

  const creatures: CreatureProps[] = [
    { emoji: '🐟', top: '15%', delay: 0,  duration: 38, direction:  1, scale: 0.8, behaviour: 'wiggle'  },
    { emoji: '🐠', top: '40%', delay: 12, duration: 50, direction: -1, scale: 0.9, behaviour: 'wiggle'  },
    { emoji: '🐢', top: '70%', delay: 5,  duration: 75, direction:  1, scale: 1.2, behaviour: 'drift'   },
    { emoji: '🦑', top: '55%', delay: 22, duration: 42, direction: -1, scale: 0.7, behaviour: 'dart'    },
    { emoji: '🐡', top: '30%', delay: 30, duration: 48, direction:  1, scale: 0.85,behaviour: 'wiggle'  },
    { emoji: '🐳', top: '82%', delay: 40, duration: 90, direction: -1, scale: 1.4, behaviour: 'drift'   },
    { emoji: '🦀', top: '88%', delay: 8,  duration: 55, direction:  1, scale: 0.7, behaviour: 'scuttle' },
    { emoji: '🐙', top: '50%', delay: 45, duration: 60, direction:  1, scale: 0.9, behaviour: 'pulse'   },
    { emoji: '🐬', top: '22%', delay: 18, duration: 36, direction: -1, scale: 1.1, behaviour: 'jump'    },
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #bae6fd 0%, #0ea5e9 100%)',
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

      {/* Page content layer */}
      <div className="relative z-10 w-full h-full overflow-auto">
        {children}
      </div>

      {/* Lively background creatures — rendered ABOVE content so they show on all pages */}
      {creatures.map((c, i) => <SwimmingCreature key={`creature-${i}`} {...c} />)}
    </div>
  );
}
