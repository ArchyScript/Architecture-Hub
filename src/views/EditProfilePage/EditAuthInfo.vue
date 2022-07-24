<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="px-4 my-12">
      <div class="mb-2 w-full">
        <h4 class="text-lg justify-end text-gray-700 font-medium md:text-xl">
          Update Auth Info
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
              for="email"
            >
              Email
            </label>
            <input
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="email"
              placeholder="Email"
              v-model="payload.email"
            />
          </div>

          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="username"
            >
              Username
            </label>
            <input
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="username"
              placeholder="Username"
              v-model="payload.username"
            />
          </div>
        </div>

        <div class="grid gap-1 md:gap-2 grid-cols-1 md:grid-cols-2">
          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="password"
            >
              Password
            </label>
            <input
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="password"
              placeholder="Password"
              v-model="payload.password"
            />
          </div>

          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="confirm_password"
            >
              Confirm Password
            </label>
            <input
              type="text"
              class="w-full text-sm md:text-base resize-none py-2 md:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
              name="confirm_password"
              placeholder="Confirm Password"
              v-model="payload.confirm_password"
            />
          </div>
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
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'EditAuthInfo',
  setup() {
    const store = useStore()
    const route = useRoute()
    const is_loading = ref(false)
    // const user_profile_id = ref('')
    const message = ref({ type: '', text: '' })
    const payload = ref({
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    })
    const auth_user = computed(() => store.state.users.auth_user)

    const user_data = computed(() => store.state.users)

    const loadAuthUserInfo = () => {
      const { username, email } = auth_user.value
      payload.value.username = username
      payload.value.email = email
    }

    onBeforeMount(() => {
      loadAuthUserInfo()

      // user_profile_id.value = _id
    })
    const user = computed(() => {
      return store.state.users.user
    })

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const UpdateAndSaveBio = async () => {
      is_loading.value = true
      updateResponseMessage(
        'error',
        'gn.nm;hhhhhhhhhhhhhhwewwwwwwwwwwwwwwwwwwwwigruipnk',
      )

      const user_id = '62a88b5875a64e7ba1a0c45d'

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
      message,
      auth_user,
      user_data,
      UpdateAndSaveBio,
      updateResponseMessage,
    }
  },
}
</script>
<style scoped></style>
