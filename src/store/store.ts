import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type StateType = State | Partial<State> | ((state: State) => State | Partial<State>);

type State = {
  grid: number[][];
  speed: number;
  isGameOn: boolean;
};

type Actions = {
  setGrid: (newGrid: number[][]) => void;
  setSpeed: (speed: number) => void;
  setIsGameOn: (isGameOn: boolean) => void;
};

const initialState: State = {
  grid: [[]],
  speed: 400,
  isGameOn: false,
};

//
export const useGameStore = create<State & Actions, [['zustand/devtools', State & Actions]]>(
  devtools((set) => ({
    ...initialState,
    setGrid: (newGrid: number[][]) => set(setGrid(newGrid), false, 'Set grid'),
    setSpeed: (speed: number) => set(setSpeed(speed), false, 'Set speed'),
    setIsGameOn: (isGameOn: boolean) => set(setIsGameOn(isGameOn), false, 'Set is game on'),
  }))
);

function setGrid(newGrid: number[][]): StateType {
  return (state) => {
    return { ...state, grid: newGrid };
  };
}

function setSpeed(speed: number): StateType {
  return (state) => {
    return { ...state, speed };
  };
}

function setIsGameOn(isGameOn: boolean): StateType {
  return (state) => {
    return { ...state, isGameOn };
  };
}
