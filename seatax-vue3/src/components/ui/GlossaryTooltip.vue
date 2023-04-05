<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGlossaryStore } from '@/stores/glossary';

const props = defineProps<{ term: string }>();

const glossaryStore = useGlossaryStore();;

const tip = computed(() => glossaryStore.definition(props.term));
const showTip = ref(false);

const show = () => {
  console.log('show')
  showTip.value = true;
  window.setTimeout(() => {
    showTip.value = false;
  }, 2000);
};
</script>

<template>
  <div class="tooltip tooltip-primary cursor-pointer"
    :class="showTip ? 'tooltip-open' : ''"
    :data-tip="tip"
    @touchstart="show"
    @click.stop
  >
    <slot />
  </div>
</template>
