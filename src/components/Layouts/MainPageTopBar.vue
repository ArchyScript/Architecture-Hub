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
            class="w-6 h-6 text-white animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </span>
        <h4 class="text-xl px-2 font-bold text-gray-700">
          {{ props.page_title }}
        </h4>
      </div>

      <div class="flex justify-center items-start">
        <span
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
                class="w-12 h-12 rounded-full"
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

    const openLeftNav = () => {
      return store.dispatch('component_handler/openLeftNav')
    }

    return {
      scrollShadowBoolean,
      openLeftNav,
      props,
      user,
      // side_nav_toggler
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky z-20 h-16 md:h-20 pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
