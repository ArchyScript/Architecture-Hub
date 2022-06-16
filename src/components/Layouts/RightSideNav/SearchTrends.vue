<template>
  <section
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 px-6 mb-8 pt-8"
  >
    <form class="w-full" @submit="validateSearchParams">
      <div
        class="flex w-full items-center border-2 border-gray-200 py-3 px-5 rounded-3xl"
      >
        <svg
          class="h-6 w-6 text-gray-400 pr-1"
          aria-labelledby="title desc"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.9 19.7"
        >
          <g class="search-path" fill="none" stroke="#848F91">
            <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
            <circle cx="8" cy="8" r="7" />
          </g>
        </svg>

        <input
          class="px-2 w-full outline-none border-none bg-transparent"
          type="search"
          v-model="search_value"
          name="search_trend"
          placeholder="Search Trends"
        />
      </div>
    </form>
  </section>
</template>

<script>
import { onBeforeMount, ref } from 'vue'

export default {
  name: 'SearchTrends',
  setup() {
    const scrollShadowBoolean = ref(true)
    const search_value = ref('')

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

    const validateSearchParams = (event) => {
      event.preventDefault()

      console.log(`search value of ${search_value.value}`)
    }

    return {
      search_value,
      validateSearchParams,
      scrollShadowBoolean,
    }
  },
}
</script>

<style scoped>
section.scrolled {
  @apply sticky h-20 pt-0 bg-gradient-to-r from-archyhub-light   to-archyhub-semi-light  shadow-md;
}
</style>
