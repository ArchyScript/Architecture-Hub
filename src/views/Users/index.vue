<template>
  <div class="w-full top-0 h-full z-4">
    <MainPageTopBarVue :page_title="topbar.title" :page_icon="topbar.icon" />

    <div class="mt-10 pb-8">
      <div class="" v-if="storeUsers.length < 1">
        <div
          class="text-xs sm:text-sm lg:text-base rounded-lg md:rounded-xl text-archyhub-semi-light bg-opacity-40 bg-archyhub-main hover:text-archyhub-light font-normal py-2 px-6 mb-6"
        >
          <span>{{ is_loading ? '' : ' No user found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getUsers">
            <button
              class="text-xs sm:text-sm lg:text-base rounded-lg md:rounded-xl text-archyhub-semi-light bg-opacity-40 bg-archyhub-main hover:text-archyhub-light font-normal py-2 px-6"
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
  name: 'Scholarships',
  components: {
    MainPageTopBarVue,
    UserContentVue,
    AnimatedUserVue,
  },
  setup() {
    const store = useStore()
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const topbar = ref({ title: 'Users', icon: 'fas fa-users' })
    // const storeUsers = computed(
    //   () => store.state._requests.allScholarships,
    // )
    const storeUsers = computed(() => store.state._requests.allUsers)

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

    const getUsers = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      //
      if (storeUsers.value && storeUsers.value.length < 1) await fetchUsers()

      if (!storeUsers.value) {
        is_loading.value = false
        updateResponseMessage(
          'error',
          'Sorry, an unknown error occurred... Check connection',
        )

        return setTimeout(() => {
          is_loading.value = false
          return updateResponseMessage('', '')
        }, 5000)
      }

      updateResponseMessage('success', '')
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
      await fetchUsers()
      // await fetchUsers()
      await fetchAuthUser()
      await getUsers()
      scrollToTop()
    })

    return {
      storeUsers,
      is_loading,
      message,
      topbar,
      auth_user,
      getUsers,
    }
  },
}
</script>

<style lang=""></style>
