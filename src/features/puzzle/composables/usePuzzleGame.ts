import { computed, onBeforeUnmount, reactive } from 'vue';
import {
  DEFAULT_DIFFICULTY,
  DEFAULT_IMAGE_URL,
  DIFFICULTIES,
} from '../constants';
import type { DifficultyKey, PuzzleState, Tile } from '../types';
import { buildOrderedTiles } from '../utils/image';
import { shuffleArray } from '../utils/shuffle';

function reindexTiles(tiles: Tile[]): Tile[] {
  return tiles.map((tile, idx) => ({ ...tile, currentIndex: idx }));
}

function isSolved(tiles: Tile[]): boolean {
  return tiles.every((tile) => tile.currentIndex === tile.correctIndex);
}

export function usePuzzleGame() {
  const baseDifficulty =
    DIFFICULTIES.find((item) => item.key === DEFAULT_DIFFICULTY) ?? DIFFICULTIES[0];

  const state = reactive<PuzzleState>({
    imageUrl: DEFAULT_IMAGE_URL,
    rows: baseDifficulty.rows,
    cols: baseDifficulty.cols,
    tiles: [],
    moveCount: 0,
    startedAt: null,
    elapsedMs: 0,
    solved: false,
    draggingTileId: null,
  });

  let timer: number | null = null;

  const difficultyKey = computed<DifficultyKey>(() => {
    const found = DIFFICULTIES.find(
      (item) => item.rows === state.rows && item.cols === state.cols,
    );
    return found?.key ?? DEFAULT_DIFFICULTY;
  });

  function stopTimer() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function startTimer() {
    stopTimer();
    if (!state.startedAt) return;
    timer = window.setInterval(() => {
      state.elapsedMs = Date.now() - (state.startedAt ?? Date.now());
    }, 250);
  }

  function initGame(rows = state.rows, cols = state.cols) {
    state.rows = rows;
    state.cols = cols;
    const ordered = buildOrderedTiles(rows, cols);
    state.tiles = reindexTiles(shuffleArray(ordered));
    state.moveCount = 0;
    state.solved = false;
    state.draggingTileId = null;
    state.startedAt = Date.now();
    state.elapsedMs = 0;
    startTimer();
  }

  function checkSolved() {
    state.solved = isSolved(state.tiles);
    if (state.solved) {
      state.elapsedMs = Date.now() - (state.startedAt ?? Date.now());
      stopTimer();
    }
    return state.solved;
  }

  function setDraggingTile(tileId: number | null) {
    state.draggingTileId = tileId;
  }

  function swapTilesById(targetTileId: number) {
    const fromId = state.draggingTileId;
    if (fromId === null || fromId === targetTileId || state.solved) {
      state.draggingTileId = null;
      return;
    }

    const fromIndex = state.tiles.findIndex((tile) => tile.id === fromId);
    const targetIndex = state.tiles.findIndex((tile) => tile.id === targetTileId);
    if (fromIndex < 0 || targetIndex < 0) {
      state.draggingTileId = null;
      return;
    }

    [state.tiles[fromIndex], state.tiles[targetIndex]] = [
      state.tiles[targetIndex],
      state.tiles[fromIndex],
    ];
    state.tiles[fromIndex] = { ...state.tiles[fromIndex], currentIndex: fromIndex };
    state.tiles[targetIndex] = { ...state.tiles[targetIndex], currentIndex: targetIndex };
    state.moveCount += 1;
    state.draggingTileId = null;
    checkSolved();
  }

  function setDifficulty(key: DifficultyKey) {
    const next = DIFFICULTIES.find((item) => item.key === key);
    if (!next) return;
    initGame(next.rows, next.cols);
  }

  function restartGame() {
    initGame(state.rows, state.cols);
  }

  function setImage(url: string) {
    if (!url.trim()) return;
    state.imageUrl = url.trim();
    restartGame();
  }

  initGame(baseDifficulty.rows, baseDifficulty.cols);

  onBeforeUnmount(() => {
    stopTimer();
  });

  return {
    state,
    difficultyKey,
    initGame,
    checkSolved,
    setDraggingTile,
    swapTilesById,
    setDifficulty,
    restartGame,
    setImage,
  };
}
