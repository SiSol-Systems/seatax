import { defineStore } from 'pinia';
import type { GlossaryDefinition } from '@/types/localcosmos/src/features/Glossary';
import { inject } from "vue";
import { useFeatureStore } from '@/stores/features'

interface State {
    glossary: { [key: string]: GlossaryDefinition }
    usedTermsGlossary : {
      [letter: string] : {
        [term: string] : any
      }
    }
    usedTermsLetters: string[]
    loaded: boolean
    loadedUsedTerms: boolean
}

export const useGlossaryStore = defineStore('glossary', {
  state: (): State => ({
    glossary: {},
    usedTermsGlossary: {},
    usedTermsLetters: [],
    loaded: false,
    loadedUsedTerms: false,
  }),
  actions: {
    loadGlossary (data) {
      this.glossary = data.glossary;
      this.loaded = true;
      
    },
    async loadUsedTerms (languageCode){
      if (this.loadedUsedTerms){
        return '';
      }

      this.usedTermsLetters = [];

      const features = useFeatureStore();
      const lcSettings:any = inject('lcSettings');

      if (!languageCode){
        languageCode = lcSettings.PRIMARY_LANGUAGE;
      }

      languageCode = languageCode.substring(0,2).toLowerCase();

      if (!(languageCode in features.glossary.localized)){
        languageCode = lcSettings.PRIMARY_LANGUAGE;
      }

      const path = features.glossary.localized[languageCode].usedTerms;
      const response = await fetch(path);
      const data = await response.json();
      this.usedTermsGlossary = data;

      for (const letter in data){
        this.usedTermsLetters.push(letter);
      }

      this.loadedUsedTerms = true;
    },
    definition (key: string): string {
      if (!this.loaded) {
        return '';
      }

      const term = window.atob(key);
      if (this.glossary[term]) {
        return this.glossary[term].definition;
      }

      return '';
    },
    synonyms (key: string): string[] {
      if (!this.loaded) {
        return [];
      }

      const term = window.atob(key);
      if (this.glossary[term]) {
        return this.glossary[term].synonyms;
      }

      return [];
    },
    searchUsedTerm (searchText: string) {
      if (searchText.length > 2) {
        const startLetter = searchText[0].toUpperCase();

        if (startLetter in this.usedTermsGlossary){
          const terms = this.usedTermsGlossary[startLetter];

          const matches = (term) => term.toLowerCase().indexOf(searchText.toLowerCase()) == 0;

          return Object.keys(terms).filter(matches);

        }
        
      }
      
      return [];
    },
    
  },
});
