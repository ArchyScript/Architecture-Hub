<template>
  <section
    class="flex flex-col inset-x-0 min-h-screen hover:bg-archyhub-semi-light hover:bg-opacity-10 pb-16"
  >
    <div v-if="post_info.username === ''">
      <AnimatedSingleContentVue />
    </div>

    <div v-if="post_info.username !== ''">
      <div class="flex-col w-full p-2 sm:p-3 xl:p-4 pb-2">
        <div class="flex items-center">
          <span class="flex-shrink-0 mr-2 sm:mr-3">
            <router-link :to="`/profile/${post_info.username}`">
              <img
                class="w-10 h-10 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
                :src="post_info.poster_picture"
              />
            </router-link>
          </span>

          <div class="flex-1 flex-col truncate">
            <router-link
              :to="`/profile/${post_info.username}`"
              class="hover:underline hover:text-archyhub-main text-gray-600 items-center flex flex-1 space-x-1 sm:space-x-2"
            >
              <span class="text-base md:text-lg font-semibold truncate">
                {{
                  post_info.display_name
                    ? post_info.display_name
                    : post_info.username
                }}
              </span>

              <span class="text-sm md:text-base font-normal truncate">
                @{{ post_info.username }}
              </span>
            </router-link>

            <p
              class="flex items-center italic space-x-3 text-xs font-normal text-gray-400 truncate"
              v-if="post_info.date || post_info.time"
            >
              <span class="">{{ post_info.date }}</span>

              <span class="">
                <strong class="font-medium text-gray-600">@</strong>
                {{ post_info.time }}
              </span>
            </p>
          </div>
        </div>

        <article class="w-full flex-1 mt-6 px-1 sm:px-2">
          <p
            class="text-base sm:text-lg xl:text-xl font-normal text-gray-500 break-all"
          >
            {{ post_info.post_content }}
          </p>

          <div
            v-if="post_info.post_image !== ''"
            class="w-full flex justify-center items-center h-60 mt-4 sm:h-80 lg:h-96 bg-archyhub-semi-light bg-opacity-40 rounded-xl"
          >
            <img
              class="w-auto h-auto max-h-full object-fill rounded-xl"
              :src="post_info.post_image"
            />
          </div>
        </article>
      </div>

      <ReactionsVue :reactions="reactions" />

      <div class="mt-6">
        <div
          class="block text-center text-gray-700 font-normal text-sm sm:text-base"
          v-if="!does_post_have_comment"
        >
          No comment found
        </div>

        <div v-else>
          <div v-if="post_comments.length < 1">
            <div
              class="w-full flex items-start justify-center space-x-1 sm:space-x-2"
            >
              <span
                class="text-center text-gray-500 font-semibold text-xs sm:text-sm md:text-base"
              >
                loading comments
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-archyhub-main fill-current animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>

          <div v-else>
            <div
              v-for="post_comment in post_comments"
              :key="post_comment.username"
            >
              <CommentVue :eachPostComment="post_comment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ReactionsVue from '@/components/Reactions/index.vue'
import CommentVue from '@/components/Utilities/Comment.vue'
import AnimatedSingleContentVue from '@/components/Animation/AnimatedSingleDetail.vue'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'

type CommentSchema =
  | {
      comment: string
      commenter_image: string
      commneter_username: string
      date: string
      time: string
    }
  | any

export default {
  name: 'SinglePostContent',
  components: { ReactionsVue, AnimatedSingleContentVue, CommentVue },

  setup() {
    const store = useStore()
    const route = useRoute()
    const does_post_have_comment = ref(false)
    const post_comments = ref<CommentSchema[]>([])
    const storeUsers = computed(() => store.state._requests.allUsers)
    const storePosts = computed(() => store.state._requests.allPosts)
    const storePostComments = computed(
      () => store.state._requests.allPostComments,
    )
    const post_info = ref({
      display_name: '',
      username: '',
      poster_picture: '',
      post_image: '',
      post_content: '',
      time: '',
      date: '',
    })
    const reactions = ref({
      no_of_likes: 0,
      no_of_comments: 0,
      post_comment_object: {
        post_id: '',
        post_type: '',
      },
    })

    const getPostDetails = async (post_id: any) => {
      if (storePosts.value && storePosts.value.length < 1) await fetchPosts()

      storePosts.value.forEach(async (eachPost: any) => {
        if (eachPost._id === post_id) {
          const {
            _id,
            poster_id,
            createdAt,
            comments,
            likes,
            content,
            post_image: { avatar },
          } = await eachPost

          const { formattedDate, formattedTime } = await formatDateAndTime(
            createdAt,
          )

          post_info.value.time = formattedTime
          post_info.value.date = formattedDate
          post_info.value.post_image = avatar
          post_info.value.post_content = content

          reactions.value.no_of_comments = comments.length
          reactions.value.no_of_likes = likes.length
          reactions.value.post_comment_object.post_id = _id
          reactions.value.post_comment_object.post_type = 'post'

          if (storeUsers.value && storeUsers.value.length < 1)
            await fetchUsers()

          storeUsers.value.forEach(async (eachUser: any) => {
            if (eachUser._id === poster_id) {
              const {
                username,
                bio: { display_name, gender },
                profile_picture: { avatar },
              } = eachUser

              const poster_picture: any = await getDisplayProfilePicture(
                avatar,
                gender,
              )

              post_info.value.display_name = display_name
              post_info.value.username = username
              post_info.value.poster_picture = poster_picture
            }
          })

          if (comments && comments.length <= 0)
            return (does_post_have_comment.value = false)

          does_post_have_comment.value = true

          const post_comments_array: any = []

          await comments.forEach(async (eachPostComment: any) => {
            const { comment_id } = eachPostComment

            if (storePostComments.value < 1) await fetchAllPostComments()

            storePostComments.value.forEach(
              async (each_store_post_comment: any) => {
                if (comment_id === each_store_post_comment._id) {
                  const { commenter_id } = each_store_post_comment

                  if (storeUsers.value && storeUsers.value.length < 1)
                    await fetchUsers()

                  storeUsers.value.forEach(async (eachUser: any) => {
                    if (eachUser._id === commenter_id) {
                      const {
                        username,
                        profile_picture: { avatar },
                        bio: { gender },
                      } = eachUser
                      const commenter_image: any = await getDisplayProfilePicture(
                        avatar,
                        gender,
                      )

                      const post_comment_info = {
                        comment: each_store_post_comment.comment,
                        commenter_image,
                        commneter_username: username,
                        date: formattedDate,
                        time: formattedTime,
                      }

                      post_comments_array.unshift(post_comment_info)
                    }
                  })
                }
              },
            )
          })

          post_comments.value = post_comments_array
        }
      })

      await fetchPosts()
      await fetchAllPostComments()
      await fetchUsers()
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchPosts() {
      await store.dispatch('_requests/getAllPosts')
    }
    const fetchAllPostComments = async () => {
      await store.dispatch('_requests/getAllPostComments')
    }

    onBeforeMount(async () => {
      const { post_id } = route.params

      await getPostDetails(post_id)
      await fetchAllPostComments()
      await getPostDetails(post_id)
    })

    return {
      post_info,
      post_comments,
      reactions,
      does_post_have_comment,
      getPostDetails,
    }
  },
}
</script>

<style scoped></style>
