<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20 pb-16"
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
                class="w-14 h-14 sm:h-16 sm:w-16 rounded-full border cursor-pointer"
                :src="post_info.poster_picture"
              />
            </router-link>
          </span>

          <div class="flex-1 flex-col truncate">
            <p class="items-center flex sm:space-x-2">
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
                @{{ post_info.username || '...' }}
              </span>
            </p>

            <p
              class="hidden sm:flex items-center italic space-x-3 text-xs font-normal text-gray-500 truncate"
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
              class="text-base sm:text-lg xl:text-xl font-normal text-gray-500"
            >
              {{ post_info.post_content }}
            </p>

            <img
              v-if="post_info.post_image !== ''"
              class="w-full h-52 mt-4 sm:h-56 lg:h-72 object-fill border rounded-xl"
              :src="post_info.post_image"
            />
          </div>
        </article>
      </div>

      <div class="">
        <ReactionsVue :reactions="reactions" />
      </div>

      <div class="mt-6">
        <div class="" v-if="!does_have_comment">
          <span class="block text-center">No comment found</span>
        </div>

        <div
          class=""
          v-else
          v-for="post_comment in post_comments"
          :key="post_comment.username"
        >
          <CommentVue :eachPostComment="post_comment" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, Comment } from 'vue'
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import router from '@/router'
// import { default_images } from '@/controller/utils/index'
import { useRoute } from 'vue-router'
import { fetchSinglePost } from '@/controller/api/posts.api'
import { singleCommentOnPost } from '@/controller/api/reactions.api'
import CommentVue from '@/components/Comments/Comment.vue'
import AnimatedSingleContentVue from '@/components/Animation/AnimatedSingleDetail.vue'
import { fetchSingleUserById } from '@/controller/api/users.api'

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
    const route = useRoute()
    const does_have_comment = ref(false)
    const post_info = ref({
      display_name: '',
      username: '',
      poster_picture: '',
      post_image: '',
      post_content: '',
      time: '',
      date: '',
    })

    const post_comments = ref<CommentSchema[]>([])

    const reactions = ref({
      no_of_likes: 0,
      no_of_comments: 0,
      post_id: '',
    })

    const getPostDetails = async (_id: any) => {
      const response = await fetchSinglePost(_id)
      const { error, data, status } = response

      if (error || status === 400 || !data || typeof data === 'string') return

      const getPostInfo = async () => {
        const {
          _id,
          poster_id,
          createdAt,
          comments,
          likes,
          content,
          post_image,
        } = response.data
        const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

        //
        reactions.value.no_of_comments = comments.length
        reactions.value.no_of_likes = likes.length
        reactions.value.post_id = _id

        //
        post_info.value.time = formattedTime
        post_info.value.date = formattedDate
        post_info.value.post_image = post_image.avatar
        post_info.value.post_content = content
        //
        const result = await fetchSingleUserById(poster_id)
        const { error, data, status } = result

        if (error || status === 400 || !data || typeof data === 'string') return

        const {
          username,
          bio: { display_name, gender },
          profile_picture: { avatar },
        } = data

        const poster_picture: any = await getDisplayProfilePicture(
          avatar,
          gender,
        )
        post_info.value.display_name = display_name
        post_info.value.username = username
        post_info.value.poster_picture = poster_picture
      }
      getPostInfo()

      //
      if (!data.comments || data.comments === undefined) return

      // Handle comment component data
      if (data.comments <= 0) return (does_have_comment.value = false)

      does_have_comment.value = true

      data.comments.forEach(async (comment: any) => {
        const _id = comment.comment_id

        const response = await singleCommentOnPost(_id)
        const { error, data, status } = response
        if (error || status === 400 || !data || typeof data === 'string') return

        const { formattedDate, formattedTime } = formatDateAndTime(
          data.createdAt,
        )

        const result = await fetchSingleUserById(data.commenter_id)
        const commenter_info = result.data

        const commenter_image: any = await getDisplayProfilePicture(
          commenter_info.profile_picture.avatar,
          commenter_info.bio.gender,
        )

        const post_comment_info = {
          comment: data.comment,
          commenter_image,
          commneter_username: commenter_info.username,
          date: formattedDate,
          time: formattedTime,
        }

        post_comments.value.push(post_comment_info)
      })

      return
    }

    onBeforeMount(async () => {
      const { _id } = route.params
      await getPostDetails(_id)
    })
    return {
      post_info,
      post_comments,
      reactions,
      does_have_comment,
      getPostDetails,
    }
  },
}
</script>

<style scoped></style>
