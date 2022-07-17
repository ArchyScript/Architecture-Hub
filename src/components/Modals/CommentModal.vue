<template>
  <section
    class="flex justify-center items-center h-full w-full bg-opacity-40 bg-archyhub-main"
  >
    <div
      class="flex shadow-2xl p-3 md:p-4 lg:p-6 border rounded-md bg-archyhub-semi-light w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2"
    >
      <div class="flex-shrink-0 mx-4 hidden sm:inline">
        <img class="w-20 h-20 rounded-full border" src="@/assets/script.jpg" />
      </div>

      <form class="w-full flex-1" @submit="newComment">
        <div
          v-if="message.type !== ''"
          :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
          class="text-center font-medium mb-4 px-8"
        >
          {{ message.text }}
        </div>

        <div class="flex flex-col w-full border-b-2 mb-3 border-gray-300">
          <textarea
            class="w-full text-xl resize-none p-4 mb-3 text-gray-700 bg-archyhub-light bg-opa city-100 focus:outline-none rounded-2xl"
            rows="4"
            placeholder="Drop your comment..."
            v-model="payload.comment"
          ></textarea>
        </div>

        <div class="flex justify-between items-center sm:flex-row-reverse">
          <div class="flex-shrink-0 sm:hidden">
            <img
              class="w-12 h-12 rounded-full border"
              src="@/assets/script.jpg"
            />
          </div>

          <div class="">
            <button
              class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-lg sm:rounded-xl md:rounded-2xl py-2 sm:py-3 px-4 sm:px-8"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'loading...' : 'Comment' }}</span>

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
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { commentOnPost } from '@/controller/api/reactions.api'

export default {
  name: 'CreatePostModal',

  setup() {
    const store = useStore()
    const post_id = ref('')
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const scrollShadowBoolean = ref(true)
    const side_nav_toggler_boolean = ref(true)
    const payload = ref({ comment: '' })
    const post_to_comment_on_id = computed(
      () => store.state.component_handler.post_to_comment_on_id,
    )

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const newComment = async (event: any) => {
      event.preventDefault()
      is_loading.value = true
      updateResponseMessage('', '')

      const params = {
        commenter_id: store.state.users.user._id,
        post_id: post_to_comment_on_id.value,
      }

      const response = await commentOnPost(params, payload.value)
      const { error, data, status } = response

      if (error) {
        updateResponseMessage('error', error)
        is_loading.value = false

        return setTimeout(() => {
          return updateResponseMessage('', '')
        }, 5000)
      }

      updateResponseMessage('success', data)

      store.dispatch('component_handler/closeAllModals')
      // return router.push('/')
    }

    // close create post modal
    // window.addEventListener('click', (event: any) => {
    //   if (event.target.id === 'create_post_modal') {
    //     store.dispatch('component_handler/createPostVisibillity')
    //   }
    // })

    // onBeforeMount(() => {
    //   handleScroll()
    //   window.addEventListener('scroll', () => handleScroll())
    // })

    // const handleScroll = () => {
    //   if (window.pageYOffset > 0) {
    //     // user is scrolled
    //     if (scrollShadowBoolean.value) scrollShadowBoolean.value = false
    //   } else {
    //     // user is at top of page
    //     if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true
    //   }
    // }

    // const newComment = (post_id: any) => {
    //   console.log(post_id)
    // }

    // onBeforeMount(() => {
    //   //
    //   displayPostReactions()
    // })

    window.onkeyup = () => test

    const test = (event: any) => {
      console.log(event)
    }

    return {
      post_id,
      // likePost,
      // newComment,
      scrollShadowBoolean,
      is_loading,
      payload,
      side_nav_toggler_boolean,
      message,
      newComment,
      test,
    }
  },
}
</script>

<style scoped></style>
