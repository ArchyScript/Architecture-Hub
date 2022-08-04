<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div
      class="h-36 sm:h-44 lg:h-52 w-full flex justify-center items-center opac ity-60"
    >
      <span
        class="h-full w-full block bg-archyhub-main border bg-opacity-30"
      ></span>
    </div>

    <div class="px-2 sm:px-6">
      <div class="flex justify-between">
        <span
          class="h-20 w-20 sm:w-24 sm:h-24 md:h-28 md:w-28 xl:h-32 xl:w-32 -mt-10 sm:-mt-12 md:-mt-14 xl:-mt-16 p-1 rounded-full block bg-archyhub-semi-light bg-opacity-30"
        >
          <img
            v-if="auth_user_profile.profile_picture !== ''"
            class="w-full h-full rounded-full object-fill"
            :src="auth_user_profile.profile_picture"
          />

          <div
            v-if="auth_user_profile.profile_picture === ''"
            class="w-full h-full bg-gray-400 rounded-full animate-pulse"
          ></div>
        </span>
      </div>

      <div class="">
        <div v-if="auth_user.username === ''" class="flex-1 animate-pulse my-4">
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

        <div class="" v-if="auth_user_profile.username !== ''">
          <div class="fl ex-1 items-center px-2 mt-2 mb-2">
            <h4
              class="text-base sm:text-lg lg:text-xl block font-semibold text-gray-600"
            >
              {{
                auth_user_profile.display_name !== ''
                  ? auth_user_profile.display_name
                  : auth_user_profile.username
              }}
            </h4>
            <span
              class="text-sm sm:text-base block cursor-pointer text-gray-500 truncate"
            >
              @{{ auth_user_profile.username }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities'

export default {
  name: 'EditProfileHeader',
  setup() {
    const store = useStore()
    const route = useRoute()
    const username = ref('')
    const auth_user = computed(() => store.state.users.auth_user)
    const storeUsers = computed(() => store.state._requests.allUsers)
    const auth_user_profile = ref({
      _id: '',
      display_name: '',
      username: '',
      profile_picture: '',
    })

    const getUserData = async (username: any) => {
      if (storeUsers.value.length < 1) await fetchUsers()

      storeUsers.value.forEach(async (eachUser: any) => {
        if (eachUser.username === username) {
          const {
            _id,
            bio: { display_name, gender },
            profile_picture: { avatar },
          } = await eachUser

          const profile_picture = await getDisplayProfilePicture(avatar, gender)

          auth_user_profile.value._id = _id
          auth_user_profile.value.display_name = display_name
          auth_user_profile.value.username = username
          auth_user_profile.value.profile_picture = profile_picture
        }
      })
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }

    onBeforeMount(async () => {
      const username = route.params.username

      await getUserData(username)
    })

    return {
      username,
      auth_user,
      auth_user_profile,
    }
  },
}
</script>
<style scoped></style>
