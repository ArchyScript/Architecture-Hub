<template>
  <section
    class="inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-40"
  >
    <div class="flex py-2 px-4">
      <span class="flex-shrink-0 mr-1">
        <router-link :to="`/profile/${eachPostComment.commneter_username}`">
          <img
            class="w-8 h-8 sm:h-10 sm:w-10 rounded-full border cursor-pointer"
            :src="eachPostComment.commenter_image"
          />
        </router-link>
      </span>

      <div class="truncate flex-col flex-1 ml-2 sm:ml-3">
        <p
          class="flex-1 text-xs sm:text-sm my-2 text-gray-700 sm:mb-3 flex-wrap break-all"
        >
          {{ eachPostComment.comment }}
        </p>

        <p
          class="flex justify-end items-center italic space-x-3 text-xs font-normal text-gray-400 truncate"
          v-if="eachPostComment.date || eachPostComment.time"
        >
          <span class="truncate">{{ eachPostComment.date }}</span>

          <span class="truncate">
            <strong class="font-medium">@</strong>
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
import { fetchSingleUserById } from '@/controller/api/users.api'
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

      reactions.value.no_of_comments = comments.length
      reactions.value.no_of_likes = likes.length
      reactions.value.post_id = _id

      const response = await fetchSingleUserById(poster_id)
      const { error, data, status } = response

      if (!status || status === 400 || !data) return

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
    }

    onBeforeMount(async () => await getPostCommentDetails())

    return {
      post_info,
      reactions,
    }
  },
}
</script>

<style scoped></style>
