<script setup lang="ts">
    import { onMounted, inject, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFeatureStore } from '@/stores/features';
    import DownloadablePDF from '@/components/DownloadablePDF.vue';

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
                    <h1>Download</h1>
                </div>
                <div v-for="pdf in data.contents.pdfs">
                    <DownloadablePDF :pdf="pdf" />
                </div>
            </div>
        </TemplateContentContainer>
    </div>
</template>

<style scoped>
@media (min-width: 640px) {

}

/* md */
@media (min-width: 768px) {}

/* lg */
@media (min-width: 1024px) {}

/* xl */
@media (min-width: 1280px) {}

/* 2xl */
@media (min-width: 1536px) {}

@media (min-width: 576px) {}
</style>
