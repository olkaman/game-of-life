import { useEffect } from 'react';
import './GlobalStyles.scss';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import clsx from 'clsx';
import { useCreateGrid } from './hooks/useCreateGrid.js';
import { useGameStore } from './store/store';

function App() {
  const createGrid = useCreateGrid();
  const setGrid = useGameStore((state) => state.setGrid);

  useEffect(() => {
    setGrid(createGrid);
  }, []);

  return (
    <main className={clsx(styles.mainContainer, 'flex')}>
      <SettingsPanel />
      <section className={styles.board}>
        <Board />
      </section>
    </main>
  );
}

export default App;
