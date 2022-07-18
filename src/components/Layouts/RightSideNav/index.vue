<template>
  <section
    class="w-full sticky top-0 shadow-md min-h-screen z-4 bg-archyhub-light"
  >
    <SearchTrendsVue />

    <div class="px-4 lg:p-4 xl:p-6">
      <RecommendedWhoToFollowVue />
      <CompetitionSectionVue />
      <ScholarshipsSectionVue />
      <WhoToFollowVue class="hidden" />
      <TrendsForYouVue class="hidden" />
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import SearchTrendsVue from '../RightSideNav/SearchTrends.vue'
import WhoToFollowVue from './WhoToFollow.vue'
import RecommendedWhoToFollowVue from './RecommendedForYou.vue'
import TrendsForYouVue from './TrendsForYou.vue'
import CompetitionSectionVue from './CompetitionsSection.vue'
import ScholarshipsSectionVue from './ScholarshipsSection.vue'

export default {
  name: 'RightSideNav',
  components: {
    SearchTrendsVue,
    WhoToFollowVue,
    RecommendedWhoToFollowVue,
    TrendsForYouVue,
    CompetitionSectionVue,
    ScholarshipsSectionVue,
  },

  setup() {
    return {}
  },
}
</script>

<style scoped></style>
