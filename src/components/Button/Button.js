import styles from './Button.module.scss';

function Button({ children, handleClick, disabled }) {
  return (
    <button onClick={handleClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
