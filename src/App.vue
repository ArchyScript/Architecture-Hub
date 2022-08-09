<template>
  <div class="bg-archyhub-semi-light bg-opacity-30">
    <!-- <div v-if="route === '/'">frgkhjm</div> -->
    <!-- <div> -->
    <router-view />
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { computed, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from './router'
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const route = useRoute()

    // onBeforeMount(async () => {
    //   await redirectToLoginPage()
    // })
    return { route }
  },
}
</script>

<style scoped></style>
