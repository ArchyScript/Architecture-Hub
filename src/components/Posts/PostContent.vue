<template>
  <section
    class="flex flex-col inset-x-0 hover:bg-archyhub-semi-light hover:shadow-sm hover:bg-opacity-30"
  >
    <div class="w-full flex p-2 sm:p-3 xl:p-4 pb-2">
      <div class="flex-shrink-0 w-10 h-10 sm:h-12 sm:w-12 mr-1">
        <router-link :to="`/profile/${post_info.username}`">
          <img
            v-if="post_info.profile_picture_avatar !== ''"
            class="w-full h-full rounded-full border cursor-pointer"
            :src="post_info.profile_picture_avatar"
          />
        </router-link>

        <span
          v-if="post_info.profile_picture_avatar === ''"
          class="block h-full w-full rounded-full border cursor-pointer bg-gray-500 animate-pulse"
        ></span>
      </div>

      <article class="w-full flex-1 ml-1 sm:ml-2">
        <div class="mb-1 flex flex-1 px-1">
          <div
            v-if="post_info.username !== ''"
            class="flex-1 flex-col truncate"
          >
            <p class="flex justify-between items-center truncate">
              <router-link
                :to="`/profile/${post_info.username}`"
                class="hover:underline hover:text-archyhub-main text-gray-600 items-center flex flex-1 space-x-1 sm:space-x-2 truncate"
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

              <!-- <span
                class="text-gray-600 hidden hover:bg-archyhub-light hover:bg-opacity-50 px-3 py-1 cursor-pointer rounded-full"
              >
                <span class="fa fa-ellipsis-h text-base md:text-lg"></span>
              </span> -->
            </p>

            <p
              class="flex items-center italic space-x-3 text-xs font-normal text-gray-400 truncate"
              v-if="post_info.date || post_info.time"
            >
              <span class="">{{ post_info.date }}</span>

              <span class="">
                <strong class="font-medium text-gray-600">@</strong>
                {{ post_info.time }}
              </span>
            </p>
          </div>

          <div v-if="post_info.username === ''" class="animate-pulse w-full">
            <div
              class="h-2 sm:h-3 p-1 w-3/4 bg-gray-400 rounded-xl col-span-2 mb-1"
            ></div>

            <div class="grid grid-cols-8 gap-2">
              <div
                class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl col-span-2"
              ></div>
              <div
                class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl col-span-2"
              ></div>
            </div>
          </div>
        </div>

        <div class="px-1 sm:px-2 mt-2 md:mt-3">
          <router-link :to="`/posts/${eachPost._id}`">
            <div class="pb-2 sm:pb-3 md:pb-4 lg:pb-5">
              <p
                class="text-sm md:text-base font-normal text-gray-500 break-all"
              >
                {{ eachPost.content }}
              </p>

              <img
                v-if="eachPost.post_image.avatar !== ''"
                class="w-full h-60 mt-2 sm:h-72 lg:h-80 object-fill border rounded-xl"
                :src="eachPost.post_image.avatar"
              />
            </div>
          </router-link>
        </div>
      </article>
    </div>

    <div>
      <ReactionsVue :reactions="reactions" />
    </div>
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
      profile_picture_avatar: '',
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
