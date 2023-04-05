<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRoute } from 'vue-router';

import { t } from 'i18next';

import { useTaxonProfilesStore } from '@/stores/taxon-profiles';

import TaxonText from '@/components/localcosmos/TaxonProfile/TaxonText.vue';
import MatrixFilter from '@/components/localcosmos/NatureGuide/MatrixFilter.vue';
import TaxonLatname from '@/components/localcosmos/TaxonLatname.vue';
import TaxonProfileImages from '@/components/localcosmos/TaxonProfile/TaxonProfileImages.vue';

const route = useRoute();
const { taxonSource, nameUuid } = route.params;

const taxonProfilesStore = useTaxonProfilesStore();

const taxonProfile = await taxonProfilesStore.loadTaxon(taxonSource as string, nameUuid as string);


function checkShowTexts(){
  if (['Endophytic Browns', 'Endophytes', 'Himanthalia elongata'].indexOf(taxonProfile.taxonLatname) != -1 ) {
    return true;
  }

  return false;
}

const showTexts = checkShowTexts();
/*
const title: ComputedRef<string> = computed(() => taxonProfile.value?.vernacular[i18next.language] || taxonProfile.value?.nodeNames[0] || '');
const images: ComputedRef<{ imageUrl: string }[]> = computed(() => [
  ...(taxonProfile.value?.images?.taxonProfileImages || []),
  ...(taxonProfile.value?.images?.nodeImages || []),
  ...(taxonProfile.value?.images?.taxonImages || []),
]);*/

//useHead({
//  titleTemplate: () => `${title.value} - ${t('taxonProfile.title')}`,
//});

const images = ref([]);
const selectedIndex = ref(0);

// Modal
import { ModalsContainer, useModal } from 'vue-final-modal';
import FullScreenModal from '@/components/ui/FullScreenModal.vue';
const { open, close } = useModal({
  component: FullScreenModal,
  attrs: {
    images: images,
    selectedIndex: selectedIndex,
    onClose() {
      close();
    },
  },
  slots: {
    default: '',
  },
});

function openModal(taxonImages, clickedIndex) {
  images.value = taxonImages;
  selectedIndex.value = clickedIndex;
  open();
}

</script>

<template>
  <div class="topbar-padding pb-10">

    <div class="mt-10 lg:px-10 xl:container">

      <div class="text-center">
        <h1><TaxonLatname :taxon=taxonProfile /></h1>
        <span class="color-2nd-translucent">{{ taxonProfile.taxonAuthor }}</span>
      </div>

      <div class="mt-10 px-10">
        <h2>
          {{ t('Gallery') }}
        </h2>
        <div class="mt-5 flex flex-row flex-wrap justify-center md:justify-start items-center md:items-start gap-3 md:gap-10">
          <TaxonProfileImages
            :images="taxonProfile.images.taxonProfileImages"
            @imageclick="openModal"
          />
          <TaxonProfileImages
            :images="taxonProfile.images.nodeImages"
            @imageclick="openModal"
          />
        </div>
      </div>

      
      <div v-if="showTexts" class="px-10">
        <TaxonText v-for="text in taxonProfile.texts" :text="text" :key="text.taxonTextType" class="mb-4" />
      </div>
      
      
      <div class="mt-10 mint-back rounded-2xl p-10">
        <h2>
          {{ t('Traits') }}
        </h2>
        <div class="flex flex-row flex-wrap gap-10 taxon-profile-matrix-filters">
          <MatrixFilter
            v-for="trait in taxonProfile.traits"
            :key="trait.matrixFilter.uuid"
            :filter="trait.matrixFilter"
            read-only
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

@media (min-width: 640px) {

}

/* md */
@media (min-width: 768px) {}

/* lg */
@media (min-width: 1024px) {
  .matrix-filters > div {
    width: 40%;
  }
}

/* xl */
@media (min-width: 1280px) {
  .matrix-filters > div {
    width: 60%;
  }
}

/* 2xl */
@media (min-width: 1536px) {}
</style>
