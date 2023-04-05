<script setup lang="ts">
import { IdentificationKeyReference, IdentificationModes } from '@/types/localcosmos/src/features/NatureGuide';
import { useImagesToSrcset } from '@/composables/localcosmos';

defineEmits(['select']);
const props = defineProps({
  mode: { type: String as () => IdentificationModes, required: true },
  reference: { type: Object as () => IdentificationKeyReference, required: true },
  points: { type: Number, default: 0 },
  inactive: Boolean,
});

const srcset = useImagesToSrcset(props?.reference?.imageUrl);
</script>

<template>
  <div class="simple-node-wrap flex flex-col items-center" :class="{ inactive: inactive }">
    <div
      v-if="!inactive"
      class="simple-node cursor-pointer p-4 box-shadow rounded-xl"
      @click="$emit('select', reference)"
      :style="`background-image:url(${props?.reference?.imageUrl?.['2x']})`"
    >      
    </div>
    <div
      v-else
      class="simple-node p-4 box-shadow rounded-xl"
      :style="`background-image:url(${props?.reference?.imageUrl?.['2x']})`"
    >

    </div>

    <div class="node-name py-2 px-4 grow text-medium">
      {{ reference.name }}
    </div>

  </div>
</template>

<style scoped>
  .simple-node-wrap.inactive {
    opacity: .30;
  }
  .simple-node {
    background-color: #FFFFFF;
    aspect-ratio: 1/1;
    width: 55vw;
    background-size: contain;
  }

  .node-name {
    font-family: "Exo2";
    color: var(--secondary-app-color);
  }

  /* sm */
@media (min-width: 640px) {
  .simple-node {
    width: 40vw;
  }
}

/* md */
@media (min-width: 768px) {
  .simple-node {
    width: 185px;
  }
}

/* lg */
@media (min-width: 1024px) {
  .simple-node {
    width: 200px;
  }
}

/* xl */
@media (min-width: 1280px) {
  .simple-node {
    width: 250px;
  }
}

/* 2xl */
@media (min-width: 1536px) {

}
</style>