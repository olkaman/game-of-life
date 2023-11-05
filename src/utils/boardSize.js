import variables from '../GlobalStyles.scss';

export const squareSize = parseInt(variables.squareSize, 10);
const sideMenuWidth = parseInt(variables.sideMenuWidth, 10);
export const rowCount = Math.floor((window.innerHeight - 48) / squareSize);
export const colCount = Math.floor((window.innerWidth - sideMenuWidth - 48) / squareSize);
