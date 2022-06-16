<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <TopBarVue />

    <body class="">
      <CreatePostVue />

      <PostContentVue />
      <PostContentWithOnePictureVue />
      <PostContentVue />
      <PostContentWithTwoPicturesVue />
      <PostContentVue />
      <PostContentWithOnePictureVue />

      <PostContentWithFourPicturesVue />
      <PostContentVue />
    </body>
  </div>
</template>

<script>
import { ref } from 'vue'
import TopBarVue from './TopBar.vue'
import CreatePostVue from './CreatePost.vue'
import PostContentVue from './PostContent.vue'
import PostContentWithOnePictureVue from './PostContentWithOnePicture.vue'
import PostContentWithFourPicturesVue from './PostContentWithFourPictures.vue'
import PostContentWithTwoPicturesVue from './PostContentWithTwoPictures.vue'

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

    return { test_ref }
  },
}
</script>

<style lang=""></style>
