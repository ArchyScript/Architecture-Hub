<template>
  <section
    class="fixed top-0 left-0 z-50 flex bg-opacity-40 bg-black h-full w-full items-center"
  >
    <!-- <section -->
    <!-- :class="{ scrolled: !scrollShadowBoolean }"
      class="z-40 h-full w-full bg-black"
    > -->
    <div
      class="flex z-50 px-2 mx-auto py-6 border shadow-lg rounded-md bg-archyhub-semi-light w-4/5 sm:w-5/6 md:w-7/12 lg:w-1/2"
    >
      <div class="flex-shrink-0 mx-4">
        <img class="w-20 h-20 rounded-full border" src="@/assets/script.jpg" />
      </div>

      <form class="w-full flex-1 mx-4" @submit="createPost">
        <div
          v-if="message.type !== ''"
          :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
          class="text-center font-medium mb-4 px-8"
        >
          {{ message.text }}
        </div>

        <!-- fhehe.bfke, e -->

        <div class="mb-3 p-1">
          <label class="block mb-1 mx-2 font-medium text-gray-600" for="title">
            Title
          </label>

          <input
            type="text"
            class="w-full text-xl resize-none p-4 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
            name="title"
            placeholder="Title"
            v-model="payload.title"
          />
        </div>

        <div class="flex flex-col w-full border-b-2 mb-3 border-gray-300">
          <label class="block mb-1 mx-2 font-medium text-gray-600" for="title">
            Post Content
          </label>

          <textarea
            class="w-full text-xl resize-none p-4 mb-3 text-gray-700 bg-archyhub-light bg-opa city-100 focus:outline-none rounded-2xl"
            rows="4"
            placeholder="What's happening?"
            v-model="payload.content"
          ></textarea>
        </div>

        <div class="flex justify-between items-center flex-row-reverse">
          <div class="text-cen ter">
            <button
              class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-3 px-8"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Sending...' : 'Create Post' }}</span>

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
              <!-- Create Post
              <span class="fa fa-pencil ml-3"></span> -->
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- <div
      class="mx-auto p-5 border shadow-lg rounded-md bg-white"
    >
      <div class="mt-3 text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
        >
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h3 class="text-lg leading-6 font-medium text-gray-900">Successful!</h3>

        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            Account has been successfully registered!
          </p>
        </div>

      </div>
    </div> -->

    <!-- <div class="items-center px-4 py-3">
          <button
            @click="createPost"
            class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            OK
          </button>
        </div> -->
    <!-- </section> -->
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { createNewPost } from '@/controller/api/posts.api'
import { useStore } from 'vuex'

export default {
  name: 'CreatePostModal',
  props: {
    // reactions: {
    //   type: Object,
    //   required: true,
    // },
  },
  setup(props: any, context: any) {
    const store = useStore()
    const post_id = ref('')
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const payload = ref({ title: '', content: '' })
    const scrollShadowBoolean = ref(true)

    // const displayPostReactions = () => {
    //   props.reactions.no_of_comments < 1 ? '' : props.reactions.no_of_comments
    //   props.reactions.no_of_likes < 1 ? '' : props.reactions.no_of_likes

    //   post_id.value = props.reactions.post_id
    // }

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const createPost = async (event: any) => {
      event.preventDefault()
      is_loading.value = true

      const user_id = store.state.users.user.user_id
      updateResponseMessage('', '')

      const response = await createNewPost(user_id, payload.value)
      const { error, data, status } = response
      // console.log(event)

      if (error) {
        updateResponseMessage('error', error)
        is_loading.value = false

        return setTimeout(() => {
          return updateResponseMessage('', '')
        }, 5000)
      }

      //  return context.emit('createPost')
    }

    onBeforeMount(() => {
      handleScroll()
      window.addEventListener('scroll', () => handleScroll())
    })

    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (scrollShadowBoolean.value) scrollShadowBoolean.value = false
      } else {
        // user is at top of page
        if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true
      }
    }

    // const commentOnPost = (post_id: any) => {
    //   console.log(post_id)
    // }

    // onBeforeMount(() => {
    //   //
    //   displayPostReactions()
    // })

    return {
      post_id,
      // likePost,
      // commentOnPost,
      scrollShadowBoolean,
      is_loading,
      payload,
      message,
      createPost,
    }
  },
}
</script>

<style scoped>
section.scrolled {
  @apply sticky;
}
</style>
