<template>
  <section class="flex inset-x-0 border-b p-4">
    <div class="flex w-full">
      <article class="w-full flex-1 ml-2">
        <div class="mb-1 flex flex-1 px-2">
          <div class="flex-1 flex items-center space-x-2 truncate">
            <span class="text-lg font-extrabold text-gray-600 truncate">
              Architecture Hub
            </span>

            <span class="text-lg font-medium text-gray-500 truncate">
              @ArchitectureHub
            </span>
          </div>

          <span
            class="fa fa-ellipsis-h text-gray-500 font-normal italic items-center text-2xl px-3 py-1 cursor-pointer rounded-full"
          ></span>
        </div>

        <div class="px-2 mt-2">
          <img
            class="w-full h-56 object-fill border rounded-xl"
            src="@/assets/script.jpg"
          />
        </div>

        <div class="px-2 mt-4">
          <span class="text-lg block mb-1 font-bold text-gray-600 truncate">
            Competition Title
          </span>

          <p class="text-base block font-normal text-gray-500 flex-wrap">
            {{
              is_more_description_boolean
                ? competition_description
                : competition_description.substring(
                    0,
                    lesser_description_length,
                  )
            }}

            <span
              v-if="competition_description.length >= lesser_description_length"
              @click="
                is_more_description_boolean = !is_more_description_boolean
              "
              class="py-1 px-3 font-semibold hover:text-gray-800 hover:underline cursor-pointer"
            >
              {{ is_more_description_boolean ? 'see less' : 'see all' }}
            </span>
          </p>
        </div>

        <!-- <ReactionsVue class="hidden" /> -->
      </article>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
// import ReactionsVue from '@/components/Reactions/index.vue'

export default {
  name: 'PostContentWithOnePicture',
  // components: { ReactionsVue },
  setup() {
    const is_more_description_boolean = ref(true)
    const lesser_description_length = ref(200)
    const competition_description = ref(
      ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fugiat quis iste tempora libero quo, in aliquid officia consequatur! Tempora rerum assumenda saepe fugit cupiditate, sed, sequi reiciendis inventore non animi recusandae voluptate impedit vero doloremque possimus. Possimus quisquam id in, dolores quibusdam, aut dicta qui distinctio deserunt ea rerum.`,
    )

    const validatePostParams = (event) => {
      event.preventDefault()

      console.log(`${competition_description.value}`)
    }

    return {
      competition_description,
      validatePostParams,
      is_more_description_boolean,
      lesser_description_length,
    }
  },
}
</script>

<style scoped></style>
