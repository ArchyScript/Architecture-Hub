<template>
  <div
    class="w-full top-0 h-full bg-archyhub-semi-light bg-opacity-20 z-4 border-r border-l"
  >
    <div class="">
      <SingleCompetitionDetailsVue />
    </div>
  </div>
</template>

<script lang="ts">
import SingleCompetitionDetailsVue from '@/components/Competitions/SingleCompetitionDetails.vue'

export default {
  name: 'CompetitionDetails',
  components: {
    SingleCompetitionDetailsVue,
  },
  setup() {
    return {}
  },
}
</script>

<style lang=""></style>
