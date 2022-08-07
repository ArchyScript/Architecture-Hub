<template>
  <div class="container mx-auto min-h-screen">
    <!-- <div
      v-if="!is_mounted"
      class="z-50 fixed h-screen w-screen flex text-7xl bg-archyhub-main text-white items-center justify-center"
    >
      hljgkvbn,m
    </div> -->

    <div class="w-full h-full">
      <!-- smaller screen -->
      <div class="lg:hidden h-full">
        <nav
          v-if="open_left_nav"
          class="top-0 bottom-0 z-30 bg-opacity-20 bg-archyhub-main h-full w-full hidden md:flex"
          :class="open_left_nav ? 'fixed' : 'hidden '"
          id="nav_modal"
        >
          <!-- open_left_nav ? 'hidden md:block fixed' : 'hidden ' -->
          <div class="w-3/4 sm:w-3/5 md:w-2/5 h-full shadow-md min-h-screen">
            <LeftSideNav />
          </div>

          <div
            class="absolute cursor-pointer top-0 py-2 px-4 sm:py-3 sm:px-5 md:py-3 md:px-5 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
            @click="closeAllModals"
          >
            <span
              class="fa fa-close text-lg sm:text-xl text-archyhub-light"
            ></span>
          </div>
        </nav>

        <section class="grid grid-cols-9">
          <!-- entry point -->
          <main
            class="col-span-full bg-archyhub-semi-light bg-opacity-20 md:col-span-5 min-h-screen pb-10 md:pb-4"
          >
            <router-view :key="route.fullPath"></router-view>
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
      <main class="relative col-span-5 bg-archyhub-semi-light bg-opacity-20">
        <router-view :key="route.fullPath"></router-view>
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
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import RightSideNav from '../Layouts/RightSideNav/index.vue'
import LeftSideNav from '../Layouts/LeftSideNav/index.vue'
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
    // const is_mounted = ref(false)
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

    //
    const closeAllModals = () => {
      store.dispatch('component_handler/closeAllModals')
    }

    const scrollToTop = () => window.scrollTo(0, 0)

    onBeforeMount(async () => {
      scrollToTop()
    })

    return {
      auth_user,
      open_left_nav,
      route,
      // is_mounted,
      closeAllModals,
    }
  },
}
</script>

<style scoped></style>
