<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 pt-8 pb-4"
  >
    <div class="w-full flex justify-between items-center px-4">
      <h4 class="text-2xl font-bold px-2 text-gray-700">
        {{ title }}
      </h4>

      <span
        @click="toggleLeftNav"
        :class="icon"
        class="text-2xl text-gray-700 hover:bg-archyhub-semi-light hover:bg-opacity-50 px-4 py-3 cursor-pointer rounded-full"
      ></span>
    </div>
  </nav>
</template>

<script>
import { onBeforeMount, ref } from 'vue'

export default {
  name: 'HomeTopbar',
  props: { title: String, icon: String },
  setup(context) {
    const scrollShadowBoolean = ref(true)

    onBeforeMount(() => {
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
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky h-20 pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
