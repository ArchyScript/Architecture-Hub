<template>
  <div class="w-full top-0 h-full bg-archyhub -semi-light z-4">
    <MainPageTopBarVue :page_title="topbar.title" :page_icon="topbar.icon" />

    <div class="mt-10 pb-8">
      <div class="" v-if="storeCompetitions.length < 1">
        <div class="text-center font-medium mb-6">
          <span>{{ is_loading ? '' : ' No competition found' }}</span>
        </div>

        <div class="text-center">
          <form @submit.prevent="getAllCompetitions">
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
          <form @submit.prevent="getAllCompetitions">
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

        <div v-for="(eachCompetition, index) in storeCompetitions" :key="index">
          <CompetitionContentVue :eachCompetition="eachCompetition" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import MainPageTopBarVue from '@/components/Layouts/MainPageTopBar.vue'
import CompetitionContentVue from '@/components/Competitions/CompetitionContent.vue'
import AnimatedPostContentVue from '@/components/Animation/AnimatedPostContent.vue'

export default {
  name: 'Competitions',
  components: {
    MainPageTopBarVue,
    CompetitionContentVue,
    AnimatedPostContentVue,
  },
  setup() {
    const store = useStore()
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const topbar = ref({ title: 'Competitions', icon: 'fa fa-trophy' })
    const storeCompetitions = computed(
      () => store.state._requests.allCompetitions,
    )

    //
    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const getAllCompetitions = async () => {
      is_loading.value = true
      updateResponseMessage('', '')

      //
      if (storeCompetitions.value && storeCompetitions.value.length < 1)
        await fetchCompetitions()

      if (!storeCompetitions.value) {
        is_loading.value = false
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
      is_loading.value = false
      await fetchCompetitions()
    }

    //
    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }

    //
    async function fetchCompetitions() {
      await store.dispatch('_requests/getAllCompetitions')
    }

    //
    onBeforeMount(async () => {
      await getAllCompetitions()
      scrollToTop()
    })

    return {
      storeCompetitions,
      is_loading,
      message,
      topbar,
      getAllCompetitions,
    }
  },
}
</script>

<style lang=""></style>
