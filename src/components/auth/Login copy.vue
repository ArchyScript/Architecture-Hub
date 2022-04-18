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
            <!-- <span class="flex justify-center items-center my-2">
              <img
                :src="require('@/assets/logo.png')"
                loading="lazy"
                class="w-16 flex items-center justify-center text-center"
                alt="tailus logo"
              />
            </span> -->

            <h1 class="mb-8 text-3xl text-center font-semibold text-gray-700">
              Login
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
            <form @submit="logUserIn">
              <div class="">
                <div class="mb-6 hidden">
                  Login with
                  <span
                    title="Login with Username and password"
                    class="cursor-pointer px-3 py-1 mx-1 rounded-xl border border-solid border-gray-100"
                    :class="!loginWithEmail ? 'border-green-600  ' : ''"
                    @click="toggleLoginOption('username')"
                    >Username</span
                  >
                  or
                  <span
                    title="Login with Email and password"
                    class="cursor-pointer px-3 py-1 mx-1 rounded-xl border border-solid border-gray-100"
                    :class="loginWithEmail ? 'border-green-600 ' : ''"
                    @click="toggleLoginOption('email')"
                    >Email</span
                  >
                </div>

                <div class="p-1 mb-3">
                  <label
                    class="block mb-1 mx-2 font-medium text-gray-600"
                    for="email"
                    >{{ loginWithEmail ? 'Email' : 'Username' }}</label
                  >

                  <input
                    v-if="loginWithEmail"
                    type="text"
                    class="block border rounded-xl w-full p-3 outline-none"
                    name="email"
                    placeholder="Email"
                    v-model="email"
                  />

                  <input
                    v-if="!loginWithEmail"
                    type="text"
                    class="block border w-full p-3 rounded-xl outline-none"
                    name="username"
                    placeholder="Username"
                    v-model="username"
                  />
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
                          : ' fa-eye  text-gray-800'
                      "
                    ></i>
                    <!-- <i
                  class="fa fa-eye text-4xl"
                  :class="
                    passwordVisibility ? 'fa fa-eye text-gray-500' : 'text-gray-800'
                  "
                  @click="togglePasswordVisibility"
                ></i> -->
                  </span>
                </div>
              </div>

              {{ user }} <br />
              {{ double }}<br />
              {{ increment }}<br />
              {{ asyncIncrement }}<br />

              <div class="text-grey-dark my-6 text-right underline">
                <router-link :to="{ name: 'ResetPassword' }">
                  Forgot Password?
                </router-link>
              </div>

              <button
                type="submit"
                class="w-full text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Login
              </button>
            </form>
          </div>

          <div v-if="otherLoginOptions" class="my-12">
            <OtherSigninOptions />
          </div>

          <div class="text-grey-dark mt-6 text-center">
            Don't have an account?

            <span class="underline ml-1">
              <router-link :to="{ name: 'SignUp' }"> SignUp</router-link>
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
  import { useStore, mapGetters } from 'vuex'
  import { computed } from 'vue'

  export default {
    name: 'Login',

    components: {
      OtherSigninOptions,
    },

    computed: {
      ...mapGetters(['allUsers']),
    },

    created() {
      console.log(this.allUsers)
    },
    setup() {
      const store = useStore()

      const otherLoginOptions = ref(false)
      const loginWithEmail = ref(true)
      const passwordVisibility = ref(true)
      const email = ref('')
      const username = ref('')
      const password = ref('')

      // const testing = computed(() => {
      //   return store
      // }),
      //
      const user = computed(() => {
        // console.log(store.state.allUsers)
        return store.state.allUsers
      })
      // access a getter in computed function
      const double = computed(() => store.getters.double)
      // access a mutation
      const increment = () => store.commit('increment')

      // access an action
      const asyncIncrement = () => store.dispatch('asyncIncrement')

      // const loadStore = () => {}
      // const checkoutStatus = computed(() => store.state.cart.checkoutStatus)
      // const products = computed(() => store.getters['cart/cartProducts'])
      // const total = computed(() => store.getters['cart/cartTotalPrice'])

      const toggleLoginOption = (event) => {
        // console.log(store)
        loginWithEmail.value = event === 'email' ? true : false
      }

      const togglePasswordVisibility = () => {
        passwordVisibility.value = !passwordVisibility.value
      }

      const logUserIn = (event) => {
        event.preventDefault()
      }
      return {
        email,
        username,
        password,
        loginWithEmail,
        toggleLoginOption,
        logUserIn,
        passwordVisibility,
        togglePasswordVisibility,
        otherLoginOptions,
        // state
        user,
        // access a getter in computed function
        double,
        // access a mutation
        increment,
        // access an action
        asyncIncrement,
      }
    },
  }
</script>

<style scoped></style>
