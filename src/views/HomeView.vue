<script lang="ts">
import GraphQLService from '@/services/GraphQLservice'

export default {
  name: 'Post',
  components: {},
  data() {
    return {
      posts: null,
      pageInfo: null,
      totalPosts: 0
    }
  },
  beforeRouteEnter(to, from, next) {
    GraphQLService.getPosts(to.query.next, to.query.previous)
      .then((res) => {
        next(comp => {
          comp.posts = res?.posts;
          comp.pageInfo = res?.pageInfo;
        })
      }).catch((e) => {
        console.log(e);
      })
  },
  beforeRouteUpdate(to) {
    return GraphQLService.getPosts(to.query.next, to.query.previous)
      .then((res) => {
        this.posts = res?.posts;
        this.pageInfo = res?.pageInfo;
      }).catch((e) => {
        console.log(e);
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
    <li v-if="pageInfo.hasPreviousPage">
      <RouterLink key="previous" :to="{ name: 'home', query: { previous: pageInfo.startCursor } }" class="font-bold">
        Précédent
      </RouterLink>
    </li>
    <li v-if="pageInfo.hasNextPage">
      <RouterLink key="next" :to="{ name: 'home', query: { next: pageInfo.endCursor } }" class="font-bold">Suivant
      </RouterLink>
    </li>
  </ul>
</template>
