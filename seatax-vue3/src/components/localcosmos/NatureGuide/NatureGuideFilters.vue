<script setup lang="ts">
import { IdentificationKey } from '@/types/localcosmos/src/features/NatureGuide';

import Icon from '@/components/ui/Icon.vue';
//import Modal from '@/components/container/ContentModal.vue';
//import FormToggle from '@/components/ui/FormToggle.vue';
//import BottomFab from '@/components/ui/BottomFab.vue';

defineEmits(['toggle-tab', 'reset']);
defineProps<{
  node: IdentificationKey,
  tabShowing: 'results' | 'filter',
}>();

const showOverviewModal = ref(false);
</script>

<template>
  <BottomFab>
    <button class="btn btn-circle btn-primary text-white" @click="$emit('reset')">
      <Icon name="undo" :size="22" />
    </button>
    <FormToggle
      :value="tabShowing === 'results'"
      label-off="Ergebnis"
      label-on="Merkmale"
      class="md:hidden"
      @toggle="$emit('toggle-tab', tabShowing)"
    />
    <button
      :disabled="!node.overviewImage"
      class="btn btn-circle btn-primary text-white"
      @click="showOverviewModal = true"
    >
      <Icon name="guide" :size="22" />
    </button>
    <Modal :open="showOverviewModal" :actions="false" @close="showOverviewModal = false">
      <img
        :src="node.overviewImage"
        :alt="node.name"
        class="w-full aspect-square"
      >
    </Modal>
  </BottomFab>
</template>
