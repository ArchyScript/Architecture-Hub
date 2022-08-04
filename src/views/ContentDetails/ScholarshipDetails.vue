<template>
  <div
    class="w-full top-0 h-full bg-archyhub-semi-light bg-opacity-20 z-4 border-r border-l"
  >
    <div class="">
      <SingleScholarshipDetailsVue />
    </div>
  </div>
</template>

<script lang="ts">
import SingleScholarshipDetailsVue from '@/components/Scholarships/SingleScholarshipDetails.vue'

export default {
  name: 'ScholarshipDetails',
  components: {
    SingleScholarshipDetailsVue,
  },
  setup() {
    return {}
  },
}
</script>

<style lang=""></style>
