<template>
  <section
    :class="{ scrolled: !scrollShadowBoolean }"
    class="w-full top-0 min-h-screen h-full md:h-auto sticky z-4 shadow-md bg-archyhub-light"
  >
    <div class="p-6">
      <NavLinks />
    </div>
  </section>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import NavLinks from './NavLinks.vue'

export default {
  name: 'LeftSideNav',
  components: {
    NavLinks,
  },

  setup() {
    const scrollShadowBoolean = ref(true)

    window.addEventListener('scroll', () => handleScroll())

    onBeforeMount(() => handleScroll())

    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (scrollShadowBoolean.value) scrollShadowBoolean.value = false
      } else {
        // user is at top of page
        if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true
      }
    }

    return {
      scrollShadowBoolean,
    }
  },
}
</script>

<style scoped></style>
