import { useEffect, useState, useRef } from 'react';

function SettingsPanel({ setGrid, grid, rowCount, colCount, createGrid }) {
  const previousGrid = useRef();
  const [gameIsOn, setGameIsOn] = useState(false);

  useEffect(() => {
    previousGrid.current = grid;
  }, [grid]);

  const playLifeGame = () => {
    const newGrid = JSON.parse(JSON.stringify(previousGrid.current));
    previousGrid.current.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const neighbors = findNeighborsOfGivenCell([rowIndex, colIndex]);
        console.log('neighbors', neighbors, rowIndex, colIndex);
        if (neighbors < 2 || neighbors > 3) {
          newGrid[rowIndex][colIndex] = 0;
        }
        if (previousGrid.current[rowIndex][colIndex] === 0 && neighbors === 3) {
          newGrid[rowIndex][colIndex] = 1;
        }
      });
    });

    setGrid(newGrid);
    setTimeout(() => {
      playLifeGame();
    }, 400);
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
  return (
    <div>
      <button onClick={setRandomCells}>Set random cells</button>
      <button onClick={playLifeGame}>{gameIsOn ? 'Stop game' : 'Make cells live!'}</button>
      <button onClick={() => setGrid(createGrid)}>Clear board</button>
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
