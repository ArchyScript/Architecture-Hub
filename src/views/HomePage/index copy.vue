<template>
  <div class="w-full top-0 h-full z-4">
    <MainPageTopBarVue :page_title="topbar.title" :page_icon="topbar.icon" />

    <div class="mt-10 pb-8">
      <div class="" v-if="allPosts.length < 1">
        <div class="text-center font-medium mb-6">
          <span>{{ is_loading ? '' : ' No post found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getAllPosts">
            <button
              class="text-md text-archyhub-semi-light bg-opacity-40 bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
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

        <div class="" v-for="x in 10" :key="x">
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

        <div v-for="(eachPost, index) in allPosts" :key="index">
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
import { PostSchema } from '@/controller/typings'
import { fetchAllPosts } from '@/controller/api/posts.api'
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
    const allPosts = ref<PostSchema[]>([])
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const topbar = ref({ title: 'Home', icon: 'fa fa-home' })
    const storePosts = computed(() => store.state._requests.allPosts)
    const auth_user = computed(() => store.state.users.auth_user)

    const open_new_post_modal = computed(
      () => store.state.component_handler.open_new_post_modal,
    )
    const open_new_comment_modal = computed(
      () => store.state.component_handler.open_new_comment_modal,
    )

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const getAllPosts = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      const response = await fetchAllPosts()
      const { error, data, status } = response

      console.log(data)

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
      await store.dispatch('_requests/getAllPosts')
    }

    // window.onkeyup = () => {
    //   if (
    //     open_new_post_modal.value === false ||
    //     open_new_comment_modal.value === false
    //   ) {
    //     getAllPosts()
    //   }
    // }
    // window.addEventListener('click', () => {
    //   if (
    //     open_new_post_modal.value === true ||
    //     open_new_comment_modal.value === false
    //   ) {
    //     getAllPosts()
    //   }
    // })

    onBeforeMount(() => {
      if (storePosts.value.length >= 1) {
        allPosts.value = storePosts.value
        return getAllPosts()
      } else {
        return getAllPosts()
      }
    })

    return {
      auth_user,
      allPosts,
      is_loading,
      message,
      topbar,
      getAllPosts,
    }
  },
}
</script>

<style lang=""></style>
