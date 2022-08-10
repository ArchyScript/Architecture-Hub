<template>
  <nav
    @mouseover="getUserProfileData()"
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 py-3 sm:py-4 px-2 sm:px-4"
  >
    <div class="flex-shrink-0">
      <span
        @click="router.back()"
        class="fa fa-arrow-left text-base lg:text-lg text-gray-600 hover:bg-archyhub-light hover:bg-opacity-70 px-4 py-3 cursor-pointer rounded-full"
      ></span>
    </div>

    <div class="flex-1 items-center px-2">
      <h4 class="text-base md:text-lg block font-semibold text-gray-600">
        {{
          user_profile_data.display_name === ''
            ? user_profile_data.username
            : user_profile_data.display_name
        }}
      </h4>
      <span
        class="text-sm lg:text-base block italic cursor-pointer font-normal text-gray-500 truncate"
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
import { formatNumbers } from '@/controller/utilities'

export default {
  name: 'ProfileTopbar',
  setup() {
    const store = useStore()
    const route = useRoute()
    const scrollShadowBoolean = ref(true)
    const router = useRouter()
    const storeUsers = computed(() => store.state._requests.allUsers)
    const user_profile_data = ref({
      no_of_posts: 0,
      display_name: '',
      username: '',
    })

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

          const no_of_posts = await formatNumbers(+posts.length)

          user_profile_data.value.no_of_posts = no_of_posts
          user_profile_data.value.display_name = display_name
          user_profile_data.value.username = username
        }
      })
    }

    async function fetchUsers() {
      return await store.dispatch('_requests/getAllUsers')
    }

    window.addEventListener('scroll', () => handleScroll())

    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (scrollShadowBoolean.value) scrollShadowBoolean.value = false
      } else {
        // user is at top of page
        if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true
      }
    }

    onBeforeMount(async () => {
      handleScroll()
      await getUserProfileData()
    })

    return {
      scrollShadowBoolean,
      router,
      user_profile_data,
      getUserProfileData,
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky h-12 sm:h-14 md:h-16  pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
