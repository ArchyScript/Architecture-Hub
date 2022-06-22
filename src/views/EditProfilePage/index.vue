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
              ? 'border-b-4 border-red-400 text-red-500'
              : ''
          "
          class="flex-1 py-4 space-x-1 items-center cursor-pointer text-center hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10 text-gray-500 font-medium"
        >
          <span :class="profile_page_link.icon" class="text-lg"></span>
          <span class="text-lg px-2">
            {{ profile_page_link.title }}
          </span>
        </span>
      </div>

      <div class="">
        <EditBioVue v-if="toggle_active_profile_page_link === 'Bio'" />

        <EditProfilePictureVue
          v-if="toggle_active_profile_page_link === 'Picture'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import TopBarVue from './TopBar.vue'
import ProfileHeaderVue from './ProfileHeader.vue'
import EditBioVue from './EditBio.vue'
import EditProfilePictureVue from './EditProfilePicture.vue'

export default {
  name: 'Profile',
  components: {
    TopBarVue,
    ProfileHeaderVue,
    EditBioVue,
    EditProfilePictureVue,
  },
  setup() {
    const test_ref = ref('testing')
    const toggle_active_profile_page_link = ref('Bio')

    const profile_page_links = ref([
      {
        title: 'Bio',
        icon: 'fa fa-user',
      },
      {
        title: 'Picture',
        icon: 'fa fa-image',
      },
      {
        title: 'Bookmarked',
        icon: 'fa fa-bookmark-o',
      },
    ])
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
