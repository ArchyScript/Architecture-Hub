<template>
  <div
    class="w-full top-0 h-full bg-archyhub-semi-light bg-opacity-20 z-4 border-r border-l"
  >
    <TopBarVue />

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue'
import TopBarVue from '../../components/Layouts/DetailsTopbar.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Profile',
  components: {
    TopBarVue,
  },
  setup() {
    const test_ref = ref('testing')
    const toggle_active_profile_page_link = ref('Posts')
    const route = useRoute()
    const profile_page_links = ref([
      {
        title: 'Posts',
        icon: 'fa fa-home',
      },
      {
        title: 'Bookmarked',
        icon: 'fa fa-bookmark-o',
      },
      {
        title: 'Media',
        icon: 'fa fa-image',
      },
    ])
    const scrollToTop = () => window.scrollTo(0, 0)

    onBeforeMount(async () => scrollToTop())

    const getUserData = async (username: string | string[]) => {
      // const response = await fetchSingleUserByUsername(username)
      // const { data, status, error } = response
      // return data
    }

    const toggleActiveProfilePageLink = (current_active: string) => {
      toggle_active_profile_page_link.value = current_active
      console.log(current_active)
    }

    return {
      test_ref,
      profile_page_links,
      toggle_active_profile_page_link,
      toggleActiveProfilePageLink,
    }
  },
}
</script>

<style lang=""></style>
