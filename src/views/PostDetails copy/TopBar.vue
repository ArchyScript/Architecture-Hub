<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 pt-6 pb-4 px-4"
  >
    <div class="flex-shrink-0">
      <span
        @click="router.go(-1)"
        class="fa fa-arrow-left text-base text-gray-700 hover:bg-archyhub-light hover:bg-opacity-80 px-4 py-3 cursor-pointer rounded-full"
      ></span>
      <span class="text-xl text-gray-700">Post</span>
    </div>
  </nav>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProfileTopbar',
  setup(context) {
    const scrollShadowBoolean = ref(true)

    const router = useRouter()

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
      return context.emit('toggleLeftNav')
    }

    return {
      scrollShadowBoolean,
      toggleLeftNav,
      router,
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky h-16 pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
