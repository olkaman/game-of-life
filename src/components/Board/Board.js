import Square from '../Square/Square';
import { rowCount, colCount, squareSize } from '../../utils/boardSize';
import { useGameStore } from '../../store/store';
import { useEffect } from 'react';
import { useCreateGrid } from '../../hooks/useCreateGrid.js';

function Board() {
  const grid = useGameStore((state) => state.grid);
  const setGrid = useGameStore((state) => state.setGrid);
  const createGrid = useCreateGrid();

  useEffect(() => {
    setGrid(createGrid);
  }, []);

  const setCellState = (x, y) => {
    const newGrid = [...grid];
    newGrid[x][y] = newGrid[x][y] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, ${squareSize}px)`, gridTemplateRows: `repeat(${rowCount}, ${squareSize}px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          const isAlive = grid[rowIndex][colIndex] === 1;
          return <Square key={rowIndex + colIndex} setCellState={() => setCellState(rowIndex, colIndex)} isAlive={isAlive} />;
        })
      )}
    </div>
  );
}
export default Board;
