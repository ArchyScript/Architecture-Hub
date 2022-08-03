<template>
  <nav
    :class="{ scrolled: !scrollShadowBoolean }"
    class="flex items-center top-0 inset-x-0 py-3 sm:py-4 px-2 sm:px-4"
  >
    <div class="flex-shrink-0">
      <span
        @click="router.back()"
        class="fa fa-arrow-left text-base lg:text-lg text-gray-600 hover:bg-archyhub-light hover:bg-opacity-70 px-4 py-3 cursor-pointer rounded-full"
      ></span>
    </div>

    <div v-if="!is_topbar_for_details" class="flex-1 items-center px-2">
      <h4 class="text-base md:text-lg block font-medium text-gray-600">
        {{
          profile_data.display_name === ''
            ? `@${profile_data.username}`
            : `${profile_data.display_name} (@${profile_data.username})`
        }}
      </h4>
      <span
        class="text-sm lg:text-base block italic cursor-pointer font-normal text-gray-500 truncate"
      >
        {{ profile_data.no_of_followers_or_followings }}
      </span>
    </div>

    <div v-if="is_topbar_for_details" class="flex-1 items-center px-2">
      <h4 class="text-base md:text-lg block font-medium text-gray-600">
        Back to {{ detail_title }}
      </h4>
    </div>
  </nav>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { formatNumbers } from '@/controller/utilities'

export default {
  name: 'CompetitionDetailsTopbar',
  setup() {
    const store = useStore()
    const route = useRoute()
    const scrollShadowBoolean = ref(true)
    const router = useRouter()
    const profile_data = ref({
      no_of_followers_or_followings: '',
      display_name: '',
      username: '',
    })
    const storeUsers = computed(() => store.state._requests.allUsers)
    const is_topbar_for_details = ref(true)
    const detail_title = ref('')

    const getUserProfileData = async () => {
      const {
        username,
        followers_or_followings,
        post_id,
        competition_id,
        scholarship_id,
      } = route.params

      if (username && followers_or_followings) {
        is_topbar_for_details.value = false

        if (storeUsers.value && storeUsers.value.length < 1) await fetchUsers()

        storeUsers.value.forEach(async (eachUser: any) => {
          if (eachUser.username === username) {
            const {
              bio: { display_name },
              username,
              followers,
              followings,
            } = eachUser

            let no_of_followers_or_followings = ''

            if (followers_or_followings === 'followers') {
              let no_of_follower = await formatNumbers(+followers.length)

              no_of_followers_or_followings =
                no_of_follower <= 1
                  ? `${no_of_follower} follower`
                  : `${no_of_follower} followers`
            } else {
              let no_of_followings = await formatNumbers(+followings.length)

              no_of_followers_or_followings =
                no_of_followings <= 1
                  ? `${no_of_followings} following`
                  : `${no_of_followings} followings`
            }

            profile_data.value.no_of_followers_or_followings = no_of_followers_or_followings
            profile_data.value.display_name = display_name
            profile_data.value.username = username
          }
        })
      } else {
        is_topbar_for_details.value = true

        if (post_id) return (detail_title.value = 'Posts')
        if (competition_id) return (detail_title.value = 'Competitions')
        if (scholarship_id) return (detail_title.value = 'Scholarships')
      }
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
      profile_data,
      is_topbar_for_details,
      detail_title,
    }
  },
}
</script>
<style scoped>
nav.scrolled {
  @apply sticky h-12 sm:h-14 md:h-16  pt-0 pb-0 bg-gradient-to-r from-archyhub-semi-light to-archyhub-light  shadow-md;
}
</style>
