<template>
  <div class="w-full top-0 h-full bg-archyhub -semi-light z-4">
    <MainPageTopBarVue :page_title="topbar.title" :page_icon="topbar.icon" />

    <div class="mt-10 pb-8">
      <div class="" v-if="allScholarships.length < 1">
        <div class="text-center font-medium mb-6">
          <span>{{ is_loading ? '' : ' No scholarship found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getAllScholarships">
            <button
              class="text-md text-archyhub-semi-light bg-opacity-40 bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'Reload' }}</span>

                <svg
                  v-if="is_loading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>

        <div class="" v-for="x in 10" :key="x">
          <AnimatedPostContentVue />
        </div>
      </div>

      <div v-else>
        <div class="hidden text-center mb-8">
          <form @submit.prevent="getAllScholarships">
            <button
              class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>{{ is_loading ? 'Loading' : 'More Competition' }}</span>

                <svg
                  v-if="is_loading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>

        <div v-for="(eachCompetition, index) in allScholarships" :key="index">
          <ScholarshipPostVue :eachCompetition="eachCompetition" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import MainPageTopBarVue from '@/components/Layouts/MainPageTopBar.vue'
import AnimatedPostContentVue from '@/components/Animation/AnimatedPostContent.vue'
import { ScholarshipSchema } from '@/controller/typings'
import { fetchAllCompetitions } from '@/controller/api/competitions'
import ScholarshipPostVue from '@/components/ScholarshipPost.vue'

export default {
  name: 'Scholarships',
  components: {
    MainPageTopBarVue,
    ScholarshipPostVue,
    AnimatedPostContentVue,
  },
  setup() {
    const store = useStore()
    const allScholarships = ref<ScholarshipSchema[]>([])
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const topbar = ref({ title: 'Scholarships', icon: 'fa fa-users' })

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const getAllScholarships = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      console.log('hfk')
      const response = await fetchAllCompetitions()

      const { error, data, status } = response
      console.log('hfeerek')

      if (error) {
        updateResponseMessage('error', error)
        is_loading.value = false

        return setTimeout(() => {
          return updateResponseMessage('', '')
        }, 5000)
      }

      if (!status || status === 400 || !data) {
        updateResponseMessage(
          'error',
          'Sorry, an unknown error occurred... Check connection',
        )

        return setTimeout(() => {
          is_loading.value = false
          return updateResponseMessage('', '')
        }, 5000)
      }

      updateResponseMessage('success', '')

      allScholarships.value = data
      is_loading.value = false

      console.log(data)
    }

    onBeforeMount(() => {
      getAllScholarships()
    })

    return { allScholarships, is_loading, message, topbar, getAllScholarships }
  },
}
</script>

<style lang=""></style>
