import { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';
import { allFigures } from '../../utils/figures.js';
import { rowCount, colCount } from '../../utils/boardSize';
import { useCreateGrid } from '../../hooks/useCreateGrid';
import { possibleNeighbors } from '../../utils/possibleNeighbors';
import styles from './SettingsPanel.module.scss';
import FigureButton from '../FigureButton/FigureButton';
import { generateKey } from '../../utils/generateKey';

function SettingsPanel({ setGrid, grid }) {
  const previousGrid = useRef();
  const [timerId, setTimerId] = useState();
  const createGrid = useCreateGrid();

  useEffect(() => {
    previousGrid.current = grid;
  }, [grid]);

  const playLifeGame = () => {
    // TODO grid does noti include 1 return
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

  function setFigure(figure) {
    const halfBoardWidth = Math.ceil((colCount - figure[0].length) / 2);
    const halfBoardHeight = Math.ceil((rowCount - figure.length) / 2);

    const newGrid = [...previousGrid.current];
    newGrid.forEach((gridRow, gridRowIndex) => {
      figure.forEach((figureRow, figureRowIndex) => {
        if (gridRowIndex - figureRowIndex === halfBoardHeight) {
          gridRow.splice(halfBoardWidth, figureRow.length, ...figureRow);
        }
      });
    });

    setGrid(newGrid);
  }

  return (
    <section className={styles.settingsPanel}>
      <div className={styles.wrapper}>
        <h2>Game of life</h2>
        <p>
          Select cells manually <br />
          or select ready figures
        </p>
        <Button handleClick={setRandomCells} type='primary'>
          Set random cells
        </Button>
        <p>Still lives</p>
        <section className='flex'>
          {allFigures.stillLives.map((figure) => {
            return <FigureButton key={generateKey(figure.name)} figureImg={figure.link} handleClick={() => setFigure(figure.shape)} figureName={figure.name} />;
          })}
        </section>
        <p>Oscillators</p>
        <section className='flex'>
          {allFigures.oscillators.map((figure) => {
            return <FigureButton key={generateKey(figure.name)} figureImg={figure.link} handleClick={() => setFigure(figure.shape)} figureName={figure.name} />;
          })}
        </section>
        <p>Spaceships</p>
        <section className='flex'>
          {allFigures.spaceships.map((figure) => {
            return <FigureButton key={generateKey(figure.name)} figureImg={figure.link} handleClick={() => setFigure(figure.shape)} figureName={figure.name} />;
          })}
        </section>
        <p>Lines</p>
        <Button handleClick={playLifeGame} disabled={timerId > 0}>
          Make cells live!
        </Button>
        <Button handleClick={pauseGame}>Pause game</Button>
        <Button
          handleClick={() => {
            pauseGame();
            setGrid(createGrid);
          }}
        >
          Clear board
        </Button>
        Rules of{' '}
        <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='blank'>
          Conway's Game of life
        </a>
      </div>
    </section>
  );
}

export default SettingsPanel;
