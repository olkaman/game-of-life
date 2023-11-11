import styles from './FigureButton.module.scss';
import clsx from 'clsx';

function FigureButton({ figureImg, handleClick, figureName }) {
  return (
    <button onClick={handleClick} className={clsx(styles.button, 'flex')}>
      <img src={figureImg} alt='figure' />
      <p>{figureName}</p>
    </button>
  );
}

export default FigureButton;
