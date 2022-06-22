<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex flex-col items-center top-0 inset-x-0 pb-4"
  >
    <div class="w-full flex justify-between items-center px-4 py-3">
      <h4 class="text-2xl font-bold px-2 text-gray-700">
        Notifications
      </h4>

      <span
        class="fa fa-bell text-2xl text-gray-700 hover:bg-archyhub-semi-light hover:bg-opacity-50 px-4 py-3 cursor-pointer rounded-full"
      ></span>
    </div>

    <div class="w-full flex items-center">
      <span
        @click="toggleActiveNotification('all')"
        :class="
          toggle_active_notification === 'all'
            ? 'border-b-4 border-red-400 text-red-500'
            : ''
        "
        class="flex-1 py-4 space-x-1 items-center cursor-pointer text-center hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10 text-gray-500 font-medium"
      >
        <span class="text-lg px-4">
          All
        </span>
      </span>

      <span
        @click="toggleActiveNotification('mentioned')"
        :class="
          toggle_active_notification === 'mentioned'
            ? 'border-b-4 border-red-400 text-red-500'
            : ''
        "
        class="flex-1 py-4 space-x-1 items-center cursor-pointer text-center hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10 text-gray-500 font-medium"
      >
        <span class="text-lg px-4">
          Mentioned
        </span>
      </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue'

export default {
  name: 'NotificationsTopbar',
  setup() {
    const scrollShadowBoolean = ref(true)
    const toggle_active_notification = ref('all')

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

    const toggleActiveNotification = (current_active: string) => {
      toggle_active_notification.value = current_active
      console.log(current_active)
    }

    return {
      scrollShadowBoolean,
      toggleActiveNotification,
      toggle_active_notification,
    }
  },
}
</script>

<style scoped>
nav.scrolled {
  @apply sticky h-36 pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
