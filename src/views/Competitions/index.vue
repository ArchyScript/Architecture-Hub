<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <TopBarVue />

    <div class="pb-16">
      <CompetitionPostVue />
      <CompetitionPostVue />
      <CompetitionPostVue />
      <CompetitionPostVue />
      <CompetitionPostVue />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TopBarVue from './TopBar.vue'
import CompetitionPostVue from '@/components/CompetitionPost.vue'

export default {
  name: 'Competitions',
  components: {
    TopBarVue,
    CompetitionPostVue,
  },
  setup() {
    const test_ref = ref('testing')

    return { test_ref }
  },
}
</script>

<style lang=""></style>
