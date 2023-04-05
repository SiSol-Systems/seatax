<script setup lang="ts">
import { computed } from 'vue';
import { MatrixFilterSpace } from '@/types/localcosmos/src/features/NatureGuide';
import { useLocalcosmos, useImagesToSrcset } from '@/composables/localcosmos';
import GlossarizedText from '@/components/container/GlossarizedText.vue';

const props = withDefaults(defineProps<{
  space: MatrixFilterSpace,
  definition: object,
  readOnly: boolean,
}>(), { readOnly: false });

const lc = useLocalcosmos();
const classes = computed(() => props.readOnly ? [] : lc.classesForSpace(props.space));
const srcset = useImagesToSrcset(props.space?.imageUrl);
</script>

<template>
  <div class="flex flex-col" :class="readOnly ? '' : 'cursor-pointer'" @click.stop="!readOnly && lc.toggleSelect(space)">
    <img
      v-if="srcset"
      :src="space.imageUrl['1x']"
      :srcset="srcset"
      :alt="space.filter?.name"
      class="w-full border-solid border-6 rounded-3xl relative aspect-square"
      :class="classes"
    >
    <GlossarizedText
      :translation-key="space.encodedSpace"
      class="font-medium mt-3"
    />
  </div>
</template>
