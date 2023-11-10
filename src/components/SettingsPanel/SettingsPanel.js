import { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';
import styles from './SettingsPanel.module.scss';
import { useGameStore } from '../../store/store';
import AddFigures from '../AddFigures/AddFigures';
import Player from '../Player/Player';
import clsx from 'clsx';

function SettingsPanel() {
  const previousGrid = useRef();
  const previousCounter = useRef();
  const [counter, setCounter] = useState(0);
  const grid = useGameStore((state) => state.grid);
  const setGrid = useGameStore((state) => state.setGrid);

  useEffect(() => {
    previousGrid.current = grid;
    previousCounter.current = counter;
  }, [grid, counter]);

  const setRandomCells = () => {
    const newGrid = [...grid];
    newGrid.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const randomNumber = Math.random() < 0.7 ? 0 : 1;
        newGrid[rowIndex][colIndex] = randomNumber;
      });
    });
    setGrid(newGrid);
  };

  return (
    <section className={styles.settingsPanel}>
      <div className={clsx(styles.wrapper, 'flex')}>
        <div>
          <section>
            <h2>Game of life</h2>
            <p>
              Select cells manually <br />
              or select ready figures
            </p>
            <p>Number of cycles: {counter}</p>
          </section>
          <Player />
          <section className={styles.buttons}>
            <Button handleClick={setRandomCells}>Set random cells</Button>
            <AddFigures />
          </section>
        </div>

        <aside>
          Rules of{' '}
          <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='blank'>
            Conway's Game of life
          </a>
        </aside>
      </div>
    </section>
  );
}

export default SettingsPanel;
