<template>
  <section class="mb-6 inset-x-0 pb-4">
    <div class="flex justify-center z-0">
      <input
        @change="onFileChange"
        class="hidden"
        type="file"
        name="profile_picture"
        id="profile_picture"
        accept="image/gif, image/jpeg, image/png"
      />
    </div>

    <div class="w-full mt-16 px-4">
      <div class="h-96 w-full border shadow-md bg-archyhub-light rounded-3xl">
        <img
          v-if="image_url"
          :src="image_url"
          class="w-full h-full rounded-3xl object-cover"
        />
      </div>

      <div class="flex items-center gap-10 justify-around mt-10">
        <label
          class="w-full text-center cursor-pointer py-3 rounded-xl bg-gray-600 text-white hover:bg-green-dark focus:outline-none my-1"
          for="profile_picture"
        >
          {{ image_url ? 'Change Picture' : 'Choose Picture' }}
        </label>

        <button
          type="submit"
          class="w-full cursor-pointer text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Upload Picture
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfileHeader',
  setup() {
    const image_url = ref(null)

    const onFileChange = (e) => {
      const file = e.target.files[0]
      image_url.value = URL.createObjectURL(file)
    }
    return { onFileChange, image_url }
  },
}
</script>
<style scoped></style>
