<script lang="ts">
import { watchEffect } from 'vue'
import GraphQLService from '@/services/GraphQLservice'

export default {
    name: 'Category',
    props: ['slug'],
    components: {},
    data() {
        return {
            category: null,
            posts: null
        }
    },
    created() {
        watchEffect(() => {
            this.posts = null;
            GraphQLService.getPostsByCategory(this.$props.slug)
                .then((res) => {
                    this.category = (res && res.name) ? res.name : null;
                    this.posts = (res && res.posts) ? res.posts.nodes : null;
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
    </ul>
</template>

<style>

</style>