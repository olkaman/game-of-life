import { useState } from 'react';
import Button from '../Button/Button';
import styles from './Settings.module.scss';
import { useGameStore } from '../../store/store';
import { minSpeed, maxSpeed } from '../../utils/settings';

export default function Settings() {
  const [areSettingsOpen, setAreSettingsOpen] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<string>('400');
  const setSpeed = useGameStore((state) => state.setSpeed);

  const handleSettingsChange = (e: any) => {
    e.preventDefault();
    setSpeed(Number(gameSpeed));
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
            <label htmlFor='speed'>{`Speed (values: ${minSpeed}-${maxSpeed} miliseconds)`}</label>
            <input name='speed' id='speed' value={gameSpeed} onChange={(e) => setGameSpeed(e.target.value)} type='number' min={minSpeed} max={maxSpeed} />
          </div>
          <Button type='submit' disabled={Number(gameSpeed) < minSpeed || Number(gameSpeed) > maxSpeed}>
            Save
          </Button>
        </form>
      )}
    </div>
  );
}
