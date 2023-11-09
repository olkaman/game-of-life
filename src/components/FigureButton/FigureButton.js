import styles from './FigureButton.module.scss';

function FigureButton({ figureImg, handleClick }) {
  return (
    <button onClick={handleClick} className={styles.button}>
      <img src={figureImg} alt='figure' />
    </button>
  );
}

export default FigureButton;
