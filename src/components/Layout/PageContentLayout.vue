<template>
  <div class="conta iner mx-auto shadow-xl min-h-screen">
    <div class="grid grid-cols-9">
      <!-- <div class="hidden">
        <TopNavbar @click="toggleLeftNav" />
      </div> -->

      <!-- <div class="col-span-3">
        <LeftSideNav />
      </div> -->

      <!-- entry point -->
      <main class="col-span-5 col">
        <router-view></router-view>
      </main>

      <div class="col-span-4">
        <RightSideNav />
      </div>
    </div>
  </div>
</template>

<script>
import RightSideNav from '../Layouts/RightSideNav/index.vue'
// import LeftSideNav from '../Layouts/LeftSideNav/index.vue'
// import TopNavbar from '../Layouts/TopNavbar.vue'
import { ref } from 'vue'

export default {
  name: 'DefaultLayout',
  components: {
    // LeftSideNav,
    RightSideNav,
    // TopNavbar,
  },
  setup() {
    const toggleLeftNavBolean = ref(true)
    const toggleLeftNav = () => {
      toggleLeftNavBolean.value = false
      console.log('na lahfn.mf;j')
      return
    }
    return { toggleLeftNav, toggleLeftNavBolean }
  },
}
</script>

<style scoped></style>
