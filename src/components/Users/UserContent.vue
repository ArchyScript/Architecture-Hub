<template>
  <section
    class="flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:shadow-sm hover:bg-opacity-20"
  >
    <div class="flex w-full p-2 sm:p-3 xl:p-4 pb-2">
      <div class="flex-shrink-0 w-10 h-10 sm:h-12 sm:w-12 mr-1">
        <router-link :to="`/profile/${user_info.username}`">
          <img
            v-if="user_info.profile_picture !== ''"
            class="w-full h-full rounded-full border cursor-pointer"
            :src="user_info.profile_picture"
          />
        </router-link>

        <span
          v-if="user_info.profile_picture === ''"
          class="block w-full h-full rounded-full border cursor-pointer bg-gray-500 animate-pulse"
        ></span>
      </div>

      <div class="mb-1 flex flex-1 px-1 w-full ml-1 sm:ml-2">
        <div class="flex-1 flex-col truncate" v-if="user_info.username !== ''">
          <div class="flex justify-between items-center space-x-4 w-full">
            <p class="truncate">
              <router-link
                :to="`/profile/${user_info.username}`"
                class="items-center text-gray-600 flex space-x-1 sm:space-x-2 hover:underline hover:text-archyhub-main truncate"
              >
                <span class="text-sm md:text-base font-semibold truncate">
                  {{
                    user_info.display_name
                      ? user_info.display_name
                      : user_info.username
                  }}
                </span>

                <span class="text-sm md:text-base font-normal truncate">
                  @{{ user_info.username }}
                </span>
              </router-link>
            </p>

            <span :class="user_info._id === auth_user._id ? 'hidden' : 'flex'">
              <span
                class="btn text-xs md:text-sm py-1 rounded-lg px-2 md:px-3 flex-1 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                @click="followRecommended(user_info._id)"
                v-if="!is_auth_user_a_follower"
              >
                follow
              </span>

              <span
                @click="unfollowRecommended(user_info._id)"
                v-if="is_auth_user_a_follower"
                class="btn py-1 text-xs md:text-sm rounded-lg px-2 md:px-3 border bg-gray-700 border-gray-700 hover:border-archyhub-gray hover:bg-archyhub-gray hover:text-gray-600 cursor-pointer text-gray-100"
              >
                unfollow
              </span>
            </span>

            <span :class="user_info._id === auth_user._id ? 'flex' : 'hidden'">
              <router-link
                :to="`/profile/${user_info.username}`"
                class="btn text-xs md:text-sm py-1 rounded-lg px-2 md:px-3 border cursor-pointer hover:bg-gray-700 hover:text-gray-100 border-gray-700"
              >
                View Profile
              </router-link>
            </span>
          </div>

          <blockquote
            class="text-xs sm:text-sm md:text-base break-all font-normal my-1 text-gray-500 truncate"
          >
            {{ user_info.description }}
          </blockquote>

          <p class="text-base mt-1 sm:mt-2 truncate">
            <span class="fa fa-calendar text-sm mr-2 text-gray-400"></span>
            <span class="text-gray-500 text-xs md:text-sm">
              Joined {{ user_info.date }}
            </span>
          </p>

          <p
            class="flex items-center text-xs md:text-sm xl:text-base mt-4 space-x-4 md:space-x-6 truncate"
          >
            <span class="flex space-x-2">
              <span v-if="user_info.followings < 1">
                <span class="text-gray-600 font-bold">
                  {{ user_info.followings }}
                </span>

                <span class="text-gray-500">
                  following
                </span>
              </span>

              <router-link
                :to="`/user/${user_info.username}/followings`"
                v-if="user_info.followings >= 1"
                class="hover:underline hover:text-archyhub-main text-gray-600"
              >
                <span class="font-semibold">
                  {{ user_info.followings }}
                </span>

                <span class="font-normal" v-if="user_info.followings === 1">
                  following
                </span>
                <span class="font-normal" v-if="user_info.followings > 1">
                  followings
                </span>
              </router-link>
            </span>

            <span class="flex space-x-2">
              <span v-if="user_info.followers < 1">
                <span class="text-gray-600 font-bold">
                  {{ user_info.followers }}
                </span>

                <span class="text-gray-500">
                  follower
                </span>
              </span>

              <router-link
                :to="`/user/${user_info.username}/followers`"
                v-if="user_info.followers >= 1"
                class="hover:underline hover:text-archyhub-main text-gray-600"
              >
                <span class="font-semibold">
                  {{ user_info.followers }}
                </span>

                <span class="font-normal" v-if="user_info.followers === 1">
                  follower
                </span>
                <span class="font-normal" v-if="user_info.followers > 1">
                  followers
                </span>
              </router-link>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import type { PropType } from 'vue'
import { ScholarshipSchema, UserSchema } from '@/controller/typings/index'
import {
  formatDateAndTime,
  formatNumbers,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import { useStore } from 'vuex'
import {
  fetchSingleUserById,
  followUser,
  unfollowUser,
} from '@/controller/api/users.api'

export default {
  name: 'ScholarshipContent',
  props: {
    eachUser: {
      type: Object as PropType<UserSchema>,
      required: true,
    },
  },

  setup(props: any) {
    const store = useStore()
    const storeUsers = computed(() => store.state._requests.allUsers)
    const auth_user = computed(() => store.state.users.auth_user)
    const is_auth_user_a_follower = ref(false)
    const user_info = ref({
      display_name: '',
      _id: '',
      username: '',
      profile_picture: '',
      time: '',
      date: '',
      description: '',
      followers: 0,
      followings: 0,
    })
    const getUserDetails = async (eachUserProps: any) => {
      const {
        _id,
        createdAt,
        username,
        bio: { display_name, gender, description },
        profile_picture: { avatar },
        followings,
        followers,
      } = eachUserProps
      const { formattedFullDate, formattedTime } = formatDateAndTime(createdAt)

      if (storeUsers.value.length < 1) await fetchUsers()

      await auth_user.value.followings.forEach(async (following: any) => {
        if (following.following_id === _id) {
          is_auth_user_a_follower.value = true
        }
      })

      const profile_picture: any = await getDisplayProfilePicture(
        avatar,
        gender,
      )

      user_info.value.display_name = display_name
      user_info.value.description = description
      user_info.value.username = username
      user_info.value._id = _id
      user_info.value.time = formattedTime
      user_info.value.date = formattedFullDate
      user_info.value.profile_picture = profile_picture

      const no_of_followers = await formatNumbers(+followers.length)
      const no_of_followings = await formatNumbers(+followings.length)

      user_info.value.followers = no_of_followers
      user_info.value.followings = no_of_followings

      return await fetchUsers()
    }

    //
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
      user_info.value.followers = result.data.followers.length
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
      user_info.value.followers = result.data.followers.length

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
      await getUserDetails(props.eachUser)
    })

    //
    return {
      user_info,
      auth_user,
      is_auth_user_a_follower,
      getUserDetails,
      followRecommended,
      unfollowRecommended,
    }
  },
}
</script>

<style scoped></style>
