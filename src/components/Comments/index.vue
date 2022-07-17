<template>
  <section
    class="flex justify-center items-center inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <span class="flex-shrink-0 mr-1">
      <router-link :to="`/profile/${eachPostComment.commneter_username}`">
        <img
          class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
          :src="eachPostComment.commenter_image"
        />
      </router-link>
    </span>

    <p class="flex-1 px-2 text-sm">
      Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur.
    </p>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { PropType } from 'vue'
import { formatDateAndTime } from '@/controller/utilities/index'
import { fetchSingleUserById } from '@/controller/api/users.api'
import { default_images } from '@/controller/utils/index'
import router from '@/router'

type CommentSchema = {
  comment: string
  commenter_image: string
  commneter_username: string
  dateCreated: string
}

export default {
  name: 'PostComment',
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

      post_info.value.display_name = display_name
      post_info.value.username = username
      post_info.value.poster_id = poster_id
      post_info.value.time = formattedTime
      post_info.value.date = formattedDate
      if (avatar !== '') {
        post_info.value.profile_picture_avatar = avatar
      } else {
        if (gender === 'male') {
          post_info.value.profile_picture_avatar = default_images.male
        }
        if (gender === 'female') {
          post_info.value.profile_picture_avatar = default_images.female
        } else post_info.value.profile_picture_avatar = default_images.random
      }

      return
    }

    const viewUserProfile = (username: any) => {
      router.push(`/profile/${username}`)
      console.log(username)
    }

    onBeforeMount(async () => {
      //
      await getPostCommentDetails()
    })
    return {
      post_info,
      reactions,
      viewUserProfile,
    }
  },
}
</script>

<style scoped></style>
