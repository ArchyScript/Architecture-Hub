<template>
  <section
    class="flex items-center border-gray-200 inset-x-0 mt-2 bg-red-300 bg-opacity-10"
  >
    <div class="w-full flex items-center justify-around space-x-2">
      <span
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:bg-red-200 hover:bg-opacity-20 hover:text-green-700"
      >
        <span
          class="fa fa-comment-o text-base lg:text-lg xl:text-xl px-3 py-2 rounded-full hover:text-green-700 hover:bg-green-500 hover:bg-opacity-10"
          @click="commentOnPost(post_comment_object)"
        ></span>

        <span>
          {{ reactions.no_of_comments }}
        </span>
      </span>

      <span
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:bg-red-200 hover:bg-opacity-20 hover:text-green-700"
      >
        <span
          class="fa fa-heart-o text-lg lg:text-xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
          @click="likePost(post_comment_object)"
        ></span>

        <span>
          {{ reactions.no_of_likes }}
        </span>
      </span>

      <span
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:bg-red-200 hover:bg-opacity-20 hover:text-green-700"
      >
        <span
          class="fa fa-bookmark-o text-lg lg:text-xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
          @click="bookmarkPost(post_comment_object)"
        ></span>

        <span>
          {{ reactions.no_of_likes }}
        </span>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Reactions',
  props: {
    reactions: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // const post_id = ref('')
    const post_comment_object = ref({
      post_id: '',
      post_type: '',
    })
    const store = useStore()
    // const displayPostReactions = () => {
    const displayPostReactions = () => {
      const {
        no_of_comments,
        no_of_likes,
        post_comment_object: { post_type, post_id },
      } = props.reactions

      props.reactions.no_of_comments < 1 ? '' : props.reactions.no_of_comments
      props.reactions.no_of_likes < 1 ? '' : props.reactions.no_of_likes

      post_comment_object.value.post_type = post_type
      post_comment_object.value.post_id = post_id

      // alert(post_comment_object.value.post_id)
    }

    const likePost = (post_comment_object: any) => {
      console.log(post_comment_object)
      // const bookmarkPost = (post_comment_object: any) => {
    }

    const bookmarkPost = (post_comment_object: any) => {
      console.log(post_comment_object)
    }

    const commentOnPost = (params: any) => {
      // store.dispatch('component_handler/openCommentModal', post_id)
      store.dispatch('component_handler/getPostCommentObject', params)
      // console.log(post_id)
    }

    onBeforeMount(() => {
      //
      displayPostReactions()
    })

    return {
      post_comment_object,
      likePost,
      commentOnPost,
      bookmarkPost,
    }
  },
}
</script>

<style scoped></style>
