<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex items-center gap-2">
      <RouterLink :to="{ name: 'home' }">ð Blog</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'projets' } }">ð ï¸ Projets</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'trucs-et-astuces' } }">ð¡ Astuces</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'jeux-video' } }">ð® Jeux vidÃ©o</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'streaming' } }">ð£ Streaming</RouterLink>
      <a class="btn bg-white border-white text-black hover:text-white rounded-full" href="https://ko-fi.com/thoanny"
        target="_blank" rel="noreferrer">â Me soutenir</a>
    </nav>
  </header>

  <div class="container mx-auto max-w-5xl">
    <RouterView />
  </div>

</template>

<style scoped>

</style>
