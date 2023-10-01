import { useEffect, useState } from 'react';
import './App.scss';
import Square from './components/Square/Square';

const rowCount = 30;
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

  const setCellState = (x, y) => {
    const newArray = [...grid];
    newArray[x][y] = 1;
    console.log('new', newArray);
    setGrid(newArray);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 20px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          const isAlive = grid[rowIndex][colIndex] === 1;
          return <Square key={rowIndex + colIndex} setCellState={() => setCellState(rowIndex, colIndex)} isAlive={isAlive} />;
        })
      )}
    </div>
  );
}

export default App;
