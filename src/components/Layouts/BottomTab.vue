<template>
  <section class="fixed md:hidden border-t bottom-0 inset-x-0 w-full">
    <!-- <div class="rel ative flex justify-bettween items-center  bg-black h-24"> -->
    <span
      class="absolute right-2 bottom-16 sm:right-3 sm:bottom-20 p-2 mr-2 cursor-pointer rounded-full shadow-2xl"
      :class="
        current_active_route === '/home'
          ? 'bg-archyhub-main'
          : current_active_route === `/profile/${user.username}`
          ? ' hidden'
          : current_active_route === '/competitions'
          ? ' bg-pink-500'
          : current_active_route === '/scholarships'
          ? 'bg-red-500'
          : 'bg-yellow-800'
      "
      @click="openTargettedModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-10 h-10 sm:h-12 sm:w-12 text-white animate-spin"
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
    </span>
    <!-- </div> -->

    <div class="flex items-center bg-archyhub-semi-light">
      <div
        v-for="bottom_bar_link in bottom_bar_links"
        :key="bottom_bar_link.route"
        class="w-full flex items-center"
      >
        <div
          class="flex-1 h-full space-x-1 border-l border-gray-300 text-gray-600 bg-opacity-80 items-center cursor-pointer text-center font-bold"
          :class="
            current_active_route === bottom_bar_link.route
              ? 'bg-archyhub-semi-light text-archyhub-main'
              : ''
          "
          @click="toggleCurrentActiveNavLink(bottom_bar_link.route)"
        >
          <!--  :to="
              bottom_bar_link.route === '/profile'
                ? `${bottom_bar_link.route}/${user.auth_user._id}`
                : `${bottom_bar_link.route}`
            " -->
          <router-link :to="bottom_bar_link.route">
            <span
              :class="bottom_bar_link.icon"
              class="text-lg sm:text-xl p-3 sm:p-4 w-full font-extrabold h-full text-center"
            ></span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'BottomBar',
  setup() {
    const route = useRoute()
    const store = useStore()
    const current_active_route = ref('/home')
    const user = computed(() => store.state.users.user)
    const bottom_bar_links = ref([
      {
        route: '/home',
        title: 'Home',
        icon: 'fa fa-home',
      },
      {
        route: '/scholarships',
        title: 'Scholarships',
        icon: 'fa fa-users',
      },
      {
        route: '/competitions',
        title: 'Competitions',
        icon: 'fa fa-trophy',
      },
      // {
      //   route: '/notifications',
      //   title: 'Notifications',
      //   icon: 'fa fa-bell',
      // },
      {
        route: `/profile/${user.value.username}`,
        title: 'Profile',
        icon: 'fa fa-user',
      },
    ])

    window.onkeyup = () => (current_active_route.value = route.fullPath)
    window.onscroll = () => (current_active_route.value = route.fullPath)
    window.onresize = () => (current_active_route.value = route.fullPath)

    onBeforeMount(() => (current_active_route.value = route.fullPath))

    const toggleCurrentActiveNavLink = (active_link_route: string) => {
      current_active_route.value = active_link_route
    }

    const openTargettedModal = () => {
      if (current_active_route.value === '/home')
        return store.dispatch('component_handler/openNewPostModal')
      if (current_active_route.value === '/competitions')
        return store.dispatch('component_handler/openNewCompetitionModal')
      if (current_active_route.value === '/scholarships')
        return store.dispatch('component_handler/openNewScholarshipModal')
    }

    return {
      bottom_bar_links,
      user,
      current_active_route,
      toggleCurrentActiveNavLink,
      openTargettedModal,
    }
  },
}
</script>
<style scoped></style>
