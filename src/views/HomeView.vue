<script lang="ts">
import { watchEffect } from 'vue'
import GraphQLService from '@/services/GraphQLservice'

export default {
  name: 'Post',
  props: ['slug'],
  components: {},
  data() {
    return {
      posts: null,
      totalPosts: 0
    }
  },
  created() {
    watchEffect(() => {
      this.posts = null;
      GraphQLService.getPosts()
        .then((res) => {
          this.posts = res;
        }).catch((e) => {
          console.log(e);
        })
    })
  },
  computed: {}
}

</script>

<template>
  <h1>Accueil</h1>
  <ul v-if="posts" class="list-disc ml-6">
    <li v-for="post in posts">
      <RouterLink :key="post.id" :to="{ name: 'post', params: { slug: post.slug } }">{{
        post.title
      }}</RouterLink>
    </li>
  </ul>
</template>
