<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="px-4 my-8">
      <div class="mb-2 w-full">
        <h6
          class="text-xs text-center justify-end uppercase text-red-800 font-semibold md:font-bold md:text-sm"
        >
          ***If you update this section, you no longer have access to the old
          email and username and you will be required to login with the updated
          details***
        </h6>

        <h4
          class="text-base mt-6 sm:text-lg uppercase justify-end text-gray-600 font-medium xl:text-xl"
        >
          Update Auth Info
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
        <div
          class="grid gap-1 md:gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2"
        >
          <div class="mb-1 sm:mb-2 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
              for="email"
            >
              Email
            </label>

            <div class="relative">
              <input
                :class="
                  is_email_edit_option_locked
                    ? 'cursor-not-allowed pr-10'
                    : 'cursor-text pr-12'
                "
                type="email"
                class="w-full text-sm md:text-base resize-none py-2 sm:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
                name="email"
                placeholder="Email"
                v-model="payload.email"
                :readonly="is_email_edit_option_locked ? true : false"
              />

              <span
                class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-2 sm:px-3 py-1 rounded-xl cursor-pointer"
                @click="
                  is_email_edit_option_locked = !is_email_edit_option_locked
                "
                :title="
                  is_email_edit_option_locked ? 'Start Edit' : 'Stop Edit'
                "
              >
                <span
                  :class="
                    is_email_edit_option_locked
                      ? 'fa fa-lock  text-gray-700'
                      : 'fa fa-unlock text-gray-500'
                  "
                  class="fa text-lg sm:text-xl"
                ></span>
              </span>
            </div>
          </div>

          <div class="mb-1 sm:mb-2 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
              for="username"
            >
              Username
            </label>

            <div class="relative">
              <input
                :class="
                  is_username_edit_option_locked
                    ? 'cursor-not-allowed pr-10'
                    : 'cursor-text pr-12'
                "
                type="text"
                class="w-full text-sm md:text-base resize-none py-2 sm:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
                name="username"
                placeholder="Username"
                v-model="payload.username"
                :readonly="is_username_edit_option_locked ? true : false"
              />

              <span
                class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-2 sm:px-3 py-1 rounded-xl cursor-pointer"
                @click="
                  is_username_edit_option_locked = !is_username_edit_option_locked
                "
                :title="
                  is_username_edit_option_locked ? 'Start Edit' : 'Stop Edit'
                "
              >
                <span
                  :class="
                    is_username_edit_option_locked
                      ? 'fa fa-lock  text-gray-700'
                      : 'fa fa-unlock text-gray-500'
                  "
                  class="fa text-lg sm:text-xl"
                ></span>
              </span>
            </div>
          </div>
        </div>

        <div class="grid gap-1 sm:gap-2 xl:gap-1 grid-cols-1">
          <div class="mb-1 sm:mb-2 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
              for="password"
            >
              Password
            </label>

            <div class="relative">
              <input
                :class="password_visibility ? ' pr-10' : 'cursor-text pr-12'"
                class="w-full text-sm md:text-base resize-none py-2 sm:py-3 px-3 md:px-4 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
                name="password"
                placeholder="Password"
                v-model="payload.password"
                :type="password_visibility ? 'text' : 'password'"
              />

              <span
                class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-2 sm:px-3 py-1 rounded-xl cursor-pointer"
                @click="password_visibility = !password_visibility"
                :title="password_visibility ? 'Hide Password' : 'Show Password'"
              >
                <span
                  :class="
                    password_visibility
                      ? 'fa fa-eye  text-gray-700'
                      : 'fa fa-eye-slash text-gray-500'
                  "
                  class="fa text-lg sm:text-xl"
                ></span>
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8 px-1">
          <button
            type="submit"
            class="w-full text-center py-2 sm:py-3 rounded-xl bg-archyhub-main text-white outline-none"
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
import { updateUserAuth } from '@/controller/api/users.api'
import router from '@/router'

export default {
  name: 'EditAuthInfo',
  setup() {
    const store = useStore()
    const route = useRoute()
    const is_loading = ref(false)
    const is_email_edit_option_locked = ref(true)
    const password_visibility = ref(false)
    const is_username_edit_option_locked = ref(true)
    const message = ref({ type: '', text: '' })
    const payload = ref({
      username: '',
      email: '',
      password: '',
    })
    const auth_user = computed(() => store.state.users.auth_user)

    const loadAuthUserInfo = () => {
      const { username, email } = auth_user.value

      payload.value.username = username
      payload.value.email = email
    }

    onBeforeMount(() => {
      loadAuthUserInfo()
    })

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const UpdateAndSaveBio = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      const user_id = auth_user.value._id

      const response: any = await updateUserAuth(user_id, payload.value)
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

      await fetchAuthUser()
      await fetchUsers()
      is_loading.value = false
      // router.push(`/profile/${auth_user.value.username}`)

      await assignToken(null)
      // router.push('/auth/login')
    }

    async function assignToken(token: any) {
      await store.dispatch('users/assignToken', token)
    }
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchAuthUser() {
      await store.dispatch('users/getAuthUser', auth_user.value._id)
    }

    return {
      payload,
      is_loading,
      message,
      is_username_edit_option_locked,
      is_email_edit_option_locked,
      password_visibility,
      auth_user,
      UpdateAndSaveBio,
      updateResponseMessage,
    }
  },
}
</script>
<style scoped></style>
