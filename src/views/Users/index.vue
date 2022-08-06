<template>
  <div class="w-full top-0 h-full z-4">
    <MainPageTopBarVue :page_title="topbar.title" :page_icon="topbar.icon" />

    <div class="mt-4 md:mt-6 xl:mt-10 pb-8">
      <div class="" v-if="storeUsers.length < 1">
        <div
          class="text-center py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-sm sm:rounded-md md:rounded-lg font-medium px-2 md:px-5 cursor-pointer mb-2 md:mb-3 text-gray-600"
        >
          <span>{{ is_loading ? '' : ' No user found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getUsers">
            <button
              class="text-archyhub-light bg-opacity-40 bg-archyhub-main text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl md:rounded-2xl font-medium py-1 md:py-2 px-3 sm:px-4 lg:px-6 cursor-pointer"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'Reload' }}</span>

                <svg
                  v-if="is_loading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 sm:h-6 sm:w-6 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>

        <div class="" v-for="x in 10" :key="x">
          <AnimatedUserVue />
        </div>
      </div>

      <div v-else>
        <div class="hidden text-center mb-8">
          <form @submit.prevent="getUsers">
            <button
              class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'More Scholarship' }}</span>

                <svg
                  v-if="is_loading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>

        <div v-for="(eachUser, index) in storeUsers" :key="index">
          <UserContentVue :eachUser="eachUser" />
        </div>

        <!-- <div
          v-for="(eachSortedUserByMostFollowings,
          index) in sorted_user_by_no_of_followings"
          :key="index"
        >
          <UserContentVue :eachUser="eachSortedUserByMostFollowings" />
        </div> -->
        <!-- <div
          v-for="(eachSortedUserByMostFollowers, index) in sorted_user_by_no_of_followers"
          :key="index"
        >
          <UserContentVue :eachUser="eachSortedUserByMostFollowers" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import MainPageTopBarVue from '@/components/Layouts/MainPageTopBar.vue'
import UserContentVue from '@/components/Users/UserContent.vue'
import AnimatedUserVue from '@/components/Animation/AnimatedUser.vue'
import { UserSchema } from '@/controller/typings/index'

export default {
  name: 'Users',
  components: {
    MainPageTopBarVue,
    UserContentVue,
    AnimatedUserVue,
  },
  setup() {
    const store = useStore()
    const is_loading = ref(false)
    const topbar = ref({ title: 'Users', icon: 'fas fa-users' })
    const storeUsers = computed(() => store.state._requests.allUsers)
    const auth_user = computed(() => store.state.users.auth_user)
    const sorted_user_by_no_of_followers = ref<UserSchema[]>([])
    const sorted_user_by_no_of_followings = ref<UserSchema[]>([])

    const getUsers = async () => {
      is_loading.value = true

      if (storeUsers.value && storeUsers.value.length < 1) await fetchUsers()

      sorted_user_by_no_of_followers.value = []
      sorted_user_by_no_of_followings.value = []

      const sortedByMostFollowers = storeUsers.value.sort(
        (user_1: any, user_2: any) => {
          return user_2.followers.length - user_1.followers.length
        },
      )
      const sortedByMostFollowings = storeUsers.value.sort(
        (user_1: any, user_2: any) => {
          return user_2.followings.length - user_1.followings.length
        },
      )

      //
      sortedByMostFollowers.forEach(async (more_followers_user: any) => {
        sorted_user_by_no_of_followers.value.push(more_followers_user)
      })

      //
      sortedByMostFollowings.forEach(async (more_followings_user: any) => {
        sorted_user_by_no_of_followings.value.push(more_followings_user)
      })

      is_loading.value = false
      await fetchUsers()
    }

    //
    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }

    // fetch data from store
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchAuthUser() {
      await store.dispatch('users/getAuthUser', auth_user.value._id)
    }

    onBeforeMount(async () => {
      await fetchAuthUser()
      await getUsers()
      scrollToTop()
    })

    return {
      storeUsers,
      is_loading,
      topbar,
      sorted_user_by_no_of_followers,
      sorted_user_by_no_of_followings,
      getUsers,
    }
  },
}
</script>

<style lang=""></style>
