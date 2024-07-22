<script setup>
import {RouterLink} from 'vue-router';
</script>

<template>
  <nav class="bg-white p-4 shadow-md fixed top-0 left-0 right-0">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink class="text-2xl font-bold text-black" to="/">
        Post-it
      </RouterLink>
      <div>
        <RouterLink class="text-blue-600 px-4 py-2 rounded-md mr-2 bg-gray-100 hover:bg-gray-200" to="/">
          Voir la liste
        </RouterLink>
        <RouterLink class="bg-gray-100 text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200" to="/create">
          Créer
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
