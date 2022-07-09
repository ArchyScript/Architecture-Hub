<template>
  <section
    class="flex inset-x-0 border-b p-4 hover:bg-archyhub-semi-light hover:bg-opacity-10"
  >
    <div class="flex w-full">
      <div class="flex-shrink-0 mr-1" @click="logData('testejk')">
        <img
          class="w-12 h-12 rounded-full border"
          src="@/assets/default_image.png"
        />
        <!--
          src="@/assets/default_image.png"
        /> -->
      </div>

      <article class="w-full flex-1 ml-2">
        <div class="mb-1 flex flex-1 px-2">
          <div class="flex-1 flex items-center space-x-2 truncate">
            <!-- <span class="text-lg font-extrabold text-gray-600 truncate">
              {{ post_info.display_name }}
            </span> -->

            <span class="text-lg font-medium text-gray-500 truncate">
              @{{ post_info.username }}
            </span>
            <span class="text-lg font-medium text-gray-300 truncate">
              |
            </span>
            <span class="text-sm font-medium text-gray-500 truncate">
              {{ post_info.date }} at {{ post_info.time }}
            </span>
          </div>

          <p class="text-gray-500 font-normal italic items-center text-sm">
            <span
              class="fa fa-ellipsis-h text-2xl px-3 py-1 cursor-pointer rounded-full"
            ></span>
          </p>
        </div>

        <div class="px-2">
          <p class="text-base font-normal text-gray-500">
            {{ eachPost.content }}
          </p>
        </div>

        <!-- {{ typeof eachPost }} -->
        <!-- <button></button> -->

        <ReactionsVue :reactions="reactions" />
      </article>
      <!-- </div> -->
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import { PostSchema } from '@/controller/typings/index'
// import { fetchSinglePost } from '@/controller/api/posts.api'
import { formatDateAndTime } from '@/controller/utilities/index'
import { fetchSingleAuthUser } from '@/controller/api/users.api'
// import default_image from '@/assets/default_image.png'

export default {
  name: 'PostContent',
  components: { ReactionsVue },
  props: {
    eachPost: {
      // type: String,
      type: Object as PropType<PostSchema>,
      required: true,
    },
  },
  setup(props: any) {
    // const message = ref({ type: '', text: '' })
    const post_info = ref({
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

    // const updateResponseMessage = (type: string, text: string) => {
    //   message.value.type = type
    //   message.value.text = text
    // }

    const logData = (test: any) => {
      console.log(test)
    }

    const getPostDetails = async () => {
      // updateResponseMessage('', '')

      const { _id, user_id, createdAt, comments, likes } = props.eachPost
      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      //
      reactions.value.no_of_comments = comments.length
      reactions.value.no_of_likes = likes.length
      reactions.value.post_id = _id
      //
      // post_info.value.display_name
      const response = await fetchSingleAuthUser(user_id)
      const { error, data, status } = response

      if (error) return
      if (!data) return

      const { username } = data

      post_info.value.username = username
      post_info.value.time = formattedTime
      post_info.value.date = formattedDate
      // post_info.value.profile_picture_avatar = default_image

      // console.log(data)

      // if (error) {
      //   // updateResponseMessage('error', error)

      //   return setTimeout(() => {
      //     // return updateResponseMessage('', '')
      //     // return
      //   }, 5000)
      // }

      // if (!status || status === 400 || !data) {
      //   updateResponseMessage(
      //     'error',
      //     'Sorry, an unknown error occurred... Check connection',
      //   )

      //   return setTimeout(() => {
      //     is_loading.value = false
      //     return updateResponseMessage('', '')
      //   }, 5000)
      // }

      return
    }

    onBeforeMount(() => {
      //
      getPostDetails()
    })
    return {
      post_info,
      reactions,
      logData,
      getPostDetails,
    }
  },
}
</script>

<style scoped></style>
