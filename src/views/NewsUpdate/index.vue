<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <TopBarVue />
  </div>
</template>

<script>
import { ref } from 'vue'
import TopBarVue from './TopBar.vue'

export default {
  name: 'NewsUpdate',
  components: {
    TopBarVue,
  },
  setup() {
    const test_ref = ref('testing')

    return { test_ref }
  },
}
</script>

<style lang=""></style>
