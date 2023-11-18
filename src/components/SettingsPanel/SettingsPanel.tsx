import Button from '../Button/Button';
import styles from './SettingsPanel.module.scss';
import { useGameStore } from '../../store/store';
import AddFigures from '../AddFigures/AddFigures';
import Player from '../Player/Player';
import clsx from 'clsx';
import Settings from '../Settings/Settings';

function SettingsPanel() {
  const grid = useGameStore((state) => state.grid);
  const setGrid = useGameStore((state) => state.setGrid);

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
          </section>
          <Player />
          <section className={styles.buttons}>
            <Button handleClick={setRandomCells}>Set random cells</Button>
            <AddFigures />
          </section>
        </div>

        <aside>
          <Settings />
          <span className={styles.rules}>
            Rules of{' '}
            <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='blank'>
              Conway's Game of life
            </a>
          </span>
        </aside>
      </div>
    </section>
  );
}

export default SettingsPanel;
