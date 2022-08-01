<template>
  <div class="container mx-auto min-h-screen">
    <div class="w-full h-full">
      <!-- smaller screen -->
      <div class="lg:hidden h-full">
        <nav
          v-if="open_left_nav"
          class="top-0 bottom-0 z-30 bg-opacity-40 bg-red-500 h-full w-full hidden md:flex"
          :class="open_left_nav ? 'fixed' : 'hidden '"
          id="nav_modal"
        >
          <!-- open_left_nav ? 'hidden md:block fixed' : 'hidden ' -->
          <div class="w-3/4 sm:w-3/5 md:w-2/5 md: h-full shadow-md">
            <LeftSideNav />
          </div>

          <div
            class="absolute cursor-pointer top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-30 bg-red-600 shadow-md"
            @click="closeAllModals"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              viewBox="0 0 320 512"
            >
              <path
                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
              />
            </svg>
          </div>
        </nav>

        <section class="grid grid-cols-9">
          <!-- entry point -->
          <main
            class="relative col-span-full bg-archyhub-semi-light bg-opacity-40 md:col-span-5 min-h-screen pb-20 md:pb-8"
          >
            <router-view :key="route.fullPath"></router-view>

            <!-- <div
              class="sticky inline-block w-auto bg-black ml-5 bottom-10 p-2 mr-2 cursor-pointer rounded-full shadow-2xl"
              :class="
                route.fullPath === '/competitions'
                  ? ' bg-pink-500'
                  : route.fullPath === '/scholarships'
                  ? 'bg-red-500'
                  : ' hidden'
              "
              @click="openTargettedModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12 p-2 text-white"
                viewBox="0 0 448 512"
              >
                <path
                  d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                />
              </svg>
            </div> -->
          </main>

          <!-- right side nav -->
          <div class="hidden md:block md:col-span-4">
            <RightSideNav />
          </div>
        </section>

        <BottomTabVue />
      </div>
    </div>

    <!-- larger screen -->
    <div class="flex-1 hidden lg:grid grid-cols-12">
      <!-- left side nav -->
      <div class="col-span-3 lg:block">
        <LeftSideNav />
      </div>
      <!-- entry point -->
      <main class="relative col-span-5 bg-archyhub-semi-light bg-opacity-40">
        <router-view :key="route.fullPath"></router-view>

        <!-- <div
          class="inline-block w-auto to-white ml-5 bottom-10 right-3 p-2 mr-2 cursor-pointer rounded-full shadow-2xl"
          :class="
            route.fullPath === '/competitions'
              ? ' bg-pink-500'
              : route.fullPath === '/scholarships'
              ? 'bg-red-500'
              : ' hidden'
          "
          @click="openTargettedModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-14 h-14 p-1 text-white"
            viewBox="0 0 448 512"
          >
            <path
              d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
            />
          </svg>
        </div> -->
      </main>

      <!-- right side nav -->
      <div class="col-span-4">
        <RightSideNav />
      </div>
    </div>

    <!-- display all modal boxes -->
    <ModalsDisplayVue />
  </div>
</template>

<script lang="ts">
import RightSideNav from '../Layouts/RightSideNav/index.vue'
import LeftSideNav from '../Layouts/LeftSideNav/index.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import BottomTabVue from '../Layouts/BottomTab.vue'
import ModalsDisplayVue from './ModalsDisplay.vue'

export default {
  name: 'DefaultLayout',
  components: {
    LeftSideNav,
    RightSideNav,
    BottomTabVue,
    ModalsDisplayVue,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const current_active_route = ref('/home')
    const user = computed(() => store.state.users.user)
    const auth_user = computed(() => store.state.users.auth_user)
    const open_left_nav = computed(
      () => store.state.component_handler.open_left_nav,
    )

    window.addEventListener('click', (event: any) => {
      const nav_modal = document.getElementById('nav_modal')
      if (event.target === nav_modal) return closeAllModals()
    })

    window.addEventListener('keyup', (event: any) => {
      const { keyCode, code } = event

      if (keyCode === 27 || code.toLowerCase() === 'escape')
        return closeAllModals()
    })

    const closeAllModals = () =>
      store.dispatch('component_handler/closeAllModals')

    const openTargettedModal = () => {
      if (route.fullPath === '/home') return
      if (route.fullPath === '/competitions')
        return store.dispatch('component_handler/openNewCompetitionModal')
      if (route.fullPath === '/scholarships')
        return store.dispatch('component_handler/openNewScholarshipModal')
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }

    onBeforeMount(async () => {
      scrollToTop()
    })

    return {
      user,
      auth_user,
      open_left_nav,
      route,
      closeAllModals,
      openTargettedModal,
    }
  },
}
</script>

<style scoped></style>
