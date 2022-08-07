<template>
  <section class="flex items-center rounded-2xl sm:px-2 mt-10">
    <div class="w-full">
      <router-link
        v-if="auth_user_info.username !== ''"
        :to="`/profile/${auth_user_info.username}`"
      >
        <div
          @click="closeAllModals"
          class="mb-12 xl:mb-16 flex items-center cursor-pointer"
        >
          <span class="w-12 h-12 lg:w-14 lg:h-14 rounded-full">
            <img
              v-if="auth_user_info.profile_picture !== ''"
              class="h-full rounded-full w-full"
              :src="auth_user_info.profile_picture"
            />

            <div
              v-if="auth_user_info.profile_picture === ''"
              class="w-full h-full bg-gray-400 rounded-full animate-pulse"
            ></div>
          </span>

          <div class="flex-1 ml-2">
            <span class="text-lg block font-semibold text-gray-600 truncate">
              {{
                auth_user_info.display_name !== ''
                  ? auth_user_info.display_name
                  : auth_user_info.username
              }}
            </span>
            <span class="text-base block font-medium text-gray-500 truncate">
              @{{ auth_user_info.username }}
            </span>
          </div>
        </div>
      </router-link>

      <div
        v-if="auth_user_info.username === ''"
        class="mb-16 flex items-center cursor-pointer"
      >
        <span class="w-12 h-12 lg:w-14 lg:h-14 rounded-full">
          <div
            class="w-full h-full bg-gray-400 rounded-full animate-pulse"
          ></div>
        </span>

        <div class="flex-1 ml-2 space-y-3">
          <div class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl w-full"></div>
          <div class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl w-3/4"></div>
        </div>
      </div>

      <div class="">
        <div class="hidden md:flex flex-col space-y-2 mb-10 sm:mb-12 xl:mb-16">
          <div
            :key="navbar_link.title"
            v-for="navbar_link in navbar_links"
            class="cursor-pointer text-gray-500 hover:bg-archyhub-semi-light hover:text-gray-700 font-semibold rounded-3xl"
            :class="
              current_active_route === navbar_link.route
                ? 'bg-archyhub-semi-light text-gray-600  font-bold'
                : 'hover:bg-opacity-60'
            "
            @click="toggleCurrentActiveNavLink(navbar_link.route)"
          >
            <router-link :to="navbar_link.route">
              <div
                class="flex justify-center items-center py-2 md:py-3 space-x-2"
              >
                <!-- <span
                  :class="navbar_link.icon"
                  class="ml-3 sm:ml-4 px-2 text-base lg:text-lg"
                ></span> -->

                <span
                  class="ml-3 sm:ml-4 px-2 flex items-center justify-center"
                >
                  <svg
                    v-if="(navbar_link.title === 'Home')"
                    class="h-4 xl:h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"
                    />
                  </svg>

                  <svg
                    v-if="(navbar_link.title === 'Explore')"
                    class="h-4 sm:h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"
                    />
                  </svg>

                  <svg
                    v-if="(navbar_link.title === 'Competitions')"
                    class="h-4 sm:h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      d="M572.1 82.38C569.5 71.59 559.8 64 548.7 64h-100.8c.2422-12.45 .1076-23.7-.156-33.02C447.3 13.63 433.2 0 415.8 0H160.2c-17.35 0-31.43 13.63-31.92 30.98C127.1 40.3 127.8 51.55 128.1 64H27.26C16.16 64 6.537 71.59 3.912 82.38C3.1 85.78-15.71 167.2 37.07 245.9c37.44 55.82 100.6 95.03 187.5 117.4c18.7 4.805 31.41 22.06 31.41 41.37C256 428.5 236.5 448 212.6 448H208c-26.51 0-47.99 21.49-47.99 48c0 8.836 7.162 16 15.1 16H399.1c8.836 0 15.1-7.164 15.1-16c0-26.51-21.48-48-47.99-48h-4.644c-23.86 0-43.36-19.5-43.36-43.35c0-19.31 12.71-36.57 31.41-41.37c86.96-22.34 150.1-61.55 187.5-117.4C591.7 167.2 572.9 85.78 572.1 82.38zM77.41 219.8C49.47 178.6 47.01 135.7 48.38 112h80.39C134.1 171.6 149.1 243.1 186.4 301.1C137.4 281.6 100.8 254.4 77.41 219.8zM370 146.3l-36.34 35.3l8.58 49.98c.8945 5.227-4.584 9.207-9.273 6.742l-44.85-23.57L243.3 238.3C238.6 240.8 233.1 236.8 234 231.6l8.578-49.98L206.3 146.3C202.5 142.6 204.6 136.2 209.8 135.4l50.26-7.344l22.43-45.43c2.346-4.75 9.119-4.75 11.46 0l22.43 45.43l50.08 7.316C371.7 136.1 373.8 142.6 370 146.3zM498.6 219.8c-23.44 34.6-59.94 61.75-109 81.22C426.9 243.1 441.9 171.6 447.2 112h80.39C528.1 135.7 526.5 178.7 498.6 219.8z"
                    />
                  </svg>

                  <svg
                    v-if="(navbar_link.title === 'Scholarships')"
                    class="h-4 sm:h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      d="M288 358.3c13.98-8.088 17.53-30.04 28.88-41.39c11.35-11.35 33.3-14.88 41.39-28.87c7.98-13.79 .1658-34.54 4.373-50.29C366.7 222.5 383.1 208.5 383.1 192c0-16.5-17.27-30.52-21.34-45.73c-4.207-15.75 3.612-36.5-4.365-50.29c-8.086-13.98-30.03-17.52-41.38-28.87c-11.35-11.35-14.89-33.3-28.87-41.39c-13.79-7.979-34.54-.1637-50.29-4.375C222.5 17.27 208.5 0 192 0C175.5 0 161.5 17.27 146.3 21.34C130.5 25.54 109.8 17.73 95.98 25.7C82 33.79 78.46 55.74 67.11 67.08C55.77 78.43 33.81 81.97 25.72 95.95C17.74 109.7 25.56 130.5 21.35 146.2C17.27 161.5 .0008 175.5 .0008 192c0 16.5 17.27 30.52 21.34 45.73c4.207 15.75-3.615 36.5 4.361 50.29C33.8 302 55.74 305.5 67.08 316.9c11.35 11.35 14.89 33.3 28.88 41.4c13.79 7.979 34.53 .1582 50.28 4.369C161.5 366.7 175.5 384 192 384c16.5 0 30.52-17.27 45.74-21.34C253.5 358.5 274.2 366.3 288 358.3zM112 192c0-44.27 35.81-80 80-80s80 35.73 80 80c0 44.17-35.81 80-80 80S112 236.2 112 192zM1.719 433.2c-3.25 8.188-1.781 17.48 3.875 24.25c5.656 6.75 14.53 9.898 23.12 8.148l45.19-9.035l21.43 42.27C99.46 507 107.6 512 116.7 512c.3438 0 .6641-.0117 1.008-.0273c9.5-.375 17.65-6.082 21.24-14.88l33.58-82.08c-53.71-4.639-102-28.12-138.2-63.95L1.719 433.2zM349.6 351.1c-36.15 35.83-84.45 59.31-138.2 63.95l33.58 82.08c3.594 8.797 11.74 14.5 21.24 14.88C266.6 511.1 266.1 512 267.3 512c9.094 0 17.23-4.973 21.35-13.14l21.43-42.28l45.19 9.035c8.594 1.75 17.47-1.398 23.12-8.148c5.656-6.766 7.125-16.06 3.875-24.25L349.6 351.1z"
                    />
                  </svg>

                  <svg
                    v-if="(navbar_link.title === 'Profile')"
                    class="h-4 sm:h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                    />
                  </svg>
                </span>

                <span class="flex-1 text-base lg:text-lg">
                  {{ navbar_link.title }}
                </span>
              </div>
            </router-link>
          </div>
        </div>

        <div class="w-full text-center mb-10">
          <button
            @click="openNewPostModal"
            class="w-full text-base lg:text-lg text-archyhub-light bg-archyhub-main font-medium rounded-3xl py-3"
          >
            <span>
              {{
                route.fullPath === '/scholarships'
                  ? 'New Scholarship'
                  : route.fullPath === '/competitions'
                  ? 'New Competition'
                  : ' New Post'
              }}
            </span>
            <span class="fa fa-edit ml-2 sm:ml-3 text-base lg:text-lg"></span>
          </button>
        </div>

        <!-- <form
          class="w-full hidden left-0 bottom-0 text-center mt-20"
          @submit.prevent="logUserOut"
        >
          <button
            type="submit"
            class="w-full text-lg lg:text-xl text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-semibold rounded-3xl py-3 sm:py-3"
          >
            <div class="w-full flex justify-center items-center space-x-2">
              <span>Logout</span>

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
        </form> -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { AuthApiService } from '@/controller/api/auth.api'
import { getDisplayProfilePicture } from '@/controller/utilities'
import router from '@/router'

export default {
  name: 'NavLinks',
  components: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const current_active_route = ref('/home')
    const is_loading = ref(false)
    const auth_user = computed(() => store.state.users.auth_user)
    const auth_user_info = ref({
      profile_picture: '',
      username: '',
      display_name: '',
    })
    const navbar_links = ref([
      {
        route: '/home',
        title: 'Home',
        icon: 'fa fa-home',
      },
      {
        route: '/users',
        title: 'Explore',
        icon: 'fas fa-users',
      },
      {
        route: '/scholarships',
        title: 'Scholarships',
        icon: 'fas fa-award',
      },
      {
        route: '/competitions',
        title: 'Competitions',
        icon: 'fa fa-trophy',
      },
      {
        route: `/profile/${auth_user.value.username}`,
        title: 'Profile',
        icon: 'fa fa-user',
      },
    ])

    const toggleCurrentActiveNavLink = (active_link_route: string) => {
      current_active_route.value = active_link_route
      closeAllModals()
    }

    const getAuthUserImage = async () => {
      const {
        username,
        bio: { gender, display_name },
        profile_picture: { avatar },
      } = auth_user.value

      if (username === null || username === undefined || username === '')
        return redirectToLoginPage()

      const profile_picture = await getDisplayProfilePicture(avatar, gender)

      auth_user_info.value.profile_picture = profile_picture
      auth_user_info.value.username = username
      auth_user_info.value.display_name = display_name
    }

    const getCurrentActiveRoute = () => {
      current_active_route.value = route.fullPath
    }

    window.onkeyup = () => {
      getAuthUserImage()
      getCurrentActiveRoute()
    }
    window.onscroll = () => {
      getAuthUserImage()
      getCurrentActiveRoute()
    }
    window.onresize = () => {
      getAuthUserImage()
      getCurrentActiveRoute()
    }

    //
    const closeAllModals = async () => {
      store.dispatch('component_handler/closeAllModals')
    }

    const redirectToLoginPage = async () => {
      await store.dispatch('users/assignToken', null)

      router.push('/auth/login')
    }

    //
    onBeforeMount(async () => {
      getAuthUserImage()
      getCurrentActiveRoute()
    })

    //
    const openNewPostModal = () => {
      if (route.fullPath === '/competitions')
        return store.dispatch('component_handler/openNewCompetitionModal')
      if (route.fullPath === '/scholarships')
        return store.dispatch('component_handler/openNewScholarshipModal')
      else store.dispatch('component_handler/openNewPostModal')
    }

    const logUserOut = async () => {
      is_loading.value = true

      const response = await AuthApiService.logout()
    }

    //
    async function fetchAuthUser(_id: any) {
      await store.dispatch('users/getAuthUser', _id)
    }

    onBeforeMount(async () => {
      if (!auth_user.value._id || auth_user.value._id === undefined)
        return window.location.reload()

      await fetchAuthUser(auth_user.value._id)
      await getAuthUserImage()
    })

    return {
      route,
      navbar_links,
      current_active_route,
      auth_user_info,
      is_loading,
      openNewPostModal,
      toggleCurrentActiveNavLink,
      closeAllModals,
      logUserOut,
    }
  },
}
</script>

<style scoped></style>
