<template>
  <section
    class="flex items-center rounded-2xl border-gray-200 inset-x-0 shadow-sm md:shadow-none mt-4"
  >
    <div class="w-full flex items-center space-x-2 mt-2">
      <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:text-green-700"
      >
        <span
          class="fa fa-comment-o text-2xl px-3 py-2 rounded-full hover:text-green-700 hover:bg-green-500 hover:bg-opacity-10"
          @click="commentOnPost(post_id)"
        ></span>

        <span>
          {{ reactions.no_of_comments }}
        </span>
      </span>

      <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold"
      >
        <span
          class="fa fa-heart-o text-2xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
          @click="likePost(post_id)"
        ></span>

        <span>
          {{ reactions.no_of_likes }}
        </span>
      </span>

      <CreatePostModalVue class="hidden" />

      <!-- <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center hover:text-red-700 text-gray-500 font-bold"
      >
        <span
          class="fa fa-bookmark-o text-2xl px-4 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
        ></span>
      </span> -->

      <!-- <span
        class="flex-1 flex space-x-1 items-center cursor-pointer text-center hover:text-red-700 text-gray-500 font-bold"
      >
        <span
          class="fa fa-share text-2xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
        ></span>
      </span> -->
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import CreatePostModalVue from '@/components/Modals/CreatePostModal.vue'

export default {
  name: 'Reactions',
  props: {
    reactions: {
      type: Object,
      required: true,
    },
  },
  components: {
    CreatePostModalVue,
  },
  setup(props: any) {
    const post_id = ref('')

    const displayPostReactions = () => {
      props.reactions.no_of_comments < 1 ? '' : props.reactions.no_of_comments
      props.reactions.no_of_likes < 1 ? '' : props.reactions.no_of_likes

      post_id.value = props.reactions.post_id
    }

    const likePost = (post_id: any) => {
      console.log(post_id)
    }

    const commentOnPost = (post_id: any) => {
      console.log(post_id)
    }

    onBeforeMount(() => {
      //
      displayPostReactions()
    })

    return {
      post_id,
      likePost,
      commentOnPost,
    }
  },
}
</script>

<style scoped></style>
