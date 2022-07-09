<template>
  <section class="flex w-full items-center my-10">
    <router-link to="/profile/user_id" class="w-full">
      <div
        class="w-full flex items-center cursor-pointer hover:bg-archyhub-semi-light rounded-3xl p-4"
      >
        <img class="w-14 h-14 rounded-full border" src="@/assets/script.jpg" />

        <div class="flex-1 ml-2">
          <span class="text-lg block font-semibold text-gray-700 truncate">
            Dasaolu Daniel
          </span>
          <span class="text-sm block font-semibold text-gray-600 truncate">
            @ArchyScript
          </span>
        </div>

        <span class="fa fa-ellipsis-h text-gray-400 text-2xl"></span>
      </div>
    </router-link>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'NavLinks',
  setup() {
    const is_more_description_boolean = ref(true)

    return {
      is_more_description_boolean,
    }
  },
}
</script>

<style scoped></style>
