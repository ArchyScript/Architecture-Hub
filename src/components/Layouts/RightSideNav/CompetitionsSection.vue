<template>
  <section
    class="flex items-center border rounded-2xl border-gray-200 inset-x-0 pt-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-semibold mb-4 px-6 text-gray-600">
        Latest Competitions
      </h4>

      <div v-if="competitions.length < 1">
        <div v-for="x in 3" :key="x">
          <AnimatedLatestVue />
        </div>
      </div>

      <div class="flex flex-col space-y-6" v-if="competitions.length >= 1">
        <div
          class="flex items -center space-x-4 shadow-sm px-4 py-2"
          :key="competition.category"
          v-for="competition in competitions"
        >
          <div class="flex-1 w-full">
            <div class="mb-1 flex items-center">
              <span
                class="flex-1 text-sm block text-gray-500 truncate font-medium italic dark:text-gray-400"
              >
                competition
                <span class="btn py-1 rounded-lg px-2 border bg-green-200">
                  new
                </span>
              </span>

              <router-link :to="`/competitions/${competition._id}`">
                <span
                  class="btn py-1 italic text-gray-700 rounded-lg px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                  @click="viewNewsUpdateDetails(competition._id)"
                >
                  more details
                </span>
              </router-link>
            </div>

            <div class="flex-1 truncate mr-4">
              <span
                class="text-lg block font-medium text-gray-900 truncate text-ellipsis dark:text-white"
              >
                {{ competition.title }}
              </span>
            </div>

            <p class="">
              {{
                is_more_description_boolean &&
                read_more_user_id == competition._id
                  ? competition.content.substring(0, 100)
                  : competition.content.substring(0, 75)
              }}
              <span
                @click="toggleDescriptionLength(competition._id)"
                class="py-1 pl-1 pr-3 font-semibold text-gray-700 border-gray-200 cursor-pointer"
              >
                {{
                  is_more_description_boolean &&
                  read_more_user_id == competition._id
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
import { onBeforeMount, ref } from 'vue'
import AnimatedLatestVue from '@/components/Animation/AnimatedLatest.vue'
import { fetchAllCompetitions } from '@/controller/api/competitons'
// import { default_images } from '@/controller/utils'
// import { fetchSingleUserById } from '@/controller/api/users.api'

type CompetitonSchema =
  | {
      _id: any
      // competition_image: string
      creator_id: any
      content: string
      title: string
    }
  | any

export default {
  name: 'LatestCompetitions',
  components: { AnimatedLatestVue },
  setup() {
    const competitions = ref<CompetitonSchema[]>([])
    const is_more_description_boolean = ref(true)
    const read_more_user_id = ref('')

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

    const getCompetitions = async () => {
      const response = await fetchAllCompetitions()
      const { error, data, status } = response

      if (error || status === 400 || !data || typeof data === 'string') return

      console.log(data)

      data.forEach(async (competition: any, index: number) => {
        if (index <= 1) {
          const { _id, creator_id, content, title } = competition

          // competition_image: { avatar },
          // let competition_image = ''

          // const getUser = async () => {
          //   const user = await fetchSingleUserById(creator_id)
          //   if (error || status === 400 || !data || typeof data === 'string')
          //     return

          //   const {
          //     bio: { gender },
          //   } = data
          //   if (avatar !== '') {
          //     competition_image = avatar
          //   } else {
          //     if (gender === 'male') competition_image = default_images.male
          //     if (gender === 'female') competition_image = default_images.female
          //     else competition_image = default_images.random
          //   }
          // }
          // getUser()

          const latest_competitions = {
            _id,
            creator_id,
            content,
            title,
          }

          competitions.value.push(latest_competitions)
        }
      })
    }

    onBeforeMount(() => {
      getCompetitions()
    })

    return {
      is_more_description_boolean,
      competitions,
      read_more_user_id,
      viewNewsUpdateDetails,
      toggleDescriptionLength,
    }
  },
}
</script>

<style scoped></style>
