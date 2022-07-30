<template>
  <section class="inset-x-0 border-b hover:bg-red-300 hover:bg-opacity-20">
    <div class="flex py-2 px-4">
      <span class="flex-shrink-0 mr-1">
        <router-link :to="`/profile/${eachPostComment.commneter_username}`">
          <img
            class="w-10 h-10 sm:h-12 sm:w-12 rounded-full border cursor-pointer"
            :src="eachPostComment.commenter_image"
          />
        </router-link>
      </span>

      <div class="flex-col flex-1 ml-2 sm:ml-3">
        <p class="flex-1 text-xs sm:text-sm my-2 sm:mb-3 flex-wrap break-all">
          {{ eachPostComment.comment }}
        </p>

        <p
          class="flex justify-end items-center italic space-x-3 text-xs font-normal text-gray-500 truncate"
          v-if="eachPostComment.date || eachPostComment.time"
        >
          <span class="">{{ eachPostComment.date }}</span>

          <span class="">
            <strong class="font-semibold">@</strong>
            {{ eachPostComment.time }}
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { PropType } from 'vue'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import { fetchSingleUserById } from '@/controller/api/users.api'
// import { default_images } from '@/controller/utils/index'
import router from '@/router'

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
  name: 'Comment',
  props: {
    eachPostComment: {
      type: Object as PropType<CommentSchema>,
      required: true,
    },
  },
  setup(props: any) {
    const post_info = ref({
      display_name: '',
      poster_id: '',
      username: '',
      profile_picture_avatar: '',
      time: '',
      date: '',
    })
    const reactions = ref({
      no_of_likes: 0,
      no_of_comments: 0,
      post_id: '',
    })

    const getPostCommentDetails = async () => {
      const {
        _id,
        poster_id,
        createdAt,
        comments,
        likes,
      } = props.eachPostComment
      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      //
      reactions.value.no_of_comments = comments.length
      reactions.value.no_of_likes = likes.length
      reactions.value.post_id = _id

      //
      const response = await fetchSingleUserById(poster_id)
      const { error, data, status } = response

      if (error) return
      if (!data) return
      if (status === 400) return

      const {
        username,
        bio: { display_name, gender },
        profile_picture: { avatar },
      } = data

      const profile_picture_avatar: any = await getDisplayProfilePicture(
        avatar,
        gender,
      )

      post_info.value.display_name = display_name
      post_info.value.username = username
      post_info.value.poster_id = poster_id
      post_info.value.time = formattedTime
      post_info.value.date = formattedDate
      post_info.value.profile_picture_avatar = profile_picture_avatar

      return
    }

    onBeforeMount(async () => {
      await getPostCommentDetails()
      // getPostCommentDetails()
    })

    return {
      post_info,
      reactions,
    }
  },
}
</script>

<style scoped></style>