<template>
  <section
    class="flex flex-col items-center h-full w-full bg-opacity-40 bg-archyhub-main py-10 overflow-scroll"
  >
    <div
      class="flex flex-col shadow-2xl my-auto p-3 md:p-4 lg:p-6 border rounded-md bg-archyhub-semi-light w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2"
    >
      <form class="w-full flex-1" @submit.prevent="createPost">
        <div
          v-if="message.type !== ''"
          :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
          class="text-sm sm:text-base text-center font-normal mb-4 px-4 sm:px-6 lg:px-8"
        >
          {{ message.text }}
        </div>

        <div class="mb-1 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
            for="content"
          >
            Content
          </label>

          <textarea
            @input="resetErrorMessages"
            class="w-full resize-none font-normal text-sm sm:text-base p-2 sm:p-3 md:p-4 mb-2 text-gray-600 bg-archyhub-light outline-none rounded-lg placeholder-gray-400"
            rows="4"
            placeholder="Provide litle hint about the competition"
            v-model="payload.content"
          ></textarea>
        </div>

        <div class="mb-2 p-1">
          <div class="flex justify-center">
            <input
              @change="onFileChange"
              class="hidden"
              type="file"
              name="post_image"
              id="post_image"
              accept="image/jpg, image/jpeg, image/png"
            />
          </div>

          <div class="w-full">
            <div class="w-full shadow-md bg-archyhub-light rounded-lg">
              <img
                v-if="payload.image_file"
                :src="image_url"
                class="w-full h-72 rounded-lg object-cover mb-4"
              />
            </div>

            <div
              class="grid grid-cols-2 gap-2 sm:gap-8 md:gap-12 xl:gap-16 items-center justify-between"
            >
              <label
                class="col-span-2 sm:col-span-1 text-center text-xs sm:text-sm lg:text-base cursor-pointer py-2 px-4 md:px-6 rounded-lg md:rounded-xl bg-gray-600 text-archyhub-light focus:outline-none my-1"
                for="post_image"
              >
                <span class="fa fa-image mr-1"></span>
                {{ payload.image_file ? 'Change Picture' : 'Add Picture' }}
              </label>

              <span
                v-if="payload.image_file"
                class="col-span-2 sm:col-span-1 text-center text-xs sm:text-sm lg:text-base cursor-pointer py-2 px-4 md:px-6 rounded-lg md:rounded-xl bg-red-700 text-white focus:outline-none my-1"
                @click="payload.image_file = null"
              >
                Remove Image
              </span>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-20">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 sm:w-14 sm:h-14 md:h-16 md:w-16 rounded-full border"
              :src="auth_user_profile_picture"
            />
          </div>

          <div class="">
            <button
              class="text-archyhub-semi-light text-sm sm:text-base lg:text-lg bg-archyhub-main hover:text-archyhub-light font-normal lg:font-medimum rounded-lg sm:rounded-xl md:rounded-lg py-2 sm:py-3 px-4 sm:px-8"
            >
              <div
                class="w-full flex justify-center items-center space-x-1 sm:space-x-2"
              >
                <span>
                  {{ is_loading ? 'Creating...' : 'Create New Post' }}
                </span>

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
import {
  createNewPostWithImage,
  createNewPostWithoutImage,
} from '@/controller/api/posts.api'
import { useStore } from 'vuex'
import router from '@/router'
import { getDisplayProfilePicture } from '@/controller/utilities'

export default {
  name: 'CreatePostModal',
  setup() {
    const store = useStore()
    const image_url = ref('')
    const is_loading = ref(false)
    const auth_user = computed(() => store.state.users.auth_user)
    const auth_user_profile_picture = ref('')
    const message = ref({ type: '', text: '' })
    const payload = ref({
      content: '',
      image_file: null,
    })

    const getUserProfilePicture = async () => {
      const {
        bio: { gender },
        profile_picture: { avatar },
      } = auth_user.value

      const profile_picture: any = await getDisplayProfilePicture(
        avatar,
        gender,
      )

      auth_user_profile_picture.value = profile_picture
    }

    const resetErrorMessages = () => {
      is_loading.value = false
      updateResponseMessage('', '')
    }

    const updateResponseMessage = (type: string, text: string) => {
      if (type === 'error') is_loading.value = false

      message.value.type = type
      message.value.text = text
    }

    const createPost = async (event: any) => {
      is_loading.value = true

      if (payload.value.content === '')
        return updateResponseMessage('error', 'content cannot be empty')

      const poster_id = auth_user.value._id

      if (payload.value.image_file) {
        const response = await createNewPostWithImage(poster_id, payload.value)
        const { error, data, status } = response

        if (error) return updateResponseMessage('error', error)

        if (!status || status === 400 || !data)
          return updateResponseMessage(
            'error',
            'Sorry, an unknown error occurred.. Check internet connection',
          )

        updateResponseMessage('success', data)
        await fetchPosts()
        is_loading.value = false
        closeAllModals()
      }

      if (payload.value.image_file === null) {
        const response = await createNewPostWithoutImage(
          poster_id,
          payload.value.content,
        )

        const { error, data, status } = response

        if (error) return updateResponseMessage('error', error)

        if (!status || status === 400 || !data)
          return updateResponseMessage(
            'error',
            'Sorry, an unknown error occurred.. Check internet connection',
          )

        updateResponseMessage('success', data)
        is_loading.value = false
        await fetchPosts()
        closeAllModals()
      }

      scrollToTop()
    }

    //
    const onFileChange = (e: any) => {
      resetErrorMessages()
      const file = e.target.files[0]

      payload.value.image_file = file
      image_url.value = URL.createObjectURL(file)
    }

    //
    async function fetchPosts() {
      await store.dispatch('_requests/getAllPosts')
    }
    const closeAllModals = () => {
      store.dispatch('component_handler/closeAllModals')
    }

    //
    const scrollToTop = () => window.scrollTo(0, 0)

    onBeforeMount(async () => await getUserProfilePicture())

    //
    return {
      is_loading,
      payload,
      auth_user_profile_picture,
      image_url,
      message,
      auth_user,
      createPost,
      onFileChange,
      resetErrorMessages,
    }
  },
}
</script>

<style scoped></style>
