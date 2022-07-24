<template>
  <div class="mx-auto h-auto">
    <section
      v-if="open_new_post_modal"
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
      :class="open_new_post_modal ? 'fixed' : 'hidden'"
    >
      <CreatePostModalVue />

      <div
        class="absolute cursor-pointer top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-white"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          />
        </svg>
      </div>
    </section>

    <!-- open create competition modal -->
    <section
      v-if="open_new_competition_modal"
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
      :class="open_new_competition_modal ? 'fixed' : 'hidden'"
    >
      <NewCompetitionVue />

      <div
        class="absolute cursor-pointer top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-white"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          />
        </svg>
      </div>
    </section>

    <!-- open create scholarship modal -->
    <section
      v-if="open_new_scholarship_modal"
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
      :class="open_new_scholarship_modal ? 'fixed' : 'hidden'"
    >
      <NewScholarshipVue />

      <div
        class="absolute cursor-pointer top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-white"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          />
        </svg>
      </div>
    </section>

    <!-- open comment modal -->
    <section
      v-if="open_new_comment_modal"
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
      :class="open_new_comment_modal ? 'fixed' : 'hidden'"
    >
      <CommentModalVue />

      <div
        class="absolute cursor-pointer top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-white"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
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
