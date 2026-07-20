import { useEffect, useRef } from 'react';
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

// Animated fish (emoji-based, lightweight)
function Fish({ top, delay, direction = 'right', speed = 18 }: { top: string; delay: number; direction?: 'left' | 'right'; speed?: number }) {
  const fishEmojis = ['🐠', '🐟', '🐡', '🦈'];
  const emoji = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
  const startX = direction === 'right' ? '-100px' : 'calc(100vw + 100px)';
  const endX = direction === 'right' ? 'calc(100vw + 100px)' : '-100px';
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={{ top, left: startX, scaleX: direction === 'left' ? -1 : 1 }}
      animate={{ left: endX }}
      transition={{ duration: speed, delay, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      {emoji}
    </motion.div>
  );
}

// Seaweed column
function Seaweed({ left, height, color, delay }: { left: string; height: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{ left, width: 18, height, background: `linear-gradient(to top, ${color}, transparent)`, borderRadius: '50% 50% 0 0', transformOrigin: 'bottom center' }}
      animate={{ rotate: [-8, 8, -8], scaleX: [0.95, 1.05, 0.95] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden="true"
    />
  );
}

// Jellyfish
function Jellyfish({ left, top, delay }: { left: string; top: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top }}
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ scaleY: [1, 0.85, 1], scaleX: [1, 1.1, 1] }}
        transition={{ duration: 1.5 + delay * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-3xl select-none">🪼</div>
      </motion.div>
    </motion.div>
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

// Walking crab at bottom
function WalkingCrab({ startLeft, delay }: { startLeft: number; delay: number }) {
  return (
    <motion.div
      className="absolute bottom-2 text-2xl pointer-events-none select-none"
      style={{ left: startLeft }}
      animate={{
        left: ['5%', '95%'],
        scaleX: [1, 1, -1, -1, 1],
      }}
      transition={{
        left: { duration: 25, delay, repeat: Infinity, ease: 'linear', repeatType: 'reverse' },
        scaleX: { duration: 25, delay, repeat: Infinity, times: [0, 0.49, 0.5, 0.99, 1] },
      }}
      aria-hidden="true"
    >
      🦀
    </motion.div>
  );
}

export default function OceanBackground({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle sand particle canvas (optional lightweight effect)
  useEffect(() => {
    // No-op for now; keep canvas for future particle effects
  }, []);

  const bubbles = Array.from({ length: 20 }, (_) => ({
    size: 8 + Math.random() * 24,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
  }));

  const seaweeds = [
    { left: '3%', height: 120, color: '#059669', delay: 0 },
    { left: '8%', height: 90, color: '#10b981', delay: 0.5 },
    { left: '15%', height: 140, color: '#047857', delay: 1 },
    { left: '22%', height: 80, color: '#34d399', delay: 0.3 },
    { left: '80%', height: 110, color: '#059669', delay: 0.7 },
    { left: '87%', height: 130, color: '#10b981', delay: 0.2 },
    { left: '92%', height: 75, color: '#047857', delay: 0.9 },
    { left: '96%', height: 95, color: '#34d399', delay: 0.4 },
  ];

  const sunRays = [
    { angle: -15, left: '15%' },
    { angle: -5, left: '30%' },
    { angle: 5, left: '45%' },
    { angle: 12, left: '60%' },
    { angle: -8, left: '70%' },
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 25%, #0369a1 55%, #1e4d7b 80%, #1e3a5f 100%)',
      }}
      role="presentation"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Sun rays */}
      {sunRays.map((ray, i) => <SunRay key={i} {...ray} />)}

      {/* Bubbles */}
      {bubbles.map((b, i) => <Bubble key={i} {...b} />)}

      {/* Jellyfish */}
      <Jellyfish left="12%" top="20%" delay={0} />
      <Jellyfish left="78%" top="35%" delay={1.5} />
      <Jellyfish left="55%" top="15%" delay={2.5} />

      {/* Swimming fish */}
      <Fish top="15%" delay={0} direction="right" speed={20} />
      <Fish top="30%" delay={5} direction="left" speed={22} />
      <Fish top="50%" delay={8} direction="right" speed={18} />
      <Fish top="65%" delay={12} direction="left" speed={25} />
      <Fish top="20%" delay={15} direction="right" speed={16} />

      {/* Coral decorations at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-2 pointer-events-none">
        <div className="text-4xl select-none mb-1" aria-hidden="true">🪸</div>
        <div className="text-3xl select-none mb-1" aria-hidden="true">🪸</div>
        <div className="text-4xl select-none mb-1" aria-hidden="true">🪸</div>
        <div className="text-2xl select-none mb-2" aria-hidden="true">⭐</div>
        <div className="text-4xl select-none mb-1" aria-hidden="true">🪸</div>
        <div className="text-3xl select-none mb-1" aria-hidden="true">🪸</div>
        <div className="text-4xl select-none mb-1" aria-hidden="true">🪸</div>
      </div>

      {/* Seaweeds */}
      {seaweeds.map((s, i) => <Seaweed key={i} {...s} />)}

      {/* Walking crab */}
      <WalkingCrab startLeft={50} delay={2} />

      {/* Sand layer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(254,243,199,0.3), transparent)' }}
      />

      {/* Page content layer */}
      <div className="relative z-10 w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}
