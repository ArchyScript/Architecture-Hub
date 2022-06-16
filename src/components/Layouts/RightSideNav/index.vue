<template>
  <section class="w-full sticky top-0 min-h-screen z-4 bg-archyhub-light">
    <SearchTrendsVue />

    <div class="p-6">
      <RecommendedWhoToFollowVue />
      <LatestNewsVue />
      <WhoToFollowVue />
      <TrendsForYouVue />
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import SearchTrendsVue from '../RightSideNav/SearchTrends.vue'
import WhoToFollowVue from './WhoToFollow.vue'
import RecommendedWhoToFollowVue from './RecommendedForYou.vue'
import TrendsForYouVue from './TrendsForYou.vue'
import LatestNewsVue from './LatestNews.vue'

export default {
  name: 'RightSideNav',
  components: {
    SearchTrendsVue,
    WhoToFollowVue,
    RecommendedWhoToFollowVue,
    TrendsForYouVue,
    LatestNewsVue,
  },

  setup() {
    const image_link = ref("require('@/assets/mysquareroof/squareroof2.png')")

    return {
      image_link,
    }
  },
}
</script>

<style scoped></style>
