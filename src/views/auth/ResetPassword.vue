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
              Reset Password
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

          <div>
            <form @submit.prevent="resetUserPassword">
              <div class="mb-3 p-1">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
                  for="password"
                >
                  Email
                </label>

                <input
                  @input="resetErrorMessages"
                  class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
                  name="email"
                  type="email"
                  placeholder="Email"
                  v-model="payload.email"
                />
              </div>

              <div class="p-1 mb-3">
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
                  New Password
                </label>
                <div class="relative">
                  <input
                    @input="resetErrorMessages"
                    :type="password_visibility ? 'text' : 'password'"
                    class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
                    name="new_password"
                    placeholder="new password"
                    v-model="payload.new_password"
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

              <div class="mb-1 p-1">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600 text-sm sm:text-base"
                  for="confirm_new_password"
                >
                  Confirm New Password
                </label>

                <div class="relative">
                  <input
                    @input="resetErrorMessages"
                    :type="password_visibility ? 'text' : 'password'"
                    class="block border rounded-lg sm:rounded-xl w-full p-2 sm:p-3 outline-none text-sm sm:text-base"
                    name="confirm_new_password"
                    placeholder="confirm new password"
                    v-model="payload.confirm_new_password"
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

              <div class="mb-1 mt-6 p-1">
                <button
                  type="submit"
                  class="w-full text-center py-2 sm:py-3 rounded-lg sm:rounded-xl bg-archyhub-main text-white outline-none my-1"
                >
                  <div
                    class="w-full flex justify-center items-center space-x-2"
                  >
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
              </div>
            </form>
          </div>

          <div class="text-gray-700 mt-6 text-center text-sm sm:text-base">
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
      if (type === 'error') is_loading.value = false

      message.value.type = type
      message.value.text = text
    }

    const resetErrorMessages = () => {
      is_loading.value = false
      updateResponseMessage('', '')
    }

    const resetUserPassword = async () => {
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

      //
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
