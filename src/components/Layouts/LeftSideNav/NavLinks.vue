<template>
  <section class="flex items-center rounded-2xl sm:px-2 mt-10">
    <div class="w-full">
      <router-link
        v-if="auth_user_info.username !== ''"
        :to="`/profile/${auth_user_info.username}`"
      >
        <div
          @click="closeAllModals"
          class="mb-16 flex items-center cursor-pointer"
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
        <div class="hidden md:flex flex-col space-y-2 mb-14 sm:mb-16 lg:mb-14">
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
                <span
                  :class="navbar_link.icon"
                  class="ml-3 sm:ml-4 px-2 text-base lg:text-lg"
                ></span>

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
