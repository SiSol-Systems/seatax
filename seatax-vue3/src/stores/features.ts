import { defineStore } from 'pinia';
import type { 
  Feature,
  Features,
  NatureGuideFeature,
  TemplateContentFeature,
  GlossaryFeature,
  TaxonProfilesFeature,
} from '@/types/localcosmos/src/Features';

interface State {
  frontend: Feature | null,
  backboneTaxonomy: Feature | null
  taxonProfiles: TaxonProfilesFeature | null
  natureGuides: NatureGuideFeature[]
  glossary: GlossaryFeature | null
  templateContent: TemplateContentFeature | null
  genericForms: Feature[]
}

export const useFeatureStore = defineStore('features', {
  state: (): State => ({
    frontend: null,
    backboneTaxonomy: null,
    taxonProfiles: null,
    natureGuides: [],
    glossary: null,
    genericForms: [],
    templateContent: null,
  }),
  actions: {
    loadFeatures (data: Features) {

      this.frontend = data.Frontend;
      this.backboneTaxonomy = data.BackboneTaxonomy;
      this.taxonProfiles = data.TaxonProfiles;
      
      if (data.NatureGuide) {
        this.natureGuides = data.NatureGuide.list as NatureGuideFeature[];
      }
      if (data.Glossary) {
        this.glossary = data.Glossary;
      }
      if (data.GenericForm) {
        this.genericForms = data.GenericForm.list;
      }

      if (data.TemplateContent) {
        this.templateContent = data.TemplateContent;
      }
    },
  },
});