<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    images: Object,
});

const emit = defineEmits<{
  (e: 'imageclick'): void
}>();


function imageClick(event){
  const index = event.currentTarget.getAttribute('data-index');
  emit('imageclick', props.images, index);
}
</script>

<template>
  <div
    v-for="(image, index) in images"
    :key="image"
    class="taxon-profile-image-container"
  >
    <div
      class="taxon-profile-image pointer"
      :style="`background-image: url(${image.imageUrl?.['2x']})`"
      :data-index="index"
      @click="imageClick"
    >
    </div>
    <div
      v-if="image.text"
      v-html="image.text"
      class="color-neutral-dark pt-2 text-center"
    ></div>
  </div>
</template>


<style scoped>

.taxon-profile-image-container {
  width: 46%;
}
.taxon-profile-image {
  aspect-ratio: 1/1;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: var(--border-radius);
}

@media (min-width: 640px) {

}

/* md */
@media (min-width: 768px) {
  .taxon-profile-image-container {
    width: 28%;
  }
}

/* lg */
@media (min-width: 1024px) {
  .taxon-profile-image-container {
    width: 15%;
  }
}

/* xl */
@media (min-width: 1280px) {}

/* 2xl */
@media (min-width: 1536px) {}

@media (min-width: 576px) {}
</style>
