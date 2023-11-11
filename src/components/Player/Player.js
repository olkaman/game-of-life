import { useEffect, useState, useRef } from 'react';
import { rowCount, colCount } from '../../utils/boardSize';
import { useCreateGrid } from '../../hooks/useCreateGrid';
import { possibleNeighbors } from '../../utils/possibleNeighbors';
import styles from './Player.module.scss';
import { useGameStore } from '../../store/store';
import playIcon from '../../assets/play.svg';
import pauseIcon from '../../assets/pause.svg';
import clsx from 'clsx';

function Player() {
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

  const clearBoard = () => {
    pauseGame();
    setGrid(createGrid);
    setCounter(0);
  };

  return (
    <>
      <section className={clsx('flex', styles.playerBoard)}>
        <button onClick={playLifeGame} disabled={timerId > 0} className={clsx(styles.buttons, styles.play)}>
          <img src={playIcon} alt='gameOfLife' />
        </button>
        <button onClick={pauseGame} className={clsx(styles.buttons, styles.pause)}>
          <img src={pauseIcon} alt='gameOfLife' />
        </button>
        <button onClick={clearBoard} className={clsx(styles.buttons, styles.clear)}>
          Clear board
        </button>
      </section>
      <section className={clsx(styles.counter, 'flex')}>
        <span className={styles.circle}></span>
        <span>Number of cycles: {counter}</span>
      </section>
    </>
  );
}

export default Player;
