<script setup lang="ts">

const props = defineProps({
  reference: {},
});

// Modal
import { useModal } from 'vue-final-modal';
import FullScreenModal from '@/components/ui/FullScreenModal.vue';
const { open, close } = useModal({
  component: FullScreenModal,
  attrs: {
    images: [props.reference],
    selectedIndex: 0,
    onClose() {
      close();
    },
  },
  slots: {
    default: '',
  },
});

function openImage(event){
    event.preventDefault();
    event.stopPropagation();
    open();
}

</script>

<template>
    <div
    class="reference-image rounded-lg"
    v-if="reference.imageUrl"
    :style="`background-image:url(${reference.imageUrl?.['2x']})`"
    @click="openImage"
    >

    </div>
</template>

<style scoped>
  .reference-image {
    height: 100%;
    aspect-ratio: 1/1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>