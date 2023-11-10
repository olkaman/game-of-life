import styles from './FigureButton.module.scss';
import { useGameStore } from '../../store/store';
import { rowCount, colCount } from '../../utils/boardSize';
import { useEffect, useRef } from 'react';

function FigureButton({ figureImg, handleClick, figureName }) {
  const previousGrid = useRef();
  const grid = useGameStore((state) => state.grid);
  const setGrid = useGameStore((state) => state.setGrid);

  useEffect(() => {
    previousGrid.current = grid;
  }, [grid]);

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
    <button onClick={handleClick} className={styles.button}>
      <img src={figureImg} alt='figure' />
      <p>{figureName}</p>
    </button>
  );
}

export default FigureButton;
