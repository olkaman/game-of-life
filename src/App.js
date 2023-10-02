import { useState } from 'react';
import './App.scss';
import Square from './components/Square/Square';

const rowCount = 30;
const colCount = 30;
const createGrid = () => {
  const row = [];
  for (let i = 0; i < rowCount; i++) {
    row.push(Array(colCount).fill(0));
  }
  return row;
};

function App() {
  const [grid, setGrid] = useState(createGrid());

  const setCellState = (x, y) => {
    const newArray = [...grid];
    newArray[x][y] = 1;
    console.log('new', newArray);
    setGrid(newArray);
    findNeighborsOfGivenCell([x, y]);
  };

  const setRandomCells = () => {
    const newArray = [...grid];
    newArray.forEach((row) => {
      row.forEach((col, colIndex) => {
        const randomNumber = Math.random() < 0.7 ? 0 : 1;
        row[colIndex] = randomNumber;
      });
    });
    setGrid(newArray);
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
    console.log([x, y]);
    let neighborsCount = 0;
    possibleNeighbours.forEach((neighbor) => {
      const newX = x + neighbor[0];
      const newY = y + neighbor[1];
      if (newX >= 0 && newX < rowCount && newY >= 0 && newY < colCount) {
        const isNeighbor = grid[newX][newY] === 1;
        isNeighbor && neighborsCount++;
      }
    });
    console.log('neighborsCount', neighborsCount);
    return neighborsCount;
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
    </>
  );
}

export default App;
