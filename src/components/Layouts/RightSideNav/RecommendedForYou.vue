<template>
  <section
    class="flex items-center border rounded-2xl p-3 border-gray-200 inset-x-0 py-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-semibold mb-6 px-2 text-gray-600">
        Recommended for You
      </h4>

      <div v-if="recommended_people_to_follow.length < 1">
        <div v-for="x in 3" :key="x">
          <AnimatedRecommendedVue />
        </div>
      </div>

      <div
        class="flex flex-col space-y-6"
        v-if="recommended_people_to_follow.length >= 1"
      >
        <div
          class="flex items -center space-x-4"
          :key="recommended._id"
          v-for="recommended in recommended_people_to_follow"
        >
          <div class="flex-shrink-0">
            <img
              class="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-100"
              :src="recommended.profile_image"
              :alt="recommended.display_name"
            />
          </div>

          <div class="flex-1">
            <div class="mb-1 flex items-center">
              <div class="flex-1">
                <span
                  class="text-lg block font-medium text-gray-900 truncate dark:text-white"
                >
                  {{
                    recommended.display_name !== ''
                      ? recommended.display_name
                      : recommended.username
                  }}
                </span>
                <span
                  class="text-sm block text-gray-500 truncate dark:text-gray-400"
                >
                  {{ `@${recommended.username}` }}
                </span>
              </div>

              <span
                class="btn py-1 rounded-lg px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                @click="followRecommended(recommended._id)"
              >
                follow
              </span>
            </div>

            <p class="text-gray-400 font-normal italic items-center text-sm">
              <span>promoted</span>
              <span class="fa fa-edit ml-2"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue'
import { fetchAllUsers } from '@/controller/api/users.api'
// import { default_images } from '@/controller/utils'
import AnimatedRecommendedVue from '@/components/Animation/AnimatedRecommended.vue'
import { getDisplayProfilePicture } from '@/controller/utilities'

type RecommendedSchema =
  | {
      profile_image: string
      _id: any
      username: string
      display_name: string
    }
  | any

export default {
  name: 'RecommendedForYou',
  components: { AnimatedRecommendedVue },
  setup() {
    const recommended_people_to_follow = ref<RecommendedSchema[]>([])

    const getRecommendedPeople = async () => {
      const response = await fetchAllUsers()
      const { error, data, status } = response

      if (error || status === 400 || !data || typeof data === 'string') return

      const sortedByMostFollowers = data.sort((user_1: any, user_2: any) => {
        return user_2.followers.length - user_1.followers.length
      })

      sortedByMostFollowers.forEach(
        async (recommended_user: any, index: number) => {
          if (index <= 2) {
            const {
              _id,
              bio: { display_name },
              username,
              profile_picture: { avatar },
              bio: { gender },
            } = recommended_user

            const profile_image: any = await getDisplayProfilePicture(
              avatar,
              gender,
            )

            const people_to_follow = {
              _id,
              display_name,
              username,
              profile_image,
            }

            recommended_people_to_follow.value.push(people_to_follow)
          }
        },
      )
    }

    const followRecommended = (user_id: string) => {
      console.log(user_id)
    }

    onBeforeMount(() => {
      getRecommendedPeople()
    })

    return {
      recommended_people_to_follow,
      followRecommended,
    }
  },
}
</script>

<style scoped></style>
