<template>
  <section>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div
        class="container max-w-sm md:max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2"
      >
        <div
          class="my-10 bg-white px-6 py-8 shadow-lg text-black w-full rounded-tl-3xl rounded-tr-3xl"
        >
          <div>
            <h1 class="mb-8 text-3xl text-center font-semibold text-gray-700">
              Login
            </h1>
          </div>

          <!-- <div class="flex items-center mt-4 mb-8">
            <span
              class="cursor-pointer flex-1 text-center py-2 font-semibold text-gray-700 px-6 rounded-tl-lg rounded-bl-lg border bordder-solid border-gray-300"
              :class="
                otherLoginOptions ? ' ' : 'border-green-600   text-green-600'
              "
              @click="otherLoginOptions = false"
            >
              Email
            </span>

            <span
              class="cursor-pointer flex-1 text-center py-2 font-semibold text-gray-700 px-6 rounded-tr-lg rounded-br-lg border bordder-solid border-gray-300"
              :class="
                otherLoginOptions ? 'border-green-600 text-green-600' : ''
              "
              @click="otherLoginOptions = true"
            >
              Other Options
            </span>
          </div> -->

          <div
            v-if="message.type !== ''"
            :class="
              message.type === 'error' ? 'text-red-500' : 'text-green-500'
            "
            class="text-center font-medium mb-4"
          >
            {{ message.text }}
          </div>

          <div v-if="!otherLoginOptions">
            <form @submit="logUserIn">
              <div class="">
                <div class="mb-6 hidden">
                  Login with
                  <span
                    title="Login with Username and password"
                    class="cursor-pointer px-3 py-1 mx-1 rounded-xl border border-solid border-gray-100"
                    :class="!loginWithEmail ? 'border-green-600  ' : ''"
                    @click="toggleLoginOption('username')"
                  >
                    Username
                  </span>
                  or
                  <span
                    title="Login with Email and password"
                    class="cursor-pointer px-3 py-1 mx-1 rounded-xl border border-solid border-gray-100"
                    :class="loginWithEmail ? 'border-green-600 ' : ''"
                    @click="toggleLoginOption('email')"
                  >
                    Email
                  </span>
                </div>

                <div class="p-1 mb-3">
                  <label
                    class="block mb-1 mx-2 font-medium text-gray-600"
                    for="email"
                  >
                    {{ loginWithEmail ? 'Email' : 'Username' }}
                  </label>

                  <input
                    v-if="loginWithEmail"
                    type="text"
                    class="block border rounded-xl w-full p-3 outline-none"
                    name="email"
                    placeholder="Email"
                    v-model="payload.email"
                  />

                  <input
                    v-if="!loginWithEmail"
                    type="text"
                    class="block border w-full p-3 rounded-xl outline-none"
                    name="username"
                    placeholder="Username"
                  />
                  <!-- v-model="payload.username" -->
                </div>
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
                    :type="passwordVisibility ? 'text' : 'password'"
                    class="block border w-full p-3 rounded-xl outline-none pr-14"
                    name="password"
                    placeholder="Password"
                    v-model="payload.password"
                    title="toggle password visibility"
                  />
                  <span
                    class="absolute top-0 my-auto right-0 px-2 py-1 border border-gray-300 border-solid rounded-xl cursor-pointer"
                    @click="togglePasswordVisibility"
                  >
                    <i
                      class="fa text-4xl"
                      :class="
                        passwordVisibility
                          ? 'fa fa-eye-slash text-gray-500'
                          : ' fa-eye  text-gray-800'
                      "
                    ></i>
                  </span>
                </div>
              </div>

              <div class="text-grey-dark my-6 text-right underline">
                <router-link :to="{ name: 'ResetPassword' }">
                  Forgot Password?
                </router-link>
              </div>

              <button
                type="submit"
                class="w-full text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                <div class="w-full flex justify-center items-center space-x-2">
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
            </form>
          </div>

          <div v-if="otherLoginOptions" class="my-12">
            <OtherSigninOptions />
          </div>

          <div class="text-grey-dark mt-6 text-center">
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
import OtherSigninOptions from './OtherSigninOptions.vue'
import { ref } from 'vue'
import { AuthApiService } from '@/controller/api/auth.api'
import { useStore } from 'vuex'
import router from '@/router'
import { HandleTokenResponse } from '@/controller/utilities/axios_return_response'

export default {
  name: 'Login',
  components: {
    OtherSigninOptions,
  },
  setup() {
    const store = useStore()
    const is_loading = ref(false)
    const otherLoginOptions = ref(false)
    const loginWithEmail = ref(true)
    const passwordVisibility = ref(true)
    const payload = ref({ email: '', password: '' })
    const message = ref({ type: '', text: '' })

    const toggleLoginOption = (event: any) => {
      if (!event)
        return (loginWithEmail.value = event === 'email' ? true : false)
    }

    const togglePasswordVisibility = () => {
      passwordVisibility.value = !passwordVisibility.value
    }

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const logUserIn = async (event: any) => {
      event.preventDefault()
      is_loading.value = true
      updateResponseMessage('', '')

      const response = await AuthApiService.login(payload.value)
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

      updateResponseMessage(
        'success',
        'Login token successfully generated, please wait...',
      )

      const token = data.token
      const user_id = await HandleTokenResponse(token)

      updateResponseMessage(
        'success',
        "You've successfully logged in, you'll be redirected in a moment",
      )

      await store.dispatch('users/getUser', user_id)
      await store.dispatch('users/assignToken', token)

      is_loading.value = false
      updateResponseMessage('', '')

      // return router.push('/auth/login')
      return router.push('/')
    }

    return {
      otherLoginOptions,
      loginWithEmail,
      passwordVisibility,
      is_loading,
      message,
      payload,
      toggleLoginOption,
      togglePasswordVisibility,
      logUserIn,
    }
  },
}
</script>

<style scoped></style>
