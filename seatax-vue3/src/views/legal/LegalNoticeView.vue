<script setup lang="ts">
    import { inject } from 'vue';

    const frontend = inject('lcFrontend');
</script>

<template>
    <div class="topbar-padding template-content">
        <div class="text-center mt-10">
            <h1>Legal Notice</h1>
        </div>

        <div class="flex justify-center">
            <div class="flex justify-center items-center p-10 lg:container">
                <div class="lg:w-1/2" v-html="frontend.userContent.texts.legalNotice">
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

}

/* 2xl */
@media (min-width: 1536px) {

}

@media (min-width: 576px) {

}
</style>
