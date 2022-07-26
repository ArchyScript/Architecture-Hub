<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex sticky items-center top-0 inset-x-0 pt-2 pb-2 md:pt-4 md:pb-4 xl:pt-8"
  >
    <div class="w-full flex justify-between items-center px-4">
      <div class="flex items-center spacex-2">
        <span
          @click="openLeftNav"
          class="hidden md:flex lg:hidden p-2 mr-2 bg-archyhub-main cursor-pointer rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-white"
            viewBox="0 0 448 512"
          >
            <path
              d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
            />
          </svg>
        </span>
        <h4 class="text-lg sm:text-xl px-2 font-bold text-gray-700">
          {{ props.page_title }}
        </h4>
      </div>

      <div class="flex justify-center items-start">
        <span
          @click="openTargettedModal(props.page_title)"
          :class="props.page_icon"
          class="hidden md:flex text-2xl text-gray-700 hover:bg-archyhub-semi-light hover:bg-opacity-50 px-4 py-3 cursor-pointer rounded-full"
        ></span>

        <span class="md:hidden p-2 sm:p-3 cursor-pointer">
          <router-link :to="`/profile/${user.username}`">
            <div class="flex items-center cursor-pointer space-x-2">
              <!-- <div class="flex-1 hidden sm:inline-block md:hidden">
                <span
                  class="text-base md:text-lg block font-semibold text-gray-700 truncate"
                >
                  {{
                    user.bio.display_name !== ''
                      ? user.bio.display_name
                      : user.username
                  }}
                </span>
                <span
                  class="text-sm block font-semibold text-gray-600 truncate"
                >
                  @{{ user.username }}
                </span>
              </div> -->

              <img
                class="w-10 h-10 sm:h-12 sm:w-auto12 rounded-full"
                :src="
                  user.profile_picture.avatar !== ''
                    ? user.profile_picture.avatar
                    : ''
                "
              />
            </div>
          </router-link>
        </span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeTopbar',
  props: {
    page_title: {
      type: String,
      required: true,
    },
    page_icon: {
      type: String,
      required: true,
    },
  },
  setup(props: any) {
    const store = useStore()
    const scrollShadowBoolean = ref(true)

    const user = computed(() => store.state.users.user)
    const auth_user = computed(() => store.state.users.auth_user)

    onBeforeMount(() => {
      handleScroll()
      window.addEventListener('scroll', () => handleScroll())
    })

    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (scrollShadowBoolean.value) scrollShadowBoolean.value = false
      } else {
        // user is at top of page
        if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true
      }
    }

    const openTargettedModal = (title: string) => {
      if (title.toLowerCase() === 'home') return
      if (title.toLowerCase() === 'competitions')
        return store.dispatch('component_handler/openNewCompetitionModal')
      if (title.toLowerCase() === 'scholarships')
        return store.dispatch('component_handler/openNewScholarshipModal')
    }

    const openLeftNav = () => {
      return store.dispatch('component_handler/openLeftNav')
    }

    return {
      scrollShadowBoolean,
      openLeftNav,
      props,
      user,
      auth_user,
      openTargettedModal,
      // side_nav_toggler
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky z-20 h-16   pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
