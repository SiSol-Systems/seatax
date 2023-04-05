<script setup lang="ts">
import type { TaxonText } from '@/types/localcosmos/src/features/TaxonProfile';
import GlossarizedText from '@/components/container/GlossarizedText.vue';

interface Props {
  text: TaxonText,
}

const props = defineProps<Props>();

</script>

<template>
  <div class="mt-10">
    <h2>
      <GlossarizedText :translation-key="text.taxonTextType" />
    </h2>

    <div class="mt-3">
      <GlossarizedText :translation-key="text.shortTextKey" />
    </div>

  </div>
</template>
