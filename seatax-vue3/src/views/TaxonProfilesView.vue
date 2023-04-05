<script setup lang="ts">
    import { ref } from 'vue';
    import { useFeatureStore } from '@/stores/features';
    import { useTaxonProfilesStore } from '@/stores/taxon-profiles';
    import { useTranslation } from 'i18next-vue';
    import AlphabetLetters from '@/components/localcosmos/AlphabetLetters.vue';
    import TaxonLatname from '@/components/localcosmos/TaxonLatname.vue';

    import SearchBar from '@/components/ui/SearchBar.vue';

    const taxonProfiles = useTaxonProfilesStore();
    const features = useFeatureStore();

    const { t } = useTranslation();

    const prefix = 'taxon-profiles-';
    const taxonProfilesName = features.taxonProfiles.name;
    const placeholder = `search ${taxonProfilesName}`;

    const results = ref();
    const hasResults = ref(false);

    function onSearch(searchText:string){
        if (searchText.length > 2){
            results.value = taxonProfiles.searchByLatname(searchText);
            hasResults.value = true;
        }
        else {
            results.value = [];
            hasResults.value = false;
        }
    }
</script>

<template>
    <div class="topbar-padding w-full">
        <div class="text-center mt-10">
            <h1>{{ t(taxonProfilesName, { ns: 'plain' }) }}</h1>
        </div>

        
        <div v-if="features.taxonProfiles.description" class="flex flex-row justify-center">
            <div
                v-html="features.taxonProfiles.description"
                class="container px-10 py-5 text-center"
            >

            </div>
        </div>

        <SearchBar
            @search="onSearch"
            :placeholder="placeholder"
            :has-results="hasResults"
        >
            <template v-slot:searchbar-results>
                <div v-for="result in results" :key="result.nameUuid">
                    <div v-if="!result.isSynonym"  class="flex flex-col">
                        <router-link
                            :to="{ name: 'taxonProfile', params: { taxonSource: result.taxonSource, nameUuid:result.nameUuid }}"
                            class="p-2"
                        >
                            <TaxonLatname :taxon="result" :forceItalic="true" /> {{ result.taxonAuthor }}
                        </router-link>
                    </div>
                </div>
            </template>
        </SearchBar>

        

        <AlphabetLetters :letters="taxonProfiles.letters" :prefix="prefix" />

        <div class="flex flex-row justify-center px-10">
            <div class="xl:container taxa">
                <div v-for="(speciesList, letter) in taxonProfiles.searchIndex.taxonLatname" :key="letter" class="w-full flex flex-col py-5" :id="`taxon-profiles-${letter}`">
                    <div
                        v-for="taxon in speciesList"
                        :key="taxon.nameUuid"
                        class="flex flex-col"
                    >
                        <div v-if="!taxon.isSynonym" class="py-2">
                            <router-link
                                :to="{ name: 'taxonProfile', params: { taxonSource: taxon.taxonSource, nameUuid:taxon.nameUuid }}"
                                class="body-text-heavy"
                            >
                                <TaxonLatname :taxon="taxon" :forceItalic="true" /> <span class="text-light ml-2">{{ taxon.taxonAuthor }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

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
.taxa {
    padding: 0px 300px;
}
}

/* 2xl */
@media (min-width: 1536px) {

}

@media (min-width: 576px) {

}
</style>
