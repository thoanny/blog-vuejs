<script lang="ts">
import { watchEffect } from 'vue'
import GraphQLService from '@/services/GraphQLservice'

export default {
    name: 'Post',
    props: ['slug'],
    components: {},
    data() {
        return {
            post: null
        }
    },
    created() {
        watchEffect(() => {
            this.post = null;
            GraphQLService.getPost(this.$props.slug)
                .then((res) => {
                    this.post = res;
                }).catch((e) => {
                    console.log(e);
                })
        })
    },
    computed: {}
}
</script>

<template>
    <div v-if="post">
        <div>
            <article class="">
                <header class="">
                    <div class="flex flex-col xl:flex-row gap-8 items-end flex-col-reverse">
                        <figure v-if="post.featuredImage" id="post-thumbnail"
                            class="w-full xl:max-w-2xl shrink-0 xl:-ml-8 relative"><img
                                :src="post.featuredImage.node.mediaDetails.sizes[0].sourceUrl" alt="Kao The Kangaroo"
                                class="w-full h-full rounded-2xl aspect-video object-cover xl:shadow-xl"
                                :width="post.featuredImage.node.mediaDetails.sizes[0].width"
                                :height="post.featuredImage.node.mediaDetails.sizes[0].height"> </figure>
                        <div class="flex gap-6 xl:gap-6 flex-col items-end justify-start xl:mb-6 pr-4 xl:mt-6 w-full">
                            <h1 class="w-full text-3xl font-bold leading-12 xl:text-white text-center xl:text-left">{{
                                post.title
                            }}</h1>
                            <ul class="metas w-full justify-center xl:justify-start">
                                <li class="">4 janv. 2023</li>
                                <li class="" v-if="post.categories">
                                    <RouterLink v-for="category in post.categories.nodes" :key="category.id"
                                        :to="{ name: 'category', params: { slug: category.slug } }">
                                        {{ category.name }}
                                    </RouterLink>
                                </li>
                                <!-- //TODO -->
                                <li class="">4 min. à lire</li>
                            </ul>
                            <ul class="w-full hidden xl:flex gap-2 items-center justify-center xl:justify-start">
                                <li class="">
                                    <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fthoanny.fr%2Farticle%2Fkao-the-kangaroo&amp;text=Kao%20The%20Kangaroo&amp;via=thoanny_"
                                        rel="noopener noreferrer" target="_blank"
                                        class="btn btn-circle btn-secondary text-white dark:text-gray-900">Tw</a>
                                </li>
                                <li class="">
                                    <a href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fthoanny.fr%2Farticle%2Fkao-the-kangaroo"
                                        rel="noopener noreferrer" target="_blank"
                                        class="btn btn-circle btn-secondary text-white dark:text-gray-900">Fb</a>
                                </li>
                                <li class="">
                                    <button class="btn btn-circle btn-secondary text-white dark:text-gray-900"
                                        data-clipboard-text="https://thoanny.fr/article/kao-the-kangaroo">Copy</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                <div id="content" class="" v-html="post.content"></div>

                <div class="author" v-if="post.author">
                    <img class="mask mask-hexagon" :src="post.author.node.avatar.url" alt="">
                    <h4>{{ post.author.node.name }}</h4>
                    <p v-if="post.author.node.description">{{ post.author.node.description }}</p>
                </div>

                <div v-if="post.categories">
                    <span class="tags text-sm flex flex-wrap justify-center gap-4">
                        <RouterLink v-for="tag in post.tags.nodes" :key="tag.id"
                            :to="{ name: 'tag', params: { slug: tag.slug } }"
                            class="btn btn-sm btn-outline dark:border-gray-200 dark:text-gray-200 rounded-full">
                            {{ tag.name }}
                        </RouterLink>
                    </span>
                </div>
            </article>

            <div id="comments" class="">
                <!-- TODO -->
            </div>
        </div>
    </div>
</template>

<style>

</style>