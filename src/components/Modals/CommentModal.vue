<template>
  <section
    class="flex flex-col items-center h-full w-full bg-opacity-40 bg-archyhub-main py-10 overflow-scroll"
  >
    <div
      class="flex flex-col shadow-2xl my-auto p-3 md:p-4 lg:p-6 border rounded-md bg-archyhub-semi-light w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2"
    >
      <form class="w-full flex-1" @submit.prevent="newComment">
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
            Comment
          </label>

          <textarea
            @input="resetErrorMessages"
            class="w-full resize-none font-normal text-sm sm:text-base p-2 sm:p-3 md:p-4 mb-2 text-gray-600 bg-archyhub-light outline-none rounded-lg placeholder-gray-400"
            rows="4"
            placeholder="Drop your comment"
            v-model="payload.comment"
          ></textarea>
        </div>

        <div class="flex justify-between items-center mt-4">
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
                  {{ is_loading ? 'Loading...' : 'Comment' }}
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
import { useStore } from 'vuex'
import { commentOnPost } from '@/controller/api/reactions.api'
import { getDisplayProfilePicture } from '@/controller/utilities'

export default {
  name: 'CreateCommentModal',

  setup() {
    const store = useStore()
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const payload = ref({ comment: '' })
    const auth_user_profile_picture = ref('')
    const auth_user = computed(() => store.state.users.auth_user)
    const post_comment_object = computed(
      () => store.state.component_handler.post_comment_object,
    )

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

    const newComment = async (event: any) => {
      is_loading.value = true

      const params = {
        commenter_id: auth_user.value._id,
        post_id: post_comment_object.value.post_id,
        post_type: post_comment_object.value.post_type,
      }

      const response = await commentOnPost(params, payload.value)
      const { error, data, status } = response

      if (error) return updateResponseMessage('error', error)

      if (!status || status === 400 || !data)
        return updateResponseMessage(
          'error',
          'Sorry, an unknown error occurred.. Check internet connection',
        )

      updateResponseMessage('success', data)

      await fetchUsers()
      closeAllModals()

      if (post_comment_object.value === 'post') {
        await fetchPosts()
        await fetchPosts()
      }
      if (post_comment_object.value === 'competition') {
        await fetchCompetitions()
        await fetchCompetitions()
      }
      if (post_comment_object.value === 'scholarship') {
        await fetchScholarships()
        await fetchScholarships()
      }
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchPosts() {
      await store.dispatch('_requests/getAllPosts')
    }
    async function fetchCompetitions() {
      await store.dispatch('_requests/getAllCompetitions')
    }
    async function fetchScholarships() {
      await store.dispatch('_requests/getAllScholarships')
    }
    const closeAllModals = () => {
      store.dispatch('component_handler/closeAllModals')
    }

    onBeforeMount(async () => getUserProfilePicture())

    return {
      post_comment_object,
      auth_user_profile_picture,
      is_loading,
      payload,
      message,
      resetErrorMessages,
      getUserProfilePicture,
      newComment,
    }
  },
}
</script>

<style scoped></style>
