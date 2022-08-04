<template>
  <section
    class="w-full sticky shadow-md min-h-screen top-0 z-4 bg-archyhub-light"
  >
    <div class="hidden">
      <SearchTrendsVue />
    </div>

    <div class="px-4 lg:p-4 xl:p-6 mt-8 md:mt-10 xl:mt-14">
      <RecommendedWhoToFollowVue />
      <CompetitionSectionVue />
      <ScholarshipsSectionVue />
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
import SearchTrendsVue from '../RightSideNav/SearchTrends.vue'
import RecommendedWhoToFollowVue from './RecommendedForYou.vue'
import CompetitionSectionVue from './CompetitionsSection.vue'
import ScholarshipsSectionVue from './ScholarshipsSection.vue'

export default {
  name: 'RightSideNav',
  components: {
    SearchTrendsVue,
    RecommendedWhoToFollowVue,
    CompetitionSectionVue,
    ScholarshipsSectionVue,
  },

  setup() {
    return {}
  },
}
</script>

<style scoped></style>
