<template>
  <section class="mb-6 inset-x-0 pb-4">
    <div class="flex justify-center ">
      <input
        @change="onFileChange"
        class="hidden"
        type="file"
        name="profile_picture"
        id="profile_picture"
        accept="image/gif, image/jpeg, image/png"
      />
    </div>

    <form @submit.prevent="uploadPicture">
      <div class="w-full mt-16 px-4">
        <div class="h-96 w-full border shadow-md bg-archyhub-light rounded-3xl">
          <img
            v-if="payload"
            :src="image_url"
            class="w-full h-full rounded-3xl object-cover"
          />
        </div>

        <div
          v-if="message.type !== ''"
          :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
          class="text-center font-medium mt-4"
        >
          {{ message.text }}
        </div>

        <div class="flex items-center gap-10 justify-around mt-6">
          <label
            class="w-full text-center cursor-pointer py-3 rounded-xl bg-gray-600 text-white hover:bg-green-dark focus:outline-none my-1"
            for="profile_picture"
          >
            {{ payload ? 'Change Picture' : 'Choose Picture' }}
          </label>

          <button
            v-if="payload"
            type="submit"
            class="w-full cursor-pointer text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
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
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
import { uploadProfilePicture } from '@/controller/api/users.api'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'ProfilePictureUploadPage',
  setup() {
    const store = useStore()
    const image_url = ref('')
    const payload = ref(null)
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const onFileChange = (e: any) => {
      const file = e.target.files[0]

      payload.value = file
      image_url.value = URL.createObjectURL(file)
    }

    const uploadPicture = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      const user_id = '62a88b5875a64e7ba1a0c45d'

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

      await store.dispatch('users/getUser', user_id)

      is_loading.value = false

      return router.push(`/profile/${user_id}`)
    }

    return {
      onFileChange,
      image_url,
      message,
      payload,
      is_loading,
      uploadPicture,
    }
  },
}
</script>
<style scoped></style>
