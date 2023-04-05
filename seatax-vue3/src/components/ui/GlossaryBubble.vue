<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';
import { useGlossaryStore } from '@/stores/glossary';
import { useTranslation } from 'i18next-vue';

const { t } = useTranslation();

const glossary = useGlossaryStore();

const props = defineProps({
    termB64: String,
    x: Number,
    y: Number
});

const bubble = ref(null);
const definition = ref('');
const term = ref('');

function positionBubble() {
  if (bubble.value){
    const leftX = props.x;
    if (leftX + 250 > screen.width){
      bubble.value.style.right = '10px';
    }
    else {
      bubble.value.style.left = props.x + 'px';
    }
    bubble.value.style.top = props.y - bubble.value.clientHeight - 20 + 'px';
  }
}

function loadGlossaryEntry(){
  const termDefinition = glossary.definition(props.termB64);
  definition.value = t(termDefinition, {ns: 'plain'});
  term.value = window.atob(props.termB64);
}

onMounted(()=> {
  loadGlossaryEntry();
  positionBubble();
});
onUpdated(()=> {
  loadGlossaryEntry();
  positionBubble();
});

</script>

<template>
    <div
      id="glossary-bubble"
      class="glossary-bubble p-5 box-shadow text-sm"
      ref="bubble"
    >
      <div><b>{{ term }}</b></div>
      {{ definition }}
    </div>
</template>

<style scoped>
#glossary-bubble {
    position: fixed;
    width: 250px;
    background: var(--white);
    z-index:11;
}
</style>
  