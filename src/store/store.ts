import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type StateType = State | Partial<State> | ((state: State) => State | Partial<State>);

type State = {
  grid: number[][];
};

type Actions = {
  setGrid: (newGrid: number[][]) => void;
};

const initialState: State = {
  grid: [[]],
};

//
export const useGameStore = create<State & Actions, [['zustand/devtools', State & Actions]]>(
  devtools((set) => ({
    ...initialState,
    setGrid: (newGrid: number[][]) => set(setGrid(newGrid), false, 'Set grid'),
  }))
);

function setGrid(newGrid: number[][]): StateType {
  return (state) => {
    return { ...state, grid: newGrid };
  };
}
