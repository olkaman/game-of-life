import { useState } from 'react';
import './App.scss';
import Board from './components/Board/Board';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';

const rowCount = 20;
const colCount = 20;

function App() {
  const [grid, setGrid] = useState(createGrid);

  return (
    <>
      <Board rowCount={rowCount} colCount={colCount} grid={grid} setGrid={setGrid} />
      <SettingsPanel rowCount={rowCount} colCount={colCount} grid={grid} setGrid={setGrid} createGrid={createGrid} />
    </>
  );
}

export default App;

const createGrid = () => {
  const row = [];
  for (let i = 0; i < rowCount; i++) {
    row.push(Array(colCount).fill(0));
  }
  return row;
};
