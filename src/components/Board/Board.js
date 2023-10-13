import Square from '../Square/Square';

function Board({ rowCount, colCount, grid, setGrid }) {
  const setCellState = (x, y) => {
    const newGrid = [...grid];
    newGrid[x][y] = newGrid[x][y] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 20px)`, gridTemplateRows: `repeat(${rowCount}, 20px)` }}>
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
