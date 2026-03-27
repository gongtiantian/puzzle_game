export type DifficultyKey = 'easy' | 'medium' | 'hard';

export interface Difficulty {
  key: DifficultyKey;
  label: string;
  rows: number;
  cols: number;
}

export interface Tile {
  id: number;
  correctIndex: number;
  currentIndex: number;
  row: number;
  col: number;
  bgXPercent: number;
  bgYPercent: number;
}

export interface PuzzleState {
  imageUrl: string;
  rows: number;
  cols: number;
  tiles: Tile[];
  moveCount: number;
  startedAt: number | null;
  elapsedMs: number;
  solved: boolean;
  draggingTileId: number | null;
}
