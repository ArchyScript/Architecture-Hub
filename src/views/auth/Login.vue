<template>
  <section>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div
        class="container max-w-sm md:max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2"
      >
        <div
          class="my-10 bg-white px-3 sm:px-6 py-8 shadow-lg text-black w-full rounded-tl-3xl rounded-tr-3xl"
        >
          <div>
            <h1
              class="mb-8 text-2xl md:text-3xl text-center font-semibold text-gray-700"
            >
              Login
            </h1>
          </div>

          <div class="flex items-center justify-center mt-4 mb-8 px-2">
            <span
              class="cursor-pointer text-sm md:text-base flex-1 text-center py-2 font-medium text-gray-700 rounded-tl-lg rounded-bl-lg border bordder-solid border-gray-300"
              :class="
                login_with_email
                  ? 'border-archyhub-main text-archyhub-main'
                  : ''
              "
              @click="login_with_email = true"
            >
              Email
            </span>

            <span
              class="cursor-pointer flex-1 text-sm md:text-base text-center py-2 font-medium text-gray-700 rounded-tr-lg rounded-br-lg border bordder-solid border-gray-300"
              :class="
                login_with_email
                  ? ' '
                  : 'border-archyhub-main   text-archyhub-main'
              "
              @click="login_with_email = false"
            >
              Username
            </span>
          </div>

          <div
            v-if="message.type !== ''"
            :class="
              message.type === 'error' ? 'text-red-500' : 'text-green-500'
            "
            class="text-sm sm:text-base text-center font-normal mb-4"
          >
            {{ message.text }}
          </div>

          <div>
            <form @submit.prevent="logUserIn">
              <div class="p-1 mb-3" v-if="login_with_email">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
                  for="email"
                >
                  Email
                </label>

                <input
                  @input="resetErrorMessages"
                  type="text"
                  class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
                  name="email"
                  placeholder="Email"
                  v-model="payload.email"
                />
              </div>

              <div class="p-1 mb-3" v-if="!login_with_email">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
                  for="username"
                >
                  Username
                </label>

                <input
                  @input="resetErrorMessages"
                  type="text"
                  class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
                  name="username"
                  placeholder="Username"
                  v-model="payload.username"
                />
              </div>

              <div class="mb-3 p-1">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600"
                  for="password"
                >
                  Password
                </label>
                <div class="relative">
                  <input
                    @input="resetErrorMessages"
                    :type="password_visibility ? 'text' : 'password'"
                    class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none pr-14 text-sm sm:text-base"
                    name="password"
                    placeholder="Password"
                    v-model="payload.password"
                    title="toggle password visibility"
                  />
                  <span
                    class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-3 sm:px-4 rounded-lg sm:rounded-xl cursor-pointer"
                    @click="togglePasswordVisibility"
                  >
                    <i
                      class="fa text-lg sm:text-xl"
                      :class="
                        password_visibility
                          ? 'fa fa-eye-slash text-gray-500'
                          : ' fa-eye  text-gray-700'
                      "
                    ></i>
                  </span>
                </div>
              </div>

              <div
                class="text-grey-dark px-2 my-6 text-right underline text-sm sm:text-base"
              >
                <router-link :to="{ name: 'ResetPassword' }">
                  Forgot Password?
                </router-link>
              </div>

              <div class="mb-1 py-3 p-1">
                <button
                  type="submit"
                  class="w-full text-center py-2 sm:py-3 rounded-lg sm:rounded-xl bg-archyhub-main text-white outline-none my-1"
                >
                  <div
                    class="w-full flex justify-center items-center space-x-2"
                  >
                    <span>Login</span>

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

          <div class="text-gray-700 mt-6 text-center text-sm sm:text-base">
            Don't have an account?

            <span class="underline ml-1">
              <router-link :to="{ name: 'SignUp' }">SignUp</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
import { AuthApiService } from '@/controller/api/auth.api'
import { HandleTokenResponse } from '@/controller/utilities/axios_return_response'

export default {
  name: 'Login',

  setup() {
    const store = useStore()
    const is_typing = ref(true)
    const is_loading = ref(false)
    const login_with_email = ref(true)
    const login_method = ref('')
    const password_visibility = ref(true)
    const message = ref({ type: '', text: '' })
    const payload = ref({
      email: '',
      username: '',
      password: '',
    })

    const togglePasswordVisibility = () => {
      password_visibility.value = !password_visibility.value
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

    const logUserIn = async (event: any) => {
      is_loading.value = true
      updateResponseMessage('', '')
      login_method.value =
        login_with_email.value === true ? 'email' : 'username'

      let token = ''
      let auth_user_id = ''

      const { email, username, password } = payload.value
      const email_login_payload = { email, password }
      const username_login_payload = { username, password }

      //
      if (login_method.value === 'email') {
        const response = await AuthApiService.loginWithEmail(
          email_login_payload,
        )

        const { data, status, error } = response

        if (error) return updateResponseMessage('error', error)

        if (!status || status === 400 || !data)
          return updateResponseMessage(
            'error',
            'Sorry, an unknown error occurred... Check connection',
          )

        token = data.token
        auth_user_id = await HandleTokenResponse(token)
      }

      //
      if (login_method.value === 'username') {
        const response = await AuthApiService.loginWithUsername(
          username_login_payload,
        )
        const { data, status, error } = response

        if (error) return updateResponseMessage('error', error)

        if (!status || status === 400 || !data)
          return updateResponseMessage(
            'error',
            'Sorry, an unknown error occurred... Check connection',
          )

        token = data.token
        auth_user_id = await HandleTokenResponse(token)
      }

      updateResponseMessage(
        'success',
        "You've successfully logged in, you'll be redirected in a moment",
      )

      await assignToken(token)
      await fetchAuthUser(auth_user_id)

      is_loading.value = false
      updateResponseMessage('', '')

      //
      return router.push('/')
    }

    //
    async function fetchAuthUser(_id: any) {
      await store.dispatch('users/getAuthUser', _id)
    }
    async function assignToken(token: any) {
      await store.dispatch('users/assignToken', token)
    }

    return {
      login_with_email,
      password_visibility,
      is_loading,
      message,
      payload,
      resetErrorMessages,
      togglePasswordVisibility,
      logUserIn,
    }
  },
}
</script>

<style scoped></style>
