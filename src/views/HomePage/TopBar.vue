<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex sticky items-center top-0 inset-x-0 shadow-md pt-4 xl:pt-8 pb-4"
  >
    <div class="w-full flex justify-between items-center px-4">
      <div class="flex items-center spacex-2">
        <span
          @click="toggleLeftNav"
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
        <h4 class="text-xl sm:text-2xl px-2 font-bold text-gray-700">
          Home
        </h4>
      </div>

      <div class="flex justify-center items-start">
        <!-- @click="toggleLeftNav" -->
        <span
          class="fa fa-home hidden md:flex text-2xl text-gray-700 hover:bg-archyhub-semi-light hover:bg-opacity-50 px-4 py-3 cursor-pointer rounded-full"
        ></span>

        <span
          @click="toggleLeftNav"
          class="md:hidden p-2 sm:p-3 bg-archyhub-main cursor-pointer rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 md:w-6 md:h-6 text-white animate-spin"
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
      </div>
    </div>
  </nav>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeTopbar',
  setup(context) {
    const store = useStore()
    const scrollShadowBoolean = ref(true)

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

    const toggleLeftNav = () => {
      return store.dispatch('component_handler/toggleLeftNav', 'closed')
    }

    return {
      scrollShadowBoolean,
      toggleLeftNav,
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
