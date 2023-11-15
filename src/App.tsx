import './GlobalStyles.scss';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import clsx from 'clsx';

function App() {
  // settings: speed and size of cells
  // blinking dot
  // height of shapes container
  // color of play and pause
  // unit tests

  return (
    <main className={clsx(styles.mainContainer, 'flex')}>
      <SettingsPanel />
      <Board />
    </main>
  );
}

export default App;
