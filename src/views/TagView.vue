<script lang="ts">
import { watchEffect } from 'vue'
import GraphQLService from '@/services/GraphQLservice'

export default {
    name: 'Tag',
    props: ['slug'],
    components: {},
    data() {
        return {
            tag: null,
            posts: null
        }
    },
    created() {
        watchEffect(() => {
            this.posts = null;
            GraphQLService.getPostsByTag(this.$props.slug)
                .then((res) => {
                    this.tag = (res && res.name) ? res.name : null;
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
    <h1>Mot-clé: {{ tag }}</h1>
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