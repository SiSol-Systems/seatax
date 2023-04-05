<script setup lang="ts">
    import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

    const props = defineProps({
        loading: Boolean
    });
</script>

<template>
    <div v-if="loading" class="h-full">
        <LoadingSpinner />
    </div>
    <div v-else>
        <slot />
    </div>
</template>

<style scoped>
</style>

