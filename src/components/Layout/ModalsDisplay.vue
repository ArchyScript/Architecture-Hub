<template>
  <div class="mx-auto h-auto">
    <section
      v-if="new_post_modal_boolean"
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
      :class="new_post_modal_boolean ? 'fixed' : 'hidden'"
    >
      <CreatePostModalVue />

      <div
        class="absolute top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-30 bg-red-900 shadow-md"
        @click="toggleCreatePostModal"
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
      v-if="new_competition_modal_boolean"
      class="top-0 bottom-0 z-30 h-screen w-full container bg-black bg-opacity-20"
      :class="new_competition_modal_boolean ? 'fixed' : 'hidden'"
    >
      <NewCompetitionVue />

      <div
        class="absolute top-0 p-3 sm:p-4 m-2 sm:m-3 rounded-full right-0 justify-center items-center z-30 bg-red-900 shadow-md"
        @click="toggleCreatePostModal"
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

export default {
  name: 'DefaultLayout',
  components: {
    CreatePostModalVue,
    NewCompetitionVue,
  },
  setup() {
    const store = useStore()
    const new_post_modal_boolean = computed(
      () => store.state.component_handler.show_new_post_modal,
    )
    const new_competition_modal_boolean = computed(
      () => store.state.component_handler.show_new_competition_modal,
    )

    // window.addEventListener('click', (event: any) => {
    //   console.log(event.target)
    //   const create_post_modal = document.getElementById('create_post_modal')
    //   if (event.target === create_post_modal) {
    //     console.log(event.target)
    //     // store.dispatch('component_handler/createPostVisibillity')
    //   }
    // })

    const toggleCreatePostModal = () => {
      store.dispatch('component_handler/toggleNewPostModal', 'opened')
    }

    const toggleNewCompetitionModal = () => {
      store.dispatch('component_handler/toggleNewPostModal', 'opened')
    }

    return {
      new_post_modal_boolean,
      new_competition_modal_boolean,
      toggleCreatePostModal,
    }
  },
}
</script>

<style scoped></style>
