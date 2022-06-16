<template>
  <section class="flex items-center rounded-2xl px-4 mt-10">
    <div class="w-full">
      <router-link to="/profile">
        <div class="mb-16 flex items-center cursor-pointer">
          <img
            class="w-16 h-16 rounded-full border border-archyhub-semi-light"
            src="@/assets/script.jpg"
          />

          <div class="flex-1 ml-2">
            <span class="text-xl block font-semibold text-gray-700 truncate">
              Dasaolu Daniel
            </span>
            <span class="text-sm block font-semibold text-gray-600 truncate">
              @ArchyScript
            </span>
          </div>
        </div>
      </router-link>

      <div class="flex flex-col space-y-2 mb-10">
        <div
          class="cursor-pointer text-gray-500 hover:bg-archyhub-semi-light hover:text-gray-700 font-bold rounded-3xl"
          :key="navbar_link.title"
          v-for="navbar_link in navbar_links"
        >
          <router-link :to="navbar_link.route">
            <div class="mb-1 flex justify-center items-center py-4 space-x-2">
              <span :class="navbar_link.icon" class="ml-4 px-2 text-2xl"></span>

              <span class="flex-1 text-xl">{{ navbar_link.title }}</span>
            </div>
          </router-link>
        </div>
      </div>

      <div class="w-full text-center mb-10">
        <button
          class="w-full text-xl text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-3xl py-4 px-6"
        >
          Create Post
          <span class="fa fa-retweet"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'NavLinks',
  setup() {
    const search_value = ref('')
    const is_more_description_boolean = ref(true)
    const read_more_user_id = ref('')
    // get the current route
    const route = useRoute()

    onMounted(() => {
      console.log(route.params)
    })

    const navbar_links = ref([
      {
        route: '/',
        title: 'Home',
        icon: 'fa fa-home',
      },
      {
        route: '/explore',
        title: 'Explore',
        icon: 'fa fa-home',
      },
      {
        route: '/notifications',
        title: 'Notifications',
        icon: 'fa fa-bell',
      },
      {
        route: '/competitions',
        title: 'Competitions',
        icon: 'fa fa-bell',
      },
      {
        route: '/profile',
        title: 'Profile',
        icon: 'fa fa-user',
      },
      {
        route: '/more',
        title: 'More',
        icon: 'fa fa-user',
      },
    ])

    const viewNewsUpdateDetails = (user_id: string) => {
      console.log(user_id)
    }

    const toggleDescriptionLength = (user_id: string) => {
      if (read_more_user_id.value === user_id) {
        is_more_description_boolean.value = false
        return (read_more_user_id.value = '')
      }

      is_more_description_boolean.value = true
      read_more_user_id.value = user_id
      console.log(user_id)
    }

    return {
      search_value,
      is_more_description_boolean,
      navbar_links,
      read_more_user_id,
      viewNewsUpdateDetails,
      toggleDescriptionLength,
    }
  },
}
</script>

<style scoped></style>
