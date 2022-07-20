<template>
  <div class="mx-auto h-auto">
    <section
      v-if="
        open_new_post_modal ||
        open_new_competition_modal ||
        open_new_scholarship_modal ||
        open_new_comment_modal
      "
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
    >
      <div
        v-if="open_new_post_modal"
        class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
        :class="open_new_post_modal ? 'fixed' : 'hidden'"
      >
        <CreatePostModalVue />
      </div>

      <!-- open create competition modal -->
      <div
        v-if="open_new_competition_modal"
        class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
        :class="open_new_competition_modal ? 'fixed' : 'hidden'"
      >
        <NewCompetitionVue />
      </div>

      <!-- open create scholarship modal -->
      <div
        v-if="open_new_scholarship_modal"
        class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
        :class="open_new_scholarship_modal ? 'fixed' : 'hidden'"
      >
        <NewScholarshipVue />
      </div>

      <!-- open comment modal -->
      <div
        v-if="open_new_comment_modal"
        class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
        :class="open_new_comment_modal ? 'fixed' : 'hidden'"
      >
        <CommentModalVue />
      </div>

      <!-- close all opened modal button -->
      <div
        class="absolute cursor-pointer top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
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
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import CreatePostModalVue from '../Modals/CreatePostModal.vue'
import NewCompetitionVue from '../Modals/NewCompetition.vue'
import NewScholarshipVue from '../Modals/NewScholarship.vue'
import CommentModalVue from '../Modals/CommentModal.vue'

export default {
  name: 'DefaultLayout',
  components: {
    CreatePostModalVue,
    NewCompetitionVue,
    NewScholarshipVue,
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
    const open_new_scholarship_modal = computed(
      () => store.state.component_handler.open_new_scholarship_modal,
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
      open_new_scholarship_modal,
      open_new_comment_modal,
      closeAllModals,
    }
  },
}
</script>

<style scoped></style>
