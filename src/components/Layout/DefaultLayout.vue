<template>
  <div class="container mx-auto min-h-screen">
    <div class="w-full h-full">
      <!-- smaller screen -->
      <div class="lg:hidden h-full">
        <nav
          v-if="open_left_nav"
          class="top-0 bottom-0 z-30 bg-opacity-40 bg-red-500 h-full w-full"
          :class="open_left_nav ? 'fixed' : 'hidden '"
          id="nav_modal"
        >
          <!-- open_left_nav ? 'hidden md:block fixed' : 'hidden ' -->
          <div class="w-3/4 sm:w-3/5 md:w-2/5 md: h-full shadow-md">
            <LeftSideNav />
          </div>

          <div
            class="absolute top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-30 bg-red-600 shadow-md"
            @click="closeLeftNav"
          >
            <svg
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
        </nav>

        <section class="grid grid-cols-9">
          <!-- entry point -->
          <main
            class="col-span-full bg-archyhub-semi-light bg-opacity-40 md:col-span-5 min-h-screen pb-20 md:pb-8"
          >
            <router-view></router-view>
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
      <main class="col-span-5 bg-archyhub-semi-light bg-opacity-40">
        <router-view></router-view>
      </main>

      <!-- right side nav -->
      <div class="col-span-4">
        <RightSideNav />
      </div>
    </div>

    <ModalsDisplayVue />
  </div>
</template>

<script lang="ts">
import RightSideNav from '../Layouts/RightSideNav/index.vue'
import LeftSideNav from '../Layouts/LeftSideNav/index.vue'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
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
    const open_left_nav = computed(
      () => store.state.component_handler.open_left_nav,
    )

    window.addEventListener('click', (event: any) => {
      const nav_modal = document.getElementById('nav_modal')
      if (event.target === nav_modal) {
        closeLeftNav()
      }
    })

    const closeLeftNav = () =>
      store.dispatch('component_handler/closeAllModals')

    return {
      open_left_nav,
      closeLeftNav,
    }
  },
}
</script>

<style scoped></style>
