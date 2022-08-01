<template>
  <div class="w-full top-0 h-full bg-archyhub -semi-light z-4">
    <div class="mt-10 pb-8">
      <div class="" v-if="userCommunities.length < 1">
        <div class="text-center font-medium mb-6">
          <span>{{ is_loading ? '' : ' No user found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getUserCommunities">
            <button
              class="text-md text-archyhub-semi-light bg-opacity-40 bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'Reload' }}</span>

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

        <div class="" v-for="x in 10" :key="x">
          <AnimatedUserVue />
        </div>
      </div>

      <div v-else>
        <div class="hidden text-center mb-8">
          <form @submit.prevent="getUserCommunities">
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

        <div
          v-for="(eachUserInUserCommunity, index) in userCommunities"
          :key="index"
        >
          <UserContentVue :eachUser="eachUserInUserCommunity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import AnimatedUserVue from '@/components/Animation/AnimatedUser.vue'
import { useRoute } from 'vue-router'
import UserContentVue from '@/components/Users/UserContent.vue'
import { UserSchema } from '@/controller/typings'

export default {
  name: 'Scholarships',
  components: {
    UserContentVue,
    AnimatedUserVue,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const topbar = ref({ title: 'Users', icon: 'fas fa-users' })
    const storeUsers = computed(() => store.state._requests.allUsers)
    const userCommunities = ref<UserSchema[]>([])
    const auth_user = computed(() => store.state.users.auth_user)
    const open_new_post_modal = computed(
      () => store.state.component_handler.open_new_post_modal,
    )
    const open_new_comment_modal = computed(
      () => store.state.component_handler.open_new_comment_modal,
    )

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const getUserCommunities = async () => {
      const { username, followers_or_followings } = route.params

      is_loading.value = true
      updateResponseMessage('', '')

      const userFollowers: any = []
      const userFollowings: any = []
      //
      if (storeUsers.value && storeUsers.value.length < 1) await fetchUsers()

      await storeUsers.value.forEach(async (eachUser: any) => {
        if (eachUser.username === username) {
          const { followers, followings } = eachUser

          console.log(eachUser)

          if (followers_or_followings === 'followers') {
            await followers.forEach(async (follower: any) => {
              await storeUsers.value.forEach((user: any) => {
                if (follower.follower_id === user._id) {
                  userFollowers.push(user)
                }
              })
            })

            userCommunities.value = await userFollowers
          }

          if (followers_or_followings === 'followings') {
            await followings.forEach(async (following: any) => {
              await storeUsers.value.forEach((user: any) => {
                if (following.following_id === user._id) {
                  userFollowings.push(user)
                }
              })
            })

            userCommunities.value = userFollowings
          }
        }
      })
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
      await getUserCommunities()
      await fetchAuthUser()
      await fetchUsers()
      getUserCommunities()
      scrollToTop()
    })

    return {
      storeUsers,
      auth_user,
      is_loading,
      message,
      topbar,
      userCommunities,
      getUserCommunities,
    }
  },
}
</script>

<style lang=""></style>
