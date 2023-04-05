<script setup lang="ts">
import { onMounted, inject, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFeatureStore } from '@/stores/features';

    import TemplateContentContainer from '@/components/container/TemplateContentContainer.vue';

    const features = useFeatureStore();

    const data = ref();
    const loading = ref(true);

    const route = useRoute();
    const { slug } = route.params;

    const url = features.templateContent.slugs[slug].path;

    onMounted(async() => {
        const response = await fetch(url);
        const templateData = await response.json();
        data.value = templateData;
        loading.value = false;
    });
</script>

<template>
    <div class="topbar-padding">
        <TemplateContentContainer :loading="loading">
            <div class="flex flex-col gap-10 p-10 md:container mt-5">
                <div class="text-center">
                    <h1>{{ data.title }}</h1>
                </div>
                <div>
                    <div v-for="block in data.contents.block" class="flex flex-row flex-wrap items-center mb-10">
                        <div v-if="block.title" class="w-full">
                            <h2>{{ block.title }}</h2>
                        </div>
                        <div class="text-center w-full lg:w-3/4">
                            <img class="image-fluid" :src="block.image.imageUrl['4x']" />
                        </div>
                        <div v-html="block.text" class="w-full lg:w-1/4 p-5">
                        </div>
                    </div>
                </div>
            </div>
        </TemplateContentContainer>
    </div>
</template>

<style scoped>
.image-fluid {
    max-width: 100%;
    height: auto;
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
