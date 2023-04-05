<script setup lang="ts">
import  { Taxon } from '@/types/localcosmos/src/features/BackboneTaxonomy';

/*interface Props {
  taxon: Taxon,
  forceItalic?: Boolean,
}*/

const props = defineProps({
  forceItalic: {
    type: Boolean,
    default: false,
    required: false,
  },
  taxon : {
    type: Object,
  },
});

</script>

<template>
  <span v-if="taxon.taxonSource=='app_kit.features.nature_guides' && forceItalic==false">{{ taxon.taxonLatname }}</span>
  <span v-else><i>{{ taxon.taxonLatname }}</i></span>
</template>
