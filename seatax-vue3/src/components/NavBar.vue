<script setup lang="ts">
  import { inject } from "vue";

  import { useFeatureStore } from '@/stores/features'
  const featureStore = useFeatureStore();

  import { useNavigationStore } from "@/stores/navigation";
  const navigationStore = useNavigationStore();

  await navigationStore.loadNavigations();

  const lcSettings = inject("lcSettings");
  const lcFrontend = inject("lcFrontend");

  const taxonProfiles = featureStore.taxonProfiles;

  let natureGuides = [];

  let glossary = null;

  if (featureStore.natureGuides){
    natureGuides = featureStore.natureGuides;
  }

  if (featureStore.glossary) {
    glossary = featureStore.glossary;
  }

  const logo =  lcFrontend.userContent.images.logo.imageUrl?.['2x'];
  const appName = lcSettings.NAME;
</script>

<template>
  <div class="topbar fixed top-0 inset-x-0">

    <div class="topbar-content">
      <div class="topbar-left py-3 pl-3">
        <div class="topbar-logo">
          <router-link to="/">
            <img :src="logo" class="mr-3"/>
          </router-link>
          <router-link to="/">
            <span class="app-name">{{ appName }}</span>
          </router-link>
        </div>
      </div>
      <div class="topbar-middle hidden xl:flex py-3">
        <div v-if="natureGuides.length == 1">
          <RouterLink :to="{ name: 'natureGuideNode', params: { natureGuideSlug: natureGuides[0].slug, nodeSlug: natureGuides[0].startNodeSlug}}" class="nav-link" active-class="active">{{ $t(natureGuides[0].name, { ns: 'plain' }) }}</RouterLink>
        </div>
        <div v-if="natureGuides.length > 1">
          more than one
        </div>
        <div v-for="navEntry in navigationStore.navigations.main">
          <RouterLink :to="navEntry.url" active-class="active">
            {{ navEntry.link_name }}
          </RouterLink>
        </div>
        <div>
          <RouterLink to="/taxon-profiles" active-class="active">
            {{ $t(taxonProfiles.name, { ns: 'plain' }) }}
          </RouterLink>
        </div>
        <div v-if="glossary">
          <RouterLink :to="{ name : 'glossary' }" active-class="active">
            {{ $t(glossary.name, { ns: 'plain' }) }}
          </RouterLink>
        </div>
      </div>
      <div class="topbar-right">
          <div class="flex justify-end items-center">
            <div class="flex justify-end items-center pointer py-3 px-5" @click="$emit('openBurger')">
              <span class="material-icons-round md-36">menu</span>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<style>
.topbar {
  width: 100vw;
  height: var(--topbar-height);
  background-color: var(--white);
  color: var(--secondary-app-color);
  font-weight: 600;
  font-size: 1.3rem;
  text-transform: uppercase;
  box-shadow: 0px 4px 10px -7px rgba(0,0,0,0.75);
  z-index: 10;
}

.topbar-content {
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.topbar-left, .topbar-right {
  width: 50vw;
}

.topbar-left, .topbar-right, .topbar-middle {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.topbar-right {
  justify-content: flex-end;
}

.topbar-middle {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.topbar-middle > div {
  padding: 0.5rem;
}

.topbar-content img {
  height: 3rem;
  width: auto;
}

.topbar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
}

.topbar-logo a {
  text-decoration: none !important;
}

/* sm */
@media (min-width: 640px) {

}
/* md */
@media (min-width: 768px) {

}

/* lg */
@media (min-width: 1024px) { 

}

/* xl */
@media (min-width: 1280px) {
  .topbar-left, .topbar-right {
    width: 18vw;
  }
}

/* 2xl */
@media (min-width: 1536px) {
  .topbar-left, .topbar-right {
    width: 15vw;
  }
}
</style>
