export interface QuestionOption {
  id: string;
  text: string;
  emoji?: string;
  image?: string;
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
  gameType: 'speech-bubble' | 'reaction-cards' | 'treasure-chest' | 'emotion-shells' | 'treasure-decoder' | 'mood-compass';
  questionText: string;
  contextText?: string;
  correctFeedback: string;
  wrongFeedback: string;
  explanation: string;
  options: QuestionOption[];
  turtleTip?: string;
}

import neutralImg from '../assets/1_neutral.png';
import excitedImg from '../assets/2_excited.png';
import angryImg from '../assets/3_angry.png';
import upsetImg from '../assets/4_upset.png';

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
      { id: 'A', image: neutralImg, text: '"Oh... it\'s your new putter."', feeling: 'Neutral', isCorrect: true },
      { id: 'B', image: excitedImg, text: '"Wow! A birthday present for me!"', feeling: 'Excited', isCorrect: false },
      { id: 'C', image: angryImg, text: '"You forgot my birthday!"', feeling: 'Angry', isCorrect: false },
      { id: 'D', image: upsetImg, text: '"You hid something from me!"', feeling: 'Upset', isCorrect: false },
    ],
  },
  {
    id: 2,
    pearlName: 'Pearl of Meaning',
    pearlEmoji: '🐚',
    pearlColor: '#a78bfa',
    pearlGradient: 'linear-gradient(135deg, #c4b5fd, #8b5cf6, #6d28d9)',
    skill: 'Using context clues to infer meanings',
    gameType: 'treasure-decoder',
    questionText: 'Which sentence most closely matches the meaning of "fit to be tied"?',
    correctFeedback: "Brilliant! You cracked the code! 'Fit to be tied' means being extremely angry, just like Arjun! 🐚✨",
    wrongFeedback: "Not quite! 'Fit to be tied' means being extremely furious or angry. Which sentence shows the most anger? 🐚",
    explanation: "\"Fit to be tied\" means being extremely angry or furious. Throwing a bag onto a sofa after a terrible day is a strong reaction that best shows this extreme anger.",
    turtleTip: "Old sea creatures sometimes use unusual expressions. Let's unlock the meaning of this one! 'Fit to be tied' means very, very angry!",
    options: [
      { id: 'A', text: 'Nisha looked upset when her friend forgot to call her.', isCorrect: false },
      { id: 'B', text: 'Dev muttered unhappily when the picnic was cancelled.', isCorrect: false },
      { id: 'C', text: 'After a terrible day, Arjun threw his bag onto the sofa.', isCorrect: true },
      { id: 'D', text: 'Meera frowned when she could not find her favourite pen.', isCorrect: false },
    ],
  },
  {
    id: 3,
    pearlName: 'Pearl of Feelings',
    pearlEmoji: '✨',
    pearlColor: '#fbbf24',
    pearlGradient: 'linear-gradient(135deg, #fde68a, #f59e0b, #d97706)',
    skill: 'Identifying mood and tone',
    gameType: 'mood-compass',
    questionText: 'Which words BEST describe the overall tone of the conversation between the shark and the crab?',
    correctFeedback: "Amazing! The conversation is cheerful and amusing as they joke around! ✨🌟",
    wrongFeedback: "Think about the overall feeling. They are sharing a funny story and bantering. How would you describe that? ✨",
    explanation: "The conversation between the shark and the crab is light-hearted, full of jokes, and entertaining. This creates a cheerful and amusing tone.",
    turtleTip: "Tone is the feeling or attitude of a conversation. Are they being serious, or are they having fun?",
    options: [
      { id: 'A', emoji: '🤝', text: 'Friendly and encouraging', isCorrect: false },
      { id: 'B', emoji: '🎭', text: 'Curious and entertaining', isCorrect: false },
      { id: 'C', emoji: '😊', text: 'Cheerful and amusing', isCorrect: true },
      { id: 'D', emoji: '💭', text: 'Casual and thoughtful', isCorrect: false },
    ],
  }
];
