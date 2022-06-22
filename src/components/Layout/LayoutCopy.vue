<template>
  <div class="conta iner mx-auto shadow-xl min-h-screen">
    <div class="grid grid-cols-4">
      <div class="hidden">
        <TopNavbar @click="toggleLeftNav" />
      </div>

      <div class="col-span-1 sticky overflow-y-scroll">
        <LeftSideNav />
      </div>

      <!-- entry point -->
      <main class="col-span-3 grid grid-cols-10">
        <div class="col-span-6">
          <router-view></router-view>
        </div>

        <div class="col-span-4">
          <RightSideNav />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import RightSideNav from '../Layouts/RightSideNav/index.vue'
import LeftSideNav from '../Layouts/LeftSideNav/index.vue'
import TopNavbar from '../Layouts/TopNavbar.vue'
import { ref } from 'vue'

export default {
  name: 'DefaultLayout',
  setup() {
    const toggleLeftNavBolean = ref(true)
    const toggleLeftNav = () => {
      toggleLeftNavBolean.value = false
      console.log('na lahfn.mf;j')
      return
    }
    return { toggleLeftNav, toggleLeftNavBolean }
  },

  components: {
    LeftSideNav,
    RightSideNav,
    TopNavbar,
  },
}
</script>

<style scoped></style>
