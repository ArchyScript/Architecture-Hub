<template>
  <section
    class="flex flex-col items-center border-gray-200 inset-x-0 mt-2 bg-red-300 bg-opacity-10"
  >
    {{ is_post_bookmarked_by_auth_user }}
    {{ post_comment_object }}

    <div class="w-full flex items-center justify-around space-x-2">
      <span
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:bg-red-200 hover:bg-opacity-20 hover:text-green-700"
      >
        <span
          class="fa fa-comment-o text-base lg:text-lg xl:text-xl px-3 py-2 rounded-full hover:text-green-700 hover:bg-green-500 hover:bg-opacity-10"
          @click="commentOnPost(post_comment_object)"
        ></span>
        <span
          class="fa fa-comment text-base lg:text-lg xl:text-xl px-3 py-2 rounded-full hover:text-green-700 hover:bg-green-500 hover:bg-opacity-10"
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
        <span
          class="fa fa-heart text-lg lg:text-xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
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
          v-if="auth_user.username === 'ArchyScript'"
          class="fa fa-bookmark text-lg lg:text-xl px-3 py-2 rounded-full text-red-700"
          @click="bookmarkPost(post_comment_object)"
        ></span>
        <span
          v-if="auth_user.username === 'Scriptocurrency'"
          class="fa fa-bookmark-o text-lg lg:text-xl px-3 py-2 rounded-full hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10"
          @click="bookmarkPost(post_comment_object)"
        ></span>

        <!-- <span>
          {{ reactions.no_of_likes }}
        </span> -->
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import {
  UserSchema,
  PostSchema,
  CompetitionSchema,
  ScholarshipSchema,
} from '@/controller/typings'

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
    const store = useStore()
    const auth_user = computed(() => store.state.users.auth_user)
    const auth_user_bookmarked_posts = computed(
      () => store.state.users.auth_user.bookmarked,
    )
    const allPosts = ref<PostSchema[]>([])
    const allCompetitions = ref<CompetitionSchema[]>([])
    const allScholarships = ref<ScholarshipSchema[]>([])
    const allUsers = ref<UserSchema[]>([])
    const storeUsers = computed(() => store.state._requests.allUsers)
    const storePosts = computed(() => store.state._requests.allPosts)
    const storeCompetitions = computed(
      () => store.state._requests.allCompetitions,
    )
    const storeScholarships = computed(
      () => store.state._requests.allScholarships,
    )
    const is_post_bookmarked_by_auth_user = ref(false)
    const post_comment_object = ref({
      post_id: '',
      post_type: '',
    })
    // const displayPostReactions = () => {
    const displayPostReactions = async () => {
      const {
        no_of_comments,
        no_of_likes,
        post_comment_object: { post_type, post_id },
      } = await props.reactions

      props.reactions.no_of_comments < 1 ? '' : props.reactions.no_of_comments
      props.reactions.no_of_likes < 1 ? '' : props.reactions.no_of_likes

      post_comment_object.value.post_type = post_type
      post_comment_object.value.post_id = post_id

      console.log(post_comment_object.value)
      await checkIfPostHaveBeenBookmarked(post_comment_object.value)

      console.log(is_post_bookmarked_by_auth_user.value)

      // console.log(post_comment_object.value)
      // console.log(post_comment_object.value)
      // console.log(post_comment_object.value)
      // console.log(post_comment_object.value)
      // alert(post_comment_object.value.post_id)
    }

    // checks if post have been liked by auth user
    const checkIfPostHaveBeenBookmarked = async (comment_object: any) => {
      // const { post_type, post_id } = comment_object

      if (storeUsers.value.length >= 1) {
        allUsers.value = storeUsers.value
      } else {
        await fetchUsers()
      }

      allUsers.value.forEach((eachUser: any) => {
        if (auth_user.value.username === eachUser.username) {
          const { bookmarked } = eachUser
          if (bookmarked.length < 1) return

          bookmarked.forEach(async (each_bookmark_by_auth_user: any) => {
            const { post_id, post_type } = each_bookmark_by_auth_user
            if (
              comment_object.post_id === post_id &&
              comment_object.post_type === post_type
            ) {
              // if (post_type === 'post') {
              is_post_bookmarked_by_auth_user.value = true

              // if (storePosts.value && storePosts.value.length >= 1) {
              //   allPosts.value = storePosts.value
              // } else {
              //   await fetchPosts()
              // }

              // console.log('tell me more')

              // //
              // allPosts.value.forEach((eachPost: any) => {
              //   const { _id } = eachPost

              //   if (post_id === _id) {
              //     is_post_bookmarked_by_auth_user.value = true
              //   } else is_post_bookmarked_by_auth_user.value = false
              // })
              // }

              // if (post_type === 'competition') {
              //   console.log(7438479374)
              //   if (
              //     storeCompetitions.value &&
              //     storeCompetitions.value.length >= 1
              //   ) {
              //     allCompetitions.value = storeCompetitions.value
              //   } else {
              //     await fetchCompetitions()
              //   }
              //   allCompetitions.value.forEach((eachCompetition: any) => {
              //     const { _id } = eachCompetition

              //     if (post_id === _id) {
              //       is_post_bookmarked_by_auth_user.value = true
              //     } else is_post_bookmarked_by_auth_user.value = false
              //   })
              // }

              // if (post_type === 'scholarship') {
              //   if (
              //     storeScholarships.value &&
              //     storeScholarships.value.length >= 1
              //   ) {
              //     allScholarships.value = storeScholarships.value
              //   } else {
              //     await fetchScholarships()
              //   }

              //   allScholarships.value.forEach(async (eachScholarship: any) => {
              //     const { _id } = await eachScholarship

              //     console.log(eachScholarship)
              //     if (post_id === _id) {
              //       is_post_bookmarked_by_auth_user.value = true
              //     } else is_post_bookmarked_by_auth_user.value = false
              //   })
              // }
            }
          })
        }
      })
    }

    // get data from store
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
      allUsers.value = storeUsers.value
    }
    const fetchPosts = async () => {
      await store.dispatch('_requests/getAllPosts')
      allPosts.value = storePosts.value
    }
    const fetchCompetitions = async () => {
      await store.dispatch('_requests/getAllCompetitions')
      allCompetitions.value = storeCompetitions.value
    }
    const fetchScholarships = async () => {
      await store.dispatch('_requests/getAllScholarships')
      allScholarships.value = storeScholarships.value
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
      auth_user,
      post_comment_object,
      auth_user_bookmarked_posts,
      is_post_bookmarked_by_auth_user,
      likePost,
      commentOnPost,
      bookmarkPost,
    }
  },
}
</script>

<style scoped></style>
