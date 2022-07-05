<template>
  <section class="flex items-center rounded-2xl px-4 mt-10">
    <div class="w-full">
      <router-link :to="`/profile/${user.auth_user._id}`">
        <div class="mb-16 flex items-center cursor-pointer">
          <img
            class="w-16 h-16 rounded-full border border-archyhub-semi-light"
            :src="user.profile_picture ? user.profile_picture.avatar : ''"
          />

          <div class="flex-1 ml-2">
            <span class="text-xl block font-semibold text-gray-700 truncate">
              {{ user.bio.display_name ? user.bio.display_name : '...' }}
            </span>
            <span class="text-sm block font-semibold text-gray-600 truncate">
              @{{ user.auth_user.username }}
            </span>
          </div>
        </div>
      </router-link>

      <div class="flex flex-col space-y-2 mb-10">
        <div
          :key="navbar_link.title"
          v-for="navbar_link in navbar_links"
          class="cursor-pointer text-gray-500 hover:bg-archyhub-semi-light hover:text-gray-700 font-bold rounded-3xl"
          :class="
            current_active_route === navbar_link.route
              ? 'bg-archyhub-semi-light text-gray-700'
              : 'hover:bg-opacity-60'
          "
          @click="toggleCurrentActiveNavLink(navbar_link.route)"
        >
          <!-- @click="toggleCurrentActiveNavLink(navbar_link.route)" -->
          <router-link
            :to="
              navbar_link.route === '/profile'
                ? `${navbar_link.route}/${user.auth_user._id}`
                : `${navbar_link.route}`
            "
          >
            <div class="mb-1 flex justify-center items-center py-4 space-x-2">
              <span :class="navbar_link.icon" class="ml-4 px-2 text-2xl"></span>

              <span class="flex-1 text-xl">{{ navbar_link.title }}</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- <img :src="image" alt="" /> -->

      <!-- <div class="flex flex-col space-y-2 mb-10">
        <div
          :key="navbar_link.title"
          v-for="navbar_link in navbar_links"
          class="cursor-pointer text-gray-500 hover:bg-archyhub-semi-light hover:text-gray-700 font-bold rounded-3xl"
          :class="
            current_active_route === navbar_link.title
              ? 'bg-archyhub-semi-light text-gray-700'
              : 'hover:bg-opacity-60'
          "
          @click="toggleCurrentActiveNavLink(navbar_link.title)"
        >
          <router-link :to="navbar_link.route">
            <div class="mb-1 flex justify-center items-center py-4 space-x-2">
              <span :class="navbar_link.icon" class="ml-4 px-2 text-2xl"></span>

              <span class="flex-1 text-xl">{{ navbar_link.title }}</span>
            </div>
          </router-link>
        </div>
      </div> -->

      <div class="w-full text-center mb-10">
        <router-link to="/home">
          <button
            class="w-full text-xl text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-3xl py-4 px-6"
          >
            Create Post
            <span class="fa fa-retweet"></span>
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'NavLinks',
  setup() {
    const search_value = ref('')
    const is_more_description_boolean = ref(true)
    const read_more_user_id = ref('')
    const current_active_route = ref('/home')
    const store = useStore()
    const route = useRoute()

    onBeforeMount(() => {
      current_active_route.value = route.fullPath
    })

    const user = computed(() => {
      return store.state.users.user
    })

    const navbar_links = ref([
      {
        route: '/home',
        title: 'Home',
        icon: 'fa fa-home',
      },
      // {
      //   route: '/explore',
      //   title: 'Explore',
      //   icon: 'fa fa-home',
      // },
      // {
      //   route: '/notifications',
      //   title: 'Notifications',
      //   icon: 'fa fa-bell',
      // },
      {
        route: '/competitions',
        title: 'Competitions',
        icon: 'fa fa-trophy',
      },
      {
        route: `/profile`,
        title: 'Profile',
        icon: 'fa fa-user',
      },
      // {
      //   route: '/more',
      //   title: 'More',
      //   icon: 'fa fa-ellipsis-h',
      // },
    ])

    const toggleCurrentActiveNavLink = (active_link_route: string) => {
      current_active_route.value = active_link_route
    }

    const toggleDescriptionLength = (user_id: string) => {
      if (read_more_user_id.value === user_id) {
        is_more_description_boolean.value = false
        return (read_more_user_id.value = '')
      }

      is_more_description_boolean.value = true
      read_more_user_id.value = user_id
    }

    return {
      search_value,
      is_more_description_boolean,
      navbar_links,
      read_more_user_id,
      current_active_route,
      route,
      user,
      toggleDescriptionLength,
      toggleCurrentActiveNavLink,
    }
  },
}
</script>

<style scoped></style>
