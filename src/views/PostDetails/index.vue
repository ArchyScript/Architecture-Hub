<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <TopBarVue />

    <div class="">
      <SinglePostDetailsVue />
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue'
import TopBarVue from './TopBar.vue'
import { useRoute } from 'vue-router'
import SinglePostDetailsVue from '@/components/Posts/SinglePostDetails.vue'

export default {
  name: 'Profile',
  components: {
    TopBarVue,
    SinglePostDetailsVue,
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

    onBeforeMount(async () => {
      // const { username } = route.params
      // const data = await getUserData(username)
      // console.log(data)
    })

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
