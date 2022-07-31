<template>
  <section
    class="flex flex-col items-center border-gray-200 inset-x-0 mt-2 bg-red-300 bg-opacity-10"
  >
    {{ reaction_object }}

    <div class="w-full flex items-center justify-around space-x-2">
      <span
        :title="`Comment on ${post_comment_object.post_type}`"
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:bg-red-200 hover:bg-opacity-20 hover:text-green-700"
      >
        <span
          class="fa fa-comment-o text-base lg:text-lg xl:text-xl px-3 py-2 rounded-full hover:text-green-700 hover:bg-green-500 hover:bg-opacity-10"
          @click="commentOnPost(post_comment_object)"
        ></span>
        <!-- <span
          class="fa fa-comment text-base lg:text-lg xl:text-xl px-3 py-2 rounded-full hover:text-green-700 hover:bg-green-500 hover:bg-opacity-10"
          @click="commentOnPost(post_comment_object)"
        ></span> -->

        <span>
          {{ reaction_object.no_of_comments }}
        </span>
      </span>

      <span
        :title="`Like ${post_comment_object.post_type}`"
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
          {{ reaction_object.no_of_likes }}
        </span>
      </span>

      <!--  -->
      <span
        :title="`Bookmark ${post_comment_object.post_type}`"
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-purple-500 font-bold hover:bg-purple-200 hover:bg-opacity-20"
      >
        <span
          :class="
            is_post_bookmarked_by_auth_user
              ? 'fa fa-bookmark   '
              : 'fa fa-bookmark-o'
          "
          class="text-lg lg:text-xl px-4 py-2 rounded-full text-purple-700 hover:bg-purple-500 hover:bg-opacity-10"
          @click="
            handleBookmark(is_post_bookmarked_by_auth_user, post_comment_object)
          "
        ></span>
      </span>

      <!--  -->
      <span
        :title="`Delete ${post_comment_object.post_type}`"
        :class="is_auth_user_creator_of_post ? '' : 'hidden'"
        class="flex-1 space-x-1 items-center cursor-pointer text-center text-gray-500 font-bold hover:bg-red-200 hover:bg-opacity-20 hover:text-green-700"
      >
        <span
          class="text-lg fa fa-trash-o lg:text-xl px-4 py-2 rounded-full text-red-700 hover:bg-red-500 hover:bg-opacity-10"
          @click="handleDeletion(post_comment_object)"
        ></span>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { createNewLike, reverseLike } from '@/controller/api/reactions.api'
import {
  addToBookmarked,
  removeFromBookmarked,
} from '@/controller/api/bookmarks.api'
import { deletePost } from '@/controller/api/posts.api'
import { deleteCompetition } from '@/controller/api/competitions'
import { deleteScholarship } from '@/controller/api/scholarships'

export default {
  name: 'Reactions',
  props: {
    reactions: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const store = useStore()
    const auth_user = computed(() => store.state.users.auth_user)
    const current_liked_post_id = ref('')
    const storeUsers = computed(() => store.state._requests.allUsers)
    const storePostLikes = computed(() => store.state._requests.allPostLikes)
    const storeCompetitionLikes = computed(
      () => store.state._requests.allCompetitionLikes,
    )
    const storeScholarshipLikes = computed(
      () => store.state._requests.allScholarshipLikes,
    )
    const is_post_bookmarked_by_auth_user = ref(false)
    const is_post_liked_by_auth_user = ref(false)
    const post_comment_object = ref({ post_id: '', post_type: '' })
    const like_id = ref('')
    const is_auth_user_creator_of_post = ref(false)
    const reaction_object = ref({
      post_type: '',
      post_id: '',
      no_of_comments: 0,
      no_of_likes: 0,
    })

    //
    const displayPostReactions = async () => {
      const {
        post_comment_object: { post_type, post_id },
        no_of_comments,
        no_of_likes,
      } = await props.reactions

      props.reactions.no_of_comments < 1 ? '' : props.reactions.no_of_comments
      props.reactions.no_of_likes < 1 ? '' : props.reactions.no_of_likes

      // post_comment_object.value.post_type = post_type
      // post_comment_object.value.post_id = post_id

      reaction_object.value.post_type = post_type
      reaction_object.value.post_id = post_id
      reaction_object.value.no_of_comments = no_of_comments
      reaction_object.value.no_of_likes = no_of_likes

      await checkIfPostHaveBeenLikedByAuthUser(post_comment_object.value)
      await fetchAuthUser()
      await checkIfAuthUserCanDeletePost(post_comment_object.value)
      await checkIfPostHaveBeenBookmarkedByAuthUser(post_comment_object.value)
    }

    //
    const checkIfAuthUserCanDeletePost = async (comment_object: any) => {
      const { post_id, post_type } = comment_object

      is_auth_user_creator_of_post.value = false

      //
      if (post_type === 'post') {
        if (auth_user.value.posts.length < 1) return

        auth_user.value.posts.forEach(async (each_auth_user_post: any) => {
          console.log(each_auth_user_post)
          if (each_auth_user_post.post_id === post_id) {
            console.log(post_id)
            return (is_auth_user_creator_of_post.value = true)
          }
        })
      }

      //
      if (post_type === 'competition') {
        if (auth_user.value.competitions.length < 1) return

        auth_user.value.competitions.forEach(
          async (each_auth_user_competition: any) => {
            if (each_auth_user_competition.competition_id === post_id) {
              return (is_auth_user_creator_of_post.value = true)
            }
          },
        )
      }

      //
      if (post_type === 'scholarship') {
        if (auth_user.value.scholarships.length < 1) return

        auth_user.value.scholarships.forEach(
          async (each_auth_user_scholarship: any) => {
            if (each_auth_user_scholarship.scholarship_id === post_id) {
              return (is_auth_user_creator_of_post.value = true)
            }
          },
        )
      }
    }

    // checks if post have been bookmarked by auth user
    const checkIfPostHaveBeenBookmarkedByAuthUser = async (
      comment_object: any,
    ) => {
      //
      if (storeUsers.value.length < 1) await fetchUsers()
      is_post_bookmarked_by_auth_user.value = false

      storeUsers.value.forEach((eachUser: any) => {
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
      is_post_liked_by_auth_user.value = false

      //
      if (comment_object.post_type === 'post') {
        if (storePostLikes.value.length < 1) await fetchAllPostLikes()

        storePostLikes.value.forEach(async (eachPostLike: any) => {
          const { post_id, liker_id } = eachPostLike
          if (
            liker_id === auth_user.value._id &&
            post_id === comment_object.post_id
          ) {
            current_liked_post_id.value = eachPostLike._id
            is_post_liked_by_auth_user.value = true
          }
        })
      }
      //
      if (comment_object.post_type === 'competition') {
        if (storeCompetitionLikes.value.length < 1)
          await fetchAllCompetitionLikes()

        storeCompetitionLikes.value.forEach(
          async (eachCompetitionLike: any) => {
            const { competition_id, liker_id } = eachCompetitionLike
            if (
              liker_id === auth_user.value._id &&
              competition_id === comment_object.post_id
            ) {
              current_liked_post_id.value = eachCompetitionLike._id
              is_post_liked_by_auth_user.value = true
            }
          },
        )
      }
      //
      if (comment_object.post_type === 'scholarship') {
        if (storeScholarshipLikes.value.length < 1)
          await fetchAllScholarshipLikes()

        storeScholarshipLikes.value.forEach(
          async (eachScholarshipLike: any) => {
            const { scholarship_id, liker_id } = eachScholarshipLike
            if (
              liker_id === auth_user.value._id &&
              scholarship_id === comment_object.post_id
            ) {
              current_liked_post_id.value = eachScholarshipLike._id
              is_post_liked_by_auth_user.value = true
            }
          },
        )
      }
    }

    //
    const handleLikePost = async (
      liked_post_id: any,
      is_post_liked: boolean,
      comment_object: any,
    ) => {
      if (is_post_liked) {
        const params = {
          liker_id: auth_user.value._id,
          like_id: liked_post_id,
          post_type: comment_object.post_type,
        }

        const response = await reverseLike(params)
        const { error, data, status } = response

        if (error || status === 400 || !data) return
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
      }

      if (comment_object.post_type === 'post') await fetchAllPostLikes()
      if (comment_object.post_type === 'competition')
        await fetchAllCompetitionLikes()
      if (comment_object.post_type === 'scholarship')
        await fetchAllScholarshipLikes()
      await checkIfPostHaveBeenLikedByAuthUser(comment_object)
    }

    //
    const handleBookmark = async (
      is_post_bookmarked: boolean,
      post_comment_object: any,
    ) => {
      const params = {
        user_id: auth_user.value._id,
        post_id: post_comment_object.post_id,
        post_type: post_comment_object.post_type,
      }

      if (is_post_bookmarked) {
        const response = await removeFromBookmarked(params)
        const { error, data, status } = response
        if (error || status === 400 || !data) return
      }
      if (!is_post_bookmarked) {
        const response = await addToBookmarked(params)
        const { error, data, status } = response
        if (error || status === 400 || !data) return
      }

      await fetchUsers()
      await checkIfPostHaveBeenBookmarkedByAuthUser(post_comment_object)
    }

    const handleDeletion = async (comment_object: any) => {
      const { post_type, post_id } = comment_object

      if (post_type === 'post') {
        const params = {
          post_id,
          poster_id: auth_user.value._id,
        }

        const response = await deletePost(params)
        const { error, data, status } = response
        if (error || status === 400 || !data) return
      }
      if (post_type === 'competition') {
        const params = {
          competition_id: post_id,
          creator_id: auth_user.value._id,
        }

        const response = await deleteCompetition(params)
        const { error, data, status } = response
        if (error || status === 400 || !data) return
      }

      if (post_type === 'scholarship') {
        const params = {
          scholarship_id: post_id,
          creator_id: auth_user.value._id,
        }

        const response = await deleteScholarship(params)
        const { error, data, status } = response
        if (error || status === 400 || !data) return
      }

      await fetchAuthUser()

      if (post_type === 'post') {
        await fetchPosts()
        fetchPosts()
      }
      if (post_type === 'competition') {
        await fetchCompetitions()
        fetchCompetitions()
      }
      if (post_type === 'scholarship') {
        await fetchScholarships()
        fetchScholarships()
      }
    }

    const commentOnPost = (params: any) => {
      store.dispatch('component_handler/getPostCommentObject', params)
    }

    // fetch data from store
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchAuthUser() {
      await store.dispatch('users/getAuthUser', auth_user.value._id)
    }
    async function fetchPosts() {
      await store.dispatch('_requests/getAllPosts')
    }
    async function fetchCompetitions() {
      await store.dispatch('_requests/getAllCompetitions')
    }
    async function fetchScholarships() {
      await store.dispatch('_requests/getAllScholarships')
    }
    const fetchAllPostLikes = async () => {
      await store.dispatch('_requests/getAllPostLikes')
    }
    const fetchAllCompetitionLikes = async () => {
      await store.dispatch('_requests/getAllCompetitionLikes')
    }
    const fetchAllScholarshipLikes = async () => {
      await store.dispatch('_requests/getAllScholarshipLikes')
    }

    //
    onBeforeMount(async () => {
      await displayPostReactions()
    })

    return {
      auth_user,
      like_id,
      // no_of_likes,
      post_comment_object,
      is_post_liked_by_auth_user,
      current_liked_post_id,
      is_post_bookmarked_by_auth_user,
      is_auth_user_creator_of_post,
      handleLikePost,
      commentOnPost,
      handleBookmark,
      handleDeletion,
      reaction_object,
    }
  },
}
</script>

<style scoped></style>
