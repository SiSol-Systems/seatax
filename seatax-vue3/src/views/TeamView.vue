<script setup lang="ts">
    import { onMounted, inject, ref } from 'vue';
    import { useRoute } from 'vue-router'
    import TeamCard from '@/components/TeamCard.vue';

    import { useFeatureStore } from '@/stores/features';

    import TemplateContentContainer from '@/components/container/TemplateContentContainer.vue';

    const features = useFeatureStore();
    
    const route = useRoute();

    const props = defineProps({
        slug: String
    });

    const language = inject('language');

    const data = ref();
    const loading = ref(true);

    const teamImage = ref(null);

    const templateContentUrl = features.templateContent.slugs[route.params.slug]['path'];

    onMounted(async() => {
        const response = await fetch(templateContentUrl);
        const templateData = await response.json();
        data.value = templateData;
        if (data.value.contents.teamImage.imageUrl) {
            
            teamImage.value = `url(${data.value.contents.teamImage.imageUrl?.['4x']})`;
        }
        loading.value = false;
    });
</script>

<template>
<div class="topbar-padding w-full">
    <TemplateContentContainer :loading="loading">
        <div class="w-full">
            <div class="team-banner"></div>
            <div class="text-center uppercase my-10 pt-10">
                <h1>{{ data.title }}</h1>
            </div>

            <div v-if="data.contents.teamIntroduction" class="flex justify-center">
                <div class="lg:container lg:px-10">
                    <div class="px-10 text-regular" v-html="data.contents.teamIntroduction"></div>
                </div>
            </div>

            <div class="flex justify-center mt-10 w-full">
                <div class="lg:container md:px-10">
                    <div class="team-cards p-10">
                        <div class="mb-3">
                            <h1>{{ data.contents.group1Title }}</h1>
                        </div>
                        
                        <div class="cards flex flex-wrap flex-row gap-10">

                            <TeamCard v-for="card in data.contents.group1Cards"
                                :person-image="card.profileImage.imageUrl ? card.profileImage.imageUrl?.['2x'] : null"
                                :card="card"
                                :key="card.uuid"
                            /> 

                        </div>



                        <div class="mt-10 mb-3">
                            <h1>{{ data.contents.group2Title }}</h1>
                        </div>
                        <div class="cards flex flex-wrap flex-row gap-10">

                            <TeamCard v-for="card in data.contents.group2Cards"
                                :person-image="card.profileImage.imageUrl ? card.profileImage.imageUrl?.['2x'] : null"
                                :card="card"
                                :key="card.uuid"
                            /> 

                        </div>

                        <div class="mt-10 mb-3">
                            <h1>{{ data.contents.group3Title }}</h1>
                        </div>
                        <div class="cards flex flex-wrap flex-row gap-10">

                            <TeamCard v-for="card in data.contents.group3Cards"
                                :person-image="card.profileImage.imageUrl ? card.profileImage.imageUrl?.['2x'] : null"
                                :card="card"
                                :key="card.uuid"
                            /> 

                        </div>
                    
                    </div>
                </div>
            </div>
            <div class="flex justify-center w-full my-10">
                <div class="lg:container md:px-10">
                    <div class="px-10">
                        <h2>{{ data.contents.acknowledgementsTitle }}</h2>
                        <div class="flex text-justify mt-5 text-regular">
                            <div v-html="data.contents.acknowledgementsText">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TemplateContentContainer>
</div>
</template>

<style scoped>

.team-banner {
    width:100%;
    height: 30vh;
    background-image: v-bind(teamImage);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

.team-cards {
    background: var(--neutral-app-color);
    border-radius: var(--border-radius);
}

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

}

/* 2xl */
@media (min-width: 1536px) {

}

@media (min-width: 576px) {

}
</style>
