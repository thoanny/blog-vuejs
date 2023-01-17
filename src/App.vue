<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/categorie/slug-1">Catégorie</RouterLink>
      <RouterLink to="/mot-cle/tag-1">Mot-clé</RouterLink>
      <RouterLink to="/post-1">Post</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
