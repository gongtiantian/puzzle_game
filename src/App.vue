<template>
  <div class="page">
    <a-card title="Vue 拼图游戏" :bordered="false">
      <template #extra>
        <a-tag :color="state.solved ? 'success' : 'processing'">
          {{ state.solved ? '已完成' : '进行中' }}
        </a-tag>
      </template>

      <PuzzleControls
        :difficulties="DIFFICULTIES"
        :current-difficulty="difficultyKey"
        :image-url="state.imageUrl"
        @change-difficulty="setDifficulty"
        @restart="restartGame"
        @change-image="setImage"
      />

      <GameStatus
        :solved="state.solved"
        :move-count="state.moveCount"
        :elapsed-ms="state.elapsedMs"
      />

      <PuzzleBoard
        :tiles="state.tiles"
        :rows="state.rows"
        :cols="state.cols"
        :image-url="state.imageUrl"
        :dragging-tile-id="state.draggingTileId"
        @drag-start="setDraggingTile"
        @drop-tile="swapTilesById"
      />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import GameStatus from './features/puzzle/components/GameStatus.vue';
import PuzzleBoard from './features/puzzle/components/PuzzleBoard.vue';
import PuzzleControls from './features/puzzle/components/PuzzleControls.vue';
import { DIFFICULTIES } from './features/puzzle/constants';
import { usePuzzleGame } from './features/puzzle/composables/usePuzzleGame';

const {
  state,
  difficultyKey,
  setDraggingTile,
  swapTilesById,
  setDifficulty,
  restartGame,
  setImage,
} = usePuzzleGame();
</script>

<style scoped>
.page {
  max-width: 960px;
  margin: 24px auto;
  padding: 0 16px 24px;
}
</style>
