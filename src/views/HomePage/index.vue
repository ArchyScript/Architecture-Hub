<template>
  <div
    class="w-full top-0 h-full bg-archyhub-semi-light bg-opacity-40 z-4 border-r border-l"
  >
    <TopBarVue />

    <CreatePostVue class="hidden" />

    <div class="mt-4">
      <div class="" v-if="allPosts.length < 1">
        <div class="text-center font-medium mb-4">
          <span>{{ is_loading ? '' : ' No post found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getAllPosts">
            <button
              class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'Reload' }}</span>

                <svg
                  v-if="is_loading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>

      <div v-else>
        <div class="text-center mb-8">
          <form @submit.prevent="getAllPosts">
            <button
              class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'More Post' }}</span>

                <svg
                  v-if="is_loading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>

        <div class="" v-for="(eachPost, index) in allPosts" :key="index">
          <PostContentVue :eachPost="eachPost" />
        </div>

        <!-- {{ allPosts }} -->
      </div>

      <!-- <allPostsContentVue />
      <PostContentWithOnePictureVue />
      <PostContentVue />
      <PostContentWithTwoPicturesVue />
      <PostContentVue />
      <PostContentWithOnePictureVue />

      <PostContentWithFourPicturesVue />
      <PostContentVue /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import TopBarVue from './TopBar.vue'
import CreatePostVue from '@/views/HomePage/CreatePost.vue'
import PostContentVue from '@/components/Posts/PostContent.vue'
// import PostContentWithOnePictureVue from '@/components/Posts/PostContentWithOnePicture.vue'
// import PostContentWithFourPicturesVue from '@/components/Posts/PostContentWithFourPictures.vue'
// import PostContentWithTwoPicturesVue from '@/components/Posts/PostContentWithTwoPictures.vue'
import { useStore } from 'vuex'
import { PostSchema } from '@/controller/typings'
import { fetchAllPosts } from '@/controller/api/posts.api'

export default {
  name: 'HomePage',
  components: {
    TopBarVue,
    CreatePostVue,
    PostContentVue,
    // PostContentWithOnePictureVue,
    // PostContentWithTwoPicturesVue,
    // PostContentWithFourPicturesVue,
  },
  setup() {
    const store = useStore()
    const allPosts = ref<PostSchema[]>([])
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    // computed(() => getAllPosts)

    const getAllPosts = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      const response = await fetchAllPosts()

      const { error, data, status } = response

      if (error) {
        updateResponseMessage('error', error)
        is_loading.value = false

        return setTimeout(() => {
          return updateResponseMessage('', '')
        }, 5000)
      }

      if (!status || status === 400 || !data) {
        updateResponseMessage(
          'error',
          'Sorry, an unknown error occurred... Check connection',
        )

        return setTimeout(() => {
          is_loading.value = false
          return updateResponseMessage('', '')
        }, 5000)
      }

      updateResponseMessage('success', '')

      allPosts.value = data
      is_loading.value = false

      console.log(data)
    }

    onBeforeMount(() => {
      //
      getAllPosts()
    })
    return { allPosts, is_loading, message, getAllPosts }
  },
}
</script>

<style lang=""></style>
