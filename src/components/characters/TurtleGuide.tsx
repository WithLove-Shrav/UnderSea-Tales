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
            className="relative bg-white rounded-2xl px-4 py-3 shadow-xl max-w-xs"
            style={{ border: '2px solid rgba(6,182,212,0.3)' }}
            initial={{ scale: 0, originX: 0, originY: 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
          >
            <div className="speech-bubble-tail" />
            <p
              className="text-sm font-bold leading-snug"
              style={{ fontFamily: 'Nunito, sans-serif', color: '#1e3a5f' }}
            >
              {message}
            </p>
          </motion.div>

          {/* Turtle character */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="text-5xl select-none relative"
              whileHover={{ scale: 1.1, rotate: [-3, 3, -3] }}
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
              className="text-xs font-bold text-white mt-1 drop-shadow"
              style={{ fontFamily: 'Fredoka One, cursive', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              Tully
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
