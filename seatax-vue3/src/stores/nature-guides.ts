import { defineStore } from 'pinia';
import { NatureGuide, IdentificationKey } from '@/types/localcosmos/src/features/NatureGuide';
import { useFeatureStore } from '@/stores/features';

export enum NatureGuideViewState {
  traits = 'matrixScreen',
  evaluation = 'itemsScreen',
  none = 'none',
}

interface State {
  natureGuide: NatureGuide | null
  currentNode: IdentificationKey | null
  currentNodeUuid: string
  currentView: NatureGuideViewState
  startWithEvaluation: Boolean
}

export const useNatureGuideStore = defineStore('natureGuide', {
  state: (): State => ({
    natureGuide: null,
    currentNode: null,
    currentNodeUuid: '',
    currentView: NatureGuideViewState.traits,
    startWithEvaluation: false,
  }),
  getters: {
    currentNodeIsRootNode: state => state.currentNodeUuid === state.natureGuide?.startNodeUuid,
  },
  actions: {
    async loadNatureGuide (slug: string) {
      if (this.natureGuide?.slug === slug) {
        return;
      }

      const featureStore = useFeatureStore();

      const natureGuideUUID = featureStore.natureGuides.find(natureGuide => natureGuide.slug === slug)?.uuid;
      const response = await fetch(`/localcosmos/features/NatureGuide/${natureGuideUUID}/${natureGuideUUID}.json`);
      const data = await response.json();
      //this.natureGuide = new NatureGuide(toRaw(data));
      this.natureGuide = new NatureGuide(data);
      this.loadNode(this.natureGuide.startNodeUuid);
    },

    loadNode (nodeUuid: string) {
      if (!this.natureGuide) {
        throw new Error('No nature guide loaded');
      }

      this.currentNodeUuid = nodeUuid;
      this.currentNode = this.natureGuide.getIdentificationKey(nodeUuid);

      if (this.startWithEvaluation == true) {
        this.startWithEvaluation = false;
      }
      else {
        this.currentView = NatureGuideViewState.traits;
      }
    },

    loadNodeBySlug (slug: string) {
      if (!this.natureGuide) {
        throw new Error('No nature guide loaded');
      }

      const nodeUuid = this.natureGuide.slugs[slug];
      this.loadNode(nodeUuid);
    },

    goToEvaluation() {
      this.currentView = NatureGuideViewState.evaluation;
    },

    goToTraits() {
      this.currentView = NatureGuideViewState.traits;
    },
    forceEvaluation(){
      this.startWithEvaluation = true;
    },
  },
});