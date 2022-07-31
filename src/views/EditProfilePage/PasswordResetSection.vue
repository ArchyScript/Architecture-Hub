<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="px-4 my-8">
      <div class="mb-2 w-full">
        <h6
          class="text-xs text-center justify-end uppercase text-red-800 font-semibold md:font-bold md:text-sm"
        >
          ***If you change your password, you will be redirected to the login
          page and required to login with the new password***
        </h6>
        <h4
          class="text-lg mt-4 uppercase justify-end text-gray-700 font-medium md:text-xl"
        >
          Reset Password
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
        @submit.prevent="resetPasssword"
        class="bg-archyhub-light bg-opacity-40 p-3"
      >
        <div
          class="grid gap-1 md:gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2"
        >
          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="email"
            >
              Email
            </label>

            <div class="relative">
              <input
                type="email"
                class="w-full cursor-not-allowed text-sm md:text-base resize-none py-2 md:py-3 pl-3 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
                name="email"
                placeholder="Email"
                v-model="payload.email"
                readonly
              />
            </div>
          </div>

          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="username"
            >
              Username
            </label>

            <div class="relative">
              <input
                type="text"
                class="w-full cursor-not-allowed text-sm md:text-base resize-none py-2 md:py-3 pl-3 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
                name="username"
                placeholder="Username"
                v-model="payload.username"
                readonly
              />
              <!-- :readonly="is_username_edit_option_locked ? true : false" -->

              <!-- <span
                class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-2 sm:px-3 py-1 border border-gray-300 border-solid rounded-xl cursor-pointer"
                @click="
                  is_username_edit_option_locked = !is_username_edit_option_locked
                "
                :title="
                  is_username_edit_option_locked ? 'Start Edit' : 'Stop Edit'
                "
              >
                <i
                  :class="
                    is_username_edit_option_locked
                      ? 'fa fa-lock  text-gray-800'
                      : 'fa fa-unlock text-gray-500'
                  "
                  class="fa text-xl"
                ></i>
              </span> -->
            </div>
          </div>
        </div>

        <div
          class="grid gap-1 md:gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2"
        >
          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="new_password"
            >
              New Password
            </label>

            <div class="relative">
              <input
                @input="resetErrorMessages"
                :class="password_visibility ? ' pr-10' : 'cursor-text pr-12'"
                class="w-full text-sm md:text-base resize-none py-2 md:py-3 pl-3 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
                name="password"
                placeholder="Password"
                v-model="payload.new_password"
                :type="password_visibility ? 'text' : 'password'"
              />

              <span
                class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-2 sm:px-3 py-1 border border-gray-300 border-solid rounded-xl cursor-pointer"
                @click="password_visibility = !password_visibility"
                :title="password_visibility ? 'Hide Password' : 'Show Password'"
              >
                <span
                  :class="
                    password_visibility
                      ? 'fa fa-eye  text-gray-800'
                      : 'fa fa-eye-slash text-gray-500'
                  "
                  class="fa text-xl"
                ></span>
              </span>
            </div>
          </div>

          <div class="mb-1 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-500"
              for="new_password"
            >
              Confirm New Password
            </label>

            <div class="relative">
              <input
                @input="resetErrorMessages"
                :class="password_visibility ? ' pr-10' : 'cursor-text pr-12'"
                class="w-full text-sm md:text-base resize-none py-2 md:py-3 pl-3 text-gray-500 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
                name="confirm_new_password"
                placeholder="Password"
                v-model="payload.confirm_new_password"
                :type="password_visibility ? 'text' : 'password'"
              />

              <span
                class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-2 sm:px-3 py-1 border border-gray-300 border-solid rounded-xl cursor-pointer"
                @click="password_visibility = !password_visibility"
                :title="password_visibility ? 'Hide Password' : 'Show Password'"
              >
                <span
                  :class="
                    password_visibility
                      ? 'fa fa-eye  text-gray-800'
                      : 'fa fa-eye-slash text-gray-500'
                  "
                  class="fa text-xl"
                ></span>
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8 px-1">
          <button
            type="submit"
            class="w-full text-center py-3 rounded-xl bg-archyhub-main text-white hover:bg-green-dark focus:outline-none"
          >
            <div class="w-full flex justify-center items-center space-x-2">
              <span>Reset Password</span>

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
import { AuthApiService } from '@/controller/api/auth.api'

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
      new_password: '',
      confirm_new_password: '',
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

    const resetErrorMessages = (current_typing_state: boolean) => {
      // is_typing.value = current_typing_state
      // if (is_typing.value)
      is_loading.value = false
      updateResponseMessage('', '')
    }

    const resetPasssword = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      const response = await AuthApiService.resetPassword(payload.value)
      const { data, status, error } = response

      if (error) return updateResponseMessage('error', error)

      if (!status || status === 400 || !data)
        return updateResponseMessage(
          'error',
          'Sorry, an unknown error occurred... Check connection',
        )

      console.log(data)

      is_loading.value = false
      await assignToken(null)
      // router.push('/auth/login')
    }

    async function assignToken(token: any) {
      await store.dispatch('users/assignToken', token)
    }

    //
    return {
      payload,
      is_loading,
      message,
      is_username_edit_option_locked,
      is_email_edit_option_locked,
      password_visibility,
      auth_user,
      resetPasssword,
      resetErrorMessages,
      updateResponseMessage,
    }
  },
}
</script>
<style scoped></style>
