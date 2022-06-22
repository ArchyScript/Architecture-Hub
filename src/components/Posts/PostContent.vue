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
            numquam at dicta ut voluptatibus alias eveniet, maxime temporibus
            cumque culpa blanditiis quaerat explicabo officia dolores dolor eum!
            Eius nulla consequatur cum aut reiciendis cupiditate hic, maxime
            veniam non voluptas a expedita repellat rerum ducimus perferendis,
            delectus officia, nobis dolor ab?
          </p>
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
  name: 'PostContent',
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
