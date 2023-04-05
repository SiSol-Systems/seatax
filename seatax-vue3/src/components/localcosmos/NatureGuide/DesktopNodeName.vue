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
<div id="nature-guide-head" class="hidden lg:flex flex-col justify-center items-center w-full">
    <div class="flex flex-row flex-wrap gap-5 justify-center items-center p-5 pt-10">
        <div>
          <h2 class="uppercase">{{ node.name }}</h2>
        </div>
        <div class="hidden lg:flex 2xl:hidden">
            <div
              v-if="node.description"
              class="box-shadow flex flex-row font-condensed cursor-pointer justify-center items-center h-45 back-neutral text-xs rounded-xl p-2 mr-2"
              @click="open"
            >
              <div>description</div>
            </div>
        </div>
    </div>
    <div v-if="node.description" v-html="node.description" class="hidden 2xl:flex px-5 pb-3 container">
    </div>
</div>
</template>

<style>

</style>