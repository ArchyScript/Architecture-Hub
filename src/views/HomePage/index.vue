<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <!-- <TopBarVue /> -->
    <TopBarVue />

    <div class="">
      <CreatePostVue />

      <PostContentVue />
      <PostContentWithOnePictureVue />
      <PostContentVue />
      <PostContentWithTwoPicturesVue />
      <PostContentVue />
      <PostContentWithOnePictureVue />

      <PostContentWithFourPicturesVue />
      <PostContentVue />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import TopBarVue from './TopBar.vue'
import CreatePostVue from '@/views/HomePage/CreatePost.vue'
import PostContentVue from '@/components/Posts/PostContent.vue'
import PostContentWithOnePictureVue from '@/components/Posts/PostContentWithOnePicture.vue'
import PostContentWithFourPicturesVue from '@/components/Posts/PostContentWithFourPictures.vue'
import PostContentWithTwoPicturesVue from '@/components/Posts/PostContentWithTwoPictures.vue'

export default {
  name: 'HomePage',
  components: {
    TopBarVue,
    CreatePostVue,
    PostContentVue,
    PostContentWithOnePictureVue,
    PostContentWithTwoPicturesVue,
    PostContentWithFourPicturesVue,
  },
  setup() {
    const test_ref = ref('testing')

    onBeforeMount(() => {
      // window.pageYOffset = 0
    })
    return { test_ref }
  },
}
</script>

<style lang=""></style>
