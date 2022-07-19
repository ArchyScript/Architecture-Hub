<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex items-center w-full p-2 sm:p-3 xl:p-4 pb-2">
      <div class="flex-shrink-0 mr-1">
        <router-link :to="`/profile/${competition_info.username}`">
          <img
            v-if="competition_info.profile_picture_avatar !== ''"
            class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
            :src="competition_info.profile_picture_avatar"
          />
        </router-link>

        <span
          v-if="competition_info.profile_picture_avatar === ''"
          class="block w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer bg-gray-500 animate-pulse"
        ></span>
      </div>

      <div class="mb-1 flex flex-1 px-1 w-full ml-1 sm:ml-2">
        <div
          class="flex-1 flex-col truncate"
          v-if="competition_info.username !== ''"
        >
          <p class="items-center flex sm:space-x-2">
            <span
              class="text-sm md:text-base font-semibold text-gray-600 truncate"
            >
              {{
                competition_info.display_name
                  ? competition_info.display_name
                  : competition_info.username
              }}
            </span>

            <span
              class="text-sm md:text-base font-normal text-gray-500 truncate"
            >
              @{{ competition_info.username || '...' }}
            </span>
          </p>

          <p
            class="hidden sm:flex items-center italic space-x-3 text-xs font-normal text-gray-500 truncate"
            v-if="competition_info.date || competition_info.time"
          >
            <span class="">{{ competition_info.date }}</span>

            <span class="">
              <strong class="font-semibold">@</strong>
              {{ competition_info.time }}
            </span>
          </p>
        </div>

        <div
          v-if="competition_info.username === ''"
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
        <router-link :to="`/competitions/${eachCompetition._id}`">
          <span class="text-base md:text-lg block font-semibold text-gray-600">
            {{ eachCompetition.title }}
          </span>

          <img
            v-if="eachCompetition.competition_image.avatar !== ''"
            class="w-full h-52 mt-2 sm:h-56 lg:h-64 mb-5 object-fill border rounded-xl"
            :src="eachCompetition.competition_image.avatar"
          />

          <span class="text-sm md:text-base block font-normal text-gray-600">
            {{ eachCompetition.description }}
          </span>
        </router-link>
      </div>
    </article>

    <div class="mt-3 sm:mt-4 lg:mt-6">
      <ReactionsVue :reactions="reactions" />
    </div>

    <p class="py-2 w-f ull font-normal text-gray-500 space-x-2 italic">
      <a
        :href="eachCompetition.link"
        target="_blank"
        class="flex justify-center items-center space-x-1 sm:space-x-2 hover:underline"
      >
        apply now
      </a>
    </p>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import { CompetitionSchema } from '@/controller/typings/index'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import router from '@/router'
import { fetchSingleUserById } from '@/controller/api/users.api'

export default {
  name: 'PostContent',
  components: { ReactionsVue },
  props: {
    eachCompetition: {
      type: Object as PropType<CompetitionSchema>,
      required: true,
    },
  },
  setup(props: any) {
    const competition_info = ref({
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
      competition_id: '',
    })

    const viewUserProfile = (username: any) => {
      router.push(`/profile/${username}`)
      console.log(username)
    }

    const getPostDetails = async () => {
      const { creator_id, createdAt } = props.eachCompetition
      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      //
      // reactions.value.no_of_comments = comments.length
      // reactions.value.no_of_likes = likes.length
      // reactions.value.competition_id = _id

      //
      const response = await fetchSingleUserById(creator_id)
      const { error, data, status } = response

      if (error) return
      if (!data) return
      if (status === 400) return

      console.log(data)

      const {
        username,
        bio: { display_name, gender },
        profile_picture: { avatar },
      } = data

      const profile_picture_avatar: any = await getDisplayProfilePicture(
        avatar,
        gender,
      )

      competition_info.value.display_name = display_name
      competition_info.value.username = username
      competition_info.value.creator_id = creator_id
      competition_info.value.time = formattedTime
      competition_info.value.date = formattedDate
      competition_info.value.profile_picture_avatar = profile_picture_avatar

      return
    }

    const viewSinglePost = (competition_id: any) => {
      router.push(`/post/${competition_id}`)
    }

    onBeforeMount(async () => {
      //
      await getPostDetails()
    })
    return {
      competition_info,
      reactions,
      viewUserProfile,
      getPostDetails,
      viewSinglePost,
    }
  },
}
</script>

<style scoped></style>
