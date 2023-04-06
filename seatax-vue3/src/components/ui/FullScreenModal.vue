<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

defineProps<{
  images?: []
  selectedIndex?: Number
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>();
</script>

<template>
  <VueFinalModal
    class="flex flex-row justify-center items-center"
    content-class="flex flex-col p-5 gallery-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="fsm-outer flex flex-col justify-center items-center" @click="emit('close')">
      <div class="close-button cursor-pointer px-4 py-4"
        @click="emit('close')"
      >
        <img src="/images/close.svg" />
      </div>
      
      <div class="fsm-content flex flex-col justify-center items-center">
        <div>
          <slot />
        </div>
        <div class="fsm-image" :style="`background-image:url(${images[selectedIndex].imageUrl['4x']})`">
        </div>
        <div v-if="images[selectedIndex].licence" class="image-credits py-5 w-full flex flex-col justify-center items-center">
          <div>
            Image: <span class="">{{ images[selectedIndex].licence.creatorName }}</span>
          </div>
          <div>
            Licence: {{ images[selectedIndex].licence.licence }} {{ images[selectedIndex].licence.licenceVersion }}
          </div>
        </div>

      </div>
      
    </div>
    
  </VueFinalModal>
</template>

<style scoped>

.fsm-outer {
  width: 100vw;
  height: 100vh;
  position: relative;
  
}

.fsm-image {
  height:80vh;
  width: 90vw;
  background-size:contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.image-credits {
  color: #afafaf;
  background: rgba(128,128,128,.95);
}

.close-button {
  position: fixed;
  right:0;
  top:0;
  background: black;
}

</style>

