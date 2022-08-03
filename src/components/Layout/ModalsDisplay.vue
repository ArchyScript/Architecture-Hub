<template>
  <div class="mx-auto h-auto">
    <section
      v-if="open_new_post_modal"
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
      :class="open_new_post_modal ? 'fixed' : 'hidden'"
    >
      <CreatePostModalVue />

      <div
        class="absolute cursor-pointer top-0 py-2 px-4 sm:py-3 sm:px-5 md:py-3 md:px-5 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <span class="fa fa-close text-lg sm:text-xl text-archyhub-light"></span>
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
        class="absolute cursor-pointer top-0 py-2 px-4 sm:py-3 sm:px-5 md:py-3 md:px-5 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <span class="fa fa-close text-lg sm:text-xl text-archyhub-light"></span>
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
        class="absolute cursor-pointer top-0 py-2 px-4 sm:py-3 sm:px-5 md:py-3 md:px-5 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <span class="fa fa-close text-lg sm:text-xl text-archyhub-light"></span>
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
        class="absolute cursor-pointer top-0 py-2 px-4 sm:py-3 sm:px-5 md:py-3 md:px-5 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-40 bg-red-900 shadow-md"
        @click="closeAllModals"
      >
        <span class="fa fa-close text-lg sm:text-xl text-archyhub-light"></span>
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
