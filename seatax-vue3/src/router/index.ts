import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FundingView from '../views/FundingView.vue';
import TeamView from '../views/TeamView.vue';
import InfoView from '../views/InfoView.vue';
import DownloadView from '../views/DownloadView.vue';
import LegalNoticeViewVue from '@/views/legal/LegalNoticeView.vue';
import PrivacyPolicyViewVue from '@/views/legal/PrivacyPolicyView.vue';
import TermsOfUseViewVue from '@/views/legal/TermsOfUseView.vue';

import NatureGuideView from '../views/NatureGuideView.vue';
import TaxonProfileView from '../views/TaxonProfileView.vue';
import TaxonProfilesView from '../views/TaxonProfilesView.vue';
import GlossaryView from '../views/GlossaryView.vue';
import KeyManualView from '../views/KeyManualView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pages/home/:slug',
      redirect: { name: 'home' },
    },
    {
      path: '/pages/team/:slug',
      name: 'team',
      component: TeamView,
    },
    {
      path: '/pages/funding/:slug',
      name: 'funding',
      component: FundingView,
    },
    {
      path: '/pages/download/:slug',
      name: 'download',
      component: DownloadView,
    },
    {
      path: '/pages/key-manual/:slug',
      name: 'key-manual',
      component: KeyManualView,
    },
    {
      path: '/pages/info/:slug',
      name: 'info',
      component: InfoView,
    },
    {
      path: '/legal-notice/',
      name: 'legal-notice',
      component: LegalNoticeViewVue,
    },
    {
      path: '/privacy-policy/',
      name: 'privacy-policy',
      component: PrivacyPolicyViewVue,
    },
    {
      path: '/terms-of-use/',
      name: 'terms-of-use',
      component: TermsOfUseViewVue,
    },
    {
      path: '/nature-guide/:natureGuideSlug/:nodeSlug',
      name: 'natureGuideNode',
      component: NatureGuideView,
    },
    {
      path: '/taxon-profile/:taxonSource/:nameUuid',
      name: 'taxonProfile',
      component: TaxonProfileView,
    },
    {
      path: '/taxon-profiles',
      name: 'taxonProfiles',
      component: TaxonProfilesView,
    },
    {
      path: '/glossary',
      name: 'glossary',
      component: GlossaryView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behaviour: 'smooth',
        top: 50,
      };
    }
    else {
      return { top: 0 };
    }
  },
});

export default router;
