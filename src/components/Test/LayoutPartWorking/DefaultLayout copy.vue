<template>
  <div class="m-20 container">
    <!-- Topbar -->
    <Topbar />

    <!-- Router View -->
    <div class="mt-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Topbar from '../Layouts/Topbar.vue'

export default {
  name: 'DefaultLayout',
  setup() {
    return {}
  },

  components: {
    Topbar,
  },
}
</script>

<style scoped></style>
