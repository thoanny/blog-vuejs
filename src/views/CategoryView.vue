<script lang="ts">
import { watchEffect } from 'vue'
import GraphQLService from '@/services/GraphQLservice'

export default {
    name: 'Category',
    props: ['slug', 'previous', 'next'],
    components: {},
    data() {
        return {
            category: null,
            posts: null,
            pageInfo: null
        }
    },
    created() {
        watchEffect(() => {
            this.category = null;
            this.posts = null;
            this.pageInfo = null;
            GraphQLService.getPostsByCategory(this.slug, this.next, this.previous)
                .then((res) => {
                    this.category = (res.category) ? res.category : null;
                    this.posts = (res.posts) ? res.posts : null;
                    this.pageInfo = (res.pageInfo) ? res.pageInfo : null;
                }).catch((e) => {
                    console.log(e);
                })
        })
    },
    computed: {}
}

</script>

<template>
    <h1>Catégorie: {{ category }}</h1>
    <ul v-if="posts" class="list-disc ml-6">
        <li v-for="post in posts">
            <RouterLink :key="post.id" :to="{ name: 'post', params: { slug: post.slug } }">{{
                post.title
            }}</RouterLink>
        </li>
        <li v-if="pageInfo.hasPreviousPage">
            <RouterLink key="previous" :to="{ name: 'category', query: { previous: pageInfo.startCursor } }"
                class="font-bold">
                Précédent
            </RouterLink>
        </li>
        <li v-if="pageInfo.hasNextPage">
            <RouterLink key="next" :to="{ name: 'category', query: { next: pageInfo.endCursor } }" class="font-bold">
                Suivant
            </RouterLink>
        </li>
    </ul>
</template>

<style>

</style>