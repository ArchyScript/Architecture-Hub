<template>
  <section
    class="fixed md:hidden border-t border-opacity-80 border-archyhub-semi-light bottom-0 inset-x-0 w-full"
  >
    <span
      class="absolute right-2 bottom-16 sm:right-3 sm:bottom-20 p-2 mr-2 cursor-pointer rounded-full shadow-2xl"
      :class="
        current_active_route === '/home'
          ? 'bg-archyhub-main'
          : current_active_route === '/competitions'
          ? ' bg-pink-500'
          : current_active_route === '/scholarships'
          ? 'bg-red-500'
          : 'hidden'
      "
      @click="openTargettedModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8 sm:h-10 sm:w-10 p-2 text-white"
        viewBox="0 0 448 512"
      >
        <path
          d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
        />
      </svg>
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
        title: 'Connections',
        icon: 'fa fa-search',
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
      auth_user,
      current_active_route,
      toggleCurrentActiveNavLink,
      openTargettedModal,
    }
  },
}
</script>
<style scoped></style>
