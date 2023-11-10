import { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';
import { allFigures } from '../../utils/figures.js';
import { rowCount, colCount } from '../../utils/boardSize';
import { useCreateGrid } from '../../hooks/useCreateGrid';
import { possibleNeighbors } from '../../utils/possibleNeighbors';
import styles from './AddFigures.module.scss';
import FigureButton from '../FigureButton/FigureButton';
import { generateKey } from '../../utils/generateKey';
import { useGameStore } from '../../store/store';

export default function AddFigures() {
  const grid = useGameStore((state) => state.grid);
  const setGrid = useGameStore((state) => state.setGrid);
  const [openFigures, setOpenFigures] = useState(false);

  function setFigure(figure) {
    setOpenFigures(false);
    const halfBoardWidth = Math.ceil((colCount - figure[0].length) / 2);
    const halfBoardHeight = Math.ceil((rowCount - figure.length) / 2);

    const newGrid = [...grid];
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
    <>
      <Button handleClick={() => setOpenFigures(!openFigures)}>{openFigures ? '-' : '+'} Add figure</Button>
      {openFigures && (
        <>
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
        </>
      )}
    </>
  );
}
