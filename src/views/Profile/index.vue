<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <TopBarVue />
    <ProfileHeaderVue />

    <div class="">
      <div class="w-full border-b flex items-center border-archyhub-light">
        <span
          v-for="profile_page_link in profile_page_links"
          :key="profile_page_link.title"
          @click="toggleActiveProfilePageLink(profile_page_link.title)"
          :class="
            toggle_active_profile_page_link === profile_page_link.title
              ? 'border-b-2 border-red-400 text-red-500'
              : ''
          "
          class="flex-1 py-2 sm:py-3 xl:py-4 space-x-1 sm:space-x-2 items-center cursor-pointer text-center hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10 text-gray-500 font-medium"
        >
          <span
            :class="profile_page_link.icon"
            class="text-sm md:text-base xl:text-lg hidden sm:inline-flex"
          ></span>
          <span class="text-sm md:text-base xl:text-lg px-2">
            {{ profile_page_link.title }}
          </span>
        </span>
      </div>

      <div class="">
        <PostContentTestVue />
        <PostContentTestVue />
        <PostContentTestVue />
        <PostContentTestVue />
        <PostContentTestVue />
        <PostContentTestVue />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue'
import TopBarVue from './TopBar.vue'
import ProfileHeaderVue from './ProfileHeader.vue'
// import PostContentVue from '@/components/Posts/PostContent.vue'
import PostContentTestVue from '@/components/Posts/PostContentTest.vue'
import { useRoute } from 'vue-router'
import { fetchSingleUserByUsername } from '@/controller/api/users.api'
// import { fetchSingleUserByUsername } from '@/controller/api/users.api'

export default {
  name: 'Profile',
  components: {
    TopBarVue,
    ProfileHeaderVue,
    // PostContentVue,
    PostContentTestVue,
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
      const response = await fetchSingleUserByUsername(username)
      const { data, status, error } = response

      return data
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
