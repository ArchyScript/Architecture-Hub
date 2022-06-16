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
            >
              Other Options
            </span>
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
              <router-link :to="{ name: 'SignUp' }">SignUp</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import OtherSigninOptions from './OtherSigninOptions.vue'
import { mapGetters, mapActions } from 'vuex'
// import axios from 'axios'

export default {
  name: 'Login',
  data: () => ({
    otherLoginOptions: false,
    loginWithEmail: true,
    passwordVisibility: true,
    email: '',
    username: '',
    password: '',
    loginToken: '',
  }),

  methods: {
    ...mapActions(['getAllUsers', 'updateLoggedInUser', 'updateUserToken']),

    toggleLoginOption(event) {
      if (!event) return
      this.loginWithEmail.value = event === 'email' ? true : false
    },

    togglePasswordVisibility() {
      // this.toggleLoginOption()
      // console.log(this)
      // console.log(this.password)
      this.passwordVisibility = !this.passwordVisibility
    },

    logUserIn(event) {
      // const router = useRouter()
      event.preventDefault()

      // axios
      //   .post('http://localhost:4000/api/auth/login', {
      //     email: 'archyscript@gmail.com',
      //     password: 'ArchyScript@10',
      //   })
      //   .then((res) => {
      //     console.log(res)
      //     console.log(res.data)
      //   })

      if (!this.email || !this.password) return console.log('empty credentials')
      console.log(this.allUsers)
      this.allUsers.forEach((eachUser) => {
        if (
          eachUser.email === this.email &&
          eachUser.password === this.password
        ) {
          this.token = 'Test token'
          this.updateUserToken(this.loginToken)
          this.updateLoggedInUser(eachUser)
          this.$router.push('/dashboard')
        } else {
          return
        }
      })
    },
  },

  components: {
    OtherSigninOptions,
  },

  computed: mapGetters(['allUsers']),

  created() {
    // const router = useRouter()
    this.getAllUsers()
  },
}
</script>

<style scoped></style>
