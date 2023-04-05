<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue';
import { useFeatureStore } from '@/stores/features';
import { useImagesToSrcset } from '@/composables/localcosmos';

defineEmits(['back']);
withDefaults(defineProps<{ title?: string }>(), { title: '' });

const featureStore = useFeatureStore();
const logo = useImagesToSrcset(featureStore.userImage('logo')?.imageUrl);
</script>

<template>
  <div class="h-full grid grid-cols-1 grid-rows-[100px_auto] md:grid-rows-[auto]">
    <div class="flex flex-row items-center px-8 py-8 shadow shadow-neutral-50 bg-white z-10 md:hidden">
      <button @click="$emit('back')">
        <Icon name="back" :size="24" class="text-paragraph-base" />
      </button>
      <slot v-if="$slots.top" name="top" />
      <div v-else class="grow flex justify-center">
        <img
          :srcset="logo"
          class="w-32"
          alt="LakeExplorer"
        >
      </div>
    </div>
    <slot />
  </div>
</template>
