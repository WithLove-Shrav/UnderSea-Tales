import { motion, AnimatePresence } from 'framer-motion';

interface TurtleGuideProps {
  message: string;
  mood?: 'happy' | 'thinking' | 'excited' | 'encouraging';
  show?: boolean;
  position?: 'bottom-left' | 'bottom-right' | 'inline';
}

const moodEmoji: Record<string, string> = {
  happy: '😊',
  thinking: '🤔',
  excited: '🎉',
  encouraging: '💪',
};

export default function TurtleGuide({ message, mood = 'happy', show = true, position = 'bottom-left' }: TurtleGuideProps) {
  const positionClass = position === 'bottom-left'
    ? 'fixed bottom-4 left-4 z-50'
    : position === 'bottom-right'
    ? 'fixed bottom-4 right-4 z-50'
    : 'relative';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`${positionClass} flex items-end gap-2`}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Speech bubble */}
          <motion.div
            className="relative bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg max-w-xs"
            style={{ border: '1px solid rgba(255,255,255,0.8)' }}
            initial={{ scale: 0.95, opacity: 0, originX: 0, originY: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
          >
            <div className="absolute -bottom-3 left-6 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '12px solid rgba(255,255,255,0.95)' }} />
            <p
              className="text-sm font-medium leading-snug"
              style={{ fontFamily: 'Nunito, sans-serif', color: '#0f172a' }}
            >
              {message}
            </p>
          </motion.div>

          {/* Turtle character */}
          <motion.div
            className="flex flex-col items-center opacity-90"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="text-4xl select-none relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              title="Tully the Turtle"
            >
              🐢
              {/* Mood emoji overlay */}
              <motion.span
                className="absolute -top-2 -right-2 text-base"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                {moodEmoji[mood]}
              </motion.span>
            </motion.div>
            <p
              className="text-xs font-semibold text-white/90 mt-1"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Tully
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
