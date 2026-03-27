import type { Difficulty, DifficultyKey } from './types';

export const DIFFICULTIES: Difficulty[] = [
  { key: 'easy', label: '简单 3x3', rows: 3, cols: 3 },
  { key: 'medium', label: '中等 4x4', rows: 4, cols: 4 },
  { key: 'hard', label: '困难 5x5', rows: 5, cols: 5 },
];

export const DEFAULT_DIFFICULTY: DifficultyKey = 'easy';
export const DEFAULT_IMAGE_URL =
  'https://img1.baidu.com/it/u=598716648,569227644&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422';
