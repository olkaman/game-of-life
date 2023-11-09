import styles from './Button.module.scss';
import clsx from 'clsx';

function Button({ children, handleClick, disabled, type }) {
  return (
    <button onClick={handleClick} className={clsx(styles.button, type === 'primary' && styles.primary)} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
