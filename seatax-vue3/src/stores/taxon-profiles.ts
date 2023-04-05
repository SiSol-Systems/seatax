import { defineStore } from 'pinia';
import type { TaxonReference } from '@/types/localcosmos/src/features/TaxonProfile';

interface State {
  id: string
  registry: { [id: string]: any }
  taxonProfilesUuid: string
  searchIndex: {
    [nameType: string]: {
      [startLetter: string]: any
    }
  },
  letters: string[],
}

const FORBIDDEN_NUIDS = [
  '00w', '006', '007',
];

export const useTaxonProfilesStore = defineStore('taxon-profiles', {
  state: (): State => ({
    id: '',
    registry: {},
    taxonProfilesUuid: '',
    searchIndex: {},
    letters: [],
  }),
  getters: {
    getSuggestedProfiles(state): (species: TaxonReference | null, limit?: number) => TaxonReference[] {
      return (species: TaxonReference | null, limit = 2) => {
        let nuid = species?.taxonNuid.slice(0, -3);
        const picks: TaxonReference[] = [];
        while (picks.length < limit && nuid && nuid.length > 0) {
          const candidate = Object.values(state.registry).find(p => p.taxonNuid.startsWith(nuid) && !picks.includes(p) && p.nameUuid !== species?.nameUuid);
          if (candidate) {
            picks.push(candidate);
          }

          nuid = nuid.slice(0, -3);
        }

        return picks;
      };
    },
  },
  actions: {
    loadRegistry(taxonProfilesUuid: string, data) {

      this.taxonProfilesUuid = taxonProfilesUuid;

      for (const [nameUuid, taxon] of Object.entries(data)){

        const startNuid = (taxon as any).taxonNuid.substring(0,3);

        if (FORBIDDEN_NUIDS.indexOf(startNuid) == 0){
          continue;
        }
        
        this.registry[nameUuid] = taxon;
        
      }
      
      
    },
    loadSearchIndex(data) {
      //this.searchIndex = data;

      this.searchIndex = {
        'taxonLatname' : {},
      };

      for (const letter in data.taxonLatname) {
        const matches = (taxon) => taxon.isSynonym == false && FORBIDDEN_NUIDS.indexOf(taxon.taxonNuid.substring(0,3)) === -1;
        const taxa = data.taxonLatname[letter];
        const filteredTaxa = taxa.filter(matches);

        if (filteredTaxa.length) {
          this.letters.push(letter);
          this.searchIndex.taxonLatname[letter] = filteredTaxa;
        }
      }

    },
    searchByLatname(searchText: string) {

      if (searchText.length > 2) {

        const startLetter = searchText[0].toUpperCase();

        if (startLetter in this.searchIndex.taxonLatname){
          const taxa = this.searchIndex.taxonLatname[startLetter];
          const matches = (taxon) => taxon.taxonLatname.toUpperCase().indexOf(searchText.toUpperCase()) == 0;

          return taxa.filter(matches);
        }
        
      }
      
      return [];

    },
    async loadTaxon(taxonSource: string, nameUuid: string) {
      const url = `/localcosmos/features/TaxonProfiles/${this.taxonProfilesUuid}/${taxonSource}/${nameUuid}.json`;
      const response = await fetch(url);
      const taxonProfile = response.json();
      return taxonProfile;
    },
  },
});
