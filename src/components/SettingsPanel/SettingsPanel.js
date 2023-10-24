import { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';

function SettingsPanel({ setGrid, grid, rowCount, colCount, createGrid }) {
  const previousGrid = useRef();
  const [timerId, setTimerId] = useState();

  useEffect(() => {
    previousGrid.current = grid;
  }, [grid]);

  const playLifeGame = () => {
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
    possibleNeighbours.forEach((neighbor) => {
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

  console.log(timerId);
  return (
    <div>
      <Button handleClick={setRandomCells}>Set random cells</Button>
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
  );
}

export default SettingsPanel;

const possibleNeighbours = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
