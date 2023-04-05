<script setup lang="ts">

    const props = defineProps({
        placeholder: String,
        hasResults: Boolean
    });

    import { useTranslation } from 'i18next-vue';
    const { t } = useTranslation();

</script>

<template>
<div class="searchbar flex flex-row justify-center items-center">
    <div class="searchbox flex flex-row items-center justify-start rounded-xl px-5 relative">
        <div class="py-3 pr-3">
            <span class="material-icons-round md-36">search</span>
        </div>
        <div class="relative">
            <input
                type="text"
                :placeholder="placeholder"
                class="py-3 sourceSearch"
                @input="$emit('search', $event.target.value)"
            />
        </div>
        <div class="search-results p-5 rounded-xl" :class="{ hidden: !hasResults}">
            <slot name="searchbar-results"></slot>
        </div>
    </div>
</div>

</template>

<style scoped>
.searchbar {
    height: var(--searchbar-height);
    position: sticky;
    top: var(--topbar-height);
    background-color: #FFF;
    z-index: 8;
}

.searchbar input {
    background-color:  var(--neutral-app-color);   
}

.searchbox {
    background-color:  var(--neutral-app-color);
}

.sourceSearch:focus {
    outline: none;
}

.search-results {
    position: absolute;
    background: #FFF;
    top: 100%;
    left: 0;
    box-shadow: var(--box-shadow);
    z-index: 8;
    width: 100%;
}

@media (min-width: 640px) {
    .search-results {
        width: 450px;
    }
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
