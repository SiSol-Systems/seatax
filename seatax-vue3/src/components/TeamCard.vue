<script setup lang="ts">

  const props = defineProps({
    card: Object,
    personImage: String
  });

  const avatarUrl = '/images/avatar.jpg';


</script>

<template>
    
    <div class="team-card flex flex-col">

        <div class="person-image-container">
          <img v-if="personImage" :src="personImage" />
          <img v-else :src="avatarUrl" />
        </div>
      
        <div class="text">
          <div class="person-name text-center">
            {{ card.name }}
          </div>
          <div class="person-institution text-center mb-2">
            <span v-if="card.institution">{{ card.institution }}</span>
          </div>
          <div class="person-description text-center">
            {{ card.personDescription }}
          </div>
        </div>

    </div>
    
</template>

<style scoped>

.team-card {
  width: 43%;
}

.person-name {
  color: var(--link-color);
  font-size: var(--text-size-medium);
  font-family: "Exo2", sans-serif;
}

.person-description, .person-institution {
  color: var(--black);
  font-size: var(--text-size-regular);
  font-family: "RobotoCondensed", sans-serif;
}

@media (min-width: 640px) {

}
/* md */
@media (min-width: 768px) {

}

/* lg */
@media (min-width: 1024px) {
  .team-card {
    width: 29%;
  }
}

/* xl */
@media (min-width: 1280px) {
  .team-card {
    width: 23%;
  }
}

/* 2xl */
@media (min-width: 1536px) {

}

@media (min-width: 576px) {

}

</style>
