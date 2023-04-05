<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import BurgerMenu from '@/components/BurgerMenu.vue';
import PageFooter from '@/components/PageFooter.vue';
import { PointerListener, Pan, Tap } from 'contactjs';
import { ref, onMounted, provide } from 'vue';
import { ModalsContainer } from 'vue-final-modal';

import  GlossaryBubble from '@/components/ui/GlossaryBubble.vue';

const burgerOpen = ref(false);

function onOpenBurger(event){
  burgerOpen.value = true;
}

function onCloseBurger(event){
  burgerOpen.value = false;
}

onMounted(() => {

  let body = document.body;
  
  let options = {
    supportedGestures: [Tap, Pan],
  };
  let pointerListener = new PointerListener(body, options);

});

const glossaryBubble = ref();
provide('glossaryBubble', glossaryBubble);
</script>

<template>
  <div id="app-content">
    <Suspense>
      <!-- main content -->
      <NavBar @openBurger="onOpenBurger" />

      <!-- loading state -->
      <template #fallback>
        Loading...
      </template>
    </Suspense>
    
    
    <div id="router-view" class="flex flex-row flex-wrap justify-center">
      
    <RouterView v-slot="{ Component, route }">
      <transition name="fade">
        <template v-if="Component">

          <!--<KeepAlive>-->
          <Suspense>

            <!-- main content -->
            <component :is="Component" :key="route.fullPath"></component>

            <!-- loading state -->
            <template #fallback>
              Loading...
            </template>

          </Suspense>
          <!--</KeepAlive>-->
        </template>
      </transition>
    </RouterView>

    </div>
    <GlossaryBubble v-if="glossaryBubble" :termB64="glossaryBubble.termB64" :x="glossaryBubble.x" :y="glossaryBubble.y" />
    <PageFooter v-show="$route.name!=='natureGuideNode'" />
    <ModalsContainer />
  </div>

  <Suspense>
    <BurgerMenu :is-open="burgerOpen" @closeBurger="onCloseBurger" />
      <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style scoped>
#app-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

}

#router-view {
  flex-grow: 1;
}
</style>
