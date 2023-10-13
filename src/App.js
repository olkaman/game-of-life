import { useState } from 'react';
import './GlobalStyles.scss';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import clsx from 'clsx';

const rowCount = 20;
const colCount = 20;

function App() {
  const [grid, setGrid] = useState(createGrid);

  return (
    <main className={clsx(styles.mainContainer, 'flex')}>
      <section className={styles.board}>
        <Board rowCount={rowCount} colCount={colCount} grid={grid} setGrid={setGrid} />
      </section>
      <section className={styles.settingsPanel}>
        <SettingsPanel rowCount={rowCount} colCount={colCount} grid={grid} setGrid={setGrid} createGrid={createGrid} />
      </section>
    </main>
  );
}

export default App;

const createGrid = () => {
  const row = [];
  for (let i = 0; i < rowCount; i++) {
    row.push(Array(colCount).fill(0));
  }
  return row;
};
