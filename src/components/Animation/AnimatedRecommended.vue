<template>
  <section
    class="flex flex-col animate-pulse inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex w-full p-2 sm:p-3 xl:p-4 pb-2 animate-pulse">
      <div class="rounded-full bg-gray-400 w-12 h-12 sm:h-14 sm:w-14"></div>

      <article class="ml-2 flex-1 p-2">
        <div class="h-2 bg-gray-400 rounded-xl col-span-2 mb-1"></div>
        <div class="h-2 bg-gray-400 rounded-xl col-span-2 mb-1"></div>
        <div class="h-2 bg-gray-400 rounded-xl col-span-2 mb-1"></div>
        <div class="h-2 w-3/4 bg-gray-400 rounded-xl col-span-2 mb-1"></div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AnimatedRecommended',

  setup() {
    return {}
  },
}
</script>

<style scoped></style>
