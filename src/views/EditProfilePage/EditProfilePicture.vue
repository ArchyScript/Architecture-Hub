<template>
  <section class="mb-6 inset-x-0 pb-4">
    <div class="flex justify-center">
      <input
        @change.prevent="onFileChange"
        class="hidden"
        type="file"
        name="profile_picture"
        id="profile_picture"
        accept="image/gif, image/jpeg, image/png"
      />
    </div>

    <form @submit.prevent="uploadPicture">
      <div class="w-full mt-16 px-2 sm:px-4">
        <div
          class="h-96 w-full border rounded-2xl md:rounded-3xl bg-archyhub-light"
        >
          <img
            :src="image_url"
            class="w-full h-full rounded-2xl md:rounded-3xl object-cover"
          />
        </div>

        <div
          v-if="message.type !== ''"
          :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
          class="text-sm sm:text-base text-center font-normal mb-4 px-4 sm:px-6 lg:px-8"
        >
          {{ message.text }}
        </div>

        <div class="grid gap-3 sm:gap-10 grid-cols-1 sm:grid-cols-2 mt-6">
          <!-- <div class="flex items-center gap-10 justify-around mt-6"> -->
          <label
            :class="payload ? 'col-span-1' : ' col-span-2'"
            class="w-full text-center text-sm sm:text-base cursor-pointer py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-600 text-white hover:bg-green-dark focus:outline-none my-1"
            for="profile_picture"
          >
            {{ payload ? 'Change Picture' : 'Choose Picture' }}
          </label>

          <button
            v-if="payload"
            type="submit"
            class="w-full cursor-pointer text-sm sm:text-base text-center py-2 sm:py-3 rounded-lg sm:rounded-xl bg-archyhub-main text-white outline-none my-1"
          >
            <div class="w-full flex justify-center items-center space-x-2">
              <span>Upload Picture</span>

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

    <form
      @submit.prevent="removeProfilePicture"
      v-if="user_have_profile_picture"
    >
      <div class="px-2 sm:px-4 my-4">
        <button
          class="w-full text-center cursor-pointer py-2 sm:py-3 rounded-lg sm:rounded-xl bg-red-800 text-white focus:outline-none my-1"
        >
          <div class="w-full flex justify-center items-center space-x-2">
            <span>
              Delete Profile Picture
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
    </form>
  </section>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import {
  uploadProfilePicture,
  deleteProfilePicture,
} from '@/controller/api/users.api'
import { useStore } from 'vuex'
import router from '@/router'
import { getDisplayProfilePicture } from '@/controller/utilities'
import { useRoute } from 'vue-router'

export default {
  name: 'ProfilePictureUploadPage',
  setup() {
    const store = useStore()
    const route = useRoute()
    const image_url = ref('')
    const payload = ref(null)
    const is_loading = ref(false)
    const user_have_profile_picture = ref(false)
    const message = ref({ type: '', text: '' })
    const auth_user = computed(() => store.state.users.auth_user)
    const user = computed(() => store.state.users.user)
    const storeUsers = computed(() => store.state._requests.allUsers)

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const onFileChange = async (event: any) => {
      const file = event.target.files[0]

      payload.value = file
      image_url.value = URL.createObjectURL(file)
      user_have_profile_picture.value = false
    }

    const uploadPicture = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      const user_id = auth_user.value._id

      const response = await uploadProfilePicture(user_id, payload.value)
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

      updateResponseMessage('success', `${data} please wait...'`)

      // await store.dispatch('users/getUser', user_id)
      await store.dispatch('users/getAuthUser', user_id)

      console.log(auth_user.value)

      is_loading.value = false

      return router.push(`/profile/${auth_user.value.username}`)
    }

    const loadAuthUserInfo = async () => {
      const { username } = route.params
      console.log(username)

      if (storeUsers.value.length < 1) {
        await fetchUsers()
      }

      storeUsers.value.forEach(async (eachUser: any) => {
        if (eachUser.username === username) {
          const {
            _id,
            bio: { gender },
            profile_picture: { avatar },
          } = await eachUser

          if (avatar !== '') user_have_profile_picture.value = true

          const profile_picture = await getDisplayProfilePicture(avatar, gender)

          image_url.value = profile_picture

          return
        }
      })

      // const {
      //   profile_picture: { avatar },
      //   bio: { gender },
      // } = auth_user.value

      // const profile_picture_avatar = await getDisplayProfilePicture(
      //   avatar,
      //   gender,
      // )

      // image_url.value = profile_picture_avatar
    }

    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }

    const removeProfilePicture = async () => {
      is_loading.value = true
      const response = await deleteProfilePicture(auth_user.value._id)
      const { error, data, status } = response

      if (error || status === 400 || !data) return (is_loading.value = false)

      await store.dispatch('users/getAuthUser', auth_user.value._id)

      return router.push(`/profile/${auth_user.value.username}`)
    }

    onBeforeMount(() => loadAuthUserInfo())

    return {
      onFileChange,
      image_url,
      auth_user,
      message,
      payload,
      is_loading,
      uploadPicture,
      removeProfilePicture,
      user_have_profile_picture,
    }
  },
}
</script>
<style scoped></style>
