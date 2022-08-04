<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div
      class="h-36 sm:h-44 lg:h-52 w-full flex justify-center items-center opac ity-60"
    >
      <!-- <img
        v-if="user_profile.profile_picture !== ''"
        class="w-full h-full object-fill"
        :src="user_profile.profile_picture"
      /> -->
      <span
        class="h-full w-full block bg-archyhub-main border bg-opacity-30"
      ></span>
    </div>

    <section class="px-2 sm:px-6">
      <div class="flex justify-between">
        <span
          class="h-20 w-20 sm:w-24 sm:h-24 md:h-28 md:w-28 xl:h-32 xl:w-32 -mt-10 sm:-mt-12 md:-mt-14 xl:-mt-16 p-1 rounded-full block bg-archyhub-semi-light bg-opacity-30"
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

        <div class="mt-1 sm:mt-2">
          <span v-if="user_profile._id === auth_user._id">
            <router-link :to="`/profile/${user_profile.username}/edit`">
              <span
                class="py-1 text-xs sm:text-sm lg:text-base inline-flex font-normal md:font-medium bg-archyhub-gray text-gray-700 rounded-md lg:rounded-lg px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
              >
                Edit Profile
              </span>
            </router-link>
          </span>

          <span v-if="user_profile._id !== auth_user._id">
            <span
              v-if="!is_auth_user_a_follower"
              @click="followRecommended(user_profile._id)"
              class="py-1 text-xs sm:text-sm lg:text-base inline-flex font-normal md:font-medium bg-archyhub-gray text-gray-700 rounded-xl px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
            >
              follow
            </span>

            <span
              v-if="is_auth_user_a_follower"
              @click="unfollowRecommended(user_profile._id)"
              class="btn text-xs sm:text-sm lg:text-base font-normal md:font-medium py-1 rounded-lg px-3 border bg-gray-700 border-gray-700 hover:border-archyhub-gray hover:bg-archyhub-gray hover:text-gray-600 cursor-pointer text-gray-100"
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
            class="h-1 sm:h-2 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-2"
          ></div>
          <div
            class="h-1 sm:h-2 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-1 sm:mb-2"
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

        <div class="px-2" v-if="user_profile.username !== ''">
          <div
            v-if="user_profile.username !== ''"
            class="fl ex-1 items-center mt-2 mb-2"
          >
            <h4
              class="text-base sm:text-lg lg:text-xl block font-medium text-gray-600"
            >
              {{
                user_profile.display_name
                  ? user_profile.display_name
                  : user_profile.username
              }}
            </h4>
            <span
              class="text-sm sm:text-base font-light block text-gray-500 truncate"
            >
              @{{ user_profile.username }}
            </span>
          </div>

          <p class="text-xs sm:text-sm font-normal my-1 text-gray-500">
            {{ user_profile.description }}
          </p>

          <p class="text-xs sm:text-sm mt-2 space-x-1 sm:space-x-2">
            <span class="fa fa-calendar text-sm text-gray-400"></span>
            <span class="text-gray-500 font-light">
              Joined {{ user_profile.date_joined }}
            </span>
          </p>

          <p
            class="flex items-center text-xs sm:text-sm mt-2 space-x-4 md:space-x-6"
          >
            <span class="flex space-x-2">
              <span v-if="user_profile.no_of_followings < 1">
                <span class="text-gray-600 font-bold">
                  {{ user_profile.no_of_followings }}
                </span>

                <span class="text-gray-500">
                  following
                </span>
              </span>

              <router-link
                :to="`/user/${user_profile.username}/followings`"
                v-if="user_profile.no_of_followings >= 1"
                class="hover:underline"
              >
                <span class="text-gray-600 font-bold">
                  {{ user_profile.no_of_followings }}
                </span>

                <span
                  class="text-gray-500"
                  v-if="user_profile.no_of_followings === 1"
                >
                  following
                </span>
                <span
                  class="text-gray-500"
                  v-if="user_profile.no_of_followings > 1"
                >
                  followings
                </span>
              </router-link>
            </span>

            <span class="flex space-x-2">
              <span v-if="user_profile.no_of_followers < 1">
                <span class="text-gray-600 font-bold">
                  {{ user_profile.no_of_followers }}
                </span>

                <span class="text-gray-500">
                  follower
                </span>
              </span>

              <router-link
                :to="`/user/${user_profile.username}/followers`"
                v-if="user_profile.no_of_followers >= 1"
                class="hover:underline"
              >
                <span class="text-gray-600 font-bold">
                  {{ user_profile.no_of_followers }}
                </span>

                <span
                  class="text-gray-500"
                  v-if="user_profile.no_of_followers === 1"
                >
                  follower
                </span>
                <span
                  class="text-gray-500"
                  v-if="user_profile.no_of_followers > 1"
                >
                  followers
                </span>
              </router-link>
            </span>
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  fetchSingleUserById,
  followUser,
  unfollowUser,
} from '@/controller/api/users.api'
import {
  formatDateAndTime,
  formatNumbers,
  getDisplayProfilePicture,
} from '@/controller/utilities'

export default {
  name: 'ProfileHeader',
  setup() {
    const store = useStore()
    const route = useRoute()
    const user_profile_id: any = ref('')
    const is_auth_user_a_follower = ref(false)
    const active_user = computed(() => store.state.users.user)
    const auth_user = computed(() => store.state.users.auth_user)
    const storeUsers = computed(() => store.state._requests.allUsers)
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

    const getUserData = async (username: any) => {
      // check to update auth_user info
      if (username === auth_user.value.username) {
        const {
          _id,
          createdAt,
          followers,
          followings,
          bio: { display_name, gender, description },
          profile_picture: { avatar },
        } = auth_user.value

        const { formattedFullDate, formattedTime } = formatDateAndTime(
          createdAt,
        )

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
        user_profile.value.date_joined = formattedFullDate

        const no_of_followers = await formatNumbers(+followers.length)
        const no_of_followings = await formatNumbers(+followings.length)

        user_profile.value.no_of_followers = no_of_followers
        user_profile.value.no_of_followings = no_of_followings
      }

      // get other user details
      storeUsers.value.forEach(async (eachUser: any) => {
        if (
          eachUser.username === username &&
          username !== auth_user.value.username
        ) {
          const {
            _id,
            createdAt,
            followers,
            followings,
            bio: { display_name, gender, description },
            profile_picture: { avatar },
          } = await eachUser

          const { formattedFullDate, formattedTime } = formatDateAndTime(
            createdAt,
          )

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
          user_profile.value.date_joined = formattedFullDate
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

      await fetchAuthUser()
      await fetchUsers()
    }

    const followRecommended = async (user_to_follow_id: string) => {
      const params = {
        current_user_id: auth_user.value._id,
        user_to_follow_id,
      }

      const response = await followUser(params)
      const { error, data, status } = response

      if (error || status === 400 || !data) return

      const result = await fetchSingleUserById(user_to_follow_id)
      if (result.error || result.status === 400 || !result.data) return

      is_auth_user_a_follower.value = true
      user_profile.value.no_of_followers = result.data.followers.length

      await fetchAuthUser()
      await fetchUsers()
    }

    const unfollowRecommended = async (user_to_unfollow_id: string) => {
      const params = {
        current_user_id: auth_user.value._id,
        user_to_unfollow_id,
      }

      const response = await unfollowUser(params)
      const { error, data, status } = response

      if (error || status === 400 || !data) return

      const result = await fetchSingleUserById(user_to_unfollow_id)

      if (result.error || result.status === 400 || !result.data) return
      is_auth_user_a_follower.value = false
      user_profile.value.no_of_followers = result.data.followers.length

      await fetchAuthUser()
      await fetchUsers()
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchAuthUser() {
      await store.dispatch('users/getAuthUser', auth_user.value._id)
    }

    //
    onBeforeMount(async () => {
      const { username } = route.params
      await getUserData(username)
      await fetchUsers()
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
