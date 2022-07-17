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
            class="w-full h-full rounded-full object-fill"
            :src="
              user.profile_picture.avatar !== ''
                ? user.profile_picture.avatar
                : '@/assets/script.jpg'
            "
          />
        </span>

        <div v-if="user_profile_id === user.auth_user._id" class="mt-2">
          <router-link :to="`/profile/${user_profile_id}/edit`">
            <span
              class="py-1 inline-flex font-semibold bg-archyhub-gray text-gray-700 rounded-xl px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
            >
              Edit Profile
            </span>
          </router-link>
        </div>
      </div>

      <div class="flex-1 items-center px-2 mt-2 mb-2">
        <h4 class="text-2xl block font-bold text-gray-600">
          {{ user.bio.display_name ? user.bio.display_name : user.username }}
        </h4>
        <span class="text-base block cursor-pointer text-gray-500 truncate">
          @{{ user.username }}
        </span>
      </div>

      <p class="text-base font-medium my-1 px-2 text-gray-500">
        {{ user.bio.description }}
      </p>

      <p class="text-base mt-2 px-2">
        <span class="fa fa-calendar text-xl mr-2 text-gray-400"></span>
        <span class="text-gray-500">Joined August 2020</span>
      </p>

      <p class="flex items-center text-base mt-2 px-2 space-x-8">
        <span class="flex space-x-2">
          <span class="text-gray-600 font-bold">500</span>
          <span class="text-gray-500">Following</span>
        </span>

        <span class="flex space-x-2">
          <span class="text-gray-600 font-bold">500</span>
          <span class="text-gray-500">followers</span>
        </span>
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { fetchSingleUserByUsername } from '@/controller/api/users.api'
// import { UserSchema } from '@/controller/typings/index'

export default {
  name: 'ProfileHeader',
  // props: {
  //   username: {
  //     type: String,
  //     default: '',
  //   },
  // },
  setup(props: any) {
    const store = useStore()
    const route = useRoute()
    const user_profile_id: any = ref('')
    const user = computed(() => store.state.users.user)
    // const userD = ref<UserSchema>()

    onBeforeMount(async () => {
      const { username } = route.params

      const data = await getUserData(username)

      const { _id } = route.params

      user_profile_id.value = _id
    })

    const getUserData = async (username: string | string[]) => {
      const response = await fetchSingleUserByUsername(username)

      const { data, status, error } = response

      return data
    }

    return { user, user_profile_id }
  },
}
</script>
<style scoped></style>
