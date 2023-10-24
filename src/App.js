import { useState } from 'react';
import './GlobalStyles.scss';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import clsx from 'clsx';

const rowCount = Math.floor((window.innerHeight - 48) / 20);
const colCount = Math.floor((window.innerWidth - 348) / 20);

function App() {
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

const createGrid = () => {
  const row = [];
  console.log('sdfs');
  for (let i = 0; i < rowCount; i++) {
    row.push(Array(colCount).fill(0));
  }
  return row;
};
