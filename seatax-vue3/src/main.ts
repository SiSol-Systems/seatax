import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Frontend } from '@/models/Frontend';

import { createVfm } from 'vue-final-modal';

import { useFeatureStore } from '@/stores/features';
import { useGlossaryStore } from '@/stores/glossary';
import { useTaxonProfilesStore } from '@/stores/taxon-profiles';

import App from './App.vue';
import router from './router';

import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import HttpApi from 'i18next-http-backend';

import './assets/flat.css';
import 'material-icons/iconfont/material-icons.css';
import 'vue-final-modal/style.css';

import { useModalsStore } from '@/stores/modals';
import { useNatureGuideStore, NatureGuideViewState } from '@/stores/nature-guides';
import { useNavigationStore } from '@/stores/navigation';

window.currentState = {};

function onDeviceReady(event){

    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    const app = createApp(App);

    const pinia = createPinia();
	app.use(pinia);

    const vfm = createVfm();
    app.use(vfm);

    fetch('/settings.json').then(r => r.json()).then(settingsData => {

        const lcSettings = settingsData;

        document.title = lcSettings.NAME;

        let language = navigator.language.split('-')[0].toLowerCase();

        if (!(language in lcSettings.LANGUAGES)) {
            language = lcSettings.PRIMARY_LANGUAGE;
        }

        app.provide('language', language);

        app.provide('lcSettings', lcSettings);
        app.provide('device', device);

        fetch('/localcosmos/features.json').then(f => f.json()).then(featuresData => {

            const featureStore = useFeatureStore();
            featureStore.loadFeatures(featuresData);

            fetch(featureStore.taxonProfiles.registry).then(tpr => tpr.json()).then(taxonProfilesRegistry => {

                const taxonProfilesStore = useTaxonProfilesStore();
                taxonProfilesStore.loadRegistry(featureStore.taxonProfiles.uuid, taxonProfilesRegistry);

                fetch(featureStore.taxonProfiles.search).then(tps => tps.json()).then(taxonProfilesSearch => {

                    taxonProfilesStore.loadSearchIndex(taxonProfilesSearch);

                    fetch(featureStore.frontend.path).then(fr => fr.json()).then(frontendData => {

                        const lcFrontend = new Frontend(frontendData);
        
                        app.provide('lcFrontend', lcFrontend);

                        // native app style backbutton
                        const modals = useModalsStore();
                        const natureGuideStore = useNatureGuideStore();

                        const navigationStore = useNavigationStore();

                        router.beforeEach((to, from, next) => {

                            let goToNext = true;
                            if (window.event?.type == 'popstate'){

                                if (modals.burgerMenu == true) {
                                    goToNext = false;
                                    modals.closeBurger();
                                }

                                if (modals.largeModal == true) {
                                    goToNext = false;
                                    modals.closeLargeModal();
                                }

                                if (modals.fullScreenModal == true) {
                                    goToNext = false;
                                    modals.closeFullscreenModal();
                                }

                                if (goToNext == true && from.name == 'natureGuideNode' && natureGuideStore.currentView == NatureGuideViewState.evaluation){
                                    natureGuideStore.goToTraits();
                                    goToNext = false;
                                }

                                if (goToNext == false){
                                    // close the burger, push the dropped state, maintain url
                                    window.history.pushState(window.currentState, '', window.history.state.forward);
                                }
                            }

                            if (goToNext == true){
                                next();
                            }

                            if (to.name == 'home'){
                                navigationStore.hideBackButton();
                            }
                            else {
                                navigationStore.showBackbutton();
                            }


                        });

                        router.afterEach((to, from)=>{
                            window.currentState = JSON.parse(JSON.stringify(window.history.state));

                            if (window.event?.type == 'popstate' && from.name == 'taxonProfile'){
                                natureGuideStore.forceEvaluation();
                            }
                        });
        
                        app.use(router);
        
                        i18next.use(HttpApi).init({
                            lng: language,
                            fallbackLng: lcSettings.PRIMARY_LANGUAGE,
                            debug: true,
                            ns: ['plain', 'glossarized'],
                            defaultNS: 'glossarized',
                            fallbackNS: 'plain', // if app has no glossary, glossarized is not present
                            backend: {
                                // load from i18next-gitbook repo
                                loadPath: '/locales/{{lng}}/{{ns}}.json',
                                crossDomain: true,
                            },
        
                        }).then(() => {
        
                            app.use(I18NextVue, { i18next });

                            window.addEventListener('backbutton', function (event) {
                                if (router.currentRoute.value.name == 'home'){
                                    navigator.app.exitApp();
                                }
                            });
        
                            if (featureStore.glossary) {
                                fetch(featureStore.glossary.path).then(gr => gr.json()).then(glossaryData => {
                                    const glossaryStore = useGlossaryStore();
                                    glossaryStore.loadGlossary(glossaryData);
        
                                    app.mount('#app');
                                });
                            }
                            else {
        
                                app.mount('#app');
                            }
        
                        });
        
                    });

                });

            });

        });
    
    });

};

document.addEventListener('deviceready', onDeviceReady, false);