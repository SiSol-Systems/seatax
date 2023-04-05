<script setup lang="ts">
import { computed } from 'vue';
import type { MatrixFilterSpace } from '@/types/localcosmos/src/features/NatureGuide';
import { useLocalcosmos } from '@/composables/localcosmos';

const props = withDefaults(defineProps<{
  space: MatrixFilterSpace,
  definition: object,
  readOnly: boolean,
}>(), { readOnly: false });

const lc = useLocalcosmos();
const classes = computed(() => props.readOnly ? [] : lc.classesForSpace(props.space));
</script>

<template>
  <div class="flex flex-col" :class="readOnly ? '' : 'cursor-pointer'" @click="!readOnly && lc.toggleSelect(space)">
    <div
      class="number-filter-space text-larger w-full flex items-center justify-center text-center border-solid border-8 rounded-3xl relative"
      :class="classes"
    >
      {{ space.encodedSpace }}
    </div>
  </div>
</template>

<style scoped>
.number-filter-space {
  aspect-ratio: 1/1;
  background-color: #FFF;
}
</style>