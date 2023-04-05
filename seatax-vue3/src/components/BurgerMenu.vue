<script setup lang="ts">
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { useFeatureStore } from '@/stores/features';

  const featureStore = useFeatureStore();

  import { useNavigationStore } from '@/stores/navigation';
  const navigationStore = useNavigationStore();
  await navigationStore.loadNavigations();


  const props = defineProps({
    isOpen : {
      'type' : Boolean,
    },
  });

  const router = useRouter();
  router.beforeEach(() => {
    emit('closeBurger');
  });


  const emit = defineEmits(['openBurger', 'closeBurger']);

  const taxonProfiles = featureStore.taxonProfiles;

  let natureGuides = [];

  let glossary = null;

  if (featureStore.natureGuides){
    natureGuides = featureStore.natureGuides;
  }

  if (featureStore.glossary) {
    glossary = featureStore.glossary;
  }


  const panActive = ref(false);
  const panPossible = ref(true);
  const ticking = ref(false);
  const eventTarget = ref();

  let animationFrameId = null;
  
  function open() {
    emit('openBurger');
  }

  function close () {
    emit('closeBurger');
  }

  function requestElementUpdate(element: HTMLElement, transformString:any) {

    if(ticking.value == false) {
      
      animationFrameId = requestAnimationFrame(function(timestamp){
        element.style.transform = transformString;
        
        animationFrameId = null;
        ticking.value = false;
      
      });
      
      ticking.value = true;
    }
  
  }

  function panstart(event) {
    eventTarget.value = event.currentTarget;
    if (event.detail.live.direction == "left"){
      panPossible.value = false;
    }

    document.getElementById('burger-content').classList.add('blockscroll');
  }

  function pan (event){
    
    if (panPossible.value == true){

      if (panActive.value == false){
        panActive.value = true;
        
      }

      // transform
      let x = event.detail.global.deltaX;
      const y = 0;

      if (x < 0) {
        x=0;
      }

      const transformString = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      
      requestElementUpdate(event.currentTarget, transformString);
      
    }
  }

  function panend(event){

    document.getElementById('burger-content').classList.remove('blockscroll');

    if (ticking.value == true){
      setTimeout(function(){
        panend(event);
      }, 100);
    }
    else {

      panActive.value = false;
      let closeMenu = false;
      if (event.detail.global.deltaX > (eventTarget.value.clientWidth/2.8)){
        closeMenu = true;
      }
      eventTarget.value.style.transform="";
      if (panPossible.value == true && closeMenu == true)  {
        emit('closeBurger');
      }
      else {
        emit('openBurger');
      }
      panPossible.value = true;
      
    }
    
  }
</script>

<template>

  <div
    id="burger-menu"
    class="burger-menu"
    :class="{ open: isOpen }"
    @swiperight="close"
    @pan="pan"
    @panstart="panstart"
    @panend="panend"
  >
    <div>
      <div class="top">
        <div class="flex justify-end items-center">
            <div class="flex justify-end items-center pointer py-3 px-5" @click="$emit('closeBurger')">
              <span class="material-icons-round md-36">close</span>
            </div>
        </div>
      </div>
      <div id="burger-content" class="content">

        <div class="xl:hidden submenu">
          <RouterLink
            v-if="natureGuides.length == 1"
            :to="{ name: 'natureGuideNode', params: { natureGuideSlug: natureGuides[0].slug, nodeSlug: natureGuides[0].startNodeSlug}}"
            class="nav-link"
            active-class="active">
              <div>
                {{ $t(natureGuides[0].name, { ns: 'plain' }) }}
              </div>
          </RouterLink>

          <RouterLink
            v-for="navEntry in navigationStore.navigations.main"
            :to="navEntry.url"
            active-class="active">
              <div>
                {{ navEntry.link_name }}
              </div>
          </RouterLink>

          <div v-if="natureGuides.length > 1">
            more than one
          </div>
          <RouterLink to="/taxon-profiles" active-class="active">
            <div>
              {{ $t(taxonProfiles.name, { ns: 'plain' }) }}
            </div>
          </RouterLink>


          <RouterLink v-if="glossary" :to="{ name : 'glossary' }" active-class="active">
            <div>
              {{ $t(glossary.name, { ns: 'plain' }) }}
            </div>
          </RouterLink>

        </div>
        <div class="xl:hidden spacer"></div>

        <div class="submenu-title mb-3">More</div>
        <div class="submenu">
          <RouterLink
            v-for="navEntry in navigationStore.navigations.more"
            :to="navEntry.url"
            active-class="active">
              <div>
                {{ navEntry.link_name }}
              </div>
          </RouterLink>
        </div>
        <div class="spacer"></div>
        <div class="submenu-title mb-3">Legal</div>
        <div class="submenu">
            <router-link :to="{ name: 'privacy-policy'}">
              <div>Privacy Policy</div>
            </router-link>
            <router-link :to="{ name: 'legal-notice'}">
              <div>Legal Notice</div>
            </router-link>
            <router-link :to="{ name: 'terms-of-use'}">
              <div>Terms Of Use</div>
            </router-link>
            <RouterLink
              v-for="navEntry in navigationStore.navigations.legal"
              :to="navEntry.url"
              active-class="active">
                <div>
                  {{ navEntry.link_name }}
                </div>
            </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div
    id="modal-back"
    class="navbar-modal-back"
    :class="{ open: isOpen }"
    @click="$emit('closeBurger')"
    @swiperight="$emit('closeBurger')"
  >
  </div>
</template>

<style>
.blockscroll {
  touch-action: none !important;
}

.burger-menu {
  width: 80vw;
  height: 100vh;
  background-color: var(--white);
  color: var(--secondary-app-color);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  right:0; top: 0;
  z-index: 100;
  transform: translate3d(103%, 0, 0);
  text-transform: uppercase;
  user-select: none;
  touch-action: none;
}

.burger-menu.open {
  transform: translate3d(0, 0, 0);
}

.burger-menu > div {
  position: relative;
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
}

.burger-menu .top {
  height: var(--topbar-height);
  width: 100%;
  background-color: var(--white);
  flex-grow: 0;
  z-index: 100;
}

.burger-menu .top > div {
  height: 100%;
}

.burger-menu .content {
  width:100%;
  flex-grow:1;
  z-index: 99;
  padding: 15px 15px 50px 50px;
  overflow-y: scroll;
  touch-action: pan-y;
  height: calc(100vh - var(--topbar-height));
}

.burger-menu .content .submenu-title {
  font-size: 1.8rem;
  font-weight: 600;
  
}

.burger-menu .content .submenu {
  font-size: 1.125rem;
}

.burger-menu .content .submenu  > a {
  display: flex;
  padding: .3rem 0rem;
}

.burger-menu .content .spacer {
  height: 30px;
}

.navbar-modal-back {
  position:fixed;
  top: 0; left:0; right:0; bottom:0;
  width: 100vw;
  height: 100vh;
  background-color: var(--black-translucent);
  z-index: -1;
  opacity: 0;
  touch-action: pan-x;
}

.burger-menu, .navbar-modal-back {
  transition: all 0.3s cubic-bezier(0.07, 0.58, 0.49, 0.93);
}

.navbar-modal-back.open {
  z-index: 99;
  opacity:1;
}

/* sm */
@media (min-width: 640px) {
  .burger-menu {
    width: 70vw;
  }
}
/* md */
@media (min-width: 768px) {
  .burger-menu {
    width: 420px;
    height: auto;
  }
  .navbar-modal-back {
    background-color: rgba(0,0,0,0.3);
  }
}

/* lg */
@media (min-width: 1024px) { 
  .burger-menu .content {
    width:100%;
    flex-grow:1;
    z-index: 99;
    padding: 15px 15px 100px 100px;
    overflow-y: scroll;
  }
}

/* xl */
@media (min-width: 1280px) {
  .burger-menu {
    width: 500px;
  }
}

/* 2xl */
@media (min-width: 1536px) {

}
</style>
