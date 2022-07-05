<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="px-4 my-12">
      <div
        v-if="message.type !== ''"
        :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
        class="text-center font-medium my-4"
      >
        {{ message.text }}
      </div>

      <form
        @submit="UpdateAndSaveBio"
        class="bg-archyhub-light bg-opacity-40 p-3"
      >
        <div class="grid gap-2 grid-cols-2">
          <div class="mb-3 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600"
              for="firstname"
            >
              Firstname
            </label>
            <input
              type="text"
              class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
              name="firstname"
              placeholder="Firstname"
              v-model="payload.bio.firstname"
            />
          </div>

          <div class="mb-3 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600"
              for="lastname"
            >
              Lastname
            </label>
            <input
              type="text"
              class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
              name="lastname"
              placeholder="Lastname"
              v-model="payload.bio.lastname"
            />
          </div>
        </div>

        <div class="grid gap-2 grid-cols-2">
          <div class="mb-3 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600"
              for="gender"
            >
              Gender: "{{ selected_gender }}"
            </label>
            <select
              v-model="selected_gender"
              class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none cursor-pointer rounded-2xl"
            >
              <option disabled value="">Please select one</option>
              <option class="bg-archyhub-light bg-opacity-75 cursor-pointer">
                Male
              </option>
              <option>Female</option>
              <option>Preferred not to say</option>
            </select>
            <!-- <input
              type="text"
              class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
              name="firstname"
              placeholder="Firstname"
              v-model="payload.bio.firstname"
            /> -->
          </div>

          <!-- <div>Selected: {{ selected_gender }}</div>

        <select v-model="selected_gender">
          <option disabled value="">Please select one</option>
          <option>Male</option>
          <option>Female</option>
          <option>Preferred not to say</option>
        </select> -->

          <!-- <div class="mb-3 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600"
              for="lastname"
            >
              Lastname
            </label>
            <input
              type="text"
              class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
              name="lastname"
              placeholder="Lastname"
              v-model="payload.bio.lastname"
            />
          </div> -->
        </div>

        <div class="flex flex-col w-full mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600"
            for="about_me"
          >
            About Me
          </label>

          <textarea
            class="w-full text-xl resize-none py-3 px-2 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
            rows="4"
            name="about_me"
            placeholder="Describe yourself..."
          ></textarea>
        </div>

        <!-- <div class="mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600"
            for="username"
          >
            Email
          </label>
          <input
            type="email"
            readonly
            class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl cursor-not-allowed"
            name="email"
            placeholder="Email"
          />
        </div> -->

        <!-- <div class="mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600"
            for="username"
          >
            Username
          </label>
          <input
            type="text"
            class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
            name="username"
            placeholder="Username"
          />
        </div> -->

        <!-- <div class="mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600"
            for="password"
          >
            About Me
          </label>
          <textarea
            class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
            rows="5"
            placeholder="What's happening?"
          ></textarea>
        </div> -->
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

      <!-- {{ user_data }} -->
    </div>
  </section>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { updateUserData } from '@/controller/api/users.api'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'ProfileHeader',
  setup() {
    const store = useStore()
    const route = useRoute()
    const is_loading = ref(false)
    // const user_profile_id = ref('')
    const message = ref({ type: '', text: '' })
    const selected_gender = ref('Male')
    const payload = ref({
      bio: {
        firstname: '',
        lastname: '',
      },
    })
    onBeforeMount(() => {
      const { _id } = route.params

      // user_profile_id.value = _id
    })
    const user = computed(() => {
      return store.state.users.user
    })

    const user_data = computed(() => store.state.users)

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const UpdateAndSaveBio = async (e: any) => {
      e.preventDefault()
      is_loading.value = true
      updateResponseMessage('', '')

      const user_id = '62a88b5875a64e7ba1a0c45d'

      const response: any = await updateUserData(user_id, payload.value)
      const { error, data, status } = response

      if (error) {
        updateResponseMessage('error', error)
        is_loading.value = false

        return setTimeout(() => {
          return updateResponseMessage('', '')
        }, 5000)
      }

      if (!status || status === 400) {
        updateResponseMessage('error', 'Sorry, an unknown error occurred')

        return setTimeout(() => {
          is_loading.value = false
          return updateResponseMessage('', '')
        }, 5000)
      }

      // console.log(data)

      updateResponseMessage(
        'success',
        'Profile successfully updated, please wait...',
      )

      await store.dispatch('users/getUser', user_id)
      is_loading.value = false

      return data
    }

    return {
      payload,
      is_loading,
      selected_gender,
      message,
      user_data,
      UpdateAndSaveBio,
      updateResponseMessage,
    }
  },
}
</script>
<style scoped></style>
