<template>
  <section class="flex flex-col top-0 mb-6 inset-x-0 pb-4">
    <div class="px-4 mt-12">
      <form @submit="UpdateAndSaveBio">
        <div class="grid gap-2 grid-cols-2">
          <div class="mb-3 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600"
              for="email"
            >
              Firstname
            </label>
            <input
              type="email"
              class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
              name="email"
              placeholder="Email"
            />
          </div>

          <div class="mb-3 p-1">
            <label
              class="block mb-1 mx-2 font-medium text-gray-600"
              for="email"
            >
              Lastname
            </label>
            <input
              type="text"
              class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
              name="lastname"
              placeholder="Lastname"
            />
          </div>
        </div>

        <div class="mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600"
            for="username"
          >
            Email
          </label>
          <input
            type="email"
            class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
            name="email"
            placeholder="Email"
          />
        </div>

        <div class="mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600"
            for="username"
          >
            Username
          </label>
          <input
            type="text"
            class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
            name="username"
            placeholder="Username"
          />
        </div>

        <div class="mb-3 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-600"
            for="password"
          >
            About Me
          </label>
          <textarea
            class="w-full text-xl resize-none py-3 px-3 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-2xl"
            rows="5"
            placeholder="What's happening?"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full text-center py-3 rounded-xl bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Update and Save
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfileHeader',
  setup() {
    const UpdateAndSaveBio = (e) => {
      e.preventDefault()

      console.log('test')
    }

    return { UpdateAndSaveBio }
  },
}
</script>
<style scoped></style>
