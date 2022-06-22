<template>
  <section class="flex inset-x-0 border-b p-2">
    <div class="flex w-full px-4">
      <div class="flex-shrink-0 mr-2">
        <span class="fa fa-retweet text-gray-600 text-2xl"></span>
      </div>

      <article class="w-full flex-1 ml-4">
        <div class="mb-1 flex items-center flex-1 px-2">
          <div class="flex-1 flex items-center space-x-2 truncate">
            <span class="text-lg font-semibold text-gray-600 truncate">
              Dasaolu Daniel
            </span>

            <span
              class="text-sm cursor-pointer font-medium text-gray-500 truncate"
            >
              @ArchyScript
            </span>
            <span class="text-sm font-normal text-gray-300 truncate">
              |
            </span>
            <span class="text-xs font-normal text-gray-500 truncate">
              Jun 4, 2020
            </span>
          </div>

          <p class="text-gray-500 font-normal italic items-center text-sm">
            <span
              class="fa fa-ellipsis-h text-2xl px-3 py-1 cursor-pointer rounded-full"
            ></span>
          </p>
        </div>

        <div class="px-2">
          <p class="text-base font-normal italic text-gray-500">
            Daniel Dasaolu liked your post
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CreatePost',
  setup() {
    const notification_type = ref('all')

    const validatePostParams = (event) => {
      event.preventDefault()

      console.log(`post value of ${notification_type.value}`)
    }

    return {
      notification_type,
      validatePostParams,
    }
  },
}
</script>

<style scoped></style>
