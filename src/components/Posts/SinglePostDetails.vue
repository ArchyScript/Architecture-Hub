<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-10 pb-16"
  >
    <div class="" v-if="post_info.username === ''">
      <AnimatedSingleContentVue />
    </div>

    <div class="" v-if="post_info.username !== ''">
      <div class="flex-col w-full p-2 sm:p-3 xl:p-4 pb-2">
        <div class="flex justify-center items-center">
          <span class="flex-shrink-0 mr-3">
            <router-link :to="`/profile/${post_info.username}`">
              <img
                class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
                :src="post_info.poster_picture"
              />
            </router-link>
          </span>

          <div class="flex-1 flex-col truncate">
            <p class="items-center flex justify-between">
              <router-link
                :to="`/profile/${post_info.username}`"
                class="hover:underline items-center flex flex-1 sm:space-x-2"
              >
                <span
                  class="text-base md:text-lg font-semibold text-gray-600 truncate"
                >
                  {{
                    post_info.display_name
                      ? post_info.display_name
                      : post_info.username
                  }}
                </span>

                <span
                  class="text-sm md:text-base font-normal text-gray-500 truncate"
                >
                  @{{ post_info.username }}
                </span>
              </router-link>

              <span
                class="text-gray-600 hover:bg-archyhub-light hover:bg-opacity-50 px-3 py-1 cursor-pointer rounded-full"
              >
                <span class="fa fa-ellipsis-h text-base md:text-lg"></span>
              </span>
            </p>

            <p
              class="hidden sm:flex items-center italic space-x-3 text-xs font-normal text-gray-400 truncate"
              v-if="post_info.date || post_info.time"
            >
              <span class="">{{ post_info.date }}</span>

              <span class="">
                <strong class="font-semibold">@</strong>
                {{ post_info.time }}
              </span>
            </p>
          </div>
        </div>

        <article class="w-full flex-1 mt-4">
          <div class="px-1 sm:px-2 mt-2">
            <p
              class="text-base sm:text-lg xl:text-xl font-normal text-gray-500 break-all"
            >
              {{ post_info.post_content }}
            </p>

            <img
              v-if="post_info.post_image !== ''"
              class="w-full h-60 mt-4 sm:h-80 lg:h-96 object-fill border rounded-xl"
              :src="post_info.post_image"
            />
          </div>
        </article>
      </div>

      <div class="">
        <ReactionsVue :reactions="reactions" />
      </div>

      <div class="mt-6">
        <div class="" v-if="!does_post_have_comment">
          <span class="block text-center">No comment found</span>
        </div>

        <div
          class=""
          v-else
          v-for="post_comment in post_comments"
          :key="post_comment.username"
        >
          <!-- <div v-if="post_comment.comment !== undefined"> -->
          <CommentVue :eachPostComment="post_comment" />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import router from '@/router'
import { useRoute } from 'vue-router'
import { fetchSinglePost } from '@/controller/api/posts.api'
import { specificComment } from '@/controller/api/reactions.api'
import CommentVue from '@/components/Utilities/Comment.vue'
import AnimatedSingleContentVue from '@/components/Animation/AnimatedSingleDetail.vue'
import { fetchSingleUserById } from '@/controller/api/users.api'
import { useStore } from 'vuex'

import { PostSchema } from '@/controller/typings/index'

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
  name: 'PostContent',
  components: { ReactionsVue, AnimatedSingleContentVue, CommentVue },

  setup() {
    const store = useStore()
    const route = useRoute()
    const does_post_have_comment = ref(false)
    const post_comments = ref<CommentSchema[]>([])
    const auth_user = computed(() => store.state.users.auth_user)
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
    const storeUsers = computed(() => store.state._requests.allUsers)
    const allUsers = ref([])
    const allPosts = ref<PostSchema[]>([])
    const storePosts = computed(() => store.state._requests.allPosts)

    const getPostDetails = async (post_id: any) => {
      async function fetchPosts() {
        await store.dispatch('_requests/getAllPosts')
        allPosts.value = storePosts.value
      }

      async function fetchUsers() {
        await store.dispatch('_requests/getAllUsers')
        allUsers.value = storeUsers.value
      }

      //
      if (storePosts.value && storePosts.value.length >= 1) {
        allPosts.value = storePosts.value
      } else {
        await fetchPosts()
      }

      allPosts.value.forEach(async (eachPost: any) => {
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

          console.log(comments)
          console.log(typeof comments)
          //
          reactions.value.no_of_comments = comments.length
          reactions.value.no_of_likes = likes.length
          reactions.value.post_comment_object.post_id = _id
          reactions.value.post_comment_object.post_type = 'post'

          //
          post_info.value.time = formattedTime
          post_info.value.date = formattedDate
          post_info.value.post_image = avatar
          post_info.value.post_content = content

          //
          if (storeUsers.value.length >= 1) {
            allUsers.value = storeUsers.value
          } else {
            await fetchUsers()
          }

          //
          allUsers.value.forEach(async (eachUser: any) => {
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

              //
              post_info.value.display_name = display_name
              post_info.value.username = username
              post_info.value.poster_picture = poster_picture
            }
          })

          if (comments && comments.length <= 0)
            return (does_post_have_comment.value = false)

          does_post_have_comment.value = true

          comments.forEach(async (eachPostComment: any) => {
            const { comment_id } = eachPostComment

            if (storePostComments.value < 1) await fetchAllPostComments()

            storePostComments.value.forEach(
              async (each_store_post_comment: any) => {
                if (comment_id === each_store_post_comment._id) {
                  const { commenter_id } = each_store_post_comment

                  //
                  if (storeUsers.value.length >= 1) {
                    allUsers.value = storeUsers.value
                  } else {
                    await fetchUsers()
                  }

                  allUsers.value.forEach(async (eachUser: any) => {
                    if (eachUser._id === commenter_id) {
                      console.log(eachUser.username)
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

                      post_comments.value.unshift(post_comment_info)
                    }
                  })
                }
              },
            )
          })

          // comments.forEach(async (comment: any) => {
          //   const params = {
          // comment_id: comment.comment_id,
          //     post_type: 'post',
          //   }

          //   //
          //   const response = await specificComment(params)

          //   const { error, data, status } = response
          //   if (error || status === 400 || !data) return

          //   //
          //   const singleComment = data

          //   const { formattedDate, formattedTime } = formatDateAndTime(
          //     singleComment.createdAt,
          //   )

          //   //
          //   const result = await fetchSingleUserById(data.commenter_id)
          //   const commenter_info = result

          //   //
          //   if (
          //     commenter_info.error ||
          //     commenter_info.status === 400 ||
          //     !commenter_info.data
          //   )
          //     return

          //   //
          // const {
          //   username,
          //   profile_picture: { avatar },
          //   bio: { gender },
          // } = commenter_info.data
          // const commenter_image: any = await getDisplayProfilePicture(
          //   avatar,
          //   gender,
          // )

          //   //
          // const post_comment_info = {
          //   comment: singleComment.comment,
          //   commenter_image,
          //   commneter_username: username,
          //   date: formattedDate,
          //   time: formattedTime,
          // }

          // post_comments.value.unshift(post_comment_info)
          // })
        }
      })
      return
    }

    const fetchAllPostComments = async () => {
      // if (storePostComments.value < 1) {
      await store.dispatch('_requests/getAllPostComments')
    }

    onBeforeMount(async () => {
      const { post_id } = route.params
      // await store.dispatch('_requests/getAllPosts')
      // await store.dispatch('_requests/getAllUsers')

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
