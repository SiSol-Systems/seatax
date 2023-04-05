import { defineStore } from 'pinia';
import { useFeatureStore } from '@/stores/features'

import { inject } from "vue";

interface State {
  navigations: object
  loaded: boolean
  language: string
}

export const useNavigationStore = defineStore('navigation', {
  state: (): State => ({
    navigations: {},
    loaded: false,
    language: ''
  }),
  actions: {
    async loadNavigations () {
      const language:string = inject('language');
      const settings:any = inject('lcSettings');

      if (this.loaded == true && this.language == language){
        return ''
      }

      const features = useFeatureStore();
      
      for (const navigation_type in settings.templateContent.navigations) {

        this.navigations[navigation_type] = [];

        if (navigation_type in features.templateContent.navigations && language in features.templateContent.navigations[navigation_type]) {
          
          const paths = features.templateContent.navigations[navigation_type];
          
          if (language in paths){
            const path = paths[language];
            const response = await fetch(path);
            const navigation = await response.json();
            this.navigations[navigation_type] = navigation;
          }
        }

      }

      this.loaded = true;
      this.language = language;
      
    },
  },
});