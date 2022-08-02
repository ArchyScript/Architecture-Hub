<template>
  <section
    class="w-full sticky top-0 shadow-md min-h-screen z-4 bg-archyhub-light"
  >
    <div class="hidden">
      <SearchTrendsVue />
    </div>

    <div class="px-4 lg:p-4 xl:p-6 mt-8">
      <RecommendedWhoToFollowVue />
      <CompetitionSectionVue />
      <ScholarshipsSectionVue />
      <WhoToFollowVue class="hidden" />
      <TrendsForYouVue class="hidden" />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import SearchTrendsVue from '../RightSideNav/SearchTrends.vue'
import WhoToFollowVue from './WhoToFollow.vue'
import RecommendedWhoToFollowVue from './RecommendedForYou.vue'
import TrendsForYouVue from './TrendsForYou.vue'
import CompetitionSectionVue from './CompetitionsSection.vue'
import ScholarshipsSectionVue from './ScholarshipsSection.vue'
import { useRoute } from 'vue-router'

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
    // const currentRoute = computed(() => useRoute().params.fullPath)

    // const openTargettedModal = () => {
    //   // console.log(current_route)
    //   // if (title.toLowerCase() === 'home') return
    //   // if (title.toLowerCase() === 'competitions')
    //   //   return store.dispatch('component_handler/openNewCompetitionModal')
    //   // if (title.toLowerCase() === 'scholarships')
    //   //   return store.dispatch('component_handler/openNewScholarshipModal')
    // }

    // onBeforeMount(() => {
    //   openTargettedModal(currentRoute.value)
    // })
    return {}
  },
}
</script>

<style scoped></style>
