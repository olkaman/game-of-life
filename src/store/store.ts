import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type StateType = State | Partial<State> | ((state: State) => State | Partial<State>);

type State = {
  grid: number[][];
  speed: number;
  squareSize: number;
};

type Actions = {
  setGrid: (newGrid: number[][]) => void;
  setSpeed: (speed: number) => void;
  setCellSize: (squareSize: number) => void;
};

const initialState: State = {
  grid: [[]],
  speed: 400,
  squareSize: 20,
};

//
export const useGameStore = create<State & Actions, [['zustand/devtools', State & Actions]]>(
  devtools((set) => ({
    ...initialState,
    setGrid: (newGrid: number[][]) => set(setGrid(newGrid), false, 'Set grid'),
    setSpeed: (speed: number) => set(setSpeed(speed), false, 'Set speed'),
    setCellSize: (squareSize: number) => set(setCellSize(squareSize), false, 'Set speed'),
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

function setCellSize(squareSize: number): StateType {
  return (state) => {
    return { ...state, squareSize };
  };
}
