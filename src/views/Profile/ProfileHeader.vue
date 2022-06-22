<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="h-60 w-full">
      <span class="h-full w-full block bg-blue-400 border"></span>
      <!-- <img class="w-full h-60 object-fill border" src="@/assets/script.jpg" /> -->
    </div>

    <section class="px-4">
      <div class="flex justify-between">
        <span
          class="h-28 w-28 p-1 rounded-full -mt-14 block bg-archyhub-semi-light border"
        >
          <img
            class="w-full h-full rounded-full object-fill"
            src="@/assets/script.jpg"
          />
        </span>

        <div class="mt-2">
          <router-link to="/profile/edit">
            <span
              class="py-1 inline-flex font-semibold bg-archyhub-gray text-gray-700 rounded-xl px-3 border border-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100"
            >
              Edit Profile
            </span>
          </router-link>
        </div>
      </div>

      <div class="flex-1 items-center px-2 mt-2 mb-2">
        <h4 class="text-2xl block font-bold text-gray-600">
          Dasolu Daniel
        </h4>
        <span class="text-base block cursor-pointer text-gray-500 truncate">
          @ArchyScript
        </span>
      </div>

      <p class="text-base font-medium my-1 px-2 text-gray-500">
        An Architecture Student || Front-end developer || JavaScript Lover || AI
        enthusiast || Music lover 🎸|| African
      </p>

      <p class="text-base mt-2 px-2">
        <span class="fa fa-calendar text-xl mr-2 text-gray-400"></span>
        <span class="text-gray-500">Joined August 2020</span>
      </p>

      <p class="flex items-center text-base mt-2 px-2 space-x-8">
        <span class="flex space-x-2">
          <span class="text-gray-600 font-bold">500</span>
          <span class="text-gray-500">Following</span>
        </span>

        <span class="flex space-x-2">
          <span class="text-gray-600 font-bold">500</span>
          <span class="text-gray-500">followers</span>
        </span>
      </p>
    </section>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfileHeader',
  setup() {
    return {}
  },
}
</script>
<style scoped></style>
