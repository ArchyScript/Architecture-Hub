<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="px-4 my-12">
      <div class="mb-2 w-full">
        <h4 class="text-lg justify-end text-gray-700 font-medium md:text-xl">
          Update Bio
        </h4>
      </div>

      <div
        v-if="message.type !== ''"
        :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
        class="text-center font-medium my-2 flex-wrap break-all px-2"
      >
        {{ message.text }}
      </div>

      <form
        @submit.prevent="UpdateAndSaveBio"
        class="bg-archyhub-light bg-opacity-40 p-3"
      >
        <div class="grid gap-1 md:gap-2 grid-cols-1 md:grid-cols-2">
          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="firstname"
            >
              Firstname
            </label>
            <input
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="firstname"
              placeholder="Firstname"
              v-model="payload.bio.firstname"
            />
          </div>

          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="lastname"
            >
              Lastname
            </label>
            <input
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="lastname"
              placeholder="Lastname"
              v-model="payload.bio.lastname"
            />
          </div>
        </div>

        <div class="grid gap-1 md:gap-2 grid-cols-1 md:grid-cols-2">
          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="gender"
            >
              Gender: "{{ payload.bio.gender }}"
            </label>
            <select
              v-model="payload.bio.gender"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none cursor-pointer rounded-lg"
            >
              <option disabled value="">Please select one</option>
              <option class="bg-archyhub-light bg-opacity-75 cursor-pointer">
                Male
              </option>
              <option>Female</option>
              <option>Annonymous</option>
            </select>
          </div>

          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="display_name"
            >
              Display Name
            </label>
            <input
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="display_name"
              placeholder="display name"
              v-model="payload.bio.display_name"
            />
          </div>
        </div>

        <div class="flex flex-col w-full mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-500"
            for="description"
          >
            Description
          </label>

          <textarea
            class="w-full text-sm md:text-base resize-none py-3 px-2 mb-3 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
            rows="4"
            name="description"
            placeholder="Describe yourself..."
          ></textarea>
        </div>

        <div class="my-2 px-1">
          <button
            type="submit"
            class="w-full text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none"
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
// import { updateUserData } from '@/controller/api/users.api'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'

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

    onBeforeMount(async () => await loadAuthUserInfo())

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const UpdateAndSaveBio = async () => {
      is_loading.value = true
      updateResponseMessage('error', 'error')

      // const response: any = await updateUserData(user_id, payload.value)
      // const { error, data, status } = response

      // if (error) {
      //   updateResponseMessage('error', error)
      //   is_loading.value = false

      //   return setTimeout(() => {
      //     return updateResponseMessage('', '')
      //   }, 5000)
      // }

      // if (!status || status === 400) {
      //   updateResponseMessage('error', 'Sorry, an unknown error occurred')

      //   return setTimeout(() => {
      //     is_loading.value = false
      //     return updateResponseMessage('', '')
      //   }, 5000)
      // }

      // // console.log(data)

      // updateResponseMessage(
      //   'success',
      //   'Profile successfully updated, please wait...',
      // )

      // await store.dispatch('users/getUser', user_id)
      // is_loading.value = false

      // return data
    }

    return {
      payload,
      is_loading,
      selected_gender,
      message,
      auth_user,
      UpdateAndSaveBio,
      updateResponseMessage,
    }
  },
}
</script>
<style scoped></style>
