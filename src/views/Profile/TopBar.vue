<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 pt-6 pb-4 px-4"
  >
    <div class="flex-shrink-0">
      <span
        @click="router.back()"
        class="fa fa-arrow-left text-xl text-gray-700 hover:bg-archyhub-light hover:bg-opacity-80 px-4 py-3 cursor-pointer rounded-full"
      ></span>
    </div>

    <div class="flex-1 items-center px-2">
      <h4 class="text-xl block font-bold text-gray-600">
        {{
          user_profile_data.display_name === ''
            ? user_profile_data.username
            : user_profile_data.display_name
        }}
      </h4>
      <span
        class="text-base block italic cursor-pointer font-medium text-gray-500 truncate"
      >
        {{
          user_profile_data.no_of_posts === 0
            ? ` ${user_profile_data.no_of_posts} post`
            : ` ${user_profile_data.no_of_posts} posts`
        }}
      </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { fetchSingleUserByUsername } from '@/controller/api/users.api'
import { formatNumbers } from '@/controller/utilities'

export default {
  name: 'ProfileTopbar',
  setup() {
    const store = useStore()
    const route = useRoute()
    const scrollShadowBoolean = ref(true)
    const router = useRouter()
    const user_profile_data = ref({
      no_of_posts: 0,
      display_name: '',
      username: '',
    })
    const storeUsers = computed(() => store.state._requests.allUsers)

    const getUserProfileData = async () => {
      const { username } = route.params

      if (storeUsers.value && storeUsers.value.length < 1) await fetchUsers()

      storeUsers.value.forEach(async (eachUser: any) => {
        if (eachUser.username === username) {
          const {
            bio: { display_name },
            username,
            posts,
          } = eachUser

          console.log(eachUser)

          user_profile_data.value.no_of_posts = posts.length
          user_profile_data.value.display_name = display_name
          user_profile_data.value.username = username
        }
      })
    }

    async function fetchUsers() {
      if (storeUsers.value && storeUsers.value.length < 1)
        return await store.dispatch('_requests/getAllUsers')
    }

    const auth_user = computed(() => store.state.users.auth_user)
    window.addEventListener('scroll', () => handleScroll())

    onBeforeMount(async () => {
      handleScroll()
      await getUserProfileData()
    })

    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (scrollShadowBoolean.value) scrollShadowBoolean.value = false
      } else {
        // user is at top of page
        if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true
      }
    }

    return {
      scrollShadowBoolean,
      router,
      user_profile_data,
      auth_user,
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky h-16 pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
