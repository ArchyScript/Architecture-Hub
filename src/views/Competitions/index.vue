<template>
  <div class="w-full top-0 h-full bg-archyhub -semi-light z-4">
    <MainPageTopBarVue :page_title="topbar.title" :page_icon="topbar.icon" />
    <TopBarVue />

    <div class="pb-8">
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
import MainPageTopBarVue from '@/components/Utilities/MainPageTopBar.vue'
import CompetitionPostVue from '@/components/CompetitionPost.vue'

export default {
  name: 'Competitions',
  components: {
    MainPageTopBarVue,
    CompetitionPostVue,
  },
  setup() {
    const topbar = ref({ title: 'Competitions', icon: 'fa fa-trophy' })

    return {
      topbar,
    }
  },
}
</script>

<style lang=""></style>
