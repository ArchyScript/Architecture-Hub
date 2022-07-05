<template>
  <section class="flex inset-x-0 border-b p-4">
    <div class="flex flex-col w-full">
      <!-- <div class="flex w-full" v-for="(post, index) in allPosts" :key="index"> -->
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

        {{ eachPost }}

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
import ReactionsVue from '@/components/Reactions/index.vue'
import { PostSchema } from '@/controller/typings/index'

export default {
  name: 'PostContent',
  components: { ReactionsVue },
  props: {
    eachPost: {
      type: String,
      // type: Object as PropType<PostSchema>,
      required: true,
    },
  },
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
