<template>
  <a-space class="status-wrap" wrap>
    <a-tag color="blue">步数：{{ moveCount }}</a-tag>
    <a-tag color="purple">耗时：{{ seconds }}s</a-tag>
    <a-alert
      v-if="solved"
      type="success"
      show-icon
      message="拼图已完成，恭喜！"
    />
  </a-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  solved: boolean;
  moveCount: number;
  elapsedMs: number;
}>();

const seconds = computed(() => (props.elapsedMs / 1000).toFixed(1));
</script>

<style scoped>
.status-wrap {
  margin-top: 16px;
}
</style>
