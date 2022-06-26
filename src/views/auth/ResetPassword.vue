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

          <div>
            <form @submit="resetPasssword">
              <div class="mb-3 p-1">
                <label
                  class="block mb-1 mx-2 font-medium text-gray-600"
                  for="password"
                >
                  Email
                </label>

                <input
                  class="block border w-full p-3 rounded-xl outline-none pr-14"
                  name="email"
                  placeholder="Email"
                  v-model="email"
                />
              </div>

              <button
                type="submit"
                class="w-full text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Reset Password
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

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'ResetPassword',
  setup() {
    const store = useStore()
    const route = useRoute()
    const email = ref('')

    const resetPasssword = async (event) => {
      event.preventDefault()
    }

    return { email, store, route, resetPasssword }
  },
}
</script>

<style scoped></style>
