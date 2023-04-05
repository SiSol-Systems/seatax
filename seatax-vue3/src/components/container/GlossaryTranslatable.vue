<script setup lang="ts">
import { ref, computed, onMounted, h, VNode } from 'vue';
import { useTranslation } from 'i18next-vue';
import GlossaryTooltip from '@/components/ui/GlossaryTooltip.vue';

const { t } = useTranslation();
const props = defineProps<{ value: string }>();

const isGlossaryLink = (node: Element): boolean => {
  /* eslint-disable-next-line dot-notation */
  return node?.attributes['action']?.value === 'glossary' && !!node?.attributes['data-term'];
};

const templateContainer = ref<Element>();
const glossarizedHtml = ref<VNode>();
const glossarizedContainer = computed(() => {
  if (glossarizedHtml.value) {
    return glossarizedHtml.value;
  }
  return h('span', 'loading');
});
const translation = computed(() => t(props.value));

onMounted(() => {
  if (templateContainer.value) {
    templateContainer.value.innerHTML = translation.value.trim();
    glossarizedHtml.value = walkDomRecursively(templateContainer.value);
  }
});

const walkDomRecursively = (node: Element): VNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    return h('span', node.textContent);
  } else if (isGlossaryLink(node)) {
    return h(GlossaryTooltip, { term: node?.attributes['data-term']?.value }, () => node?.textContent);
  } else if (node.childNodes.length) {
    const children = [...node.childNodes].map((child: Node) => walkDomRecursively(child));
    return h(node.tagName, children);
  } else {
    return h(node.tagName, { innerHTML: node.innerHTML });
  }
};
</script>

<template>
  <div class="inline">
    <div ref="templateContainer" class="hidden" />
    <glossarizedContainer />
  </div>
</template>
