<template>
  <section>
    <!-- component -->
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div
        class="container max-w-sm md:max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2"
      >
        <div
          class="my-10 bg-white px-6 py-8 shadow-lg text-black w-full rounded-tl-3xl rounded-tr-3xl"
        >
          <div>
            <h1
              class="mb-8 text-2xl md:text-3xl text-center font-semibold text-gray-700"
            >
              Create Account
            </h1>
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

          <form @submit="signUserUp">
            <div class="mb-3 p-1">
              <label
                class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
                for="email"
              >
                Email
              </label>

              <input
                @input="resetErrorMessages"
                type="email"
                class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
                name="email"
                placeholder="Email"
                v-model="payload.email"
              />
            </div>

            <div class="mb-3 p-1">
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
                class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
                for="password"
              >
                Password
              </label>

              <div class="relative">
                <input
                  @input="resetErrorMessages"
                  :type="passwordVisibility ? 'text' : 'password'"
                  class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
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
                      passwordVisibility
                        ? 'fa fa-eye-slash text-gray-500'
                        : ' fa-eye  text-gray-700'
                    "
                  ></i>
                </span>
              </div>
            </div>

            <div class="mb-3 p-1 relative">
              <label
                class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
                for="confirm_password"
              >
                Confirm Password
              </label>

              <div class="relative">
                <input
                  @input="resetErrorMessages"
                  :type="passwordVisibility ? 'text' : 'password'"
                  class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  v-model="payload.confirm_password"
                  title="toggle password visibility"
                />
                <span
                  class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-3 sm:px-4 rounded-lg sm:rounded-xl cursor-pointer"
                  @click="togglePasswordVisibility"
                >
                  <i
                    class="fa text-lg sm:text-xl"
                    :class="
                      passwordVisibility
                        ? 'fa fa-eye-slash text-gray-500'
                        : ' fa-eye  text-gray-700'
                    "
                  ></i>
                </span>
              </div>
            </div>

            <div class="text-sm sm:text-base text-grey-dark my-6 px-2">
              By signing up, you agree to the
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>
              and
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>

            <div class="mb-1 mt-6 p-1">
              <button
                type="submit"
                class="w-full text-center py-2 sm:py-3 rounded-lg sm:rounded-xl bg-archyhub-main text-white outline-none my-1"
              >
                <div class="w-full flex justify-center items-center space-x-2">
                  <span>Create a free Account</span>

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

          <div class="text-gray-700 mt-6 text-center text-sm sm:text-base">
            Already have an account?

            <span class="underline ml-1">
              <router-link :to="{ name: 'Login' }">Login</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
import { AuthApiService } from '@/controller/api/auth.api'
import { useStore } from 'vuex'
import router from '@/router'
import { HandleTokenResponse } from '@/controller/utilities/axios_return_response'

export default {
  name: 'SignUp',

  setup() {
    const store = useStore()
    const is_loading = ref(false)
    const passwordVisibility = ref(true)
    const message = ref({ type: '', text: '' })
    const payload = ref({
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    })

    const togglePasswordVisibility = () => {
      passwordVisibility.value = !passwordVisibility.value
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

    const signUserUp = async (event: any) => {
      event.preventDefault()
      is_loading.value = true
      updateResponseMessage('', '')

      const response: any = await AuthApiService.signup(payload.value)
      const { error, data, status } = response

      if (error) return updateResponseMessage('error', error)

      if (!status || status === 400 || !data)
        return updateResponseMessage(
          'error',
          'Sorry, an unknown error occurred',
        )

      const token = data.token
      const auth_user_id = await HandleTokenResponse(token)

      updateResponseMessage(
        'success',
        "You've successfully signed up and logged in, you'll be redirected in a moment",
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
      passwordVisibility,
      is_loading,
      payload,
      message,
      togglePasswordVisibility,
      signUserUp,
      resetErrorMessages,
    }
  },
}
</script>

<style scoped></style>
