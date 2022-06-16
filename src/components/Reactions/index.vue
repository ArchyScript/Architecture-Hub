<template>
  <section
    class="flex items-center rounded-2xl border-gray-200 inset-x-0 shadow-sm md:shadow-none mt-4"
  >
    <div class="w-full flex items-center space-x-2">
      <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:text-green-700"
      >
        <span
          class="fa fa-comment-o text-2xl px-3 py-2 rounded-full hover:text-green-700 hover:bg-green-500 hover:bg-opacity-10"
        ></span>

        <span>
          1
        </span>
      </span>

      <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:text-red-700"
      >
        <span
          class="fa fa-heart-o text-2xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
        ></span>

        <span>
          132
        </span>
      </span>

      <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center hover:text-red-700 text-gray-500 font-bold"
      >
        <span
          class="fa fa-bookmark-o text-2xl px-4 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
        ></span>
      </span>

      <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center hover:text-red-700 text-gray-500 font-bold"
      >
        <span
          class="fa fa-share text-2xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
        ></span>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'Reactions',
  setup() {
    const test_value = ref('')

    return {
      test_value,
    }
  },
}
</script>

<style scoped></style>
