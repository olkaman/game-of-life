import { useState } from 'react';
import Button from '../Button/Button';
import styles from './Settings.module.scss';
import { useGameStore } from '../../store/store';
import { minCellSize, maxCellSize, minSpeed, maxSpeed } from '../../utils/settings';

export default function Settings() {
  const [areSettingsOpen, setAreSettingsOpen] = useState<boolean>(false);
  const [cellsSize, setCellsSize] = useState<string>('20');
  const [gameSpeed, setGameSpeed] = useState<string>('400');
  const setSpeed = useGameStore((state) => state.setSpeed);
  const setCellSize = useGameStore((state) => state.setCellSize);

  const handleSettingsChange = (e: any) => {
    e.preventDefault();
    setSpeed(Number(gameSpeed));
    setCellSize(Number(cellsSize));
    setAreSettingsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Button handleClick={() => setAreSettingsOpen(!areSettingsOpen)}>
        <>{areSettingsOpen ? '-' : '+'} Settings</>
      </Button>
      {areSettingsOpen && (
        <form className={styles.fieldsWrapper} onSubmit={handleSettingsChange}>
          <div className={styles.input}>
            <label htmlFor='cellSize'>{`Cell size (values: ${minCellSize}-${maxCellSize} px)`}</label>
            <input name='cellSize' id='cellSize' value={cellsSize} onChange={(e) => setCellsSize(e.target.value)} type='number' min={minCellSize} max={maxCellSize} />
          </div>
          <div className={styles.input}>
            <label htmlFor='speed'>{`Speed (values: ${minSpeed}-${maxSpeed} miliseconds)`}</label>
            <input name='speed' id='speed' value={gameSpeed} onChange={(e) => setGameSpeed(e.target.value)} type='number' min={minSpeed} max={maxSpeed} />
          </div>
          <Button type='submit' disabled={Number(cellsSize) < minCellSize || Number(cellsSize) > maxCellSize || Number(gameSpeed) < minSpeed || Number(gameSpeed) > maxSpeed}>
            Save
          </Button>
        </form>
      )}
    </div>
  );
}
