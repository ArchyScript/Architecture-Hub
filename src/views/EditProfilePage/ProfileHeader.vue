<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="h-60 w-full">
      <span class="h-full w-full block bg-blue-400 border"></span>
      <!-- <img class="w-full h-60 object-fill border" src="@/assets/script.jpg" /> -->
    </div>

    <div class="px-4">
      <div class="flex justify-between">
        <span
          class="h-28 w-28 p-1 rounded-full -mt-14 block bg-archyhub-semi-light border"
        >
          <img
            class="w-full h-full rounded-full object-fill"
            src="@/assets/script.jpg"
          />
        </span>

        <div class="flex flex-1 items-center px-2 space-x-3 mb-2">
          <h4 class="text-2xl font-bold text-gray-600">
            Dasolu Daniel
          </h4>
          <span
            class="text-base font-semibold cursor-pointer text-gray-500 truncate"
          >
            @ArchyScript
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfileHeader',
  setup() {
    return {}
  },
}
</script>
<style scoped></style>
