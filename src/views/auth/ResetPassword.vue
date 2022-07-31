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
              Reset Password
            </h1>
          </div>

          <div
            v-if="message.type !== ''"
            :class="
              message.type === 'error' ? 'text-red-500' : 'text-green-500'
            "
            class="text-center font-medium mb-4"
          >
            {{ message.text }}
          </div>

          <div>
            <form @submit.prevent="resetUserPassword">
              <div class="mb-1 p-1">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600"
                  for="password"
                >
                  Email
                </label>

                <input
                  @input="resetErrorMessages(false)"
                  class="block border w-full p-3 rounded-xl outline-none pr-14"
                  name="email"
                  type="email"
                  placeholder="Email"
                  v-model="payload.email"
                />
              </div>

              <div class="p-1 mb-3">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600"
                  for="username"
                >
                  Username
                </label>

                <input
                  @input="resetErrorMessages(false)"
                  type="text"
                  class="block border rounded-xl w-full p-3 outline-none"
                  name="username"
                  placeholder="Username"
                  v-model="payload.username"
                />
              </div>

              <div class="mb-1 p-1">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600"
                  for="password"
                >
                  New Password
                </label>
                <div class="relative">
                  <input
                    @input="resetErrorMessages(false)"
                    :type="password_visibility ? 'text' : 'password'"
                    class="block border w-full p-3 rounded-xl outline-none pr-14"
                    name="new_password"
                    placeholder="new password"
                    v-model="payload.new_password"
                    title="toggle password visibility"
                  />
                  <span
                    class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-3 sm:px-4 border border-gray-300 border-solid rounded-xl cursor-pointer"
                    @click="togglePasswordVisibility"
                  >
                    <i
                      class="fa text-xl"
                      :class="
                        password_visibility
                          ? 'fa fa-eye-slash text-gray-500'
                          : ' fa-eye  text-gray-800'
                      "
                    ></i>
                  </span>
                </div>
              </div>

              <div class="mb-1 p-1">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600"
                  for="confirm_new_password"
                >
                  Confirm New Password
                </label>
                <div class="relative">
                  <input
                    @input="resetErrorMessages(false)"
                    :type="password_visibility ? 'text' : 'password'"
                    class="block border w-full p-3 rounded-xl outline-none pr-14"
                    name="confirm_new_password"
                    placeholder="confirm new password"
                    v-model="payload.confirm_new_password"
                    title="toggle password visibility"
                  />
                  <span
                    class="absolute top-0 h-full flex items-center justify-center my-auto right-0 px-3 sm:px-4 border border-gray-300 border-solid rounded-xl cursor-pointer"
                    @click="togglePasswordVisibility"
                  >
                    <i
                      class="fa text-xl"
                      :class="
                        password_visibility
                          ? 'fa fa-eye-slash text-gray-500'
                          : ' fa-eye  text-gray-800'
                      "
                    ></i>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                class="w-full text-center py-3 rounded-xl bg-archyhub-main text-white focus:outline-none my-1"
              >
                <div class="w-full flex justify-center items-center space-x-2">
                  <span>
                    Reset Password
                  </span>

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

          <div class="text-grey-dark mt-6 text-center">
            Remembered Password?

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
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { AuthApiService } from '@/controller/api/auth.api'
import router from '@/router'

export default {
  name: 'ResetPassword',
  setup() {
    const store = useStore()
    const route = useRoute()
    const is_loading = ref(false)
    const is_typing = ref(true)
    const email = ref('')
    const password_visibility = ref(true)
    const message = ref({ type: '', text: '' })
    const payload = ref({
      email: '',
      username: '',
      new_password: '',
      confirm_new_password: '',
    })

    const togglePasswordVisibility = () => {
      password_visibility.value = !password_visibility.value
    }

    const updateResponseMessage = (type: string, text: string) => {
      if (message.value.type === 'error') is_loading.value = false

      message.value.type = type
      message.value.text = text

      // return setTimeout(() => {
      //   return updateResponseMessage('', '')
      // }, 5000)
    }

    const resetErrorMessages = (current_typing_state: boolean) => {
      // is_typing.value = current_typing_state
      // if (is_typing.value)
      is_loading.value = false
      updateResponseMessage('', '')
    }

    const resetUserPassword = async () => {
      // event.preventDefault()
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

      router.push('/auth/login')
    }

    return {
      email,
      password_visibility,
      is_loading,
      message,
      payload,
      is_typing,
      togglePasswordVisibility,
      resetUserPassword,
      resetErrorMessages,
    }
  },
}
</script>

<style scoped></style>
