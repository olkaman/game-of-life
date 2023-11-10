import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// type StateType = State | Partial<State> | ((state: State) => State | Partial<State>)

// type ClientDetails = {
//   clientId: string
//   clientName: string
//   services: ServiceDetails[]
// }

// type ServiceDetails = {
//   serviceName: string
//   credentials: Credentials
// }

// type Credentials = {
//   login: string
//   password: string
// }

// type State = {
//   clientDetails: ClientDetails | undefined
// }

// type Actions = {
//   setClientDetails: (clientDetails: ClientDetails) => void
// }

const initialState = {
  grid: [],
};

// <State & Actions, [['zustand/devtools', State & Actions]]>
export const useGameStore = create(
  devtools((set) => ({
    ...initialState,
    setGrid: (newGrid) => set(setGrid(newGrid), false, 'Set grid'),
  }))
);

function setGrid(newGrid) {
  return (state) => {
    return { ...state, grid: newGrid };
  };
}
