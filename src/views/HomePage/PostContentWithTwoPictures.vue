<template>
  <section class="flex inset-x-0 border-b p-4">
    <div class="flex w-full">
      <div class="flex-shrink-0 mr-1">
        <img class="w-12 h-12 rounded-full border" src="@/assets/script.jpg" />
      </div>

      <article class="w-full flex-1 ml-2">
        <div class="mb-1 flex flex-1 px-2">
          <div class="flex-1 flex items-center space-x-2 truncate">
            <span class="text-lg font-extrabold text-gray-600 truncate">
              Dasaolu Daniel
            </span>

            <span class="text-lg font-medium text-gray-500 truncate">
              @ArchyScript
            </span>
            <span class="text-lg font-medium text-gray-300 truncate">
              |
            </span>
            <span class="text-sm font-medium text-gray-500 truncate">
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
          <p class="text-base font-normal text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            numquam
          </p>
        </div>

        <div class="px-2 mt-2 h-56 grid grid-cols-2">
          <img
            class="w-full h-56 object-fill border rounded-tl-xl rounded-bl-xl"
            src="@/assets/script.jpg"
          />
          <img
            class="w-full h-56 object-fill border rounded-tr-xl rounded-br-xl"
            src="@/assets/script.jpg"
          />
        </div>

        <!-- <button></button> -->

        <ReactionsVue />
      </article>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'

export default {
  name: 'PostContentWithTwoPictures',
  components: { ReactionsVue },
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
