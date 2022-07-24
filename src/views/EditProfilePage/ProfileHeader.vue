<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="h-60 w-full">
      <span class="h-full w-full block bg-blue-400 border"></span>
    </div>

    <div class="px-4">
      <div class="flex justify-between">
        <span
          class="h-24 w-24 md:h-28 md:w-28 xl:h-32 xl:w-32 -mt-12 md:-mt-14 xl:-mt-16 p-1 rounded-full block bg-archyhub-semi-light border"
        >
          <img
            class="w-full h-full rounded-full object-fill"
            :src="this.auth_user.profile_picture.avatar"
          />
        </span>
      </div>

      <div class="">
        <div v-if="auth_user.username === ''" class="flex-1 animate-pulse my-4">
          <div
            class="h-2 sm:h-3 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-2"
          ></div>
          <div
            class="h-2 sm:h-3 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-1 sm:mb-2"
          ></div>

          <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl mb-1"></div>
          <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl mb-1"></div>
          <div
            class="h-1 sm:h-2 p-1 w-3/4 sm:w-1/2 bg-gray-400 rounded-xl mb-1"
          ></div>

          <div class="grid grid-cols-8 gap-2 mt-4">
            <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
            <div class="h-1 sm:h-2 p-1 bg-gray-400 rounded-xl col-span-2"></div>
          </div>
        </div>

        <div class="" v-if="auth_user.username !== ''">
          <div class="fl ex-1 items-center px-2 mt-2 mb-2">
            <h4
              class="text-base sm:text-lg lg:text-xl block font-semibold text-gray-600"
            >
              {{
                auth_user.bio.display_name !== ''
                  ? auth_user.bio.display_name
                  : auth_user.username
              }}
            </h4>
            <span
              class="text-sm sm:text-base block cursor-pointer text-gray-500 truncate"
            >
              @{{ auth_user.username }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'ProfileHeader',
  setup() {
    const store = useStore()
    const route = useRoute()
    const user_profile_id = ref('')
    const auth_user = computed(() => store.state.users.auth_user)
    const user = computed(() => {
      return store.state.users.user
    })
    onBeforeMount(() => {
      const { _id } = route.params

      user_profile_id.value = _id
    })

    return {
      user,
      user_profile_id,
      auth_user,
    }
  },
}
</script>
<style scoped></style>
