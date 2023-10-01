import styles from './Square.module.scss';
import clsx from 'clsx';

function Square({ setCellState, isAlive }) {
  return <button type='button' onClick={setCellState} className={clsx(styles.square, isAlive && styles.alive)}></button>;
}

export default Square;
