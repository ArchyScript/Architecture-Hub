<template>
  <div class="w-full top-0 h-full z-4">
    <MainPageTopBarVue :page_title="topbar.title" :page_icon="topbar.icon" />

    <div class="mt-4 md:mt-6 xl:mt-10 pb-8">
      <div v-if="storePosts.length < 1">
        <div
          class="text-center py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-sm sm:rounded-md md:rounded-lg font-medium px-2 md:px-5 cursor-pointer mb-2 md:mb-3 text-gray-600"
        >
          <span>{{ is_loading ? '' : ' No post found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getAllPosts">
            <button
              class="text-archyhub-light bg-opacity-40 bg-archyhub-main text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl md:rounded-2xl font-medium py-1 md:py-2 px-3 sm:px-4 lg:px-6 cursor-pointer"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'Reload' }}</span>

                <svg
                  v-if="is_loading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 sm:h-6 sm:w-6 text-white animate-spin"
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

        <div v-for="x in 10" :key="x">
          <AnimatedPostContentVue />
        </div>
      </div>

      <div v-else>
        <div class="hidden text-center mb-8">
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

        <div v-for="(eachPost, index) in storePosts" :key="index">
          <PostContentVue :eachPost="eachPost" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import MainPageTopBarVue from '@/components/Layouts/MainPageTopBar.vue'
import PostContentVue from '@/components/Posts/PostContent.vue'
import AnimatedPostContentVue from '@/components/Animation/AnimatedPostContent.vue'

export default {
  name: 'HomePage',
  components: {
    PostContentVue,
    MainPageTopBarVue,
    AnimatedPostContentVue,
  },
  setup() {
    const store = useStore()
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const topbar = ref({ title: 'Home', icon: 'fa fa-home' })
    const storePosts = computed(() => store.state._requests.allPosts)

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const getAllPosts = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      if (storePosts.value && storePosts.value.length < 1) await fetchPosts()

      if (!storePosts.value) {
        is_loading.value = false
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
      is_loading.value = false

      await fetchPosts()
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }

    //
    async function fetchPosts() {
      await store.dispatch('_requests/getAllPosts')
    }

    //
    onBeforeMount(async () => {
      scrollToTop()
      await getAllPosts()
    })

    return {
      storePosts,
      is_loading,
      message,
      topbar,
      getAllPosts,
    }
  },
}
</script>

<style lang=""></style>
