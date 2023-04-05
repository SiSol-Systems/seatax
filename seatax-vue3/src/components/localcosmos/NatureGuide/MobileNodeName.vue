<script setup lang="ts">

const props = defineProps({
  node: {},
});


// Modal
import { useModal } from 'vue-final-modal';
import LargeModal from '@/components/ui/LargeModal.vue';
const { open, close } = useModal({
  component: LargeModal,
  attrs: {
    title: `${props.node.name}`,
    onConfirm() {
      close();
    },
  },
  slots: {
    default: `<p>${props.node.description}</p>`,
  },
});

</script>

<template>
  <div class="lg:hidden flex flex-row justify-center items-center gap-2 flex-wrap items.start pt-5">
    <div v-if="node.description" class="w-1/6"></div>  
    <div class="text-center">
      <h3>{{ node.name }}</h3>
    </div>
    <div
      v-if="node.description"
      class="box-shadow flex flex-row font-condensed cursor-pointer justify-center items-center h-45 back-neutral text-xs rounded-xl p-2 mr-2"
      @click="open"
    >
      <div>description</div>
    </div>
  </div>
</template>

<style>

</style>