<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex items-center w-full p-2 sm:p-3 xl:p-4 pb-2">
      <div class="flex-shrink-0 mr-1">
        <router-link :to="`/profile/${scholarship_info.username}`">
          <img
            v-if="scholarship_info.profile_picture_avatar !== ''"
            class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
            :src="scholarship_info.profile_picture_avatar"
          />
        </router-link>

        <span
          v-if="scholarship_info.profile_picture_avatar === ''"
          class="block w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer bg-gray-500 animate-pulse"
        ></span>
      </div>

      <div class="mb-1 flex flex-1 px-1 w-full ml-1 sm:ml-2">
        <div
          class="flex-1 flex-col truncate"
          v-if="scholarship_info.username !== ''"
        >
          <p class="items-center flex sm:space-x-2">
            <span
              class="text-sm md:text-base font-semibold text-gray-600 truncate"
            >
              {{
                scholarship_info.display_name
                  ? scholarship_info.display_name
                  : scholarship_info.username
              }}
            </span>

            <span
              class="text-sm md:text-base font-normal text-gray-500 truncate"
            >
              @{{ scholarship_info.username || '...' }}
            </span>
          </p>

          <p
            class="hidden sm:flex items-center italic space-x-3 text-xs font-normal text-gray-500 truncate"
            v-if="scholarship_info.date || scholarship_info.time"
          >
            <span class="">{{ scholarship_info.date }}</span>

            <span class="">
              <strong class="font-semibold">@</strong>
              {{ scholarship_info.time }}
            </span>
          </p>
        </div>

        <div
          v-if="scholarship_info.username === ''"
          class="animate-pulse w-full"
        >
          <div
            class="h-1 sm:h-2 p-1 w-3/4 bg-gray-400 rounded-xl col-span-2 mb-1"
          ></div>

          <div class="grid grid-cols-8 gap-2">
            <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
            <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
          </div>
        </div>
      </div>
    </div>

    <article class="w-full px-2 sm:px-3 xl:px-4 pb-2">
      <div class="px-1 sm:px-2 mt-2">
        <router-link :to="`/scholarships/${eachScholarship._id}`">
          <span class="text-base md:text-lg block font-semibold text-gray-600">
            {{ eachScholarship.title }}
          </span>

          <img
            v-if="eachScholarship.scholarship_image.avatar !== ''"
            class="w-full h-60 mt-2 sm:h-72 lg:h-80 mb-5 object-fill border rounded-xl"
            :src="eachScholarship.scholarship_image.avatar"
          />

          <span class="text-sm md:text-base block font-normal text-gray-600">
            {{ eachScholarship.description }}
          </span>
        </router-link>
      </div>
    </article>

    <div class="mt-3 sm:mt-4 lg:mt-6">
      <ReactionsVue :reactions="reactions" />
    </div>

    <!-- <p class="py-2 w-f ull font-normal text-gray-500 space-x-2 italic">
      <a
        :href="eachScholarship.link"
        target="_blank"
        class="flex justify-center items-center space-x-1 sm:space-x-2 hover:underline"
      >
        participate now
      </a>
    </p> -->
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import { ScholarshipSchema } from '@/controller/typings/index'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import router from '@/router'
import { fetchSingleUserById } from '@/controller/api/users.api'
import { useStore } from 'vuex'

export default {
  name: 'ScholarshipContent',
  components: { ReactionsVue },
  props: {
    eachScholarship: {
      type: Object as PropType<ScholarshipSchema>,
      required: true,
    },
  },
  setup(props: any) {
    const store = useStore()
    const scholarship_info = ref({
      display_name: '',
      creator_id: '',
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
    const storeScholarships = computed(
      () => store.state._requests.allScholarships,
    )
    const storeUsers = computed(() => store.state._requests.allUsers)
    const allUsers = ref([])

    const getScholarshipDetails = async () => {
      async function fetchUsers() {
        await store.dispatch('_requests/getAllUsers')
        allUsers.value = storeUsers.value
      }

      const {
        _id,
        creator_id,
        createdAt,
        comments,
        likes,
      } = props.eachScholarship
      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      //
      reactions.value.no_of_comments = comments.length
      reactions.value.no_of_likes = likes.length
      reactions.value.post_comment_object.post_id = _id
      reactions.value.post_comment_object.post_type = 'scholarship'

      if (storeUsers.value.length >= 1) {
        allUsers.value = storeUsers.value
      } else {
        await fetchUsers()
      }

      allUsers.value.forEach(async (user: any) => {
        if (user._id === creator_id) {
          const {
            username,
            bio: { display_name, gender },
            profile_picture: { avatar },
          } = user

          const profile_picture_avatar: any = await getDisplayProfilePicture(
            avatar,
            gender,
          )

          scholarship_info.value.display_name = display_name
          scholarship_info.value.username = username
          scholarship_info.value.creator_id = creator_id
          scholarship_info.value.time = formattedTime
          scholarship_info.value.date = formattedDate
          scholarship_info.value.profile_picture_avatar = profile_picture_avatar
        }
      })
      // const response = await fetchSingleUserById(creator_id)
      // const { error, data, status } = response

      // if (error) return
      // if (!data) return
      // if (status === 400) return

      // const {
      //   username,
      //   bio: { display_name, gender },
      //   profile_picture: { avatar },
      // } = data

      // const profile_picture_avatar: any = await getDisplayProfilePicture(
      //   avatar,
      //   gender,
      // )

      // scholarship_info.value.display_name = display_name
      // scholarship_info.value.username = username
      // scholarship_info.value.creator_id = creator_id
      // scholarship_info.value.time = formattedTime
      // scholarship_info.value.date = formattedDate
      // scholarship_info.value.profile_picture_avatar = profile_picture_avatar

      return store.dispatch('_requests/getAllUsers')
    }

    onBeforeMount(async () => await getScholarshipDetails())

    //
    return {
      scholarship_info,
      reactions,
      getScholarshipDetails,
    }
  },
}
</script>

<style scoped></style>
