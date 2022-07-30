<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="h-60 w-full">
      <span class="h-full w-full block bg-blue-400 border"></span>
    </div>

    <section class="px-4">
      <div class="flex justify-between">
        <span
          class="h-24 w-24 md:h-28 md:w-28 xl:h-32 xl:w-32 -mt-12 md:-mt-14 xl:-mt-16 p-1 rounded-full block bg-archyhub-semi-light border"
        >
          <img
            v-if="user_profile.profile_picture !== ''"
            class="w-full h-full rounded-full object-fill"
            :src="user_profile.profile_picture"
          />

          <div
            v-if="user_profile.profile_picture === ''"
            class="w-full h-full bg-gray-400 rounded-full animate-pulse"
          ></div>
        </span>

        <div class="mt-2">
          <span v-if="user_profile._id === auth_user._id">
            <router-link :to="`/profile/${user_profile.username}/edit`">
              <span
                class="py-1 inline-flex font-semibold bg-archyhub-gray text-gray-700 rounded-xl px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
              >
                Edit Profile
              </span>
            </router-link>
          </span>

          <span v-if="user_profile._id !== auth_user._id">
            <span
              v-if="!is_auth_user_a_follower"
              @click="followRecommended(user_profile._id)"
              class="py-1 inline-flex font-semibold bg-archyhub-gray text-gray-700 rounded-xl px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
            >
              follow
            </span>

            <span
              v-if="is_auth_user_a_follower"
              @click="unfollowRecommended(user_profile._id)"
              class="py-1 inline-flex font-semibold bg-archyhub-gray text-gray-700 rounded-xl px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
            >
              unfollow
            </span>
          </span>
        </div>
      </div>

      <div class="">
        <div
          v-if="user_profile.username === ''"
          class="flex-1 animate-pulse my-4"
        >
          <div
            class="h-2 sm:h-3 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-2"
          ></div>
          <div
            class="h-2 sm:h-3 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-1 sm:mb-2"
          ></div>

          <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl mb-1"></div>
          <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl mb-1"></div>
          <div
            class="h-1 sm:h-2 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-1"
          ></div>

          <div class="grid grid-cols-8 gap-2 mt-4">
            <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
            <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
          </div>
        </div>

        <div class="" v-if="user_profile.username !== ''">
          <div
            v-if="user_profile.username !== ''"
            class="fl ex-1 items-center px-2 mt-2 mb-2"
          >
            <h4
              class="text-base sm:text-lg lg:text-xl block font-semibold text-gray-600"
            >
              {{
                user_profile.display_name
                  ? user_profile.display_name
                  : user_profile.username
              }}
            </h4>
            <span
              class="text-sm sm:text-base block cursor-pointer text-gray-500 truncate"
            >
              @{{ user_profile.username }}
            </span>
          </div>

          <p class="text-base font-medium my-1 px-2 text-gray-500">
            {{ user_profile.description }}
          </p>

          <p class="text-base mt-2 px-2">
            <span class="fa fa-calendar text-xl mr-2 text-gray-400"></span>
            <span class="text-gray-500">
              Joined {{ user_profile.date_joined }}
            </span>
          </p>

          <p class="flex items-center text-base mt-2 px-2 space-x-8">
            <span class="flex space-x-2">
              <span class="text-gray-600 font-bold">
                {{ user_profile.no_of_followings }}
              </span>
              <span
                v-if="user_profile.no_of_followings <= 1"
                class="text-gray-500"
              >
                following
              </span>
              <span
                v-if="user_profile.no_of_followings > 1"
                class="text-gray-500"
              >
                followings
              </span>
            </span>

            <span class="flex space-x-2">
              <span class="text-gray-600 font-bold">
                {{ user_profile.no_of_followers }}
              </span>
              <span
                v-if="user_profile.no_of_followers <= 1"
                class="text-gray-500"
              >
                follower
              </span>
              <span
                v-if="user_profile.no_of_followers > 1"
                class="text-gray-500"
              >
                followers
              </span>
            </span>
          </p>
        </div>
      </div>

      <!-- <VueNotificationList /> -->
    </section>
  </section>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  fetchSingleUserById,
  fetchSingleUserByUsername,
  followUser,
  unfollowUser,
} from '@/controller/api/users.api'
import router from '@/router'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities'
// import { VueNotificationList } from '@dafcoe/vue-notification'

export default {
  name: 'ProfileHeader',
  // components: { VueNotificationList },
  setup() {
    const store = useStore()
    const route = useRoute()
    const user_profile_id: any = ref('')
    const user_profile = ref({
      _id: '',
      display_name: '',
      username: '',
      profile_picture: '',
      description: '',
      time: '',
      date_joined: '',
      no_of_followers: 0,
      no_of_followings: 0,
    })
    const is_auth_user_a_follower = ref(false)

    const active_user = computed(() => store.state.users.user)
    const auth_user = computed(() => store.state.users.auth_user)
    const storeUsers = computed(() => store.state._requests.allUsers)

    const getUserData = async (username: any) => {
      // const response = await fetchSingleUserByUsername(username)
      // const { data, status, error } = response

      // if (error || status === 400 || !data || typeof data === 'string')
      //   return router.push(`/profile/${username}`)
      if (storeUsers.value.length < 1) {
        await fetchUsers()
      }

      storeUsers.value.forEach(async (eachUser: any) => {
        if (eachUser.username === username) {
          const {
            _id,
            createdAt,
            followers,
            followings,
            bio: { display_name, gender, description },
            profile_picture: { avatar },
          } = await eachUser

          const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

          const profile_picture: any = await getDisplayProfilePicture(
            avatar,
            gender,
          )

          user_profile.value._id = _id
          user_profile.value.display_name = display_name
          user_profile.value.username = username
          user_profile.value.profile_picture = profile_picture
          user_profile.value.description = description
          user_profile.value.time = formattedTime
          user_profile.value.date_joined = formattedDate
          user_profile.value.no_of_followers = followers.length
          user_profile.value.no_of_followings = followings.length

          auth_user.value.followings.forEach(async (following: any) => {
            if (following.following_id === _id) {
              is_auth_user_a_follower.value = true
            }
          })

          return
        }
      })
    }

    const followRecommended = async (user_to_follow_id: string) => {
      const params = {
        current_user_id: auth_user.value._id,
        user_to_follow_id: user_to_follow_id,
      }

      const response = await followUser(params)
      const { error, data, status } = response

      if (error || status === 400 || !data) return
      console.log(data)

      // await getUserDetails(props.eachUser)
      is_auth_user_a_follower.value = true

      const result = await fetchSingleUserById(user_to_follow_id)
      if (result.error || result.status === 400 || !result.data) return

      user_profile.value.no_of_followers = result.data.followers.length

      await fetchUsers()
    }

    const unfollowRecommended = async (user_to_unfollow_id: string) => {
      const params = {
        current_user_id: auth_user.value._id,
        user_to_unfollow_id: user_to_unfollow_id,
      }

      const response = await unfollowUser(params)
      const { error, data, status } = response

      if (error || status === 400 || !data) return
      console.log(data)

      const result = await fetchSingleUserById(user_to_unfollow_id)
      // await getUserDetails(props.eachUser)

      if (result.error || result.status === 400 || !result.data) return
      is_auth_user_a_follower.value = false
      user_profile.value.no_of_followers = result.data.followers.length

      await getUserData(result.data.username)
      await fetchUsers()
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }

    //
    onBeforeMount(async () => {
      const { username } = route.params
      console.log(username)
      await getUserData(username)
    })

    return {
      auth_user,
      active_user,
      user_profile_id,
      user_profile,
      is_auth_user_a_follower,
      followRecommended,
      unfollowRecommended,
    }
  },
}
</script>
<style scoped></style>
