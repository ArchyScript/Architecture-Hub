<template>
  <section
    class="hide-scrollbar w-full sticky shadow-md min-h-screen max-h-screen overflow-scroll top-0 z-4 bg-archyhub-light"
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

<style scoped>
.hide-scrollbar {
  overflow-x: hidden;
}

.hide-scrollbar::-webkit-scrollbar {
  @apply overflow-hidden;
}
/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 1px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-archyhub-main;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-archyhub-main;
}
</style>
