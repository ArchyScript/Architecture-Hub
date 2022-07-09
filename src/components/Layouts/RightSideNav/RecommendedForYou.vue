<template>
  <section
    class="flex items-center border rounded-2xl p-3 border-gray-200 inset-x-0 py-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-semibold mb-6 px-2 text-gray-600">
        Recommended for You
      </h4>

      <div class="flex flex-col space-y-6">
        <div
          class="flex items -center space-x-4"
          :key="person_to_follow._id"
          v-for="person_to_follow in people_to_follow"
        >
          <div class="flex-shrink-0">
            <img
              class="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-100"
              src="@/assets/script.jpg"
              :alt="person_to_follow.display_name"
            />
          </div>

          <div class="flex-1">
            <div class="mb-1 flex items-center">
              <div class="flex-1">
                <span
                  class="text-lg block font-medium text-gray-900 truncate dark:text-white"
                >
                  {{ person_to_follow.display_name }}
                </span>
                <span
                  class="text-sm block text-gray-500 truncate dark:text-gray-400"
                >
                  {{ `@${person_to_follow.username}` }}
                </span>
              </div>

              <span
                class="btn py-1 rounded-lg px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                @click="goToProfile(person_to_follow._id)"
              >
                follow
              </span>
            </div>

            <p class="text-gray-400 font-normal italic items-center text-sm">
              <span>promoted</span>
              <span class="fa fa-edit ml-2"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'RecommendedForYou',
  setup() {
    const people_to_follow = ref([
      {
        _id: 'badjnfajafjakaj',
        display_name: 'Dasaolu Daniel',
        username: 'ArchyScript',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt molestias corrupti cumque, deleniti delectus culpa repudiandae tempora`,
      },
      {
        _id: 'nslijiilwervwrweh',
        display_name: 'Ooni of Tech',
        username: 'Scriptocurrency',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt molestias corrupti cumque, deleniti delectus culpa repudiandae tempora`,
      },
    ])

    const goToProfile = (user_id: string) => {
      console.log(user_id)
    }

    return {
      people_to_follow,
      goToProfile,
    }
  },
}
</script>

<style scoped></style>
