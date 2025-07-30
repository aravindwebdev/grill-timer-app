
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  remainingTime: number;
  flipInterval?: number;
  flipRemaining?: number;
  isActive: boolean;
  isPaused: boolean;
  notes?: string;
  startTime: number;
}

interface TimerState {
  timers: Timer[];
}

type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: { id: string; updates: Partial<Timer> } }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'TICK_TIMERS' }
  | { type: 'LOAD_TIMERS'; payload: Timer[] };

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
  addTimer: (timer: Omit<Timer, 'id' | 'startTime'>) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
} | undefined>(undefined);

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? { ...timer, ...action.payload.updates }
            : timer
        ),
      };
    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload),
      };
    case 'TICK_TIMERS':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (!timer.isActive || timer.isPaused) return timer;

          const newRemainingTime = Math.max(0, timer.remainingTime - 1);
          const newFlipRemaining = timer.flipRemaining ? Math.max(0, timer.flipRemaining - 1) : undefined;

          // Check for flip alert
          if (newFlipRemaining === 0 && timer.flipInterval) {
            toast.success(`Time to flip ${timer.name}! 🔥`, {
              description: 'Turn your food over for even cooking',
            });
            return {
              ...timer,
              remainingTime: newRemainingTime,
              flipRemaining: timer.flipInterval,
            };
          }

          // Check for completion
          if (newRemainingTime === 0) {
            toast.success(`${timer.name} is ready! 🍽️`, {
              description: 'Your food is perfectly grilled!',
            });
            return {
              ...timer,
              remainingTime: 0,
              isActive: false,
            };
          }

          return {
            ...timer,
            remainingTime: newRemainingTime,
            flipRemaining: newFlipRemaining,
          };
        }),
      };
    case 'LOAD_TIMERS':
      return {
        ...state,
        timers: action.payload,
      };
    default:
      return state;
  }
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, { timers: [] });

  // Load timers from localStorage on mount
  useEffect(() => {
    const savedTimers = localStorage.getItem('akGrillTimers');
    if (savedTimers) {
      const timers: Timer[] = JSON.parse(savedTimers);
      dispatch({ type: 'LOAD_TIMERS', payload: timers });
    }
  }, []);

  // Save timers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('akGrillTimers', JSON.stringify(state.timers));
  }, [state.timers]);

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK_TIMERS' });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = (timer: Omit<Timer, 'id' | 'startTime'>) => {
    const newTimer: Timer = {
      ...timer,
      id: Date.now().toString(),
      startTime: Date.now(),
      flipRemaining: timer.flipInterval,
    };
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    toast.success(`Timer started for ${timer.name}! 🔥`);
  };

  const pauseTimer = (id: string) => {
    dispatch({ type: 'UPDATE_TIMER', payload: { id, updates: { isPaused: true } } });
    toast.info('Timer paused ⏸️');
  };

  const resumeTimer = (id: string) => {
    dispatch({ type: 'UPDATE_TIMER', payload: { id, updates: { isPaused: false } } });
    toast.info('Timer resumed ▶️');
  };

  const deleteTimer = (id: string) => {
    dispatch({ type: 'DELETE_TIMER', payload: id });
    toast.success('Timer deleted 🗑️');
  };

  return (
    <TimerContext.Provider value={{ state, dispatch, addTimer, pauseTimer, resumeTimer, deleteTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
