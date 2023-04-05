<script setup lang="ts">
defineProps({
    article: Object,
});
</script>

<template>
    <div class="article-preview flex flex-row flex-wrap p-8 justify-center">
        <div>
            <router-link :to="article?.article.url">
                <img v-if="article?.image.imageUrl" :src="article.image.imageUrl?.['2x']" />
            </router-link>
        </div>
        <div class="flex flex-col items-start justify-center mt-10 md:mt-0 md:pl-10">
            <div class="main-nav-heading mb-5">
                {{ article?.article.title }}
            </div>
            <div class="body-text-regular text-justify">
                {{ article?.abstract }}
            </div>
            <div class="mt-3 text-regular">
                <router-link :to="article.article.url">
                    Read more
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

.article-preview {
    margin: 0rem 0rem 2rem 0rem;
}

.article-preview > div:first-child {
    width: 60%;
    flex-grow: 0;
}

.article-preview img, .article-preview > div:first-child {
    border-radius: var(--border-radius);
}

.article-preview > div:last-child {
    flex-grow: 1;
    width: 100%;
}

.article-preview img {
    box-shadow: var(--box-shadow);
    aspect-ratio: 1/1;
    width:100%;
}

@media (min-width: 640px) {
    .article-preview > div:first-child {
        width: 50%;
    }
}
/* md */
@media (min-width: 768px) {
    .article-preview > div:first-child {
        width: 30%;
    }
    .article-preview > div:last-child {
        width: 70%;
    }
}

/* lg */
@media (min-width: 1024px) { 
    .article-preview > div:first-child {
        width: 30%;
    }
    .article-preview > div:last-child {
        width: 70%;
    }
}

/* xl */
@media (min-width: 1280px) {
    .article-preview > div:first-child {
        width: 25%;
    }
    .article-preview > div:last-child {
        width: 75%;
    }
}

/* 2xl */
@media (min-width: 1536px) {
    .article-preview > div:first-child {
        width: 25%;
    }
    .article-preview > div:last-child {
        width: 75%;
    }
}

</style>
