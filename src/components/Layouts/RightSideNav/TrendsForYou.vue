<template>
  <section
    class="flex items-center border-2 rounded-2xl border-gray-200 inset-x-0 py-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-bold mb-6 px-6 text-gray-700">
        Trends for You
      </h4>

      <div>
        <!-- less trending topic -->
        <section class="flex flex-col space-y-4" v-if="!is_more_trends_boolean">
          <div
            class="flex shadow-sm px-4 rounded-md"
            :key="trend._id"
            v-for="(trend, index) in trends"
          >
            <div
              class="mb-1 flex flex-1 px-2"
              v-if="index <= min_num_of_trend_topics"
            >
              <div class="flex-1">
                <span
                  class="text-sm block text-gray-500 truncate font-medium italic dark:text-gray-400"
                >
                  {{ trend.category }} Trending
                </span>
                <span
                  class="text-lg block font-bold text-gray-700 truncate dark:text-white"
                >
                  {{ trend.trend_topic }}
                </span>
                <span
                  class="text-sm block text-gray-500 truncate dark:text-gray-400"
                >
                  {{ numFormatter(trend.total_number) }}
                  <span class="text-sm italic">Tweets</span>
                </span>
              </div>

              <p class="text-gray-400 font-normal italic items-center text-sm">
                <span class="fa fa-ellipsis-h text-xl ml-2"></span>
              </p>
            </div>
          </div>
        </section>

        <!-- all trending topic -->
        <section class="flex flex-col space-y-4" v-if="is_more_trends_boolean">
          <div
            class="flex shadow-sm px-4 rounded-md"
            :key="trend._id"
            v-for="trend in trends"
          >
            <div class="mb-1 flex flex-1 px-2">
              <div class="flex-1">
                <span
                  class="text-sm block text-gray-500 truncate font-medium italic dark:text-gray-400"
                >
                  {{ trend.category }} Trending
                </span>
                <span
                  class="text-lg block font-bold text-gray-700 truncate dark:text-white"
                >
                  {{ trend.trend_topic }}
                </span>
                <span
                  class="text-sm block text-gray-500 truncate dark:text-gray-400"
                >
                  {{ numFormatter(trend.total_number) }}
                  <span class="text-sm italic">Tweets</span>
                </span>
              </div>

              <p class="text-gray-400 font-normal italic items-center text-sm">
                <span class="fa fa-ellipsis-h text-xl ml-2"></span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <p class="mt-6 flex">
        <span
          @click="is_more_trends_boolean = !is_more_trends_boolean"
          class="text-center w-full text-lg text-gray-600 hover:text-gray-800 font-semibold cursor-pointer"
        >
          {{ is_more_trends_boolean ? 'see less' : 'see all' }}
        </span>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'WhoToFollow',
  setup() {
    const search_value = ref('')
    const is_more_trends_boolean = ref(false)
    const min_num_of_trend_topics = ref(4)

    const trends = ref([
      {
        _id: 'badjnfajafjakaj',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 2338988293343,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'badjnfajkkafjakaj',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 2339930823802343,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'kjeowpriewnrwe',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 233343,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'eoriulejekm',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 233343,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'ejdniskalajka',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 2333943,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'eyrelkhskhhs',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 293,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'sdgshijkananna',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 28943,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'uekekknbsjbsdjk',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 233768343,
        categories: ['laptop', 'web dev'],
      },
      {
        _id: 'anmwopqmnnjaj',
        category: 'Music',
        trend_topic: 'Macbook',
        total_number: 287933343,
        categories: ['laptop', 'web dev'],
      },
    ])

    const goToProfile = (user_id: string) => {
      console.log(user_id)
    }

    const numFormatter = (number_of_tweet: number) => {
      if (number_of_tweet > 999 && number_of_tweet < 1000000) {
        // convert to K for number from > 1000 < 1 million
        return (number_of_tweet / 1000).toFixed(1) + 'K'
      } else if (number_of_tweet > 1000000 && number_of_tweet < 1000000000) {
        // convert to M for number from > 1 million
        return (number_of_tweet / 1000000).toFixed(1) + 'M'
      } else if (
        number_of_tweet > 1000000000 &&
        number_of_tweet < 1000000000000
      ) {
        // convert to M for number from > 1 million
        return (number_of_tweet / 1000000000).toFixed(1) + 'B'
      } else if (number_of_tweet > 1000000000000) {
        // convert to M for number from > 1 million
        return (number_of_tweet / 1000000000000).toFixed(1) + 'T'
      } else if (number_of_tweet < 900) {
        // if value < 1000, nothing to do
        return number_of_tweet
      }
    }

    return {
      search_value,
      is_more_trends_boolean,
      trends,
      min_num_of_trend_topics,
      goToProfile,
      numFormatter,
    }
  },
}
</script>

<style scoped></style>
