<template>
  <section class="flex inset-x-0 border-b p-2">
    <div class="flex w-full px-2">
      <div class="flex-shrink-0 mr-2">
        <img class="w-14 h-14 rounded-full border" src="@/assets/script.jpg" />
      </div>

      <form class="w-full flex-1 ml-4" @submit="validatePostParams">
        <div class="flex w-full items-center border-b-2 border-gray-300">
          <textarea
            class="w-full text-xl resize-none py-3 px-2 mb-3 text-gray-700 bg-archyhub-light bg-opacity-10 focus:outline-none rounded-2xl"
            rows="2"
            placeholder="What's happening?"
          ></textarea>
        </div>

        <!-- <button></button> -->

        <div class="flex justify-between items-center">
          <div class="flex">
            <label for="post_image">
              <span
                class="fa fa-image text-2xl text-gray-700 hover:bg-archyhub-semi-light hover:bg-opacity-50 px-4 py-3 cursor-pointer rounded-full"
              ></span>
            </label>

            <input
              type="file"
              multiple
              class="hidden"
              id="post_image"
              required
            />
          </div>

          <div class="text-center">
            <button
              class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
            >
              Create Post
              <span class="fa fa-pencil ml-3"></span>
            </button>
          </div>
        </div>

        <!-- <input
          type="file"
          class="w-full text-gray-700 px-3 py-2 border rounded"
        /> -->
      </form>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CreatePost',
  setup() {
    const post_value = ref('')

    const validatePostParams = (event) => {
      event.preventDefault()

      console.log(`post value of ${post_value.value}`)
    }

    return {
      post_value,
      validatePostParams,
    }
  },
}
</script>

<style scoped></style>
