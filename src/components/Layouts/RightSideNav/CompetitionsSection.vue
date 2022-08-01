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

      <div class="flex flex-col" v-if="competitions.length >= 1">
        <div
          class="flex space-x-4 shadow-sm px-4 py-4"
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
                read_more_competition_id == competition._id
                  ? competition.content.substring(0, 100)
                  : competition.content.substring(0, 75)
              }}
              <span
                @click="toggleDescriptionLength(competition._id)"
                class="py-1 pl-1 pr-3 font-semibold text-gray-700 border-gray-200 cursor-pointer"
              >
                {{
                  is_more_description_boolean &&
                  read_more_competition_id == competition._id
                    ? 'see less'
                    : 'see more'
                }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <router-link
        class="w-full hover:underline block py-2 sm:py-3 text-sm text-center rounded-bl-2xl rounded-br-2xl sm:text-base italic border-t hover:bg-gray-300"
        to="/competitions"
      >
        <span class="w-full">
          see all
        </span>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AnimatedLatestVue from '@/components/Animation/AnimatedLatest.vue'
import { fetchAllCompetitions } from '@/controller/api/competitions'

type CompetitonSchema =
  | {
      _id: any
      creator_id: any
      content: string
      title: string
    }
  | any

export default {
  name: 'LatestCompetitions',
  components: { AnimatedLatestVue },
  setup() {
    const store = useStore()
    const competitions = ref<CompetitonSchema[]>([])
    const is_more_description_boolean = ref(true)
    const read_more_competition_id = ref('')
    const storeCompetitions = computed(
      () => store.state._requests.allCompetitions,
    )
    const auth_user = computed(() => store.state.users.auth_user)

    const toggleDescriptionLength = (competition_id: string) => {
      if (read_more_competition_id.value === competition_id) {
        is_more_description_boolean.value = false
        return (read_more_competition_id.value = '')
      }

      is_more_description_boolean.value = true
      read_more_competition_id.value = competition_id
      console.log(competition_id)
    }

    const getCompetitions = async () => {
      if (storeCompetitions.value.length < 1) await fetchCompetitions()

      storeCompetitions.value.forEach(
        async (competition: any, index: number) => {
          if (index <= 2) {
            const { _id, creator_id, content, title } = competition

            const latest_competition = {
              _id,
              creator_id,
              content,
              title,
            }

            competitions.value.push(latest_competition)
          }
        },
      )

      // await fetchCompetitions()
    }

    //
    async function fetchCompetitions() {
      await store.dispatch('_requests/getAllCompetitions')
    }

    //
    onBeforeMount(async () => await getCompetitions())

    return {
      is_more_description_boolean,
      competitions,
      read_more_competition_id,
      toggleDescriptionLength,
    }
  },
}
</script>

<style scoped></style>
