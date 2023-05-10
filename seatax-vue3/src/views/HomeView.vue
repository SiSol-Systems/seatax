<script setup lang="ts">
    import { onMounted, inject, ref } from 'vue';
    import { useFeatureStore } from '@/stores/features';
    import SquareCard from '@/components/SquareCard.vue';
    import ArticlePreview from '@/components/ArticlePreview.vue';

    import TemplateContentContainer from '@/components/container/TemplateContentContainer.vue';

    const features = useFeatureStore();
    const language = inject('language');
    const device = inject('device');
    const templateContentUrl = features.templateContent.assignments.home[language];

    const lcFrontend = inject('lcFrontend');
    const logo =  lcFrontend.userContent.images.logo.imageUrl?.['2x'];


    const data = ref();
    const loading = ref(true);

    const banner = ref('');
    const projectDescriptionBackground = ref('');

    onMounted(async() => {
        const response = await fetch(templateContentUrl);
        const templateData = await response.json();
        data.value = templateData;

        banner.value = templateData.contents.banner ? templateData.contents.banner.imageUrl['8x'] : '';
        projectDescriptionBackground.value = templateData.contents.projectDescriptionBackground ? templateData.contents.projectDescriptionBackground.imageUrl['4x'] : '';
        loading.value = false;
    });

</script>

<template>
<div class="topbar-padding">
    <TemplateContentContainer :loading="loading">
        <div>
            <div class="hidden md:flex banner" :style="`background-image: url(${banner});`">
            </div>
            <div class="flex justify-center items-center mt-10 hidden md:flex">
                <div class="container py-3">
                    <div class="body-text-heavy text-justify px-10" v-html="data.contents.cardsDescription">
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="container">
                    <div class="cards flex flex-wrap flex-row">

                        <SquareCard v-for="(card, index) in data.contents.cards"
                            :background-image="card.image.imageUrl ? `url(${card.image.imageUrl?.['2x']})` : null"
                            :size="[0,3].includes(index) ? 'small' : 'large'"
                            :card="card"
                            :key="card.uuid"
                        /> 

                    </div>
                </div>
            </div>

            <div
                class="project-long-description flex justify-center items-center text-justify body-text-heavy"
                :style="`background-image: url(${projectDescriptionBackground});`">
                <div class="container p-10" v-html="data.contents.projectDescription">
                </div>
            </div>
            
            <div
                v-if="device.platform && device.platform=='browser'"
                class="app-stores flex justify-center items-center py-10"
            >
                <div class="container">
                    <div class="asapp-title text-center md:text-large">
                        Also available as App
                    </div>
                    <div class="flex flex-row flex-wrap pt-10">
                        <div class="lg:w-3/4 flex pb-5">
                            <div class="px-5">
                                <img class="app-logo" :src="logo" />
                            </div>
                            <div class="w-3/4 pl-5">
                                <div class="app-title">
                                    <div v-html="data.contents.appShortName"></div>
                                    <div v-html="data.contents.appFullName" class="app-full-name"></div>
                                </div>
                                <div class=" app-subtitle capitalize pt-3" v-html="data.contents.appSubtitle">
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-1/4 flex badges justify-around lg:items-end lg:justify-end">
                            <div class="p-5">
                                <img src="@/assets/images/vendors/apple-appstore-badge.svg" />
                            </div>
                            <div class="p-5">
                                <img src="@/assets/images/vendors/google-play-badge.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="articles md:mt-10 flex justify-center items-center">
                <div class="small-container">

                    <ArticlePreview v-for="article in data.contents.articles"
                        :key="article.uuid"
                        :article="article"
                    />
                </div>
            </div>
        </div>
    </TemplateContentContainer>
</div>
</template>

<style scoped>
.banner {
    width: 100%;
    height: 63vw;
    background-repeat: no-repeat;
    background-size: cover;
}

.cards {
    justify-content: space-evenly;
    align-items: center;
    padding: 5rem 1rem;
}

.app-stores {
    background-color: var(--secondary-app-color);
    color: var(--white);
}

.badges {
    width: 100%;

}

.badges img {
    height: 3rem;
    width: auto;
}

.project-long-description {
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0rem 0rem;
}

.project-long-description > div {
    background: #FFFFFFC9;
    color: var(--secondary-app-color);
}


.app-logo {
    width: 8rem;
    height: auto;
}

.asapp-title {
    font-size: var(--text-size-larger);
}

.app-title {
    font-size: var(--text-size-larger);
}

.app-full-name {
    font-size: var(--text-size-regular);
}

@media (min-width: 640px) {

}
/* md */
@media (min-width: 768px) {
    .project-long-description {
        padding: 5rem 0rem;
    }

    .project-long-description > div {
        border-radius: var(--border-radius);
    }

    .app-subtitle {
        font-size: var(--text-size-medium);
    }

    .app-full-name {
        font-size: var(--text-size-medium);
    }

    .badges img {
        height: 4rem;
    }
}

/* lg */
@media (min-width: 1024px) { 
    .asapp-title {
        font-size: var(--text-size-large);
    }

    .app-title {
        font-size: var(--text-size-large);
    }
}

/* xl */
@media (min-width: 1280px) {

}

/* 2xl */
@media (min-width: 1536px) {
    .article-preview > div:first-child {
        width: 15%;
    }
}

</style>
