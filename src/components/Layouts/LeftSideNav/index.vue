<template>
  <section
    class="hide-scrollbar w-full top-0 min-h-screen max-h-screen overflow-scroll md:h-auto sticky z-4 shadow-md bg-archyhub-light"
  >
    <div class="p-6">
      <NavLinks />
    </div>

    <form
      class="w-full z-50 ring-0 px-8 sticky left-0 bottom-0 text-center bg-archyhub-semi-light bg-opacity-20 py-6"
      @submit.prevent="logUserOut"
    >
      <button
        type="submit"
        class="w-full text-base lg:text-lg text-archyhub-main hover:text-archyhub-light bg-archyhub-semi-light hover:bg-archyhub-main bg-opacity-40 border border-archyhub-main hover:border-archyhub-semi-light border-opacity-60 font-medium xl:font-semibold rounded-3xl py-3"
      >
        <div class="w-full flex justify-center items-center space-x-2">
          <span>Logout</span>

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
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
import NavLinks from './NavLinks.vue'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'LeftSideNav',
  components: {
    NavLinks,
  },

  setup() {
    const store = useStore()
    const is_loading = ref(false)

    const logUserOut = async () => {
      is_loading.value = true

      await assignToken(null)

      sessionStorage.removeItem('architecture_hub_user_token')
      router.push('/auth/login')
    }

    //
    async function assignToken(token: any) {
      await store.dispatch('users/assignToken', token)
    }

    return {
      is_loading,
      logUserOut,
    }
  },
}
</script>

<style scoped>
.hide-scrollbar {
  overflow-x: hidden;
}

.hide-scrollbar::-webkit-scrollbar {
  @apply overflow-hidden;
}

/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 1px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-archyhub-main;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-archyhub-main;
}
</style>
