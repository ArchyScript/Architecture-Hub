<template>
  <section
    class="flex items-center border rounded-2xl border-gray-200 inset-x-0 pt-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-semibold mb-4 px-6 text-gray-600">
        Latest News
      </h4>

      <div class="flex flex-col space-y-6">
        <div
          class="flex items -center space-x-4 shadow-sm px-4 py-2"
          :key="each_latest_news_update.category"
          v-for="each_latest_news_update in latest_news_updates"
        >
          <div class="flex-1 w-full">
            <div class="mb-1 flex items-center">
              <span
                class="flex-1 text-sm block text-gray-500 truncate font-medium italic dark:text-gray-400"
              >
                {{ each_latest_news_update.category }}
                <span class="btn py-1 rounded-lg px-2 border bg-green-200">
                  new
                </span>
              </span>

              <span
                class="btn py-1 italic text-gray-700 rounded-lg px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                @click="viewNewsUpdateDetails(each_latest_news_update._id)"
              >
                more details
              </span>
            </div>

            <div class="flex-1 truncate mr-4">
              <span
                class="text-lg block font-medium text-gray-900 truncate text-ellipsis dark:text-white"
              >
                {{ each_latest_news_update.title }}
              </span>
            </div>

            <p class="">
              <!-- @click="toggleDescriptionLength(each_latest_news_update._id)" -->
              {{
                is_more_description_boolean &&
                read_more_user_id == each_latest_news_update._id
                  ? each_latest_news_update.description.substring(0, 100)
                  : each_latest_news_update.description.substring(0, 75)
              }}
              <span
                @click="toggleDescriptionLength(each_latest_news_update._id)"
                class="py-1 pl-1 pr-3 font-semibold text-gray-700 border-gray-200 cursor-pointer"
              >
                {{
                  is_more_description_boolean &&
                  read_more_user_id == each_latest_news_update._id
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
  name: 'LatestNews',
  setup() {
    const search_value = ref('')
    const is_more_description_boolean = ref(true)
    const read_more_user_id = ref('')

    const latest_news_updates = ref([
      {
        _id: 'badjnfajafjakaj',
        category: 'Scholarship',
        title:
          'Architecture Digest Architecture Digest Architecture Digest Architecture Digest ',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt molestias corrupti cumque, deleniti delectus culpa repudiandae tempora`,
      },
      {
        _id: 'nslijiilwervwrweh',
        category: 'Competition',
        title: 'Ooni of Tech',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt molestias corrupti cumque, deleniti delectus culpa repudiandae tempora`,
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
      latest_news_updates,
      read_more_user_id,
      viewNewsUpdateDetails,
      toggleDescriptionLength,
    }
  },
}
</script>

<style scoped></style>
