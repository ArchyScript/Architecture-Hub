<template>
  <section
    class="flex flex-col animate-pulse inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex w-full p-2 sm:p-3 xl:p-4 pb-2 animate-pulse border-b">
      <div class="rounded-full bg-gray-300 w-14 h-14 sm:h-16 sm:w-16"></div>

      <article class="ml-2 flex-1 p-2">
        <div
          class="h-2 sm:h-4 p-1 w-3/4 bg-gray-300 rounded-xl col-span-2 mb-1"
        ></div>

        <div class="grid grid-cols-8 gap-2">
          <div class="h-2 sm:h-4 p-1 bg-gray-300 rounded-xl col-span-2"></div>
          <div class="h-2 sm:h-4 p-1 bg-gray-300 rounded-xl col-span-2"></div>
        </div>

        <div class="mt-4 space-y-2">
          <div
            class="h-2 sm:h-4 p-1 bg-gray-300 rounded-xl col-span-2 mb-1"
          ></div>
          <div
            class="h-2 sm:h-4 p-1 bg-gray-300 rounded-xl col-span-2 mb-1"
          ></div>
          <div
            class="h-2 sm:h-4 p-1 bg-gray-300 rounded-xl col-span-2 mb-1"
          ></div>
          <div
            class="h-2 sm:h-4 w-3/4 p-1 bg-gray-300 rounded-xl col-span-2 mb-1"
          ></div>
        </div>

        <div
          class="sm:h-56 lg:h-72 p-1 bg-gray-300 rounded-xl col-span-2 mt-4"
        ></div>
      </article>
    </div>

    <div class="mt-6">
      <div v-for="x in 5" :key="x">
        <div class="flex w-full p-2 sm:p-3 animate-pulse">
          <div class="rounded-full bg-gray-300 w-10 h-10 sm:h-12 sm:w-12"></div>

          <article class="ml-2 flex-1 p-2">
            <div class="h-1 p-1 bg-gray-300 rounded-xl col-span-2 mb-1"></div>
            <div class="h-1 p-1 bg-gray-300 rounded-xl col-span-2 mb-1"></div>
            <div
              class="h-1 p-1 w-3/4 bg-gray-300 rounded-xl col-span-2 mb-1"
            ></div>

            <div class="flex mt-5 justify-end">
              <div class="h-1 w-1/4 p-1 bg-gray-300 rounded-xl"></div>
            </div>
          </article>
        </div>
      </div>
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
