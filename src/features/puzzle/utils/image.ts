import type { Tile } from '../types';

export function buildOrderedTiles(rows: number, cols: number): Tile[] {
  const total = rows * cols;
  return Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
      id: index,
      correctIndex: index,
      currentIndex: index,
      row,
      col,
      bgXPercent: cols > 1 ? (col / (cols - 1)) * 100 : 0,
      bgYPercent: rows > 1 ? (row / (rows - 1)) * 100 : 0,
    };
  });
}
