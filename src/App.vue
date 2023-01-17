<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex items-center gap-2">
      <RouterLink :to="{ name: 'home' }">📃 Blog</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'projets' } }">🛠️ Projets</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'trucs-et-astuces' } }">💡 Astuces</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'jeux-video' } }">🎮 Jeux vidéo</RouterLink>
      <RouterLink :to="{ name: 'category', params: { slug: 'streaming' } }">🟣 Streaming</RouterLink>
      <a class="btn bg-white border-white text-black hover:text-white rounded-full" href="https://ko-fi.com/thoanny"
        target="_blank" rel="noreferrer">☕ Me soutenir</a>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
