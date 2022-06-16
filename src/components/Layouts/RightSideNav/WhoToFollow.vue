<template>
  <section
    class="flex items-center border-2 rounded-2xl p-3 border-gray-200 inset-x-0 py-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-bold mb-6 px-2 text-gray-600">
        Who to Follow
      </h4>

      <div class="flex flex-col space-y-6">
        <div
          class="flex items -center space-x-4"
          :key="person_to_follow.username"
          v-for="person_to_follow in people_to_follow"
        >
          <div class="flex-shrink-0">
            <img
              class="w-16 h-16 rounded-full border border-gray-100"
              src="@/assets/script.jpg"
              alt="Neil image"
            />
          </div>

          <div class="flex-1 min-w-0">
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

            <p class="">
              {{
                is_more_description_boolean &&
                read_more_user_id == person_to_follow._id
                  ? person_to_follow.description.substring(0, 100)
                  : person_to_follow.description.substring(0, 75)
              }}
              <span
                @click="toggleDescriptionLength(person_to_follow._id)"
                class="py-1 pl-1 pr-3 font-semibold border-gray-200 cursor-pointer"
              >
                {{
                  is_more_description_boolean &&
                  read_more_user_id == person_to_follow._id
                    ? 'see less'
                    : 'see more'
                }}
              </span>
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
  name: 'WhoToFollow',
  setup() {
    const search_value = ref('')
    const is_more_description_boolean = ref(true)
    const read_more_user_id = ref('')

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
      people_to_follow,
      read_more_user_id,
      goToProfile,
      toggleDescriptionLength,
    }
  },
}
</script>

<style scoped></style>
