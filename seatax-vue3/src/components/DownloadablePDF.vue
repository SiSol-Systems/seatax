<script setup lang="ts">

    const props = defineProps({
        pdf: Object,
    });
</script>

<template>
    <div
        class="flex flex-row flex-wrap justify-center items-center"
        :class="pdf?.link ? '' : 'inactive'"
    >
        <div v-if="pdf?.link" class="px-5 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
            <a :href="pdf?.link" target="_blank">
                <img v-if="pdf.image.imageUrl" :src="pdf.image.imageUrl?.['2x']" class="img-fluid" />
                <span v-else>&nbsp;</span>
            </a>
        </div>
        <div v-else class="px-5 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
            <img v-if="pdf?.image.imageUrl" :src="pdf?.image.imageUrl?.['2x']" class="img-fluid" />
            <span v-else>&nbsp;</span>
        </div>
        <div class="w-1/1 sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-4/5 2xl:w-5/6 flex flex-col">
            <div>
                <a v-if="pdf?.link" :href="pdf.link" target="_blank">
                    <h3>{{ pdf.title }}</h3>
                </a>
                <h3 v-else>
                    {{ pdf?.title }}
                </h3>
            </div>
            <div v-if="pdf?.description" v-html="pdf.description">
            </div>
        </div>
    </div>
</template>

<style scoped>
.inactive {
    opacity: 33%;
}

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
