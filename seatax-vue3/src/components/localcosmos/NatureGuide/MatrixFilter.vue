<script setup lang="ts">
import { MatrixFilter } from '@/types/localcosmos/src/features/NatureGuide';

import ColorFilterSpace from '@/components/localcosmos/NatureGuide/ColorFilterSpace.vue';
import DescriptiveTextAndImagesFilterSpace from '@/components/localcosmos/NatureGuide/DescriptiveTextAndImagesFilterSpace.vue';
import RangeFilterSpace from '@/components/localcosmos/NatureGuide/RangeFilterSpace.vue';
import NumberFilterSpace from '@/components/localcosmos/NatureGuide/NumberFilterSpace.vue';
import TextOnlyFilterSpace from '@/components/localcosmos/NatureGuide/TextOnlyFilterSpace.vue';
import TaxonFilterSpace from '@/components/localcosmos/NatureGuide/TaxonFilterSpace.vue';

import GlossarizedText from '@/components/container/GlossarizedText.vue';

withDefaults(defineProps<{
  filter: MatrixFilter,
  readOnly: boolean,
}>(), { readOnly: false });

const spaceType = (type: string) => {
  switch (type) {
    case 'ColorFilter': return ColorFilterSpace;
    case 'DescriptiveTextAndImagesFilter': return DescriptiveTextAndImagesFilterSpace;
    case 'RangeFilter': return RangeFilterSpace;
    case 'NumberFilter': return NumberFilterSpace;
    case 'TextOnlyFilter': return TextOnlyFilterSpace;
    case 'TaxonFilter': return TaxonFilterSpace;
  }
};
</script>

<template>
  <div class="mb-8">
    <h3 class="pb-5">
      <GlossarizedText :translation-key="filter.name" />
    </h3>
    <div 
      class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 select-none user-select-none"
      :class="filter.type"
    >
      <div v-for="space in filter.space" :key="space.spaceIdentifier">
        <component
          :is="spaceType(filter.type)"
          :space="space"
          :definition="filter.definition"
          :read-only="readOnly"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ColorFilter {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .TextOnlyFilter, .DescriptiveTextAndImagesFilter {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .taxon-profile-matrix-filters .TextOnlyFilter, .taxon-profile-matrix-filters .DescriptiveTextAndImagesFilter {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    max-width: 200px;
  }



  /* sm */
@media (min-width: 640px) {

  .ColorFilter {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .TextOnlyFilter, .DescriptiveTextAndImagesFilter {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

}

/* md */
@media (min-width: 768px) {
  .ColorFilter {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

/* lg */
@media (min-width: 1024px) {
  #nature-guide {
    width: 100vw;
  }

  .left, .right {
    width: 50vw;
    padding-top: 0px;
  }

  .TextOnlyFilter, .DescriptiveTextAndImagesFilter {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

}

/* xl */
@media (min-width: 1280px) {
  .ColorFilter {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .TextOnlyFilter, .DescriptiveTextAndImagesFilter {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

}

/* 2xl */
@media (min-width: 1536px) {
  .ColorFilter {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .TextOnlyFilter, .DescriptiveTextAndImagesFilter {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

}
</style>