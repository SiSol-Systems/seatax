<script setup lang="ts">
import { computed } from 'vue';
import type { IdentificationKeyReference, IdentificationModes } from '@/types/localcosmos/src/features/NatureGuide';
import LazyRenderer from '@/components/container/LazyRenderer.vue';
import { useImagesToSrcset } from '@/composables/localcosmos';
import TaxonLatname from '@/components/localcosmos/TaxonLatname.vue';

const emit = defineEmits(['select', 'openEvaluationImage', 'openDescription']);

const props = defineProps({
  mode: { type: String as () => IdentificationModes, required: true },
  reference: { type: Object as () => IdentificationKeyReference, required: true },
  points: { type: Number, default: 0 },
});

const srcset = useImagesToSrcset(props?.reference?.imageUrl);

function calculateMatrixItemBackgroundcolor(){

  const maxColor = 130; // max% of matrixPoints
  const minColor = 220; // min% of matrixPoints
  const defaultColor = 'var(--neutral-app-color)';

  const pointsPercentage = props.points / props.reference.maxPoints;

  if (pointsPercentage > 0 ){

    // 255 -150 = 105 => 0 - 105
    const colorSpan = Math.abs(maxColor - minColor);

    // the color span should start at 30% of reference-points and end at 100% reference-points
    const startPercentage = 0.3;

    // eg item has 50% of pints => 50%-30% = 20% over startPercentage
    const percentPointsOverStartPercentage = pointsPercentage - startPercentage;

    // 20% of colorSpan 20% of 105 colorPoints = 21 colorPoints
    const colorPoints = Math.abs(percentPointsOverStartPercentage * colorSpan);
    
    let newColor = maxColor - colorPoints;
    if (minColor > maxColor) {
      newColor = minColor - colorPoints;
    }
    
    return `rgb(${newColor}, 210, 68)`;
    
  }
  else {
    return defaultColor;
  }
}

const pointsColor = computed(() => {
  return calculateMatrixItemBackgroundcolor();
});


function openImage(event){
    //event.preventDefault();
    event.stopPropagation();
    emit('openEvaluationImage');
}
</script>

<template>
  <LazyRenderer
    class="flex flex-row items-stretch justify-center my-5"
    :minHeight="90"
  >
    <div class="flex flex-col evaluation-left justify-between">
      <div class="h-45 flex flex-row items-center justify-center font-condensed mr-2 rounded-xl" :style="`background-color:${pointsColor}`">
        <div class="text-center text-2xl">{{ points }}</div>&nbsp;
        <div class="text-center text-xs">{{ $t('Points') }}</div>
      </div>
      <div
        v-if="reference.description"
        class="box-shadow flex flex-row font-condensed cursor-pointer justify-center items-center h-45 back-neutral text-xs rounded-xl p-2 mr-2"
        @click="$emit('openDescription')"
      >
        <div>description</div>
      </div>
    </div>

    <div
      class="p-1 node evaluation-right flex flex-row items-center cursor-pointer box-shadow rounded-xl"
      :class="{
        'border-transparent': reference.isVisible,
        'border-red-500': !reference.isVisible,
      }"
      @click="$emit('select', reference)"
    >
      
      <div class="py-2 px-4 grow text-regular">
        <TaxonLatname v-if="reference.taxon" :taxon=reference.taxon />
        <span v-else>{{ reference.name }}</span>
      </div>

      <div
        v-if="reference.imageUrl"
        class="reference-image rounded-lg"
        :style="`background-image:url(${reference.imageUrl?.['2x']})`"
        @click="openImage"
      >
      </div>
      
      
    </div>
  </LazyRenderer>
</template>

<style>
  .node {
    background-color: #FFFFFF;
    
  }
  .h-45 {
    height: 45%;
  }

  .reference-image {
    height: 100%;
    aspect-ratio: 1/1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>