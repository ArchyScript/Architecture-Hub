<template>
  <div class="mx-auto h-auto">
    <div>
      <!-- :class="current_active_modal !== '' ? 'block' : 'hidden'" -->
      <section
        v-if="open_new_post_modal"
        class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
        :class="open_new_post_modal ? 'fixed' : 'hidden'"
      >
        <CreatePostModalVue />

        <div
          class="absolute top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-30 bg-red-900 shadow-md"
          @click="closeAllModals"
        >
          <svg
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
      </section>

      <section
        v-if="open_new_competition_modal"
        class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
        :class="open_new_competition_modal ? 'fixed' : 'hidden'"
      >
        <NewCompetitionVue />

        <div
          class="absolute top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-30 bg-red-900 shadow-md"
          @click="closeAllModals"
        >
          <svg
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
      </section>

      <section
        v-if="open_new_comment_modal"
        class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
        :class="open_new_comment_modal ? 'fixed' : 'hidden'"
      >
        <CommentModalVue />

        <div
          class="absolute top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-30 bg-red-900 shadow-md"
          @click="closeAllModals"
        >
          <svg
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
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import CreatePostModalVue from '../Modals/CreatePostModal.vue'
import NewCompetitionVue from '../Modals/NewCompetition.vue'
import CommentModalVue from '../Modals/CommentModal.vue'

export default {
  name: 'DefaultLayout',
  components: {
    CreatePostModalVue,
    NewCompetitionVue,
    CommentModalVue,
  },
  setup() {
    const store = useStore()
    const current_active_modal = ref('')
    const open_new_post_modal = computed(
      () => store.state.component_handler.open_new_post_modal,
    )
    const open_new_competition_modal = computed(
      () => store.state.component_handler.open_new_competition_modal,
    )
    const open_new_comment_modal = computed(
      () => store.state.component_handler.open_new_comment_modal,
    )

    const closeAllModals = () =>
      store.dispatch('component_handler/closeAllModals')

    return {
      current_active_modal,
      open_new_post_modal,
      open_new_competition_modal,
      open_new_comment_modal,
      closeAllModals,
    }
  },
}
</script>

<style scoped></style>
