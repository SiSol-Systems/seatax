<script setup lang="ts">

interface Props {
  letters: string[],
  prefix: string
}

const props = defineProps<Props>();

function jumpToLetter(event){
  const letter = event.currentTarget.getAttribute("data-letter");
  const id = `${props.prefix}${letter}`;
  
  const element: HTMLElement = document.getElementById(id);

  if (element){
  
    const headerOffset = 250;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
  }
}

</script>

<template>
<div class="alphabet-letters flex flex-row justify-center w-full p-3">
  <div class="flex flex-row">
    <div
      v-for="letter in letters"
      :key="letter"
      class="px-5 text-medium pointer text-center"
      :data-letter="letter"
      @click="jumpToLetter"
    >
        {{ letter }}
    </div>
  </div>
</div>
</template>

<style scoped>
.alphabet-letters {
  background: var(--secondary-app-color);
  color: #FFF;
  font-weight: bold;
  font-family: "Roboto";
  position: sticky;
  top: calc(var(--topbar-height) + var(--searchbar-height));
  z-index: 7;

}

.alphabet-letters > div {
  overflow-x: scroll;
  scrollbar-width: none;
}

.alphabet-letters > div::-webkit-scrollbar {
    display: none;
}
</style>