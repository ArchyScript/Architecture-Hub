roie
<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20"
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
      fbbdfldjdkfdfno;noioinoib
      <div class="mb-1 flex flex-1 px-1 w-full ml-1 sm:ml-2">
        <div class="flex-1 flex-col truncate" v-if="user_info.username !== ''">
          <p class="items-center flex sm:space-x-2">
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
          </p>

          <!-- <p
            class="hidden sm:flex items-center italic space-x-3 text-xs font-normal text-gray-500 truncate"
            v-if="user_info.date || user_info.time"
          >
            <span class="">{{ user_info.date }}</span>

            <span class="">
              <strong class="font-semibold">@</strong>
              {{ user_info.time }}
            </span>
          </p> -->

          <p class="text-base font-medium my-1 text-gray-500">
            {{ user_info.description }}
          </p>

          <p class="text-base mt-2 px-2">
            <span class="fa fa-calendar text-xl mr-2 text-gray-400"></span>
            <span class="text-gray-500">Joined {{ user_info.date }}</span>
          </p>

          <p class="flex items-center text-base mt-4 space-x-8">
            <router-link
              to="/competitions"
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
            </router-link>

            <router-link
              to="/competitions"
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
            </router-link>
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

export default {
  name: 'UserCommunityContent',
  props: {
    eachUserInUserCommunity: {
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
      creator_id: '',
      username: '',
      profile_picture_avatar: '',
      time: '',
      date: '',
      description: '',
      followers: 0,
      followings: 0,
    })
    const is_auth_user_a_follower = ref(false)

    const getUserDetails = async () => {
      const {
        _id,
        creator_id,
        createdAt,
        username,
        bio: { display_name, gender, description },
        profile_picture: { avatar },
        followings,
        followers,
      } = props.eachUserInUserCommunity
      const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      //
      if (storeUsers.value.length < 1) await fetchUsers()

      //
      const profile_picture_avatar: any = await getDisplayProfilePicture(
        avatar,
        gender,
      )

      user_info.value.display_name = display_name
      user_info.value.description = description
      user_info.value.followings = followings.length
      user_info.value.followers = followers.length
      user_info.value.username = username
      user_info.value.creator_id = creator_id
      user_info.value.time = formattedTime
      user_info.value.date = formattedDate
      user_info.value.profile_picture_avatar = profile_picture_avatar

      return await fetchUsers()
    }

    // fetch data from store
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }

    //
    onBeforeMount(async () => await getUserDetails())

    //
    return {
      user_info,
      is_auth_user_a_follower,
      getUserDetails,
    }
  },
}
</script>

<style scoped></style>
