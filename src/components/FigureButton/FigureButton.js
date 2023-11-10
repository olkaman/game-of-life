import styles from './FigureButton.module.scss';

function FigureButton({ figureImg, handleClick, figureName }) {
  return (
    <button onClick={handleClick} className={styles.button}>
      <img src={figureImg} alt='figure' />
      <p>{figureName}</p>
    </button>
  );
}

export default FigureButton;
