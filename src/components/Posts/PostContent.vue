<template>
  <section
    class="flex inset-x-0 border-b p-4 hover:bg-archyhub-semi-light hover:bg-opacity-10"
  >
    <div class="flex -col w-full">
      <div class="flex-shrink-0 mr-1">
        <router-link :to="`/profile/${post_info.username}`">
          <img
            class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
            :src="post_info.profile_picture_avatar"
          />
        </router-link>
      </div>

      <article class="w-full flex-1 ml-1 sm:ml-2">
        <div class="mb-1 flex flex-1 px-1">
          <div class="flex-1 flex-col truncate">
            <p class="items-center flex sm:space-x-2">
              <span
                class="text-base md:text-xl font-semibold text-gray-600 truncate"
              >
                {{
                  post_info.display_name
                    ? post_info.display_name
                    : post_info.username
                }}
              </span>

              <span
                class="text-base md:text-lg font-normal text-gray-500 truncate"
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

        <div class="px-1 sm:px-2 mt-2" v-if="eachPost.post_image.avatar !== ''">
          <img
            class="w-full h-56 object-fill border rounded-xl"
            :src="eachPost.post_image.avatar"
          />
        </div>

        <div class="px-1 sm:px-2 mt-2">
          <p class="text-sm sm:text-base font-normal text-gray-500">
            {{ eachPost.content }}
          </p>
        </div>

        <ReactionsVue :reactions="reactions" />
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import { PostSchema } from '@/controller/typings/index'
import { formatDateAndTime } from '@/controller/utilities/index'
import router from '@/router'
import { fetchSingleUserById } from '@/controller/api/users.api'

import { default_images } from '@/controller/utils/index'
// import default_image from '@/assets/default_image.png'

export default {
  name: 'PostContent',
  components: { ReactionsVue },
  props: {
    eachPost: {
      type: Object as PropType<PostSchema>,
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

    const viewUserProfile = (username: any) => {
      router.push(`/profile/${username}`)
      console.log(username)
    }

    const getPostDetails = async () => {
      const { _id, poster_id, createdAt, comments, likes } = props.eachPost
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

    onBeforeMount(async () => {
      //
      await getPostDetails()
    })
    return {
      post_info,
      reactions,
      viewUserProfile,
      getPostDetails,
    }
  },
}
</script>

<style scoped></style>
