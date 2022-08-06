<template>
  <section
    class="flex flex-col inset-x-0 hover:bg-archyhub-semi-light hover:shadow-sm hover:bg-opacity-30"
  >
    <div class="w-full p-2 sm:p-3 xl:p-4 pb-2">
      <div class="mb-1">
        <div
          v-if="post_info.username !== ''"
          class="items-center flex flex-1 space-x-1 sm:space-x-2 truncate"
        >
          <div
            class="flex-shrink-0 truncate w-10 h-10 sm:h-12 sm:w-12 inline-flex rounded-full border cursor-pointer"
          >
            <router-link
              :to="`/profile/${post_info.username}`"
              class="w-full h-full"
            >
              <img
                v-if="post_info.profile_picture !== ''"
                class="w-full h-full"
                :src="post_info.profile_picture"
              />
            </router-link>
          </div>

          <div class="truncate">
            <router-link
              :to="`/profile/${post_info.username}`"
              class="truncate block hover:underline hover:text-archyhub-main text-gray-600"
            >
              <span class="text-sm md:text-base font-medium truncate">
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
              <span class="truncate">{{ post_info.date }}</span>

              <span class="truncate">
                <strong class="font-medium">@</strong>
                {{ post_info.time }}
              </span>
            </p>
          </div>
        </div>

        <div v-if="post_info.username === ''" class="animate-pulse w-full">
          <div
            class="h-2 sm:h-3 p-1 w-3/4 bg-gray-400 rounded-xl col-span-2 mb-1"
          ></div>

          <div class="grid grid-cols-8 gap-2">
            <div class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl col-span-2"></div>
            <div class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl col-span-2"></div>
          </div>
        </div>
      </div>

      <article class="w-full flex-1 pr-1 sm:pr-2 pl-12 sm:pl-14 mt-2 md:mt-3">
        <router-link :to="`/posts/${eachPost._id}`">
          <div class="pb-2 sm:pb-3 md:pb-4 lg:pb-5">
            <p
              class="text-sm md:text-base font-normal text-gray-500 break-words break-all"
            >
              {{ eachPost.content }}
            </p>

            <div
              v-if="eachPost.post_image.avatar !== ''"
              class="w-full flex justify-center items-center h-60 mt-2 sm:h-72 lg:h-80 bg-archyhub-semi-light bg-opacity-40 rounded-xl"
            >
              <img
                class="w-auto h-auto max-h-full object-fill rounded-xl"
                :src="eachPost.post_image.avatar"
              />
            </div>
          </div>
        </router-link>
      </article>
    </div>

    <ReactionsVue :reactions="reactions" />
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import type { PropType } from 'vue'
import { useStore } from 'vuex'
import ReactionsVue from '@/components/Reactions/index.vue'
import { PostSchema } from '@/controller/typings/index'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'

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
    const store = useStore()
    const storeUsers = computed(() => store.state._requests.allUsers)
    const post_info = ref({
      display_name: '',
      poster_id: '',
      username: '',
      profile_picture: '',
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

    const getPostDetails = async () => {
      const { _id, poster_id, createdAt, comments, likes } = props.eachPost
      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      reactions.value.no_of_comments = comments.length
      reactions.value.no_of_likes = likes.length
      reactions.value.post_comment_object.post_id = _id
      reactions.value.post_comment_object.post_type = 'post'

      if (storeUsers.value.length < 1) await fetchUsers()

      storeUsers.value.forEach(async (user: any) => {
        if (user._id === poster_id) {
          const {
            username,
            bio: { display_name, gender },
            profile_picture: { avatar },
          } = user

          const profile_picture: any = await getDisplayProfilePicture(
            avatar,
            gender,
          )

          post_info.value.display_name = display_name
          post_info.value.username = username
          post_info.value.poster_id = poster_id
          post_info.value.time = formattedTime
          post_info.value.date = formattedDate
          post_info.value.profile_picture = profile_picture
        }
      })

      return await fetchUsers()
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }

    onBeforeMount(async () => {
      await getPostDetails()
    })

    //
    return {
      post_info,
      reactions,
      getPostDetails,
    }
  },
}
</script>

<style scoped></style>
