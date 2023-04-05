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
                <div v-html="data.contents.text" class="template-content">
                </div>
            </div>
        </TemplateContentContainer>
    </div>
</template>

<style scoped>

</style>
