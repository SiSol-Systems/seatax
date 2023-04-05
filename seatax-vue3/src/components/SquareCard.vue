<script setup lang="ts">

  import { ref } from 'vue';

  const props = defineProps({
    card: Object,
    size: String,
    backgroundImage: String
  });


</script>

<template>
    
    <div class="square-card" :class=size>
      <router-link :to="card.link">
        <div class="text">
          <div class="text-center">
            {{ card.text }}
          </div>
        </div>
      </router-link>
    </div>
    
</template>

<style scoped>

.square-card {
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  border-radius: .5rem;
  width: 40%;
  aspect-ratio: 1/1;
  background-image: v-bind(props.backgroundImage); /*v-bind("props.card.imageUrl?.['2x']");*/
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0rem 0rem 2rem 0rem;
}

.square-card > a {
  width:100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.square-card.small {
  aspect-ratio: 1/1;
}

.square-card .text {
  font-size: 1.1rem;
  font-weight: bold;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: var(--secondary-app-color);
  line-height: 1.1rem;
}

@media (min-width: 640px) {
  .square-card .text {
    align-items: center;
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
}
/* md */
@media (min-width: 768px) {

}

/* lg */
@media (min-width: 1024px) {
  
  .square-card { 
    width: 20%;
  }
  .square-card.small {
    width: 15%;
  }

  .square-card .text {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
}

/* xl */
@media (min-width: 1280px) {
  .square-card .text {
    font-size: 1.8rem;
    line-height: 2.1rem;
  }
}

/* 2xl */
@media (min-width: 1536px) {

}

@media (min-width: 576px) {

}

</style>
