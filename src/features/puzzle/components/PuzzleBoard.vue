<template>
  <div class="board" :style="boardStyle">
    <PuzzleTile
      v-for="tile in sortedTiles"
      :key="tile.id"
      :tile="tile"
      :rows="rows"
      :cols="cols"
      :image-url="imageUrl"
      :is-dragging="tile.id === draggingTileId"
      @drag-start="(id) => emit('drag-start', id)"
      @drag-end="emit('drag-start', null)"
      @drop-on="(id) => emit('drop-tile', id)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import type { Tile } from '../types';
import PuzzleTile from './PuzzleTile.vue';

const props = defineProps<{
  tiles: Tile[];
  rows: number;
  cols: number;
  imageUrl: string;
  draggingTileId: number | null;
}>();

const emit = defineEmits<{
  (event: 'drag-start', id: number | null): void;
  (event: 'drop-tile', id: number): void;
}>();

const sortedTiles = computed(() =>
  [...props.tiles].sort((a, b) => a.currentIndex - b.currentIndex),
);

const boardStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
}));
</script>

<style scoped>
.board {
  margin-top: 16px;
  display: grid;
  gap: 8px;
}
</style>
