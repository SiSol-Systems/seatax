<script setup lang="ts">
import { Ref } from 'vue';
import { Directions, Pan, PointerListener } from 'contactjs';

const emit = defineEmits(['pan-left', 'pan-right']);
const props = defineProps({
  containerClasses: { type: String, default: '' },
});

const panContainer = ref<HTMLElement>();
const panActive = ref(false);
const startX = ref(0);
const deltaX = ref(0);
const translation = computed(() => `translate3d(${startX.value + deltaX.value}px, 0, 0)`);
const computedContainerClasses = computed(() => [props.containerClasses, { 'transition-transform': !panActive.value }]);

const onPan = function (event) {
  if (panActive.value) {
    deltaX.value = event.detail.global.deltaX;
  }
};

const onPanStart = function (event) {
  if (Directions.Horizontal.includes(event.detail.live.direction) && screen.width < 768) {
    panActive.value = true;
  }
};

const onPanEnd = function (event) {
  if (panActive.value) {
    if (event.detail.recognizer.isSwipe) {
      if (event.detail.live.direction === 'left') {
        startX.value = -screen.width;
        emit('pan-left');
      } else {
        startX.value = 0;
        emit('pan-right');
      }
    }

    deltaX.value = 0;
    panActive.value = false;
  }
};

const pointerListener: Ref<PointerListener | undefined> = ref();

const tabShowing = computed(() => {
  return startX.value / screen.width * -1;
});
const toggleTab = (index: number) => {
  startX.value = index * screen.width * -1;
};

onMounted(() => {
  if (panContainer.value) {
    const panRecognizer = new Pan(panContainer.value, {
      supportedDirections: Directions.Horizontal,
    });

    pointerListener.value = new PointerListener(panContainer.value, {
      supportedGestures: [panRecognizer],
    });

    panContainer.value.addEventListener('panleft', onPan);
    panContainer.value.addEventListener('panright', onPan);
    panContainer.value.addEventListener('panstart', onPanStart);
    panContainer.value.addEventListener('panend', onPanEnd);
  }
});

onUnmounted(() => {
  if (panContainer.value) {
    pointerListener.value?.destroy();
    panContainer.value.removeEventListener('panleft', onPan);
    panContainer.value.removeEventListener('panright', onPan);
    panContainer.value.removeEventListener('panstart', onPanStart);
    panContainer.value.removeEventListener('panend', onPanEnd);
  }
});
</script>

<template>
  <div>
    <div ref="panContainer" class="h-full overflow-hidden grid grid-cols-2 w-[200vw] touch-pan-y" :class="computedContainerClasses" :style="{ transform: translation }">
      <slot />
    </div>
    <slot name="controls" :tab-showing="tabShowing" :toggle-tab="toggleTab" />
  </div>
</template>
