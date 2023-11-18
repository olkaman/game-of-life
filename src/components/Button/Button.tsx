import styles from './Button.module.scss';
import clsx from 'clsx';

type Props = {
  children: JSX.Element | string;
  handleClick?: () => void;
  disabled?: boolean;
  type?: string;
};

function Button(props: Props) {
  const { children, handleClick, disabled, type } = props;

  return (
    <button onClick={handleClick} className={clsx(styles.button, type === 'primary' && styles.primary)} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
