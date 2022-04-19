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
            <h1 class="mb-8 text-3xl text-center font-semibold text-gray-700">
              Create Account
            </h1>
          </div>

          <div class="flex items-center mt-4 mb-8">
            <span
              class="cursor-pointer flex-1 text-center py-2 font-semibold text-gray-700 px-6 rounded-tl-lg rounded-bl-lg border bordder-solid border-gray-300"
              :class="
                otherLoginOptions ? ' ' : 'border-green-600   text-green-600'
              "
              @click="otherLoginOptions = false"
            >
              Email
              <!-- or Username -->
            </span>

            <span
              class="cursor-pointer flex-1 text-center py-2 font-semibold text-gray-700 px-6 rounded-tr-lg rounded-br-lg border bordder-solid border-gray-300"
              :class="
                otherLoginOptions ? 'border-green-600 text-green-600' : ''
              "
              @click="otherLoginOptions = true"
              >Other Options</span
            >
          </div>

          <div v-if="!otherLoginOptions">
            <form @submit="signUserUp">
              <label
                class="block mb-1 mx-2 font-medium text-gray-600"
                for="email"
              >
                Email
              </label>
              <input
                type="email"
                class="block border border-grey-light w-full p-3 rounded-xl mb-3 outline-none"
                name="email"
                placeholder="Email"
                v-model="email"
              />

              <label
                class="block mb-1 mx-2 font-medium text-gray-600"
                for="username"
              >
                Username
              </label>
              <input
                type="text"
                class="block border border-grey-light w-full p-3 rounded-xl mb-3 outline-none"
                name="username"
                placeholder="Username"
                v-model="username"
              />

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
                    v-model="password"
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
                          : ' fa-eye  text-gray-700'
                      "
                    ></i>
                  </span>
                </div>
              </div>

              <div class="mb-3 p-1 relative">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600"
                  for="confirm_password"
                >
                  Confirm Password
                </label>

                <div class="relative">
                  <input
                    :type="passwordVisibility ? 'text' : 'password'"
                    class="block border w-full p-3 rounded-xl outline-none pr-14"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    v-model="confirm_password"
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
                          : ' fa-eye  text-gray-700'
                      "
                    ></i>
                  </span>
                </div>
              </div>

              <div class="text-sm text-grey-dark my-6 px-2">
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

              <button
                type="submit"
                class="w-full text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create a free Account
              </button>
            </form>
          </div>

          <div v-if="otherLoginOptions" class="my-12">
            <OtherSigninOptions />
          </div>

          <div class="text-grey-dark mt-6 text-center">
            Already have an account?

            <span class="underline ml-1">
              <router-link :to="{ name: 'Login' }"> Login</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { ref } from 'vue'
  import OtherSigninOptions from './OtherSigninOptions.vue'

  export default {
    name: 'SignUp',
    setup() {
      const otherLoginOptions = ref(false)
      const passwordVisibility = ref(true)
      const email = ref('')
      const username = ref('')
      const password = ref('')
      const confirm_password = ref('')

      const signUserUp = (event) => {
        event.preventDefault()

        if (password.value !== confirm_password.value)
          return alert('password not matching')
      }

      const togglePasswordVisibility = () => {
        passwordVisibility.value = !passwordVisibility.value
      }
      return {
        email,
        username,
        password,
        confirm_password,
        signUserUp,
        passwordVisibility,
        togglePasswordVisibility,
        otherLoginOptions,
      }
    },

    components: {
      OtherSigninOptions,
    },
  }
</script>

<style scoped></style>
