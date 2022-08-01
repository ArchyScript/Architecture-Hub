<template>
  <section
    v-if="recommended_people_to_follow.length >= 1"
    class="flex items-center border rounded-2xl border-gray-200 inset-x-0 pt-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-semibold mb-6 px-5 text-gray-600">
        Recommended for You
      </h4>

      <div v-if="recommended_people_to_follow.length < 1" class="p-3">
        <div v-for="x in 3" :key="x">
          <AnimatedRecommendedVue />
        </div>
      </div>

      <div
        class="flex flex-col space-y-6 p-3"
        v-if="recommended_people_to_follow.length >= 1"
      >
        <div
          class="flex space-x-4"
          :key="recommended._id"
          v-for="recommended in recommended_people_to_follow"
        >
          <div class="flex-shrink-0">
            <router-link :to="`/profile/${recommended.username}`">
              <img
                class="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-100"
                :src="recommended.profile_image"
                :alt="recommended.username"
              />
            </router-link>
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
                v-if="just_followed_user_id !== recommended._id"
              >
                follow
              </span>

              <span
                v-if="just_followed_user_id === recommended._id"
                class="btn py-1 rounded-lg px-3 border border-gray-700 bg-gray-700 cursor-not-allowed text-gray-100"
              >
                following
              </span>
            </div>

            <p class="text-gray-400 font-normal italic items-center text-sm">
              <span>promoted</span>
              <span class="fa fa-edit ml-2"></span>
            </p>
          </div>
        </div>
      </div>

      <router-link
        class="w-full hover:underline block mt-3 py-2 sm:py-3 text-sm text-center rounded-bl-2xl rounded-br-2xl sm:text-base italic border-t hover:bg-gray-300"
        to="/users"
      >
        <span class="w-full">
          see all
        </span>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { fetchAllUsers } from '@/controller/api/users.api'
import AnimatedRecommendedVue from '@/components/Animation/AnimatedRecommended.vue'
import { getDisplayProfilePicture } from '@/controller/utilities'
import { useStore } from 'vuex'
import { followUser } from '@/controller/api/users.api'

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
    const store = useStore()
    const recommended_people_to_follow = ref<RecommendedSchema[]>([])
    const storeUsers = computed(() => store.state._requests.allUsers)
    const auth_user = computed(() => store.state.users.auth_user)
    const just_followed_user_id = ref('')

    //
    const getRecommendedPeople = async () => {
      if (storeUsers.value.length < 1) await fetchUsers()

      recommended_people_to_follow.value = []

      const sortedByMostFollowers = storeUsers.value.sort(
        (user_1: any, user_2: any) => {
          return user_2.followers.length - user_1.followers.length
        },
      )

      sortedByMostFollowers.forEach(async (recommended_user: any) => {
        const {
          _id,
          bio: { display_name },
          username,
          profile_picture: { avatar },
          followers,
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

        const is_active_user_part_of_another_user_followers = followers.find(
          (follower: any) => {
            return follower.follower_id === auth_user.value._id
          },
        )
        const is_another_user_part_of_active_user_followings = auth_user.value.followings.find(
          (following: any) => {
            return following.following_id === _id
          },
        )

        if (
          auth_user.value._id !== _id &&
          !is_active_user_part_of_another_user_followers &&
          !is_another_user_part_of_active_user_followings
        ) {
          if (recommended_people_to_follow.value.length <= 2) {
            recommended_people_to_follow.value.push(people_to_follow)
          }
        }
      })

      return store.dispatch('_requests/getAllUsers')
    }

    const followRecommended = async (user_id: string) => {
      const params = {
        current_user_id: auth_user.value._id,
        user_to_follow_id: user_id,
      }

      const response = await followUser(params)
      const { error, data, status } = response

      if (error || status === 400 || !data) return

      just_followed_user_id.value = user_id
      await getRecommendedPeople()
      getRecommendedPeople()
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    //
    onBeforeMount(async () => await getRecommendedPeople())

    return {
      recommended_people_to_follow,
      just_followed_user_id,
      followRecommended,
    }
  },
}
</script>

<style scoped></style>
