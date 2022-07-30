<template>
  <section
    class="flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
  >
    <div class="flex w-full p-2 sm:p-3 xl:p-4 pb-2">
      <div class="flex-shrink-0 mr-1">
        <router-link :to="`/profile/${user_info.username}`">
          <img
            v-if="user_info.profile_picture_avatar !== ''"
            class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
            :src="user_info.profile_picture_avatar"
          />
        </router-link>

        <span
          v-if="user_info.profile_picture_avatar === ''"
          class="block w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer bg-gray-500 animate-pulse"
        ></span>
      </div>

      <div class="mb-1 flex flex-1 px-1 w-full ml-1 sm:ml-2">
        <div class="flex-1 flex-col truncate" v-if="user_info.username !== ''">
          <div class="flex justify-between items-center">
            <p>
              <router-link
                :to="`/profile/${user_info.username}`"
                class="items-center flex sm:space-x-2 hover:underline"
              >
                <span
                  class="text-sm md:text-base font-semibold text-gray-600 truncate"
                >
                  {{
                    user_info.display_name
                      ? user_info.display_name
                      : user_info.username
                  }}
                </span>

                <span
                  class="text-sm md:text-base font-normal text-gray-500 truncate"
                >
                  @{{ user_info.username || '...' }}
                </span>
              </router-link>
            </p>

            <span :class="user_info._id === auth_user._id ? 'hidden' : 'flex'">
              <span
                class="btn py-1 rounded-lg px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                @click="followRecommended(user_info._id)"
                v-if="!is_auth_user_a_follower"
              >
                follow
              </span>

              <span
                @click="unfollowRecommended(user_info._id)"
                v-if="is_auth_user_a_follower"
                class="btn py-1 rounded-lg px-3 border bg-gray-700 border-gray-700 hover:border-archyhub-gray hover:bg-archyhub-gray hover:text-gray-600 cursor-pointer text-gray-100"
              >
                unfollow
              </span>
            </span>

            <span :class="user_info._id === auth_user._id ? 'flex' : 'hidden'">
              <router-link
                :to="`/profile/${user_info.username}`"
                class="btn py-1 rounded-lg px-3 border-2 cursor-pointer hover:bg-gray-700 hover:text-gray-100 border-gray-700"
              >
                View Profile
              </router-link>
            </span>
          </div>

          <p class="text-base font-medium my-1 text-gray-500">
            {{ user_info.description }}
          </p>

          <p class="text-base mt-2 px-2">
            <span class="fa fa-calendar text-xl mr-2 text-gray-400"></span>
            <span class="text-gray-500">Joined {{ user_info.date }}</span>
          </p>

          <p class="flex items-center text-base mt-4 space-x-8">
            <!-- <router-link
              :to="`/user/${user_info.username}/followings`"
              class="flex space-x-2 hover:underline"
            >
              <span class="text-gray-600 font-bold">
                {{ user_info.followings }}
              </span>
              <span v-if="user_info.followings <= 1" class="text-gray-500">
                following
              </span>
              <span v-if="user_info.followings > 1" class="text-gray-500">
                followings
              </span>
            </router-link> -->

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
                class="hover:underline"
              >
                <span class="text-gray-600 font-bold">
                  {{ user_info.followings }}
                </span>

                <span class="text-gray-500">
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
                class="hover:underline"
              >
                <span class="text-gray-600 font-bold">
                  {{ user_info.followers }}
                </span>

                <span class="text-gray-500">
                  followers
                </span>
              </router-link>
            </span>

            <!-- <router-link
              :to="`/user/${user_info.username}/followers`"
              class="flex space-x-2 hover:underline"
            >
              <span class="text-gray-600 font-bold">
                {{ user_info.followers }}
              </span>
              <span v-if="user_info.followers <= 1" class="text-gray-500">
                follower
              </span>
              <span v-if="user_info.followers > 1" class="text-gray-500">
                followers
              </span>
            </router-link> -->
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
    const user_info = ref({
      display_name: '',
      _id: '',
      username: '',
      profile_picture_avatar: '',
      time: '',
      date: '',
      description: '',
      followers: 0,
      followings: 0,
    })
    const is_auth_user_a_follower = ref(false)

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
      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      //
      if (storeUsers.value.length < 1) await fetchUsers()

      await auth_user.value.followings.forEach(async (following: any) => {
        if (following.following_id === _id) {
          is_auth_user_a_follower.value = true

          console.log(following.following_id)
        }
      })

      const profile_picture_avatar: any = await getDisplayProfilePicture(
        avatar,
        gender,
      )

      user_info.value.display_name = display_name
      user_info.value.description = description
      user_info.value.followings = followings.length
      user_info.value.followers = followers.length
      user_info.value.username = username
      user_info.value._id = _id
      user_info.value.time = formattedTime
      user_info.value.date = formattedDate
      user_info.value.profile_picture_avatar = profile_picture_avatar

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

      // await fetchUsers()
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
      // await fetchUsers()
    }

    //
    // fetch data from store
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
