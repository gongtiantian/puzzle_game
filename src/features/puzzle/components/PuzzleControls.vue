<template>
  <a-space wrap>
    <a-select
      style="width: 180px"
      :value="currentDifficulty"
      @change="onDifficultyChange"
    >
      <a-select-option
        v-for="item in difficulties"
        :key="item.key"
        :value="item.key"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>

    <a-input
      style="width: 360px"
      :value="imageUrl"
      placeholder="输入图片 URL"
      @change="onImageInput"
    />

    <a-button type="primary" @click="emit('restart')">重新开始</a-button>
  </a-space>
</template>

<script setup lang="ts">
import type { Difficulty, DifficultyKey } from '../types';

defineProps<{
  difficulties: Difficulty[];
  currentDifficulty: DifficultyKey;
  imageUrl: string;
}>();

const emit = defineEmits<{
  (event: 'change-difficulty', key: DifficultyKey): void;
  (event: 'restart'): void;
  (event: 'change-image', url: string): void;
}>();

function onDifficultyChange(value: DifficultyKey) {
  emit('change-difficulty', value);
}

function onImageInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('change-image', target.value);
}
</script>
