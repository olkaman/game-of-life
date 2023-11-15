import { rowCount, colCount } from '../utils/boardSize.js';

export const useCreateGrid = () => {
  const row = [];
  for (let i = 0; i < rowCount; i++) {
    row.push(Array(colCount).fill(0));
  }
  return row;
};
