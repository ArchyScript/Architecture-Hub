<template>
  <section
    class="flex flex-col animate-pulse inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex w-full p-1 sm:p-2 xl:p-4 pb-2 animate-pulse">
      <div class="rounded-full bg-gray-400 w-10 h-10 sm:h-12 sm:w-12"></div>

      <article class="ml-2 flex-1 p-2">
        <div
          class="h-1 sm:h-2 p-1 w-3/4 bg-gray-400 rounded-xl col-span-2 mb-1"
        ></div>

        <div class="grid grid-cols-8 gap-2">
          <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
          <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
        </div>

        <div class="mt-4 space-y-2">
          <div
            class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2 mb-1"
          ></div>
          <div
            class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2 mb-1"
          ></div>
          <div
            class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2 mb-1"
          ></div>
          <div
            class="h-1 sm:h-2 w-3/4 p-1 bg-gray-400 rounded-xl col-span-2 mb-1"
          ></div>
        </div>

        <div
          class="h-40 sm:h-48 p-1 bg-gray-400 rounded-xl col-span-2 mt-4"
        ></div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AnimatedPostContent',

  setup() {
    return {}
  },
}
</script>

<style scoped></style>
