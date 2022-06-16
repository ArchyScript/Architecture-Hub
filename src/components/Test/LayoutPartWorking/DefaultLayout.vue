<template>
  <div class="cont ainer mx-auto shadow-xl min-h-screen">
    <div class="grid grid-cols-12 gap-10">
      <div class="col-span-3">
        <LeftSideNav />
      </div>

      <!-- entry point -->
      <div class="col-span-5 py-20 overflow-auto">
        <router-view></router-view>
      </div>

      <div class="col-span-4">
        <RightSideNav />
      </div>
    </div>
  </div>
</template>

<script>
import RightSideNav from '../Layouts/RightSideNav/index.vue'
import LeftSideNav from '../Layouts/LeftSideNav/index.vue'
// import Topbar from '../Layouts/Topbar.vue'

export default {
  name: 'DefaultLayout',
  setup() {
    return {}
  },

  components: {
    LeftSideNav,
    RightSideNav,
  },
}
</script>

<style scoped></style>
