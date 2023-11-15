import styles from './Square.module.scss';
import clsx from 'clsx';

type Props = {
  setCellState: () => void;
  isAlive: boolean;
};

function Square(props: Props) {
  const { setCellState, isAlive } = props;

  return <button type='button' onClick={setCellState} className={clsx(styles.square, isAlive ? styles.alive : styles.dead)}></button>;
}

export default Square;
