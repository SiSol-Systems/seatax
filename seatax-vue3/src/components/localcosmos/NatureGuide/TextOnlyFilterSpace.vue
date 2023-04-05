<script setup lang="ts">
import { computed } from 'vue';
import GlossarizedText from '@/components/container/GlossarizedText.vue';
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
  <div class="flex flex-col" :class="readOnly ? '' : 'cursor-pointer'" @click="!readOnly && lc.toggleSelect(space)">
    <div
      class="textonly-filter-space w-full flex items-center justify-center text-center border-solid border-6 rounded-3xl relative"
      :class="classes"
    >
      <GlossarizedText :translation-key="space.encodedSpace" />
    </div>
  </div>
</template>

<style scoped>
  .textonly-filter-space {
    aspect-ratio: 1/1;
    background: #FFF;
  }
</style>
