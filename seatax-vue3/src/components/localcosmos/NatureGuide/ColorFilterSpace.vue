<script setup lang="ts">
import { computed } from 'vue';
import { MatrixFilterSpace } from '@/types/localcosmos/src/features/NatureGuide';
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
  <div
    class="flex flex-col"
    :class="{ 'cursor-pointer': !readOnly }"
    @click="!readOnly && lc.toggleSelect(space)"
  >
    <div
      class="color-filter-space w-full relative"
      :class="classes"
      :style="{ background: props.space?.html }"
    />
  </div>
</template>

<style scoped>
.color-filter-space:not(.is-selected) {
  border: none;
}

.color-filter-space.is-selected{
  border: none;
}

.color-filter-space {
  aspect-ratio: 2/1;
  border-radius: var(--border-radius);
}
</style>
