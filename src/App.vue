<template>
  <div class="bg-archyhub-semi-light bg-opacity-30">
    <!-- <div v-if="route === '/'">frgkhjm</div> -->
    <!-- <div> -->
    <router-view />
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const route = useRoute()

    // if (route.fullPath === '/') {
    //   console.log('vdsds')
    // } else {
    //   console.log(765)
    // }
    // onBeforeMount(() => {
    //   console.log(route.fullPath)
    //   console.log('bmounted')
    // })

    // onMounted(() => {
    //   console.log(route.fullPath)
    //   console.log('mounted')
    // })
    return { route }
  },
}
</script>

<style scoped></style>
