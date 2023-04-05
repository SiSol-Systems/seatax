<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { useTranslation } from 'i18next-vue';

const props = defineProps({
    translationKey: String,
});

const glossaryBubble = inject('glossaryBubble');

const { t } = useTranslation();
const glossarizedText = t(props.translationKey);
const glossaryText = ref();

function showBubble(event) {
    const oldValue = glossaryBubble.value;

    const termB64 = event.currentTarget.getAttribute('data-term');
    
    if (oldValue && oldValue.termB64 == termB64 && event.detail){
        hideBubble(event);
    }
    else {
        const clientRect = event.currentTarget.getBoundingClientRect();
        const x = clientRect.left;
        const y = clientRect.top;

        glossaryBubble.value = { 
            'termB64': termB64,
            'x': x,
            'y': y,
        };
    }
}

function hideBubble(event) {
    glossaryBubble.value = null;
}

onMounted(() => {
    let glossaryLinks = glossaryText.value.querySelectorAll('.glossary_link');
    glossaryLinks.forEach(glossaryLink => {
        glossaryLink.addEventListener('mouseover', showBubble);
        glossaryLink.addEventListener('mouseout', hideBubble);

        glossaryLink.addEventListener('tap', function(event){
            showBubble(event);
            event.currentTarget.addEventListener('click', function(event){
                event.preventDefault();
                event.stopPropagation();
            }, {'once':true});
            window.addEventListener('pointermove', hideBubble, {'once': true});
        });
        
    });
});

</script>

<template>
    <span v-html="glossarizedText" ref="glossaryText"></span>
</template>
