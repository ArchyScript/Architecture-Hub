<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="px-4 my-12">
      <div class="mb-2 w-full">
        <h4
          class="text-base sm:text-lg uppercase justify-end text-gray-600 font-medium xl:text-xl"
        >
          Update Bio
        </h4>
      </div>

      <div
        v-if="message.type !== ''"
        :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
        class="text-sm sm:text-base text-center font-normal mb-4 px-4 sm:px-6 lg:px-8"
      >
        {{ message.text }}
      </div>

      <form
        @submit.prevent="UpdateAndSaveBio"
        class="bg-archyhub-semi-light bg-opacity-70 p-2 sm:p-4"
      >
        <div class="grid gap-1 sm:gap-2 grid-cols-1 sm:grid-cols-2">
          <div class="mb-1 sm:mb-2 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
              for="firstname"
            >
              Firstname
            </label>
            <input
              @input="resetErrorMessages"
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 sm:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="firstname"
              placeholder="Firstname"
              v-model="payload.bio.firstname"
            />
          </div>

          <div class="mb-1 sm:mb-2 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
              for="lastname"
            >
              Lastname
            </label>
            <input
              @input="resetErrorMessages"
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 sm:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="lastname"
              placeholder="Lastname"
              v-model="payload.bio.lastname"
            />
          </div>
        </div>

        <div class="grid gap-1 sm:gap-2 grid-cols-1 sm:grid-cols-2">
          <div class="mb-1 sm:mb-2 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
              for="display_name"
            >
              Display Name
            </label>
            <input
              @input="resetErrorMessages"
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 sm:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="display_name"
              placeholder="display name"
              v-model="payload.bio.display_name"
            />
          </div>

          <div class="mb-1 sm:mb-2 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
              for="gender"
            >
              Gender: "{{ payload.bio.gender }}"
            </label>

            <select
              @change="resetErrorMessages"
              v-model="payload.bio.gender"
              class="w-full text-sm md:text-base resize-none py-2 sm:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none cursor-pointer rounded-lg"
            >
              <option disabled value="">Please select one</option>
              <option class="bg-archyhub-light bg-opacity-75 cursor-pointer">
                Male
              </option>
              <option>Female</option>
              <option>Annonymous</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col w-full mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
            for="description"
          >
            Description
          </label>

          <textarea
            @input="resetErrorMessages"
            class="w-full text-sm md:text-base resize-none py-3 px-2 mb-3 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
            rows="4"
            v-model="payload.bio.description"
            name="description"
            placeholder="Describe yourself..."
          ></textarea>
        </div>

        <div class="my-2 px-1">
          <button
            type="submit"
            class="w-full text-center text-sm sm:text-base py-2 sm:py-3 rounded-lg sm:rounded-xl bg-archyhub-main text-white outline-none my-1"
          >
            <div class="w-full flex justify-center items-center space-x-2">
              <span>Update and Save</span>

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
    </div>
  </section>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'
import { updateUserBio } from '@/controller/api/users.api'

export default {
  name: 'EditBio',
  setup() {
    const store = useStore()
    const route = useRoute()
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const selected_gender = ref('')
    const payload = ref({
      bio: {
        firstname: '',
        lastname: '',
        display_name: '',
        gender: '',
        description: '',
      },
    })
    const auth_user = computed(() => store.state.users.auth_user)

    const loadAuthUserInfo = () => {
      const { bio } = auth_user.value
      payload.value.bio.gender = bio.gender
      payload.value.bio.firstname = bio.firstname
      payload.value.bio.display_name = bio.display_name
      payload.value.bio.description = bio.description
      payload.value.bio.lastname = bio.lastname
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

    const UpdateAndSaveBio = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      const user_id = auth_user.value._id

      const response: any = await updateUserBio(user_id, payload.value)
      const { error, data, status } = response

      if (error) return updateResponseMessage('error', error)

      if (!status || status === 400 || !data)
        return updateResponseMessage(
          'error',
          'Sorry, an unknown error occurred... Check connection',
        )

      updateResponseMessage(
        'success',
        'Profile successfully updated, please wait...',
      )

      await fetchAuthUser()
      is_loading.value = false
      router.push(`/profile/${auth_user.value.username}`)
    }

    async function fetchAuthUser() {
      await store.dispatch('users/getAuthUser', auth_user.value._id)
    }

    onBeforeMount(async () => await loadAuthUserInfo())

    return {
      payload,
      is_loading,
      selected_gender,
      message,
      auth_user,
      UpdateAndSaveBio,
      updateResponseMessage,
      resetErrorMessages,
    }
  },
}
</script>
<style scoped></style>
