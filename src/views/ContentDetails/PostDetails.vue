<template>
  <div
    class="w-full top-0 h-full bg-archyhub-semi-light bg-opacity-20 z-4 border-r border-l"
  >
    <div class="">
      <SinglePostDetailsVue />
    </div>
  </div>
</template>

<script lang="ts">
import SinglePostDetailsVue from '@/components/Posts/SinglePostDetails.vue'

export default {
  name: 'Profile',
  components: {
    SinglePostDetailsVue,
  },
  setup() {
    return {}
  },
}
</script>

<style lang=""></style>
