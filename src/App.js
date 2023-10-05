import { useEffect, useState, useRef } from 'react';
import './App.scss';
import Square from './components/Square/Square';

const rowCount = 20;
const colCount = 20;
const createGrid = () => {
  const row = [];
  for (let i = 0; i < rowCount; i++) {
    row.push(Array(colCount).fill(0));
  }
  return row;
};

function App() {
  const [grid, setGrid] = useState(createGrid());
  const [gameIsOn, setGameIsOn] = useState(false);
  const previousGrid = useRef();

  useEffect(() => {
    previousGrid.current = grid;
  }, [grid]);

  const setCellState = (x, y) => {
    const newGrid = [...grid];
    newGrid[x][y] = newGrid[x][y] === 0 ? 1 : 0;
    setGrid(newGrid);
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

  const startLifeGame = () => {
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
      startLifeGame();
    }, 400);
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 20px)`, gridTemplateRows: `repeat(${rowCount}, 20px)` }}>
        {grid.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            const isAlive = grid[rowIndex][colIndex] === 1;
            return <Square key={rowIndex + colIndex} setCellState={() => setCellState(rowIndex, colIndex)} isAlive={isAlive} />;
          })
        )}
      </div>
      <button onClick={setRandomCells}>Set random cells</button>
      <button onClick={startLifeGame}>{gameIsOn ? 'Stop game' : 'Make cells live!'}</button>
      <button onClick={() => setGrid(createGrid)}>Clear board</button>
    </>
  );
}

export default App;
