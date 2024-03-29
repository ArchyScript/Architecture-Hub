<template>
  <section
    @mouseover="getScholarships()"
    v-if="scholarships.length >= 1"
    class="flex items-center border rounded-2xl border-gray-200 hover:border-archyhub-semi-light inset-x-0 pt-4 shadow-sm hover:shadow-md mb-10"
  >
    <div class="w-full">
      <h4 class="text-lg md:text-xl font-semibold mb-4 px-6 text-gray-600">
        Latest Scholarships
      </h4>

      <div v-if="scholarships.length < 1">
        <div v-for="x in 2" :key="x">
          <AnimatedLatestVue />
        </div>
      </div>

      <div class="flex flex-col" v-if="scholarships.length >= 1">
        <div
          class="flex space-x-4 px-4 py-4"
          :key="scholarship.category"
          v-for="scholarship in scholarships"
        >
          <div class="flex-1 w-full">
            <div class="mb-1 flex items-center">
              <span
                class="flex-1 text-xs md:text-sm block text-gray-500 truncate font-normal italic"
              >
                scholarship
                <span class="btn py-1 rounded-lg px-2 bg-green-200">
                  new
                </span>
              </span>

              <router-link :to="`/scholarships/${scholarship._id}`">
                <span
                  class="btn text-xs md:text-sm py-1 italic text-gray-700 rounded-lg px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
                >
                  more details
                </span>
              </router-link>
            </div>

            <div class="flex-1 truncate mr-4">
              <span
                class="text-base block font-medium text-gray-700 truncate text-ellipsis break-all"
              >
                {{ scholarship.title }}
              </span>
            </div>

            <p class="text-sm text-gray-700 break-all">
              {{
                is_more_description_boolean &&
                read_more_scholarship_id == scholarship._id
                  ? scholarship.content.substring(0, 100)
                  : scholarship.content.substring(0, 75)
              }}
              <span
                @click="toggleDescriptionLength(scholarship._id)"
                class="py-1 pl-1 pr-3 font-medium text-gray-700 border-gray-200 cursor-pointer"
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

      <router-link
        v-if="scholarships.length >= 1"
        class="w-full text-xs md:text-sm block mt-3 py-2 text-center rounded-bl-xl rounded-br-xl sm:text-base italic border-t hover:border-archyhub-semi-light text-gray-700 hover:text-archyhub-main hover:bg-archyhub-semi-light hover:bg-opacity-60"
        to="/scholarships"
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
import AnimatedLatestVue from '@/components/Animation/AnimatedLatest.vue'
import { useStore } from 'vuex'

type ScholarshipSchema =
  | {
      _id: any
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

    const toggleDescriptionLength = (user_id: string) => {
      if (read_more_scholarship_id.value === user_id) {
        is_more_description_boolean.value = false
        return (read_more_scholarship_id.value = '')
      }

      is_more_description_boolean.value = true
      read_more_scholarship_id.value = user_id
    }

    const getScholarships = async () => {
      if (storeScholarships.value.length < 1) await fetchScholarships()

      const newScholarships: any = []

      await storeScholarships.value.forEach(
        async (scholarship: any, index: number) => {
          if (index < 2) {
            const { _id, creator_id, content, title } = scholarship

            const latest_scholarship = {
              _id,
              creator_id,
              content,
              title,
            }

            newScholarships.push(latest_scholarship)
          }
        },
      )

      scholarships.value = newScholarships
    }

    //
    async function fetchScholarships() {
      await store.dispatch('_requests/getAllScholarships')
    }

    onBeforeMount(async () => await getScholarships())

    return {
      is_more_description_boolean,
      scholarships,
      read_more_scholarship_id,
      toggleDescriptionLength,
      getScholarships,
    }
  },
}
</script>

<style scoped></style>
