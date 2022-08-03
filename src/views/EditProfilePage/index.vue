<template>
  <div
    class="w-full top-0 h-full bg-archyhub-semi-light bg-opacity-20 z-4 border-r border-l"
  >
    <TopBarVue />
    <ProfileHeaderVue />

    <div class="">
      <div
        class="w-full border-b flex items-center border-archyhub-semi-light border-opacity-60"
      >
        <span
          v-for="profile_page_link in profile_page_links"
          :key="profile_page_link.title"
          @click="toggleActiveProfilePageLink(profile_page_link.title)"
          :class="
            toggle_active_profile_page_link === profile_page_link.title
              ? 'border-b-2  border-archyhub-main text-archyhub-main'
              : ''
          "
          class="flex-1 py-2 sm:py-3 xl:py-4 space-x-1 sm:space-x-2 items-center cursor-pointer text-center hover:text-archyhub-main hover:bg-archyhub-main hover:bg-opacity-10 text-gray-500 font-medium"
        >
          <span
            :class="profile_page_link.icon"
            class="text-xs sm:text-sm lg:text-base xl:text-lg hidden sm:inline-flex"
          ></span>
          <span
            class="text-xs sm:text-sm lg:text-base xl:text-lg px-2 capitalize"
          >
            {{ profile_page_link.title }}
          </span>
        </span>
      </div>

      <div class="">
        <EditBioVue v-if="toggle_active_profile_page_link === 'Bio'" />

        <EditProfilePictureVue
          v-if="toggle_active_profile_page_link === 'Picture'"
        />

        <div class="" v-if="toggle_active_profile_page_link === 'Account'">
          <EditAuthInfoVue />

          <AuthPasswordVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'
import TopBarVue from './TopBar.vue'
import ProfileHeaderVue from './ProfileHeader.vue'
import EditBioVue from './EditBio.vue'
import EditProfilePictureVue from './EditProfilePicture.vue'
import EditAuthInfoVue from './EditAuthInfo.vue'
import AuthPasswordVue from './PasswordResetSection.vue'

export default {
  name: 'Profile',
  components: {
    TopBarVue,
    ProfileHeaderVue,
    EditBioVue,
    EditProfilePictureVue,
    EditAuthInfoVue,
    AuthPasswordVue,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const auth_user = computed(() => store.state.users.auth_user)
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
        title: 'Account',
        icon: 'fa fa-lock',
      },
    ])

    const toggleActiveProfilePageLink = (current_active: string) => {
      toggle_active_profile_page_link.value = current_active
    }

    const loadAuthUserInfo = () => {
      const { username } = route.params
      if (username !== auth_user.value.username)
        return router.push(`/profile/${username}`)
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }

    onBeforeMount(() => {
      loadAuthUserInfo()
      scrollToTop()
    })

    return {
      profile_page_links,
      toggle_active_profile_page_link,
      toggleActiveProfilePageLink,
    }
  },
}
</script>

<style lang=""></style>
