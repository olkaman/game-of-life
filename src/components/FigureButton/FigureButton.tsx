import styles from './FigureButton.module.scss';
import clsx from 'clsx';

type Props = {
  figureImg: string;
  handleClick: () => void;
  figureName: string;
};

function FigureButton(props: Props) {
  const { figureImg, handleClick, figureName } = props;

  return (
    <button onClick={handleClick} className={clsx(styles.button, 'flex')}>
      <img src={figureImg} alt='figure' />
      <p>{figureName}</p>
    </button>
  );
}

export default FigureButton;
