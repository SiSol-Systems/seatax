<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

defineProps<{
  title?: string
}>();

const emit = defineEmits<{
  (e: 'confirm'): void
}>();
</script>

<template>
  <VueFinalModal
    class="flex flex-row justify-center items-center"
    content-class="flex flex-col p-5 large-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h3>{{ title }}</h3>
    <hr>
    <div class="modal-innter-slot py-5">
        <slot />
    </div>
    <div class="text-center">
        <button class="modal-button p-3 rounded-xl" @click="emit('confirm')">
            Close
        </button>
    </div>
  </VueFinalModal>
</template>

<style>
.large-modal-content {
  background: #fff;
  border-radius: 0.5rem;
  width: 90%;
}

.modal-button {
    background: var(--secondary-app-color);
    color: #FFF;
    min-width: 100px;
}

.modal-innter-slot {
  max-height: 60vh;
  overflow-y: scroll;
}

/* sm */
@media (min-width: 640px) {
    .large-modal-content {
        width: 500px;
    }
}

/* md */
@media (min-width: 768px) {
    .large-modal-content {
        width: 600px;
    }
}

/* lg */
@media (min-width: 1024px) {
    .large-modal-content {
        width: 700px;
    }
}

/* xl */
@media (min-width: 1280px) {

}

/* 2xl */
@media (min-width: 1536px) {

}
</style>
