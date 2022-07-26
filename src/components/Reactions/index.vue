<template>
  <section
    class="flex flex-col items-center border-gray-200 inset-x-0 mt-2 bg-red-300 bg-opacity-10"
  >
    {{ is_post_bookmarked_by_auth_user }}
    {{ 'is_post_liked_by_auth_user' + ' ' + is_post_liked_by_auth_user }}
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
          :class="
            is_post_liked_by_auth_user ? 'fa fa-heart   ' : 'fa fa-heart-o'
          "
          class="text-lg lg:text-xl px-3 py-2 rounded-full text-red-700 hover:bg-red-500 hover:bg-opacity-10"
          @click="
            handleLikePost(
              current_liked_post_id,
              is_post_liked_by_auth_user,
              post_comment_object,
            )
          "
        ></span>

        <span>
          {{ reactions.no_of_likes }}
        </span>
      </span>

      <span
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:bg-red-200 hover:bg-opacity-20 hover:text-green-700"
      >
        <span
          :class="
            is_post_bookmarked_by_auth_user
              ? 'fa fa-bookmark   '
              : 'fa fa-bookmark-o'
          "
          class="text-lg lg:text-xl px-3 py-2 rounded-full text-red-700 hover:bg-red-500 hover:bg-opacity-10"
          @click="
            handleBookmark(is_post_bookmarked_by_auth_user, post_comment_object)
          "
        ></span>
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
import { createNewLike } from '@/controller/api/reactions.api'
// import { allLikes } from '@/controller/api/reactions.api'

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
    const current_liked_post_id = ref('')
    const allUsers = ref<UserSchema[]>([])
    const storeUsers = computed(() => store.state._requests.allUsers)
    const storePosts = computed(() => store.state._requests.allPosts)
    const storePostLikes = computed(() => store.state._requests.allPostLikes)
    const storeCompetitionLikes = computed(
      () => store.state._requests.allCompetitionLikes,
    )
    const storeScholarshipLikes = computed(
      () => store.state._requests.allScholarshipLikes,
    )
    const storeCompetitions = computed(
      () => store.state._requests.allCompetitions,
    )
    const storeScholarships = computed(
      () => store.state._requests.allScholarships,
    )
    const allPostLikes = ref([])
    const allCompetitionLikes = ref([])
    const allScholarshipLikes = ref([])
    const is_post_bookmarked_by_auth_user = ref(false)
    const is_post_liked_by_auth_user = ref(false)
    const post_comment_object = ref({
      post_id: '',
      post_type: '',
    })
    const no_of_likes = ref(0)
    // const displayPostReactions = () => {
    const displayPostReactions = async () => {
      const {
        post_comment_object: { post_type, post_id },
      } = await props.reactions

      props.reactions.no_of_comments < 1 ? '' : props.reactions.no_of_comments
      props.reactions.no_of_likes < 1 ? '' : props.reactions.no_of_likes

      post_comment_object.value.post_type = post_type
      post_comment_object.value.post_id = post_id

      console.log(post_comment_object.value)
      await checkIfPostHaveBeenBookmarkedByAuthUser(post_comment_object.value)
      await checkIfPostHaveBeenLikedByAuthUser(post_comment_object.value)

      console.log(is_post_bookmarked_by_auth_user.value)

      // console.log(post_comment_object.value)
      // console.log(post_comment_object.value)
      // console.log(post_comment_object.value)
      // console.log(post_comment_object.value)
      // alert(post_comment_object.value.post_id)
    }

    // checks if post have been bookmarked by auth user
    const checkIfPostHaveBeenBookmarkedByAuthUser = async (
      comment_object: any,
    ) => {
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
              is_post_bookmarked_by_auth_user.value = true
            }
          })
        }
      })
    }

    // checks if post have been liked by auth user
    const checkIfPostHaveBeenLikedByAuthUser = async (comment_object: any) => {
      // if (storeUsers.value.length >= 1) {
      //   allUsers.value = storeUsers.value
      // } else {
      //   await fetchUsers()
      // }

      // check if post have been liked from their respoective components

      //
      if (comment_object.post_type === 'post') {
        if (storePostLikes.value.length >= 1) {
          allPostLikes.value = storePostLikes.value
        } else {
          await fetchAllPostLikes()
        }

        allPostLikes.value.forEach(async (eachPostLike: any) => {
          const { post_id, liker_id } = eachPostLike
          if (
            liker_id === auth_user.value._id &&
            post_id === comment_object.post_id
          ) {
            console.log(`like_id: ${eachPostLike._id}`)
            is_post_liked_by_auth_user.value = true
          }
        })
      }
      //
      if (comment_object.post_type === 'competition') {
        console.log('competitio')

        if (storeCompetitionLikes.value.length >= 1) {
          allCompetitionLikes.value = storeCompetitionLikes.value
        } else {
          await fetchAllCompetitionLikes()
        }

        allCompetitionLikes.value.forEach(async (eachCompetitionLike: any) => {
          const { competition_id, liker_id } = eachCompetitionLike
          if (
            liker_id === auth_user.value._id &&
            competition_id === comment_object.post_id
          ) {
            console.log(`like_id: ${eachCompetitionLike._id}`)
            is_post_liked_by_auth_user.value = true
          }
        })
      }
      //
      if (comment_object.post_type === 'scholarship') {
        if (storePostLikes.value.length >= 1) {
          allPostLikes.value = storePostLikes.value
        } else {
          await fetchAllPostLikes()
        }

        allPostLikes.value.forEach(async (eachPostLike: any) => {
          const { post_id, liker_id } = eachPostLike
          if (
            liker_id === auth_user.value._id &&
            post_id === comment_object.post_id
          ) {
            console.log(`like_id: ${eachPostLike._id}`)
            is_post_liked_by_auth_user.value = true
          }
        })
      }

      // const response = await allLikes(params)
      // console.log(response)

      // allUsers.value.forEach((eachUser: any) => {
      //   if (auth_user.value.username === eachUser.username) {
      //     const { bookmarked } = eachUser
      //     if (bookmarked.length < 1) return

      //     bookmarked.forEach(async (each_bookmark_by_auth_user: any) => {
      //       const { post_id, post_type } = each_bookmark_by_auth_user
      //       if (
      //         comment_object.post_id === post_id &&
      //         comment_object.post_type === post_type
      //       ) {
      //         // if (post_type === 'post') {
      //         is_post_bookmarked_by_auth_user.value = true

      //         // if (storePosts.value && storePosts.value.length >= 1) {
      //         //   allPosts.value = storePosts.value
      //         // } else {
      //         //   await fetchAllPostLikes()
      //         // }

      //         // console.log('tell me more')

      //         // //
      //         // allPosts.value.forEach((eachPost: any) => {
      //         //   const { _id } = eachPost

      //         //   if (post_id === _id) {
      //         //     is_post_bookmarked_by_auth_user.value = true
      //         //   } else is_post_bookmarked_by_auth_user.value = false
      //         // })
      //         // }

      //         // if (post_type === 'competition') {
      //         //   console.log(7438479374)
      //         //   if (
      //         //     storeCompetitions.value &&
      //         //     storeCompetitions.value.length >= 1
      //         //   ) {
      //         //     allCompetitions.value = storeCompetitions.value
      //         //   } else {
      //         //     await fetchLikes()
      //         //   }
      //         //   allCompetitions.value.forEach((eachCompetition: any) => {
      //         //     const { _id } = eachCompetition

      //         //     if (post_id === _id) {
      //         //       is_post_bookmarked_by_auth_user.value = true
      //         //     } else is_post_bookmarked_by_auth_user.value = false
      //         //   })
      //         // }

      //         // if (post_type === 'scholarship') {
      //         //   if (
      //         //     storeScholarships.value &&
      //         //     storeScholarships.value.length >= 1
      //         //   ) {
      //         //     allScholarships.value = storeScholarships.value
      //         //   } else {
      //         //     await fetchScholarshipLikes()
      //         //   }

      //         //   allScholarships.value.forEach(async (eachScholarship: any) => {
      //         //     const { _id } = await eachScholarship

      //         //     console.log(eachScholarship)
      //         //     if (post_id === _id) {
      //         //       is_post_bookmarked_by_auth_user.value = true
      //         //     } else is_post_bookmarked_by_auth_user.value = false
      //         //   })
      //         // }
      //       }
      //     })
      //   }
      // })
    }

    // get data from store
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
      allUsers.value = storeUsers.value
    }
    const fetchAllPostLikes = async () => {
      await store.dispatch('_requests/getAllPostLikes')
      allPostLikes.value = storePostLikes.value
    }
    const fetchAllCompetitionLikes = async () => {
      await store.dispatch('_requests/getAllCompetitionLikes')
    }
    const fetchAllScholarshipLikes = async () => {
      await store.dispatch('_requests/getAllScholarshipLikes')
    }

    const handleLikePost = async (
      liked_post_id: any,
      is_post_liked: boolean,
      comment_object: any,
    ) => {
      if (is_post_liked) {
        console.log('i want to reverse like on this post')
        const params = {
          liker_id: auth_user.value._id,
          like_id: liked_post_id,
          post_type: comment_object.post_type,
        }

        console.log(params)
      }
      if (!is_post_liked) {
        const params = {
          liker_id: auth_user.value._id,
          post_id: comment_object.post_id,
          post_type: comment_object.post_type,
        }

        const response = await createNewLike(params)

        const { error, data, status } = response
        if (error || status === 400 || !data) return

        console.log(props.reactions.no_of_likes)
        props.reactions.no_of_likes + 1
        console.log(props.reactions.no_of_likes)
      }

      if (comment_object.post_type === 'post') await fetchAllPostLikes()
      if (comment_object.post_type === 'competition')
        await fetchAllCompetitionLikes()
      if (comment_object.post_type === 'scholarship')
        await fetchAllScholarshipLikes()
      await checkIfPostHaveBeenLikedByAuthUser(comment_object)
    }

    const handleBookmark = (
      is_post_bookmarked: boolean,
      post_comment_object: any,
    ) => {
      if (is_post_bookmarked) {
        console.log('i want to unbookmark this post')
      }
      if (!is_post_bookmarked) {
        console.log('i want to bookmark this post')
      }
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
      is_post_liked_by_auth_user,
      current_liked_post_id,
      is_post_bookmarked_by_auth_user,
      handleLikePost,
      commentOnPost,
      handleBookmark,
    }
  },
}
</script>

<style scoped></style>
