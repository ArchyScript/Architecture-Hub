<template>
  <header
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center text-archyhub-dark-dark bg-archyhub-light fixed top-0 inset-x-0 z-50 py-4 shadow-sm md:shadow-none"
  >
    <div class="container flex justify-between items-center px-10">
      <div class="py-1 mx-2">
        <router-link to="home">
          <img
            class="h-5 cursor-pointer"
            src="@/assets/script.jpg"
            alt="logo"
          />
        </router-link>
      </div>

      <span @click="toggleLeftNav" class="fa fa-home text-2xl"></span>
    </div>
  </header>
</template>

<script>
import { onBeforeMount, ref } from 'vue'

export default {
  name: 'Topbar',
  setup(context) {
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
    const navbar_links = ref([
      {
        title: 'How it works',
        link: 'https://www.mysquareroof.com/how-it-works',
      },
      {
        title: 'Learn',
        link: 'https://www.mysquareroof.com/learn',
      },
      {
        title: 'About',
        link: 'https://www.mysquareroof.com/about',
      },
      {
        title: 'Contact',
        link: 'https://www.mysquareroof.com/contact',
      },
    ])

    const toggleLeftNav = () => {
      return context.emit('toggleLeftNav')
    }

    return {
      scrollShadowBoolean,
      navbarTogglerIsOpenBoolean,
      navbar_links,
      image_link,
      toggleLeftNav,
    }
  },
}
</script>
<style scoped>
section.scrolled {
  @apply z-50 sticky bg-transparent;
}
</style>
