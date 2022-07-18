<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex -col w-full p-2 sm:p-3 xl:p-4 pb-2">
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
                class="text-sm md:text-base font-semibold text-gray-600 truncate"
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

        <div class="px-1 sm:px-2 mt-2">
          <!-- @click="viewSinglePost(reactions.post_id)" -->
          <router-link :to="`/post/${reactions.post_id}`">
            <p class="text-sm xl:text-base font-normal text-gray-500">
              {{ eachPost.content }}
            </p>

            <img
              v-if="eachPost.post_image.avatar !== ''"
              class="w-full h-52 mt-2 sm:h-56 lg:h-64 object-fill border rounded-xl"
              :src="eachPost.post_image.avatar"
            />
          </router-link>
        </div>
      </article>
    </div>

    <ReactionsVue :reactions="reactions" />
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import { PostSchema } from '@/controller/typings/index'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import router from '@/router'
import { fetchSingleUserById } from '@/controller/api/users.api'
// import { default_images } from '@/controller/utils/index'

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

    const viewSinglePost = (post_id: any) => {
      router.push(`/post/${post_id}`)
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
      viewSinglePost,
    }
  },
}
</script>

<style scoped></style>
