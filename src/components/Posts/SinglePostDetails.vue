<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex-col w-full p-2 sm:p-3 xl:p-4 pb-2">
      <div class="flex justify-center items-center mr-1">
        <router-link :to="`/profile/${post_info.username}`">
          <img
            class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
            :src="post_info.profile_picture_avatar"
          />
        </router-link>

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

      <article class="w-full flex-1 mt-4">
        <div class="px-1 sm:px-2 mt-2">
          <p class="text-base sm:text-lg xl:text-xl font-normal text-gray-500">
            <!-- {{ eachPost.content }} -->
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex soluta
            iure, id qui quod provident hic reprehenderit, deleniti architecto
            omnis asperiores quam adipisci voluptatum odio quis non delectus
            numquam, mollitia itaque modi laborum molestias aliquid. Impedit ea
            tempore iure alias sit rem culpa delectus fugiat temporibus, natus
            et consequuntur debitis?
          </p>

          <!-- v-if="eachPost.post_image.avatar !== ''" -->
          <img
            class="w-full h-52 mt-4 sm:h-56 lg:h-64 object-fill border rounded-xl"
          />
          <!-- :src="eachPost.post_image.avatar" -->
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
import { formatDateAndTime } from '@/controller/utilities/index'
import router from '@/router'
import { default_images } from '@/controller/utils/index'
import { useRoute } from 'vue-router'
import { fetchSinglePost } from '@/controller/api/posts.api'

export default {
  name: 'PostContent',
  components: { ReactionsVue },

  setup() {
    const route = useRoute()
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

    const getPostDetails = async (_id: any) => {
      const response = await fetchSinglePost(_id)
      const { error, data, status } = response

      if (error) return
      if (!data || typeof data === 'string') return
      if (status === 400) return

      console.log(response)

      // const { _id, poster_id, createdAt, comments, likes } = props.eachPost
      // const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      // //
      // reactions.value.no_of_comments = comments.length
      // reactions.value.no_of_likes = likes.length
      // reactions.value.post_id = _id

      // //

      // const {
      //   username,
      //   bio: { display_name, gender },
      //   profile_picture: { avatar },
      // } = data

      // post_info.value.display_name = display_name
      // post_info.value.username = username
      // post_info.value.poster_id = poster_id
      // post_info.value.time = formattedTime
      // post_info.value.date = formattedDate
      // if (avatar !== '') {
      //   post_info.value.profile_picture_avatar = avatar
      // } else {
      //   if (gender === 'male') {
      //     post_info.value.profile_picture_avatar = default_images.male
      //   }
      //   if (gender === 'female') {
      //     post_info.value.profile_picture_avatar = default_images.female
      //   } else post_info.value.profile_picture_avatar = default_images.random
      // }

      return
    }

    onBeforeMount(async () => {
      const { _id } = route.params

      //
      await getPostDetails(_id)
    })
    return {
      post_info,
      reactions,
      getPostDetails,
    }
  },
}
</script>

<style scoped></style>
