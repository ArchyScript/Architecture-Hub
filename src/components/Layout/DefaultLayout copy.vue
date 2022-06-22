<template>
  <div class="conta iner mx-auto shadow-xl min-h-screen">
    <div class="grid grid-cols-12">
      <div class="col-span-3">
        <LeftSideNav />
      </div>

      <main class="col-span-9 col">
        <PageContentLayoutVue />
      </main>
    </div>
  </div>
</template>

<script>
// import RightSideNav from '../Layouts/RightSideNav/index.vue'

import LeftSideNav from '../Layouts/LeftSideNav/index.vue'
// import TopNavbar from '../Layouts/TopNavbar.vue'
import { ref } from 'vue'
import PageContentLayoutVue from './PageContentLayout.vue'

export default {
  name: 'DefaultLayout',
  components: {
    LeftSideNav,
    PageContentLayoutVue,
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
