<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { Directions } from 'contactjs';
import IdentificationKeyReference from '@/components/localcosmos/NatureGuide/IdentificationKeyReference.vue';
import IdentificationKeyReferenceSimple from '@/components/localcosmos/NatureGuide/IdentificationKeyReferenceSimple.vue';
import MatrixFilter from '@/components/localcosmos/NatureGuide/MatrixFilter.vue';
import NatureGuideFilters from '@/components/localcosmos/NatureGuide/NatureGuideFilters.vue';
import MobileNodeName from '@/components/localcosmos/NatureGuide/MobileNodeName.vue';
import DesktopNodeName from '@/components/localcosmos/NatureGuide/DesktopNodeName.vue';

import { useNatureGuideStore } from '@/stores/nature-guides';
import type { IdentificationKeyReference as Reference } from '@/types/localcosmos/src/features/NatureGuide';

const route = useRoute();
const router = useRouter();
const { natureGuideSlug, nodeSlug } = route.params;

const natureGuideStore = useNatureGuideStore();
await natureGuideStore.loadNatureGuide(natureGuideSlug);
natureGuideStore.loadNodeBySlug(`${nodeSlug}`);
const node = ref(natureGuideStore.currentNode);

const reset = () => {
  natureGuideStore.loadNodeBySlug(`${nodeSlug}`);
  node.value = natureGuideStore.currentNode;
};

/*useHead({
  titleTemplate () {
    return `${node.value.name} - Bestimmung - LakeExplorer`;
  },
});*/
const selectReference = async (reference: Reference) => {
  switch (reference.nodeType) {
    case 'node': // navigate to sub-node
      return await router.push({
        name: 'natureGuideNode',
        params: {
          natureGuideSlug: route.params.natureGuideSlug,
          nodeSlug: reference.slug,
        },
      });
    case 'result': // navigate to result:
      if (reference.taxon) {
        return await router.push({
          name: 'taxonProfile',
          params: {
            taxonSource: reference.taxon.taxonSource,
            nameUuid: reference.taxon.nameUuid,
          },
        });
      }
  }
};
/*
const onBack = () => {
  if (natureGuideStore.currentNodeIsRootNode) {
    router.push({ name: 'nature-guide' });
  } else {
    router.push({
      name: 'natureGuideNode',
      params: { natureGuideSlug: route.params.natureGuideSlug, nodeSlug: route.params.nodeSlug },
    });
  }
};*/

const matrixState = 'matrixScreen';
const itemsState = 'itemsScreen';
const screenState = ref(matrixState);
const panScreenWidth = 1024;

let ticking = false;
let animationFrameId = null;
let panActive = false;
let startX = 0;

function requestElementUpdate(element, transformString, wait?) {

  wait = wait || false;
  
  if (!ticking) {
  
    animationFrameId = requestAnimationFrame(function (timestamp) {

      element.style.transform = transformString;
    
      animationFrameId = null;
      ticking = false;
  
    });
  
    ticking = true;
  }
  else if (wait == true){
    setTimeout(function(){
      requestElementUpdate(element, transformString, true);
    }, 100);
  }

}

function getCurrentTranslation(element) {
  const matrix = window.getComputedStyle(element).getPropertyValue('transform');
  const translateX = matrix.match(/(-?[0-9\.]+)/g);

  if (translateX){
    return parseInt(translateX[4]);
  }

  return 0;

}

function goToMatrixItems(){
  const natureGuide = document.getElementById('nature-guide');
  screenState.value = itemsState;
  const transformString = 'translate3d(-100vw, 0, 0)';
  requestElementUpdate(natureGuide, transformString, true);
}

function goToMatrix(){
  const natureGuide = document.getElementById('nature-guide');
  screenState.value = matrixState;
  const transformString = 'translate3d(0, 0, 0)';
  requestElementUpdate(natureGuide, transformString, true);
}

function onPan(event){

  if (panActive == true){

    const deltaX = startX + event.detail.global.deltaX;
    const transformString = `translate3d(${deltaX}px, 0, 0)`;

    requestElementUpdate(event.currentTarget, transformString);
  }
}

function onPanEnd(event){

  const natureGuide = event.currentTarget;

  natureGuide.classList.remove('notransition');

  let deltaX = event.detail.global.deltaX;

  if (panActive == true){

    if (event.detail.recognizer.isSwipe == false){

      if (event.detail.global.direction == 'left'){
        if (deltaX < (-screen.width / 3)){
          goToMatrixItems();
        }
        else {
          goToMatrix();
        }
      }
      else {
        if (deltaX > (-screen.width * (2/ 3))){
          goToMatrix();
        }
        else {
          goToMatrixItems();
        }
      }
      
    }
    else {
      if (event.detail.live.direction == 'left'){
        goToMatrixItems();
      }
      else {
        goToMatrix();
      }
    }
    panActive = false;
  }
  
}

function onPanStart(event){

  const is_lg = window.matchMedia('(min-width: 1024px)');

  if (is_lg.matches == false && Directions.Horizontal.indexOf(event.detail.live.direction) >= 0 && screen.width < panScreenWidth){

    const natureGuide = event.currentTarget;
    panActive = true;
    natureGuide.classList.add('notransition');
    startX = getCurrentTranslation(event.currentTarget);
  }
}

function onResize(event){
  if (screenState.value == itemsState){
    goToMatrix();
  }
}
window.removeEventListener('resize', onResize);
window.addEventListener('resize', onResize);

// overview Modal
const images = ref();
const selectedIndex = ref(0);

import { useModal } from 'vue-final-modal';
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

function showOverviewImage(event) {
  images.value = [node.value.overviewImage];  
  open();
}



</script>

<template>
  <div class="nature-guide-page">
    <div class="topbar-padding flex flex-col translucent-white">
      <div
        id="branch-selector" class="w-full"
        v-if="node.uuid==natureGuideStore.natureGuide?.startNodeUuid"
      >
        
        <div class="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10 py-10">
          <IdentificationKeyReferenceSimple
              v-for="child in node.results"
              :key="child.uuid"
              :mode="node.identificationMode"
              :reference="child"
              :points="node.points[child.uuid]"
              :inactive="child.name == 'Brown Seaweeds' ? false : true"
              @select="selectReference(child)"
            />
          </div>
      </div>
      <div v-else id="nature-guide-outer" class="xl:flex flex-row justify-center items-center">
        <!-- tabs, mobile only -->
        <div class="tabs flex flex-row items-stretch justify-center lg:hidden">
          <div
            class="flex items-center justify-center pointer"
            :class="screenState"
            @click="goToMatrix"
          >
            <span>{{ $t('Traits') }}</span>
          </div>
          <div
            class="flex items-center justify-center pointer"
            :class="screenState"
            @click="goToMatrixItems"
          >
            <span>{{ $t('Evaluation') }}</span>
          </div>
        </div>

        <!-- FAB -->
        <div
          class="floating-action-button reset"
          @click="reset"
        >
          <img src="/images/reset.svg" />
        </div>

        <div
          v-if="node.overviewImage"
          class="floating-action-button overview-image"
          @click="showOverviewImage"
        >
          <img src="/images/tree.svg" />
        </div>
        
        <!-- head, large only -->
        <DesktopNodeName :node="node"/>

        <!-- traits and avaluation, panable -->
        <div id="nature-guide-container" class="xl:container">
          <div
            id="nature-guide"
            @panstart="onPanStart"
            @panleft="onPan"
            @panright="onPan"
            @panend="onPanEnd"
          >
            <div class="left">
              <div class="px-5">
                <div class="hidden lg:flex lg:pt-10">
                  <h3 class="uppercase lg:pt-5">{{ $t('Traits') }}</h3>
                </div>
                <MobileNodeName :node="node" />
                <div class="py-5">
                  <div v-for="filter in node.matrixFilters" :key="filter.uuid">
                        
                    <MatrixFilter
                      v-if="node.isFilterVisible(filter)"
                      :key="filter.uuid"
                      :filter="filter"
                      :read-only="false"
                    />

                  </div>
                </div>
              </div>
            </div>
            <div class="right xl:px-10">
              <div class="evaluation px-5 pb-10 xl:px-10 xl:py-5">
                <div class="hidden lg:flex flex-row justify-center items-center">
                  <div class="py-5">
                    <h3 class="uppercase">{{ $t('Evaluation') }}</h3>
                  </div>
                </div>
                <MobileNodeName :node="node" />
                <div>
                  <IdentificationKeyReference
                    v-for="child in node.results"
                    :key="child.uuid"
                    :mode="node.identificationMode"
                    :reference="child"
                    :points="node.points[child.uuid]"
                    @select="selectReference(child)"
                  />
                  <div
                    v-show="node.impossibleResults.length > 0"
                    class="border-2 border-b-primary"
                  />
                  <IdentificationKeyReference
                    v-for="child in node.impossibleResults"
                    :key="child.uuid"
                    :mode="node.identificationMode"
                    :reference="child"
                    :points="node.points[child.uuid]"
                    class="opacity-25"
                    @select="selectReference(child)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.nature-guide-page {
  background-image: url('/images/wallpaper/blueback.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100vw;
}

#nature-guide-outer {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: calc(100vh - var(--topbar-height));
  width: 100vw;
}

#nature-guide-head {
  flex-shrink: 1;
  flex-grow: 0;
}

#nature-guide-outer, #branch-selector {
  width: 100vw;
  height: calc(100vh - var(--topbar-height));
}

#nature-guide-container {
  width: 100vw;
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
}

#nature-guide {
  width: 200vw;
  height: 100%;
  transition: .3s ease;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: absolute;
  left: 0;
  top:0;
  touch-action: pan-y;
}

.left, .right {
  flex-grow: 1;
  flex-shrink: 0;
  overflow-y: scroll;
  touch-action: pan-y;
  width: 100vw;
}

.left {
  padding-top: var(--tabs-height);
}

.evaluation {
  background-color: #FFF;
  padding-top: var(--tabs-height);
}

.left, .evaluation {
  padding-bottom: 200px;
}

#branch-selector {
  overflow: scroll;
}

#branch-selector > div {
  min-height: 100%;
}

.tabs {
  position: fixed;
  width: 100vw;
  top: var(--topbar-height);
  height: var(--tabs-height);
  z-index: 9;
  background: #ffffff;
}

.tabs > div {
  width: 50vw;
  border-bottom: 3px solid #FFF;
}

.tabs > div:first-child.matrixScreen, .tabs > div:last-child.itemsScreen {
  border-bottom: 3px solid;
  border-color: var(--secondary-app-color);
}

.floating-action-button.reset {
  position: fixed;
  right: 5vw;
  bottom: 80px;
}

.floating-action-button.overview-image {
  position: fixed;
  right: 5vw;
  bottom: 150px;
}

/* sm */
@media (min-width: 640px) {}

/* md */
@media (min-width: 768px) {

}

/* lg */
@media (min-width: 1024px) {
  #nature-guide {
    width: 100%;
  }

  #nature-guide-head {
    width: 100%
  }

  .left, .right {
    width: 50%;
    padding-top: 0px;
  }

  .evaluation {
    border-radius: 2rem 0 0 0;
  }

  .floating-action-button.reset, .floating-action-button.overview-image {
    right: 55vw;
  }
}

/* xl */
@media (min-width: 1280px) {
  .left {
    width: 60%;
  }

  .right {
    width: 40%;
  }

  .evaluation {
    border-radius: 2rem;
    padding-bottom: 50px;
  }

  .floating-action-button.reset, .floating-action-button.overview-image {
    right: 45vw;
  }
}

/* 2xl */
@media (min-width: 1536px) {
}
</style>