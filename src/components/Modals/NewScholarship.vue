<template>
  <section
    class="flex flex-col items-center h-full w-full bg-opacity-40 bg-archyhub-main py-10 overflow-scroll"
  >
    <div
      class="flex flex-col shadow-2xl my-auto p-3 md:p-4 lg:p-6 border rounded-md bg-archyhub-semi-light w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2"
    >
      <form class="w-full flex-1" @submit="newScholarship">
        <div
          v-if="message.type !== ''"
          :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
          class="text-center font-medium mb-4 px-8"
        >
          {{ message.text }}
        </div>

        <div class="mb-1 p-1">
          <label class="block mb-1 mx-2 font-medium text-gray-700" for="title">
            Title
          </label>

          <input
            type="text"
            class="w-full text-xl resize-none p-4 mb-1 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
            name="title"
            placeholder="Title"
            v-model="payload.title"
          />
        </div>

        <div class="mb-1 p-1">
          <label class="block mb-1 mx-2 font-medium text-gray-700" for="host">
            Host
          </label>

          <input
            type="text"
            class="w-full text-xl resize-none p-4 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
            name="host"
            placeholder="Scholarship Host"
            v-model="payload.host"
          />
        </div>

        <div class="mb-1 p-1">
          <label class="block mb-1 mx-2 font-medium text-gray-700" for="link">
            Link
          </label>

          <input
            type="text"
            class="w-full text-xl resize-none p-4 mb-3 text-gray-700 bg-archyhub-light bg-opacity-75 focus:outline-none rounded-lg"
            name="link"
            placeholder="Link to apply (e.g https://link.com)"
            v-model="payload.link"
          />
        </div>

        <div class="mb-1 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-700"
            for="description"
          >
            Description
          </label>
          <textarea
            class="w-full text-xl resize-none p-4 mb-3 text-gray-700 bg-archyhub-light bg-opa city-100 focus:outline-none rounded-lg"
            rows="4"
            placeholder="Describe this Scholarship"
            v-model="payload.description"
          ></textarea>
        </div>

        <div class="mb-1 p-1">
          <label
            class="block mb-1 mx-2 font-medium text-gray-700"
            for="content"
          >
            Content
          </label>
          <textarea
            class="w-full text-xl resize-none p-4 mb-3 text-gray-700 bg-archyhub-light bg-opa city-100 focus:outline-none rounded-lg"
            rows="4"
            placeholder="Provide litle hint about the scholarship"
            v-model="payload.content"
          ></textarea>
        </div>

        <div class="mb-2 p-1">
          <div class="flex justify-center">
            <input
              @change="onFileChange"
              class="hidden"
              type="file"
              name="scholarship_image"
              id="scholarship_image"
              accept="image/gif, image/jpeg, image/png"
            />
          </div>

          <div class="w-full">
            <label
              class="block mb-1 mx-2 font-medium text-gray-700"
              for="title"
            >
              {{ payload.image_file ? 'Change Image' : 'Select Image' }}
            </label>

            <div class="w-full border shadow-md bg-archyhub-light rounded-3xl">
              <img
                v-if="payload.image_file"
                :src="image_url"
                class="w-full h-80 rounded-lg object-cover"
              />
            </div>

            <div
              :class="payload.image_file ? 'justify-end mt-2' : ''"
              class="flex items-center"
            >
              <label
                class="text-ce nter cursor-pointer py-2 px-6 rounded-xl bg-gray-700 text-white hover:bg-green-dark focus:outline-none my-1"
                for="scholarship_image"
              >
                {{ payload.image_file ? 'Change Image' : 'Select Image' }}
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-20">
          <div class="flex-shrink-0 sm:hi dden">
            <img
              class="w-12 h-12 rounded-full border"
              src="@/assets/script.jpg"
            />
          </div>

          <div class="">
            <button
              class="text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-lg sm:rounded-xl md:rounded-lg py-2 sm:py-3 px-4 sm:px-8"
            >
              <div class="w-full flex justify-center items-center space-x-2">
                <span>
                  {{ is_loading ? 'Creating...' : 'Create Scholarship' }}
                </span>

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
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { createScholarship } from '@/controller/api/scholarships'

export default {
  name: 'CreateScholarshipModal',
  setup() {
    const store = useStore()
    const post_id = ref('')
    const image_url = ref('')
    const is_loading = ref(false)
    const message = ref({ type: '', text: '' })
    const payload = ref({
      title: '',
      link: '',
      host: '',
      description: '',
      content: '',
      image_file: null,
    })
    const auth_user = computed(() => store.state.users.auth_user)

    const updateResponseMessage = (type: string, text: string) => {
      message.value.type = type
      message.value.text = text
    }

    const newScholarship = async (event: any) => {
      event.preventDefault()
      is_loading.value = true

      const creator_id = auth_user.value._id
      updateResponseMessage('', '')

      const response = await createScholarship(creator_id, payload.value)
      const { error, data, status } = response

      if (error) {
        updateResponseMessage('error', error)
        is_loading.value = false

        return setTimeout(() => {
          return updateResponseMessage('', '')
        }, 5000)
      }

      is_loading.value = false

      await fetchScholarships()
      closeAllModals()
    }

    const onFileChange = (e: any) => {
      const file = e.target.files[0]

      payload.value.image_file = file
      image_url.value = URL.createObjectURL(file)
    }

    //
    const closeAllModals = () => {
      store.dispatch('component_handler/closeAllModals')
    }

    //
    async function fetchScholarships() {
      await store.dispatch('_requests/getAllScholarships')
    }

    return {
      post_id,
      is_loading,
      payload,
      auth_user,
      image_url,
      message,
      newScholarship,
      onFileChange,
    }
  },
}
</script>

<style scoped></style>
