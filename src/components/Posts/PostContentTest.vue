<template>
  <section class="flex inset-x-0 border-b p-4">
    <div class="flex -col w-full">
      <!-- <div class="flex w-full" v-for="(post, index) in allPosts" :key="index"> -->
      <div class="flex-shrink-0 mr-1">
        <img
          class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border"
          src="@/assets/script.jpg"
        />
      </div>

      <article class="w-full flex-1 ml-1 sm:ml-2">
        <div class="mb-1 flex flex-1 px-2">
          <div class="flex-1 flex-col truncate">
            <p class="items-center flex sm:space-x-2">
              <span
                class="text-base md:text-xl font-semibold text-gray-600 truncate"
              >
                Dasaolu Daniel
              </span>

              <span
                class="text-base md:text-lg font-normal text-gray-500 truncate"
              >
                @ArchyScript
              </span>
            </p>

            <p class="flex items-center italic space-x-3">
              <span class="text-sm font-normal text-gray-500 truncate">
                Jun 4, 2020
              </span>

              <span class="text-sm font-normal text-gray-500 truncate">
                <strong class="font-semibold">@</strong>
                08:30 pm
              </span>
            </p>
          </div>
        </div>

        <div class="px-1 sm:px-2">
          <p class="text-sm sm:text-base font-normal text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            numquam at dicta ut voluptatibus alias eveniet, maxime temporibus
            cumque culpa blanditiis quaerat explicabo officia dolores dolor eum!
            Eius nulla consequatur cum aut reiciendis cupiditate hic, maxime
            veniam non voluptas a expedita repellat rerum ducimus perferendis,
            delectus officia, nobis dolor ab?
          </p>
        </div>

        <!-- <button></button> -->

        <!-- <ReactionsVue /> -->
      </article>
    </div>
    <!-- </div> -->
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { PropType } from 'vue'
// import ReactionsVue from '@/components/Reactions/index.vue'
import { PostSchema } from '@/controller/typings/index'

export default {
  name: 'PostContentTest',
  // components: { ReactionsVue },
  // props: {
  // eachPost: {
  //   type: String,
  // type: Object as PropType<PostSchema>,
  //   required: true,
  // },
  // },
  setup() {
    const post_value = ref('')

    const validatePostParams = () => {
      console.log(`post value of ${post_value.value}`)
    }

    const getPost = () => {
      console.log(`post value of ${post_value.value}`)
    }

    onBeforeMount(() => {
      //
      // getAllPosts()
    })
    return {
      post_value,
      validatePostParams,
      // post
    }
  },
}
</script>

<style scoped></style>
