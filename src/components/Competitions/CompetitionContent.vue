<template>
  <section
    class="flex flex-col inset-x-0 hover:bg-archyhub-semi-light hover:shadow-sm hover:bg-opacity-30"
  >
    <div class="flex mb-1 items-center w-full p-2 sm:p-3 xl:p-4 pb-2">
      <div
        v-if="competition_info.username !== ''"
        class="flex justify-between items-center truncate"
      >
        <div class="flex-shrink-0 w-10 h-10 sm:h-12 sm:w-12 mr-1">
          <router-link :to="`/profile/${competition_info.username}`">
            <img
              v-if="competition_info.profile_picture_avatar !== ''"
              class="w-full h-full rounded-full border cursor-pointer"
              :src="competition_info.profile_picture_avatar"
            />
          </router-link>

          <span
            v-if="competition_info.profile_picture_avatar === ''"
            class="block w-full h-full rounded-full border cursor-pointer bg-gray-500 animate-pulse"
          ></span>
        </div>

        <div class="truncate">
          <router-link
            :to="`/profile/${competition_info.username}`"
            class="hover:underline hover:text-archyhub-main text-gray-600 items-center flex flex-1 space-x-1 sm:space-x-2 truncate"
          >
            <span class="text-sm md:text-base font-semibold truncate">
              {{
                competition_info.display_name
                  ? competition_info.display_name
                  : competition_info.username
              }}
            </span>

            <span class="text-sm md:text-base font-normal truncate">
              @{{ competition_info.username }}
            </span>
          </router-link>

          <p
            class="flex items-center italic space-x-3 text-xs font-normal text-gray-400 truncate"
            v-if="competition_info.date || competition_info.time"
          >
            <span class="truncate">{{ competition_info.date }}</span>

            <span class="truncate">
              <strong class="font-medium">@</strong>
              {{ competition_info.time }}
            </span>
          </p>
        </div>
      </div>

      <div v-if="competition_info.username === ''" class="animate-pulse w-full">
        <div
          class="h-2 sm:h-3 p-1 w-3/4 bg-gray-400 rounded-xl col-span-2 mb-1"
        ></div>

        <div class="grid grid-cols-8 gap-2">
          <div class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl col-span-2"></div>
          <div class="h-2 sm:h-3 p-1 bg-gray-400 rounded-xl col-span-2"></div>
        </div>
      </div>
    </div>

    <article class="w-full px-2 sm:px-3 xl:px-4 pb-2">
      <div class="px-1 sm:px-2 mt-2">
        <router-link :to="`/competitions/${eachCompetition._id}`">
          <div class="pb-2 sm:pb-3 md:pb-4 lg:pb-5">
            <span
              class="text-sm sm:text-base lg:text-lg block font-medium text-gray-500 break-words break-all"
            >
              {{ eachCompetition.title }}
            </span>

            <div
              v-if="eachCompetition.competition_image.avatar !== ''"
              class="w-full flex justify-center items-center h-60 mt-2 sm:h-72 lg:h-80 mb-3 sm:mb-4 lg:mb-5 bg-archyhub-semi-light bg-opacity-40 rounded-xl"
            >
              <img
                class="h-auto max-h-full w-auto object-fill rounded-xl"
                :src="eachCompetition.competition_image.avatar"
              />
            </div>

            <span
              class="text-xs sm:text-sm break-words md:text-base block font-normal text-gray-600 break-all"
            >
              {{ eachCompetition.description }}
            </span>
          </div>
        </router-link>
      </div>
    </article>

    <ReactionsVue :reactions="reactions" />
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import type { PropType } from 'vue'
import { useStore } from 'vuex'
import ReactionsVue from '@/components/Reactions/index.vue'
import { CompetitionSchema } from '@/controller/typings/index'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'

export default {
  name: 'CompetitionContent',
  components: { ReactionsVue },
  props: {
    eachCompetition: {
      type: Object as PropType<CompetitionSchema>,
      required: true,
    },
  },
  setup(props: any) {
    const store = useStore()
    const storeUsers = computed(() => store.state._requests.allUsers)
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
      post_comment_object: {
        post_id: '',
        post_type: '',
      },
    })

    const getCompetitionDetails = async () => {
      const {
        _id,
        creator_id,
        createdAt,
        comments,
        likes,
      } = props.eachCompetition

      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      reactions.value.no_of_comments = comments.length
      reactions.value.no_of_likes = likes.length
      reactions.value.post_comment_object.post_id = _id
      reactions.value.post_comment_object.post_type = 'competition'

      if (storeUsers.value.length < 1) await fetchUsers()

      storeUsers.value.forEach(async (user: any) => {
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

          competition_info.value.display_name = display_name
          competition_info.value.username = username
          competition_info.value.creator_id = creator_id
          competition_info.value.time = formattedTime
          competition_info.value.date = formattedDate
          competition_info.value.profile_picture_avatar = profile_picture_avatar
        }
      })

      return await fetchUsers()
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }

    //
    onBeforeMount(async () => await getCompetitionDetails())

    //
    return {
      competition_info,
      reactions,
      getCompetitionDetails,
    }
  },
}
</script>

<style scoped></style>
