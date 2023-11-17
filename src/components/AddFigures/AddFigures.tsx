import { useState } from 'react';
import Button from '../Button/Button';
import { allFigures } from '../../utils/figures';
import { rowCount, colCount } from '../../utils/boardSize';
import styles from './AddFigures.module.scss';
import FigureButton from '../FigureButton/FigureButton';
import { generateKey } from '../../utils/generateKey';
import { useGameStore } from '../../store/store';
import clsx from 'clsx';

export default function AddFigures() {
  const grid = useGameStore((state) => state.grid);
  const setGrid = useGameStore((state) => state.setGrid);
  const [isFiguresPanelOpen, setIsFiguresPanelOpen] = useState<boolean>(false);
  const [lineInputValue, setLineInputValue] = useState<string>('3');
  const line = [Array(Number(lineInputValue)).fill(1)];

  function setFigure(figure: number[][]) {
    setIsFiguresPanelOpen(false);
    setLineInputValue('3');
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
    <div className={styles.wrapper}>
      <Button handleClick={() => setIsFiguresPanelOpen(!isFiguresPanelOpen)}>
        <>{isFiguresPanelOpen ? '-' : '+'} Add figure</>
      </Button>
      {isFiguresPanelOpen && (
        <section className={styles.buttonsWrapper}>
          <h5>Still lives</h5>
          <section className={clsx(styles.picturesWrapper, 'flex')}>
            {allFigures.stillLives.map((figure) => {
              return <FigureButton key={generateKey(figure.name)} figureImg={figure.link} handleClick={() => setFigure(figure.shape)} figureName={figure.name} />;
            })}
          </section>
          <h5>Oscillators</h5>
          <section className={clsx(styles.picturesWrapper, 'flex')}>
            {allFigures.oscillators.map((figure) => {
              return <FigureButton key={generateKey(figure.name)} figureImg={figure.link} handleClick={() => setFigure(figure.shape)} figureName={figure.name} />;
            })}
          </section>
          <h5>Spaceships</h5>
          <section className={clsx(styles.picturesWrapper, 'flex')}>
            {allFigures.spaceships.map((figure) => {
              return <FigureButton key={generateKey(figure.name)} figureImg={figure.link} handleClick={() => setFigure(figure.shape)} figureName={figure.name} />;
            })}
          </section>
          <h5>Lines</h5>
          <div className={clsx(styles.lineWrapper, 'flex')}>
            {' '}
            <input value={lineInputValue} onChange={(e) => setLineInputValue(e.target.value)} placeholder='Enter line length' type='number' min='3' max={colCount} />
            <Button handleClick={() => setFigure(line)} type='primary'>
              Create
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
