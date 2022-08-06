<template>
  <section
    class="fixed md:hidden border-t border-opacity-80 border-archyhub-semi-light bottom-0 inset-x-0 w-full"
  >
    <span
      class="absolute bg-archyhub-main right-2 bottom-16 sm:right-3 sm:bottom-20 mr-2 cursor-pointer rounded-full shadow-2xl"
      :class="
        current_active_route === '/home'
          ? ''
          : current_active_route === '/competitions'
          ? ' '
          : current_active_route === '/scholarships'
          ? ''
          : 'hidden'
      "
      @click="openTargettedModal"
    >
      <span
        class="fa fa-plus text-lg sm:text-xl text-archyhub-light py-3 px-5 sm:py-4 sm:px-6"
      ></span>
    </span>

    <div class="flex items-center bg-archyhub-semi-light bg-opacity-80">
      <div
        v-for="bottom_bar_link in bottom_bar_links"
        :key="bottom_bar_link.route"
        class="w-full flex items-center"
      >
        <div
          class="flex-1 h-full space-x-1 border-l text-gray-600 border-opacity-40 items-center cursor-pointer text-center"
          :class="
            current_active_route === bottom_bar_link.route
              ? 'bg-archyhub-semi-light text-archyhub-main'
              : 'border-archyhub-light bg-opacity-90'
          "
          @click="toggleCurrentActiveNavLink(bottom_bar_link.route)"
        >
          <router-link :to="bottom_bar_link.route">
            <span
              :class="bottom_bar_link.icon"
              class="text-base sm:text-lg p-2 sm:p-3 w-full h-full text-center"
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
    const auth_user = computed(() => store.state.users.auth_user)
    const bottom_bar_links = ref([
      {
        route: '/home',
        title: 'Home',
        icon: 'fa fa-home',
      },
      {
        route: '/users',
        title: 'Explore',
        icon: 'fa fa-users',
      },
      {
        route: '/competitions',
        title: 'Competitions',
        icon: 'fa fa-trophy',
      },
      {
        route: '/scholarships',
        title: 'Scholarships',
        icon: 'fas fa-award',
      },
      {
        route: `/profile/${auth_user.value.username}`,
        title: 'Profile',
        icon: 'fa fa-user',
      },
    ])

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

    const getCurrentActiveRoute = () => {
      current_active_route.value = route.fullPath
    }

    window.onkeyup = () => getCurrentActiveRoute()
    window.onscroll = () => getCurrentActiveRoute()
    window.onresize = () => getCurrentActiveRoute()

    onBeforeMount(() => getCurrentActiveRoute())

    return {
      bottom_bar_links,
      auth_user,
      current_active_route,
      toggleCurrentActiveNavLink,
      openTargettedModal,
    }
  },
}
</script>
<style scoped></style>
