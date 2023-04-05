<script setup lang="ts">
import { ref, computed } from 'vue';
import { MatrixFilterSpace } from '@/types/localcosmos/src/features/NatureGuide';
import { useNatureGuideStore } from '@/stores/nature-guides';

const props = withDefaults(defineProps<{
  space: MatrixFilterSpace,
  definition: { unit: string },
  readOnly: boolean,
}>(), { readOnly: false });

const input = ref<number>(props.space.encodedSpace[0]);
const natureGuideStore = useNatureGuideStore();
const key = natureGuideStore.currentNode;

const triggerUpdate = (event) => {
  if (props.readOnly) {
    return;
  }
  const index = key.findSpaceIndex(props.space);
  input.value = Number.parseInt(event.target.value);
  key.selectSpace(index, [input.value]);
};

const readOnlySpaceName = computed(() => {
  return `${props.space.encodedSpace[0]}-${props.space.encodedSpace[1]}${props.definition.unit}`;
});
</script>

<template>
  <div v-if="space.encodedSpace">
    <template v-if="readOnly">
      <span class="font-medium mt-3">
        {{ readOnlySpaceName }}
      </span>
    </template>
    <label v-else class="flex flex-row gap-2">
      <input
        :value="input"
        :disabled="readOnly"
        type="range"
        class="range range-primary"
        :min="space.encodedSpace[0]"
        :max="space.encodedSpace[1]"
        :step="definition.step"
        @input.prevent="triggerUpdate"
      >
      {{ input }}{{ definition.unit }}
    </label>
  </div>
</template>
