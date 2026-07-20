import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';

export type Screen =
  | 'home'
  | 'characters'
  | 'comic'
  | 'question'
  | 'results';

export interface GameState {
  currentScreen: Screen;
  currentPanel: number;
  currentQuestion: number;
  pearlsEarned: boolean[];
  attempts: number[];
  soundEnabled: boolean;
  animationsEnabled: boolean;
  showCelebration: boolean;
  wrongAnswerFeedback: string | null;
  correctAnswerShown: boolean;
}

type GameAction =
  | { type: 'GO_TO_SCREEN'; screen: Screen }
  | { type: 'SET_PANEL'; panel: number }
  | { type: 'NEXT_PANEL' }
  | { type: 'PREV_PANEL' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'EARN_PEARL'; index: number }
  | { type: 'INCREMENT_ATTEMPT'; index: number }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_ANIMATIONS' }
  | { type: 'SHOW_CELEBRATION'; show: boolean }
  | { type: 'SET_WRONG_FEEDBACK'; msg: string | null }
  | { type: 'SET_CORRECT_SHOWN'; shown: boolean }
  | { type: 'RESET_GAME' };

const TOTAL_PANELS = 8;

const initialState: GameState = {
  currentScreen: 'home',
  currentPanel: 0,
  currentQuestion: 0,
  pearlsEarned: [false, false, false, false],
  attempts: [0, 0, 0, 0],
  soundEnabled: true,
  animationsEnabled: true,
  showCelebration: false,
  wrongAnswerFeedback: null,
  correctAnswerShown: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'GO_TO_SCREEN':
      return { ...state, currentScreen: action.screen, wrongAnswerFeedback: null, correctAnswerShown: false };
    case 'SET_PANEL':
      return { ...state, currentPanel: Math.max(0, Math.min(TOTAL_PANELS - 1, action.panel)) };
    case 'NEXT_PANEL':
      return { ...state, currentPanel: Math.min(TOTAL_PANELS - 1, state.currentPanel + 1) };
    case 'PREV_PANEL':
      return { ...state, currentPanel: Math.max(0, state.currentPanel - 1) };
    case 'NEXT_QUESTION': {
      const nextQ = state.currentQuestion + 1;
      if (nextQ >= 4) return { ...state, currentScreen: 'results', currentQuestion: 4 };
      return { ...state, currentQuestion: nextQ, wrongAnswerFeedback: null, correctAnswerShown: false };
    }
    case 'EARN_PEARL': {
      const newPearls = [...state.pearlsEarned];
      newPearls[action.index] = true;
      return { ...state, pearlsEarned: newPearls };
    }
    case 'INCREMENT_ATTEMPT': {
      const newAttempts = [...state.attempts];
      newAttempts[action.index]++;
      return { ...state, attempts: newAttempts };
    }
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'TOGGLE_ANIMATIONS':
      return { ...state, animationsEnabled: !state.animationsEnabled };
    case 'SHOW_CELEBRATION':
      return { ...state, showCelebration: action.show };
    case 'SET_WRONG_FEEDBACK':
      return { ...state, wrongAnswerFeedback: action.msg };
    case 'SET_CORRECT_SHOWN':
      return { ...state, correctAnswerShown: action.shown };
    case 'RESET_GAME':
      return { ...initialState };
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  totalPanels: number;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch, totalPanels: TOTAL_PANELS }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
