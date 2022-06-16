<template>
  <section class="flex inset-x-0 mb-8">
    <div class="flex w-full">
      <div class="flex-shrink-0">
        <img class="w-14 h-14 rounded-full border" src="@/assets/script.jpg" />
      </div>

      <form class="w-full flex-1" @submit="validateSearchParams">
        <div
          class="flex w-full items-center border-2 border-gray-200 py-3 px-5 rounded-3xl"
        >
          <select class="w-full border bg-white rounded px-3 py-2 outline-none">
            <option class="py-1">Option 1</option>
            <option class="py-1">Option 2</option>
            <option class="py-1">Option 3</option>
          </select>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { onBeforeMount, ref } from 'vue'

export default {
  name: 'CreatePost',
  setup() {
    const scrollShadowBoolean = ref(true)
    const post_value = ref('')

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

      console.log(`search value of ${post_value.value}`)
    }

    return {
      post_value,
      validateSearchParams,
      scrollShadowBoolean,
    }
  },
}
</script>

<style scoped></style>
