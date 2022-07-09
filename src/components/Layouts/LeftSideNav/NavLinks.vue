<template>
  <section class="flex items-center rounded-2xl sm:px-2 mt-10">
    <div class="w-full">
      <router-link :to="`/profile/${user.auth_user._id}`">
        <div class="mb-16 flex items-center cursor-pointer">
          <img
            class="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-arch yhub-semi-light"
            :src="user.profile_picture ? user.profile_picture.avatar : ''"
          />

          <div class="flex-1 ml-2">
            <span
              class="text-base md:text-lg block font-semibold text-gray-700 truncate"
            >
              {{ user.bio.display_name ? user.bio.display_name : '...' }}
            </span>
            <span class="text-sm block font-semibold text-gray-600 truncate">
              @{{ user.auth_user.username }}
            </span>
          </div>
        </div>
      </router-link>

      <div class="">
        <!-- smaller screen -->
        <div class="flex md:hidden flex-col space-y-2 mb-14 sm:mb-16 lg:mb-14">
          <div
            :key="navbar_link_mobile.title"
            v-for="navbar_link_mobile in navbar_links_mobile"
            class="cursor-pointer text-gray-500 hover:bg-archyhub-semi-light hover:text-gray-700 font-semibold rounded-3xl"
            :class="
              current_active_route === navbar_link_mobile.route
                ? 'bg-archyhub-semi-light text-gray-700  font-bold'
                : 'hover:bg-opacity-60'
            "
            @click="toggleCurrentActiveNavLink(navbar_link_mobile.route)"
          >
            <!-- @click="toggleCurrentActiveNavLink(navbar_link_mobile.route)" -->
            <router-link
              :to="
                navbar_link_mobile.route === '/profile'
                  ? `${navbar_link_mobile.route}/${user.auth_user._id}`
                  : `${navbar_link_mobile.route}`
              "
            >
              <div
                class="flex justify-center items-center py-3 xl:py-4 space-x-2"
              >
                <span
                  :class="navbar_link_mobile.icon"
                  class="ml-3 sm:ml-4 px-2 text-lg lg:text-xl"
                ></span>

                <span class="flex-1 text-lg lg:text-xl">
                  {{ navbar_link_mobile.title }}
                </span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- larger screen -->
        <div class="hidden md:flex flex-col space-y-2 mb-14 sm:mb-16 lg:mb-14">
          <div
            :key="navbar_link_desktop.title"
            v-for="navbar_link_desktop in navbar_links_desktop"
            class="cursor-pointer text-gray-500 hover:bg-archyhub-semi-light hover:text-gray-700 font-semibold rounded-3xl"
            :class="
              current_active_route === navbar_link_desktop.route
                ? 'bg-archyhub-semi-light text-gray-700  font-bold'
                : 'hover:bg-opacity-60'
            "
            @click="toggleCurrentActiveNavLink(navbar_link_desktop.route)"
          >
            <!-- @click="toggleCurrentActiveNavLink(navbar_link_desktop.route)" -->
            <router-link
              :to="
                navbar_link_desktop.route === '/profile'
                  ? `${navbar_link_desktop.route}/${user.auth_user._id}`
                  : `${navbar_link_desktop.route}`
              "
            >
              <div
                class="flex justify-center items-center py-3 xl:py-4 space-x-2"
              >
                <span
                  :class="navbar_link_desktop.icon"
                  class="ml-3 sm:ml-4 px-2 text-lg lg:text-xl"
                ></span>

                <span class="flex-1 text-lg lg:text-xl">
                  {{ navbar_link_desktop.title }}
                </span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- <img :src="image" alt="" /> -->

        <!-- <div class="flex flex-col space-y-2 mb-10">
        <div
          :key="navbar_link_desktop.title"
          v-for="navbar_link_desktop in navbar_links_desktop"
          class="cursor-pointer text-gray-500 hover:bg-archyhub-semi-light hover:text-gray-700 font-bold rounded-3xl"
          :class="
            current_active_route === navbar_link_desktop.title
              ? 'bg-archyhub-semi-light text-gray-700'
              : 'hover:bg-opacity-60'
          "
          @click="toggleCurrentActiveNavLink(navbar_link_desktop.title)"
        >
          <router-link :to="navbar_link_desktop.route">
            <div class="mb-1 flex justify-center items-center py-4 space-x-2">
              <span :class="navbar_link_desktop.icon" class="ml-4 px-2 text-2xl"></span>

              <span class="flex-1 text-xl">{{ navbar_link_desktop.title }}</span>
            </div>
          </router-link>
        </div>
      </div> -->

        <div class="w-full text-center mb-10">
          <button
            @click="openCreatePostModal"
            class="w-full text-lg lg:text-xl text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-semibold rounded-3xl py-3 sm:py-3"
          >
            Create Post
            <span class="fa fa-edit ml-2 sm:ml-3 text-lg lg:text-xl"></span>
          </button>
        </div>

        <form
          class="w-full hidden text-center mt-20"
          @submit.prevent="logUserOut"
        >
          <button
            type="submit"
            class="w-full text-lg lg:text-xl text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-semibold rounded-3xl py-3 sm:py-3"
          >
            <!-- class="w-full text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1" -->
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
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { AuthApiService } from '@/controller/api/auth.api'

export default {
  name: 'NavLinks',
  components: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const search_value = ref('')
    const is_more_description_boolean = ref(true)
    const read_more_user_id = ref('')
    const create_post_boolean = ref(false)
    const current_active_route = ref('/home')
    const is_loading = ref(false)

    onBeforeMount(() => {
      current_active_route.value = route.fullPath
    })

    const user = computed(() => {
      return store.state.users.user
    })

    const navbar_links_mobile = ref([
      {
        route: '/explore',
        title: 'Explore',
        icon: 'fa fa-home',
      },
      {
        route: '/notifications',
        title: 'Notifications',
        icon: 'fa fa-bell',
      },
      // {
      //   route: '/more',
      //   title: 'More',
      //   icon: 'fa fa-ellipsis-h',
      // },
    ])

    const navbar_links_desktop = ref([
      {
        route: '/home',
        title: 'Home',
        icon: 'fa fa-home',
      },
      {
        route: '/explore',
        title: 'Explore',
        icon: 'fa fa-home',
      },
      {
        route: '/notifications',
        title: 'Notifications',
        icon: 'fa fa-bell',
      },
      {
        route: '/competitions',
        title: 'Competitions',
        icon: 'fa fa-trophy',
      },
      {
        route: `/profile`,
        title: 'Profile',
        icon: 'fa fa-user',
      },
      // {
      //   route: '/more',
      //   title: 'More',
      //   icon: 'fa fa-ellipsis-h',
      // },
    ])

    const toggleCurrentActiveNavLink = (active_link_route: string) => {
      current_active_route.value = active_link_route
      return store.dispatch('component_handler/toggleLeftNav', 'opened')
    }

    const toggleDescriptionLength = (user_id: string) => {
      if (read_more_user_id.value === user_id) {
        is_more_description_boolean.value = false
        return (read_more_user_id.value = '')
      }

      is_more_description_boolean.value = true
      read_more_user_id.value = user_id
    }

    const openCreatePostModal = () => {
      store.dispatch('component_handler/toggleNewPostModal', 'closed')
      // create_post_boolean.value = true
    }

    const logUserOut = async () => {
      is_loading.value = true

      const response = await AuthApiService.logout()
      // const { error, data, status } = response

      // is_loading.value = false

      // return router.push('/auth/login')
      // return router.push('/')
    }

    return {
      search_value,
      is_more_description_boolean,
      navbar_links_mobile,
      navbar_links_desktop,
      read_more_user_id,
      current_active_route,
      create_post_boolean,
      is_loading,
      route,
      user,
      openCreatePostModal,
      toggleDescriptionLength,
      toggleCurrentActiveNavLink,
      logUserOut,
    }
  },
}
</script>

<style scoped></style>
