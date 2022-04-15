<template>
  <section>
    <!-- component -->
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div
        class="container max-w-sm md:max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2"
      >
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <div>
            <h1 class="mb-8 text-3xl text-center">Create Account</h1>
          </div>

          <form @submit="signUserUp">
            <div class="">
              <div class="mb-6 hidden">
                Login with
                <span
                  title="Login with Username and password"
                  @click="toggleLoginOption('username')"
                  class="cursor-pointer px-3 py-1 mx-1 rounded-xl border border-solid border-gray-100"
                  :class="!loginWithEmail ? 'border-green-600  ' : ''"
                  >Username</span
                >
                or
                <span
                  title="Login with Email and password"
                  @click="toggleLoginOption('email')"
                  class="cursor-pointer px-3 py-1 mx-1 rounded-xl border border-solid border-gray-100"
                  :class="loginWithEmail ? 'border-green-600 ' : ''"
                  >Email</span
                >
              </div>

              <div class="my-1 p-2">
                <input
                  v-if="loginWithEmail"
                  type="text"
                  class="block border rounded-xl border-grey-light w-full p-3 mb-4 outline-none"
                  name="email"
                  placeholder="Email"
                  v-model="email"
                />

                <input
                  v-if="!loginWithEmail"
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded-xl mb-4 outline-none"
                  name="username"
                  placeholder="Username"
                  v-model="username"
                />
              </div>
            </div>

            <div class="my-1 p-2">
              <input
                type="password"
                class="block border border-grey-light w-full p-3 rounded-xl mb-4 outline-none"
                name="password"
                placeholder="Password"
                v-model="password"
              />
            </div>

            <div class="text-sm text-grey-dark mt-4">
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

  export default {
    name: 'SignUp',
    setup() {
      const loginWithEmail = ref(true)
      const email = ref('')
      const username = ref('')
      const password = ref('')

      const toggleLoginOption = (event) => {
        loginWithEmail.value = event === 'email' ? true : false
      }

      const signUserUp = (event) => {
        event.preventDefault()
      }
      return {
        email,
        username,
        password,
        loginWithEmail,
        toggleLoginOption,
        signUserUp,
      }
    },
  }
</script>

<style scoped></style>
