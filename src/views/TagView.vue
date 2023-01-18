<script>
import GraphQLService from '@/services/GraphQLservice'

export default {
    name: 'Tag',
    components: {},
    data() {
        return {
            tag: null,
            posts: null,
            pageInfo: null
        }
    },
    beforeRouteEnter(to, from, next) {
        GraphQLService.getPostsByTag(to.params.slug, to.query.next, to.query.previous)
            .then((res) => {
                next(comp => {
                    comp.tag = res?.tag;
                    comp.posts = res?.posts;
                    comp.pageInfo = res?.pageInfo;
                })
            }).catch((e) => {
                console.log(e);
            })
    },
    beforeRouteUpdate(to) {
        return GraphQLService.getPostsByTag(to.params.slug, to.query.next, to.query.previous)
            .then((res) => {
                this.tag = res?.tag;
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
    <h1>Mot-clé: {{ tag }}</h1>
    <ul v-if="posts" class="list-disc ml-6">
        <li v-for="post in posts">
            <RouterLink :key="post.id" :to="{ name: 'post', params: { slug: post.slug } }">{{
                post.title
            }}</RouterLink>
        </li>
        <li v-if="pageInfo.hasPreviousPage">
            <RouterLink key="previous" :to="{ name: 'tag', query: { previous: pageInfo.startCursor } }"
                class="font-bold">
                Précédent
            </RouterLink>
        </li>
        <li v-if="pageInfo.hasNextPage">
            <RouterLink key="next" :to="{ name: 'tag', query: { next: pageInfo.endCursor } }" class="font-bold">
                Suivant
            </RouterLink>
        </li>
    </ul>
</template>

<style>

</style>