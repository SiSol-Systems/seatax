import type { Features, Feature, ListFeature, GlossaryFeature, TemplateContentFeature } from '@/types/localcosmos/src/Features';


export class LocalCosmosFeatures {

    frontend: Feature
    backboneTaxonomy: Feature
    taxonProfiles: Feature
  
    natureGuides: ListFeature | null
    genericForms: ListFeature | null
    glossary: GlossaryFeature | null
    templateContent: TemplateContentFeature | null
  
    currentNatureGuide : /*NatureGuide |*/ null

    constructor(data: Features) {

        this.frontend = data.Frontend;
        this.backboneTaxonomy = data.BackboneTaxonomy;
        this.taxonProfiles = data.TaxonProfiles;
    
        this.natureGuides = data.NatureGuide || null;
        this.genericForms = data.GenericForm || null;
        this.glossary = data.Glossary || null;
        this.templateContent = data.TemplateContent || null;
    
        this.currentNatureGuide = null;
    
      }

}