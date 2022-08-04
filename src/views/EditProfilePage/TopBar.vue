<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 pt-6 pb-4 px-4"
  >
    <div class="flex-shrink-0">
      <span
        @click="router.go(-1)"
        class="fa fa-arrow-left text-base lg:text-lg text-gray-600 hover:bg-archyhub-light hover:bg-opacity-70 px-4 py-3 cursor-pointer rounded-full"
      ></span>
    </div>

    <div class="flex-1 items-center px-2">
      <h4 class="text-base md:text-lg block font-semibold text-gray-600">
        {{
          auth_user.bio.display_name === ''
            ? auth_user.username
            : auth_user.bio.display_name
        }}
      </h4>
    </div>
  </nav>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'

export default {
  name: 'ProfileTopbar',
  setup() {
    const store = useStore()
    const scrollShadowBoolean = ref(true)
    const auth_user = computed(() => store.state.users.auth_user)

    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (scrollShadowBoolean.value) scrollShadowBoolean.value = false
      } else {
        // user is at top of page
        if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true
      }
    }

    onBeforeMount(() => {
      handleScroll()
      window.addEventListener('scroll', () => handleScroll())
    })

    return {
      scrollShadowBoolean,
      router,
      auth_user,
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky h-12 sm:h-14 md:h-16  pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
