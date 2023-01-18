<script>
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
  computed: {
    getFirstsPosts() {
      if (this.posts && this.pageInfo) {
        if (!this.pageInfo.hasPreviousPage) {
          const headerPosts = this.posts.slice(0, 4);
          this.posts = this.posts.slice(4);
          return headerPosts;
        }
      }

      return null;
    }
  }
}

</script>

<template>
  <div v-if="posts && getFirstsPosts" class="grid grid-cols-2 gap-4 mb-6">
    <RouterLink v-for="post in getFirstsPosts" :key="post.id" :to="{ name: 'post', params: { slug: post.slug } }"
      class="card w-full bg-base-100 shadow-xl image-full">
      <figure v-if="post.featuredImage">
        <img :src="post.featuredImage.node.mediaDetails.sizes[0].sourceUrl" :alt="post.featuredImage.node.altText"
          class="w-full h-full object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
      </div>
    </RouterLink>
  </div>

  <div v-if="posts" class="grid grid-cols-3 gap-4 mb-6">
    <RouterLink v-for="post in posts" class="card w-full bg-base-100 shadow-xl" :key="post.id"
      :to="{ name: 'post', params: { slug: post.slug } }">
      <figure v-if="post.featuredImage">
        <img :src="post.featuredImage.node.mediaDetails.sizes[0].sourceUrl" class="aspect-video object-cover"
          :alt="post.featuredImage.node.altText" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <div v-html="post.excerpt"></div>
      </div>
    </RouterLink>
  </div>

  <div v-if="posts" class="flex justify-between mb-6">
    <div>
      <RouterLink v-if="pageInfo.hasNextPage" key="next" :to="{ name: 'home', query: { next: pageInfo.endCursor } }"
        class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Articles plus anciens
      </RouterLink>
    </div>
    <div>
      <RouterLink v-if="pageInfo.hasPreviousPage" key="previous"
        :to="{ name: 'home', query: { previous: pageInfo.startCursor } }" class="btn btn-primary">
        Articles plus récents
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>
