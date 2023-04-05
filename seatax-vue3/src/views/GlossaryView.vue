<script setup lang="ts">
    import { ref } from 'vue';
    import { useFeatureStore } from '@/stores/features';
    import { useGlossaryStore } from '@/stores/glossary';
    import { useTranslation } from 'i18next-vue';
    import AlphabetLetters from '@/components/localcosmos/AlphabetLetters.vue';

    import SearchBar from '@/components/ui/SearchBar.vue';

    const glossary = useGlossaryStore();
    await glossary.loadUsedTerms(navigator.language);
    const features = useFeatureStore();

    const { t } = useTranslation();

    const prefix = 'glossary-';
    const termIdPrefix = 'id-term-';
    const glossaryName = features.glossary?.name || '';
    const placeholder = `search ${glossaryName}`;

    const results = ref();
    const hasResults = ref(false);

    function onSearch(searchText:string){
        if (searchText.length > 2){
            results.value = glossary.searchUsedTerm(searchText);
            hasResults.value = true;
        }
        else {
            results.value = [];
            hasResults.value = false;
        }
    }

    function jumpToTerm(event) {
        const id = `${termIdPrefix}${event.currentTarget.textContent}`;
        const element = document.getElementById(id);

        if (element){
        
            const headerOffset = 250;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = Math.round(elementPosition + window.pageYOffset - headerOffset);

            let behavior = 'smooth';
            if(navigator.userAgent.match(/Android/i) ){
                behavior = 'auto';
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: behavior,
            });

            hasResults.value = false;
        }
    }
</script>

<template>
    <div class="topbar-padding w-full">
        <div class="text-center mt-10">
            <h1>{{ t(glossaryName) }}</h1>
        </div>

        <div v-if="features.glossary.description" class="flex flex-row justify-center">
            <div
                v-html="features.glossary.description"
                class="container px-10 py-5 text-justify"
            >

            </div>
        </div>

        <SearchBar
            @search="onSearch"
            :placeholder="placeholder"
            :has-results="hasResults"
        >
            <template v-slot:searchbar-results>
                <div v-for="result in results" class="flex flex-col">
                    <div
                        class="p-2 pointer"
                        @click="jumpToTerm"
                    >
                        {{ result }}
                    </div>
                </div>
            </template>
        </SearchBar>

        
        
        <AlphabetLetters :letters="glossary.usedTermsLetters" :prefix="prefix" />
        
        <div class="flex flex-row justify-center px-10">
            <div class="xl:container taxa">
                <div v-for="(terms, letter) in glossary.usedTermsGlossary" :key="letter" class="w-full flex flex-col py-5" :id="`glossary-${letter}`">
                    <div v-for="(definition, term) in terms" class="flex flex-col">
                        <div :id="`${termIdPrefix}${term}`" class="glossary-entry flex flex-row flex-wrap py-3">
                            <div class="glossary-term body-text-heavy pr-10">
                                {{ term }}
                            </div>
                            <div class="term-definition text-regular">
                                {{ definition.definition }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.glossary-term, .term-definition {
    width: 100%;
}

@media (min-width: 640px) {

}
/* md */
@media (min-width: 768px) {

}

/* lg */
@media (min-width: 1024px) {
  .glossary-term {
    width: 25%;
  }

  .term-definition {
    width: 75%;
  }
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
