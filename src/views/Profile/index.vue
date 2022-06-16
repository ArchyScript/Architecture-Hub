<template>
  <div>
    ProfilePage
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfilePage',
  components: {},
  setup() {
    const test_ref = ref('testing')

    return { test_ref }
  },
}
</script>

<style lang=""></style>
