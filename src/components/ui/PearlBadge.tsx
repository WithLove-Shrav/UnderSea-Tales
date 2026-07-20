import { motion } from 'framer-motion';

interface PearlBadgeProps {
  earned: boolean;
  active?: boolean;
  color: string;
  gradient: string;
  emoji: string;
  name: string;
  index: number;
  small?: boolean;
}

export default function PearlBadge({ earned, active = false, color, gradient, emoji, name, index, small = false }: PearlBadgeProps) {
  const size = small ? 32 : 48;
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
      title={name}
      aria-label={`${name} — ${earned ? 'Earned!' : active ? 'Current challenge' : 'Not yet earned'}`}
    >
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: earned ? gradient : 'rgba(255,255,255,0.15)',
          border: active ? `3px solid ${color}` : earned ? `2px solid ${color}` : '2px solid rgba(255,255,255,0.3)',
          boxShadow: earned
            ? `0 0 16px 4px ${color}88, 0 0 32px 8px ${color}44`
            : active
            ? `0 0 8px 2px ${color}66`
            : 'none',
        }}
        animate={
          earned
            ? {
                boxShadow: [
                  `0 0 16px 4px ${color}88`,
                  `0 0 24px 8px ${color}cc`,
                  `0 0 16px 4px ${color}88`,
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {earned ? (
          <motion.span
            className="text-lg select-none"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {emoji}
          </motion.span>
        ) : active ? (
          <motion.span
            className="text-sm select-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❓
          </motion.span>
        ) : (
          <span className="text-sm select-none opacity-30">⭕</span>
        )}
      </motion.div>
      {!small && (
        <span
          className="text-xs font-bold text-center leading-tight"
          style={{
            fontFamily: 'Nunito, sans-serif',
            color: earned ? 'white' : 'rgba(255,255,255,0.5)',
            maxWidth: 60,
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
        >
          {name.replace('Pearl of ', '')}
        </span>
      )}
    </motion.div>
  );
}
