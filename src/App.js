import { useState } from 'react';
import './GlobalStyles.scss';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import clsx from 'clsx';
import { rowCount, colCount } from './utils/boardSize.js';
import { useCreateGrid } from './hooks/useCreateGrid.js';

function App() {
  const createGrid = useCreateGrid();
  const [grid, setGrid] = useState(createGrid);

  return (
    <main className={clsx(styles.mainContainer, 'flex')}>
      <section className={styles.settingsPanel}>
        <h2>Game of life</h2>
        <SettingsPanel rowCount={rowCount} colCount={colCount} grid={grid} setGrid={setGrid} createGrid={createGrid} />
      </section>
      <section className={styles.board}>
        <Board rowCount={rowCount} colCount={colCount} grid={grid} setGrid={setGrid} />
      </section>
    </main>
  );
}

export default App;
