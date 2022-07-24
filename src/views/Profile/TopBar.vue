<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 pt-6 pb-4 px-4"
  >
    <div class="flex-shrink-0">
      <span
        @click="router.go(-1)"
        class="fa fa-arrow-left text-xl text-gray-700 hover:bg-archyhub-light hover:bg-opacity-80 px-4 py-3 cursor-pointer rounded-full"
      ></span>
    </div>

    <div class="flex-1 items-center px-2">
      <h4 class="text-xl block font-bold text-gray-600">
        Dasolu Daniel
        {{
          user_data.display_name === ''
            ? user_data.username
            : user_data.display_name
        }}
      </h4>
      <span
        class="text-base block italic cursor-pointer font-medium text-gray-500 truncate"
      >
        {{
          auth_user.posts.length === 0
            ? ` ${auth_user.posts.length} post`
            : ` ${auth_user.posts.length} posts`
        }}
      </span>
    </div>
  </nav>
</template>

<script>
import { onBeforeMount, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { fetchSingleUserByUsername } from '@/controller/api/users.api'

export default {
  name: 'ProfileTopbar',
  setup() {
    const store = useStore()
    const scrollShadowBoolean = ref(true)
    const router = useRouter()
    const user_data = ref({
      no_of_posts: 0,
      display_name: '',
      username: '',
    })
    const auth_user = computed(() => store.state.users.auth_user)

    onBeforeMount(async () => {
      handleScroll()
      window.addEventListener('scroll', () => handleScroll())
    })

    // const getUserData = async (username: any) => {
    //   const response = await fetchSingleUserByUsername(username)
    //   const { data, status, error } = response

    //   if (error || status === 400 || !data || typeof data === 'string')
    //     return router.push(`/profile/${username}`)
    // }

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
      user_data,
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
