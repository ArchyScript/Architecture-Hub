<template>
  <section
    class="flex items-center border rounded-2xl border-gray-200 inset-x-0 pt-4 shadow-sm md:shadow-none mb-10"
  >
    <div class="w-full">
      <h4 class="text-xl font-semibold mb-4 px-6 text-gray-600">
        Latest Scholarships
      </h4>

      <div v-if="scholarships.length < 1">
        <div v-for="x in 3" :key="x">
          <AnimatedLatestVue />
        </div>
      </div>

      <div class="flex flex-col" v-if="scholarships.length >= 1">
        <div
          class="flex items -center space-x-4 shadow-sm px-4 py-4"
          :key="scholarship.category"
          v-for="scholarship in scholarships"
        >
          <div class="flex-1 w-full">
            <div class="mb-1 flex items-center">
              <span
                class="flex-1 text-sm block text-gray-500 truncate font-medium italic dark:text-gray-400"
              >
                scholarship
                <span class="btn py-1 rounded-lg px-2 border bg-green-200">
                  new
                </span>
              </span>

              <router-link :to="`/scholarships/${scholarship._id}`">
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
                {{ scholarship.title }}
              </span>
            </div>

            <p class="">
              {{
                is_more_description_boolean &&
                read_more_scholarship_id == scholarship._id
                  ? scholarship.content.substring(0, 100)
                  : scholarship.content.substring(0, 75)
              }}
              <span
                @click="toggleDescriptionLength(scholarship._id)"
                class="py-1 pl-1 pr-3 font-semibold text-gray-700 border-gray-200 cursor-pointer"
              >
                {{
                  is_more_description_boolean &&
                  read_more_scholarship_id == scholarship._id
                    ? 'see less'
                    : 'see more'
                }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="w-full mt-4"> -->
      <p class="w-full py-2 sm:py-3 text-sm text-center sm:text-base italic">
        <router-link to="/scholarships">see all</router-link>
      </p>
      <!-- </div> -->
    </div>
  </section>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import AnimatedLatestVue from '@/components/Animation/AnimatedLatest.vue'
import { useStore } from 'vuex'
import { fetchAllScholarships } from '@/controller/api/scholarships'
// import { default_images } from '@/controller/utils'
// import { fetchSingleUserById } from '@/controller/api/users.api'

type ScholarshipSchema =
  | {
      _id: any
      // scholarship_image: string
      creator_id: any
      content: string
      title: string
    }
  | any

export default {
  name: 'LatestScholarships',
  components: { AnimatedLatestVue },
  setup() {
    const store = useStore()
    const scholarships = ref<ScholarshipSchema[]>([])
    const is_more_description_boolean = ref(true)
    const read_more_scholarship_id = ref('')
    const storeScholarships = computed(
      () => store.state._requests.allScholarships,
    )
    const allScholarships = ref([])
    const toggleDescriptionLength = (user_id: string) => {
      if (read_more_scholarship_id.value === user_id) {
        is_more_description_boolean.value = false
        return (read_more_scholarship_id.value = '')
      }

      is_more_description_boolean.value = true
      read_more_scholarship_id.value = user_id
      console.log(user_id)
    }

    const getScholarships = async () => {
      async function fetchCompetitions() {
        await store.dispatch('_requests/getAllScholarships')
        allScholarships.value = storeScholarships.value
      }

      if (storeScholarships.value.length >= 1) {
        allScholarships.value = storeScholarships.value
      } else {
        await fetchCompetitions()
      }

      allScholarships.value.forEach(async (scholarship: any, index: number) => {
        if (index <= 2) {
          const { _id, creator_id, content, title } = scholarship

          const latest_scholarship = {
            _id,
            creator_id,
            content,
            title,
          }

          scholarships.value.push(latest_scholarship)
        }
      })

      await store.dispatch('_requests/getAllScholarships')
    }

    onBeforeMount(() => {
      getScholarships()
    })

    return {
      is_more_description_boolean,
      scholarships,
      read_more_scholarship_id,

      toggleDescriptionLength,
    }
  },
}
</script>

<style scoped></style>
