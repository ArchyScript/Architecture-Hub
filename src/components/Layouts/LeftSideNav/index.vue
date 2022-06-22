<template>
  <section
    :class="{ scrolled: !scrollShadowBoolean }"
    class="w-full top-0 min-h-screen sticky z-4 shadow-md bg-archyhub-light"
  >
    <div class="p-6">
      <NavLinks />
      <UserSection />
    </div>
  </section>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import UserSection from './UserSection.vue'
import NavLinks from './NavLinks.vue'

export default {
  name: 'LeftSideNav',
  components: {
    UserSection,
    NavLinks,
  },

  setup() {
    const scrollShadowBoolean = ref(true)
    const navbarTogglerIsOpenBoolean = ref(false)
    const image_link = ref("require('@/assets/mysquareroof/squareroof2.png')")

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

    return {
      scrollShadowBoolean,
      navbarTogglerIsOpenBoolean,
      image_link,
    }
  },
}
</script>

<style scoped></style>
