<template>
  <div
    class="tile"
    :class="{ dragging: isDragging }"
    draggable="true"
    :style="tileStyle"
    @dragstart="emit('drag-start', tile.id)"
    @dragend="emit('drag-end')"
    @dragover.prevent
    @drop.prevent="emit('drop-on', tile.id)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import type { Tile } from '../types';

const props = defineProps<{
  tile: Tile;
  rows: number;
  cols: number;
  imageUrl: string;
  isDragging: boolean;
}>();

const emit = defineEmits<{
  (event: 'drag-start', id: number): void;
  (event: 'drag-end'): void;
  (event: 'drop-on', id: number): void;
}>();

const tileStyle = computed<CSSProperties>(() => ({
  backgroundImage: `url(${props.imageUrl})`,
  backgroundSize: `${props.cols * 100}% ${props.rows * 100}%`,
  backgroundPosition: `${props.tile.bgXPercent}% ${props.tile.bgYPercent}%`,
}));
</script>

<style scoped>
.tile {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  cursor: grab;
  user-select: none;
  transition: transform 0.15s ease;
}

.tile:active {
  cursor: grabbing;
}

.dragging {
  opacity: 0.45;
  transform: scale(0.98);
}
</style>
