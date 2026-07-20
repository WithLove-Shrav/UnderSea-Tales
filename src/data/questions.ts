export interface QuestionOption {
  id: string;
  text: string;
  emoji?: string;
  isCorrect: boolean;
  feeling?: string;
}

export interface Question {
  id: number;
  pearlName: string;
  pearlEmoji: string;
  pearlColor: string;
  pearlGradient: string;
  skill: string;
  gameType: 'speech-bubble' | 'reaction-cards' | 'treasure-chest' | 'emotion-shells';
  questionText: string;
  contextText?: string;
  correctFeedback: string;
  wrongFeedback: string;
  explanation: string;
  options: QuestionOption[];
  turtleTip?: string;
}

export const questions: Question[] = [
  {
    id: 0,
    pearlName: 'Pearl of Prediction',
    pearlEmoji: '🫧',
    pearlColor: '#60a5fa',
    pearlGradient: 'linear-gradient(135deg, #93c5fd, #3b82f6, #1d4ed8)',
    skill: 'Predicting what happens next',
    gameType: 'speech-bubble',
    questionText: "The shark's story does NOT make the crab feel angry. What is the crab MOST likely to say next?",
    correctFeedback: "Brilliant! You predicted what the crab would say! Crabs always need to stay crabby! 🦀✨",
    wrongFeedback: "Hmm! Think about what the crab wanted from the start — to feel crabby! Read panel 1 and 2 again. 🫧",
    explanation: "Because the crab wants to be angry, it will try again to make the shark tell a story that makes it crabby.",
    turtleTip: "Look at what the crab wanted at the very beginning of the comic!",
    options: [
      { id: 'A', text: '"Try something else. I still need to feel crabby!"', isCorrect: true, feeling: 'determined' },
      { id: 'B', text: '"Maybe I don\'t need to feel crabby after all."', isCorrect: false, feeling: 'calm' },
      { id: 'C', text: '"Now I\'ll try to make YOU feel crabby!"', isCorrect: false, feeling: 'mischievous' },
      { id: 'D', text: '"Is your wife still angry?"', isCorrect: false, feeling: 'curious' },
    ],
  },
  {
    id: 1,
    pearlName: 'Pearl of Possibilities',
    pearlEmoji: '🌊',
    pearlColor: '#34d399',
    pearlGradient: 'linear-gradient(135deg, #6ee7b7, #10b981, #059669)',
    skill: 'Suggesting an alternative outcome',
    gameType: 'reaction-cards',
    questionText: "If the shark had opened the package BEFORE his wife saw it, how would she MOST likely react?",
    contextText: "The package arrived. His wife thought it was her birthday present — but it was really his new putter.",
    correctFeedback: "Perfect thinking! She would be neutral — she wouldn't be angry or excited, because it was just his golf putter. 🌊✨",
    wrongFeedback: "Think carefully — if she saw it was just his golf putter, not a present for her, how would she feel? 🌊",
    explanation: "Since it is a golf putter, it is not a present for her. So, she would be neutral instead of angry or excited.",
    turtleTip: "If she knew it was his putter all along, she wouldn't expect a present!",
    options: [
      { id: 'A', emoji: '🙂', text: '"Oh... it\'s your new putter."', feeling: 'Neutral', isCorrect: true },
      { id: 'B', emoji: '😍', text: '"Wow! A birthday present for me!"', feeling: 'Excited', isCorrect: false },
      { id: 'C', emoji: '😡', text: '"You forgot my birthday!"', feeling: 'Angry', isCorrect: false },
      { id: 'D', emoji: '😭', text: '"You hid something from me!"', feeling: 'Upset', isCorrect: false },
    ],
  },
  {
    id: 2,
    pearlName: 'Pearl of Meaning',
    pearlEmoji: '🐚',
    pearlColor: '#a78bfa',
    pearlGradient: 'linear-gradient(135deg, #c4b5fd, #8b5cf6, #6d28d9)',
    skill: 'Understanding vocabulary in context',
    gameType: 'treasure-chest',
    questionText: 'In the comic, "a present" means a gift. Which sentence uses "present" the SAME way?',
    contextText: '"Then a package arrived, and she thought I got her a present."',
    correctFeedback: "Wonderful! 'Present' here means a gift — just like in the comic! You found the right meaning! 🐚✨",
    wrongFeedback: "Try again! In the comic, 'present' means a gift. Look for the sentence where it also means a gift! 🐚",
    explanation: "In the comic, 'present' is used as a noun meaning a gift. 'The present from my grandparents arrived yesterday' also uses it to mean a gift.",
    turtleTip: "In the comic, 'present' is used as a noun meaning a gift. Which chest has the same use?",
    options: [
      { id: 'A', text: '"The present from my grandparents arrived yesterday."', isCorrect: true },
      { id: 'B', text: '"The museum will present a new collection next week."', isCorrect: false },
      { id: 'C', text: '"The principal will present the trophy to the winner."', isCorrect: false },
      { id: 'D', text: '"Students were present during the assembly."', isCorrect: false },
    ],
  },
  {
    id: 3,
    pearlName: 'Pearl of Feelings',
    pearlEmoji: '✨',
    pearlColor: '#fbbf24',
    pearlGradient: 'linear-gradient(135deg, #fde68a, #f59e0b, #d97706)',
    skill: 'Identifying mood and tone',
    gameType: 'emotion-shells',
    questionText: 'The crab says "Oh, well." This shows the crab is accepting what happened and moving on. Which sentence has the SAME feeling?',
    contextText: '"Oh, well." — The crab after hearing the shark\'s whole story.',
    correctFeedback: "Amazing! Both sentences show calm acceptance — not happy, not angry, just... moving on. ✨🌟",
    wrongFeedback: "Think about how the crab felt — not sad, not excited, just accepting what happened. Which one matches? ✨",
    explanation: "The crab is accepting what happened and moving on, which is calm acceptance. 'Guess I'll grab another' shows the exact same calm acceptance.",
    turtleTip: "'Oh, well' means accepting something and moving on calmly. Look for that same feeling!",
    options: [
      { id: 'A', text: '"I lost my pencil again. Guess I\'ll grab another."', isCorrect: true, feeling: 'Calm acceptance' },
      { id: 'B', text: '"I can\'t believe I missed the party! I\'m so upset!"', isCorrect: false, feeling: 'Disappointment' },
      { id: 'C', text: '"YES! I finally got the highest score!"', isCorrect: false, feeling: 'Excitement' },
    ],
  },
];
