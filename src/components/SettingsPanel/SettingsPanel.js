import { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';
import { rowCount, colCount } from '../../utils/boardSize';
import { useCreateGrid } from '../../hooks/useCreateGrid';
import { possibleNeighbors } from '../../utils/possibleNeighbors';
import styles from './SettingsPanel.module.scss';
import { useGameStore } from '../../store/store';
import AddFigures from '../AddFigures/AddFigures';
import Player from '../Player/Player';

function SettingsPanel() {
  const previousGrid = useRef();
  const previousCounter = useRef();
  const [timerId, setTimerId] = useState();
  const [counter, setCounter] = useState(0);
  const createGrid = useCreateGrid();
  const grid = useGameStore((state) => state.grid);
  const setGrid = useGameStore((state) => state.setGrid);

  useEffect(() => {
    previousGrid.current = grid;
    previousCounter.current = counter;
  }, [grid, counter]);

  const playLifeGame = () => {
    // TODO grid does noti include 1 return
    setCounter(previousCounter.current + 1);
    const newGrid = previousGrid.current.map((arr) => {
      return arr.slice();
    });
    previousGrid.current.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const neighbors = findNeighborsOfGivenCell([rowIndex, colIndex]);

        if (neighbors < 2 || neighbors > 3) {
          newGrid[rowIndex][colIndex] = 0;
        }
        if (previousGrid.current[rowIndex][colIndex] === 0 && neighbors === 3) {
          newGrid[rowIndex][colIndex] = 1;
        }
      });
    });

    setGrid(newGrid);

    const timerId = setTimeout(() => {
      playLifeGame();
    }, 400);

    setTimerId(timerId);
  };

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

  const findNeighborsOfGivenCell = ([x, y]) => {
    let neighborsCount = 0;
    possibleNeighbors.forEach((neighbor) => {
      const newX = x + neighbor[0];
      const newY = y + neighbor[1];
      if (newX >= 0 && newX < rowCount && newY >= 0 && newY < colCount) {
        const isNeighbor = previousGrid.current[newX][newY] === 1;
        isNeighbor && neighborsCount++;
      }
    });

    return neighborsCount;
  };

  const pauseGame = () => {
    clearTimeout(timerId);
    setTimerId(0);
  };

  return (
    <section className={styles.settingsPanel}>
      <div className={styles.wrapper}>
        <h2>Game of life</h2>
        <p>
          Select cells manually <br />
          or select ready figures
        </p>
        <p>Number of cycles: {counter}</p>
        <Button handleClick={setRandomCells} type='primary'>
          Set random cells
        </Button>
        <AddFigures />
        <Player />
        Rules of{' '}
        <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='blank'>
          Conway's Game of life
        </a>
      </div>
    </section>
  );
}

export default SettingsPanel;
