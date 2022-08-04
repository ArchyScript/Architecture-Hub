<template>
  <section
    class="flex flex-col inset-x-0 bg-archyhub-semi-light bg-opacity-20 pb-16"
  >
    <div v-if="scholarship_info.creator_username === ''">
      <AnimatedSingleContentVue />
    </div>

    <div v-if="scholarship_info.creator_username !== ''">
      <div class="flex-col w-full p-2 sm:p-3 xl:p-4 pb-2">
        <div class="flex justify-center items-center">
          <span class="flex-shrink-0 mr-3">
            <router-link :to="`/profile/${scholarship_info.creator_username}`">
              <img
                class="w-12 h-12 sm:h-14 sm:w-14 rounded-full border cursor-pointer"
                :src="scholarship_info.creator_picture"
              />
            </router-link>
          </span>

          <div class="flex-1 flex-col truncate">
            <p class="items-center flex justify-between">
              <router-link
                :to="`/profile/${scholarship_info.creator_username}`"
                class="hover:underline hover:text-archyhub-main text-gray-600 items-center flex flex-1 space-x-1 sm:space-x-2"
              >
                <span
                  class="text-base md:text-lg font-semibold text-opacity-10 truncate"
                >
                  {{
                    scholarship_info.display_name
                      ? scholarship_info.display_name
                      : scholarship_info.creator_username
                  }}
                </span>

                <span class="text-sm md:text-base font-normal truncate">
                  @{{ scholarship_info.creator_username }}
                </span>
              </router-link>

              <!-- <span
                class="text-gray-600 hover:bg-archyhub-light hover:bg-opacity-50 px-3 py-1 cursor-pointer rounded-full"
              >
                <span class="fa fa-ellipsis-h text-base md:text-lg"></span>
              </span> -->
            </p>

            <p
              class="flex items-center italic space-x-3 text-xs font-normal text-gray-400 truncate"
              v-if="scholarship_info.date || scholarship_info.time"
            >
              <span>{{ scholarship_info.date }}</span>

              <span>
                <strong class="font-medium text-gray-600">@</strong>
                {{ scholarship_info.time }}
              </span>
            </p>
          </div>
        </div>

        <article class="w-full flex-1 px-1 sm:px-2 mt-6 md:mt-8">
          <div class="mt-2 flex-col space-y-1 sm:space-y-2">
            <span
              class="text-base block sm:text-lg lg:text-xl font-medium text-gray-600"
            >
              {{ scholarship_info.title }}
            </span>

            <span class="block pb-2 sm:pb-4 h-64 sm:h-80 lg:h-96 xl:h-96">
              <img
                v-if="scholarship_info.scholarship_image !== ''"
                class="w-full h-full object-fill border rounded-xl"
                :src="scholarship_info.scholarship_image"
              />
            </span>

            <p
              class="text-sm space-x-1 sm:space-x-2 md:text-base text-gray-500"
            >
              <span class="font-normal text-gray-600">Host:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.host }}
              </span>
            </p>

            <p
              class="text-sm space-x-1 sm:space-x-2 md:text-base text-gray-500"
            >
              <span class="font-normal text-gray-600">Title:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.title }}
              </span>
            </p>

            <p
              class="text-sm space-x-1 sm:space-x-2 md:text-base text-gray-500"
            >
              <span class="font-normal text-gray-600">Description:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.description }}
              </span>
            </p>

            <p
              class="text-sm space-x-1 sm:space-x-2 md:text-base text-gray-500"
            >
              <span class="font-normal text-gray-600">Content:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.content }}
              </span>
            </p>

            <p
              class="text-sm space-x-1 sm:space-x-2 md:text-base text-gray-500"
            >
              <span class="font-normal text-gray-600">Link:</span>
              <a
                class="font-light flex-wrap break-all hover:underline"
                target="_blank"
                :href="scholarship_info.link"
              >
                {{ scholarship_info.link }}
              </a>
            </p>
          </div>
        </article>
      </div>

      <div>
        <ReactionsVue :reactions="reactions" />
      </div>

      <div class="mt-6">
        <div v-if="does_scholarship_have_comment === false">
          <span
            class="block text-center text-gray-700 font-normal text-sm sm:text-base"
          >
            No comment found
          </span>
        </div>

        <div v-else>
          <div
            v-for="scholarship_comment in scholarship_comments"
            :key="scholarship_comment.creator_username"
          >
            <CommentVue :eachPostComment="scholarship_comment" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ReactionsVue from '@/components/Reactions/index.vue'
import CommentVue from '@/components/Utilities/Comment.vue'
import AnimatedSingleContentVue from '@/components/Animation/AnimatedSingleDetail.vue'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'

type CommentSchema =
  | {
      comment: string
      commenter_image: string
      commneter_username: string
      date: string
      time: string
    }
  | any

export default {
  name: 'SingleScholarshipDetails',
  components: {
    ReactionsVue,
    AnimatedSingleContentVue,
    CommentVue,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const does_scholarship_have_comment = ref(false)
    const scholarship_comments = ref<CommentSchema[]>([])
    const storeUsers = computed(() => store.state._requests.allUsers)
    const storeScholarships = computed(
      () => store.state._requests.allScholarships,
    )
    const storeScholarshipComments = computed(
      () => store.state._requests.allScholarshipComments,
    )
    const scholarship_info = ref({
      link: '',
      creator_picture: '',
      scholarship_image: '',
      content: '',
      title: '',
      host: '',
      description: '',
      creator_username: '',
      display_name: '',
      time: '',
      date: '',
    })
    const reactions = ref({
      no_of_likes: 0,
      no_of_comments: 0,
      post_comment_object: {
        post_id: '',
        post_type: '',
      },
    })

    //
    const getScholarshipDetails = async (scholarship_id: any) => {
      if (storeScholarships.value && storeScholarships.value.length < 1)
        await fetchScholarships()

      storeScholarships.value.forEach(async (eachScholarship: any) => {
        if (eachScholarship._id === scholarship_id) {
          const {
            _id,
            creator_id,
            title,
            link,
            host,
            createdAt,
            description,
            content,
            comments,
            likes,
            scholarship_image: { avatar },
          } = await eachScholarship

          const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

          scholarship_info.value.title = title
          scholarship_info.value.content = content
          scholarship_info.value.link = link
          scholarship_info.value.host = host
          scholarship_info.value.time = formattedTime
          scholarship_info.value.date = formattedDate
          scholarship_info.value.description = description
          scholarship_info.value.scholarship_image = avatar

          reactions.value.no_of_comments = comments.length
          reactions.value.no_of_likes = likes.length
          reactions.value.post_comment_object.post_id = _id
          reactions.value.post_comment_object.post_type = 'scholarship'

          if (storeUsers.value && storeUsers.value.length < 1)
            await fetchUsers()

          storeUsers.value.forEach(async (eachUser: any) => {
            if (eachUser._id === creator_id) {
              const {
                username,
                bio: { display_name, gender },
                profile_picture: { avatar },
              } = eachUser

              const creator_picture: any = await getDisplayProfilePicture(
                avatar,
                gender,
              )

              scholarship_info.value.display_name = display_name
              scholarship_info.value.creator_username = username
              scholarship_info.value.creator_picture = creator_picture
            }
          })

          if (comments && comments.length <= 0)
            return (does_scholarship_have_comment.value = false)

          does_scholarship_have_comment.value = true

          comments.forEach(async (eachScholarshipComment: any) => {
            const { comment_id } = await eachScholarshipComment

            if (storeScholarshipComments.value < 1)
              await fetchAllScholarshipComments()

            storeScholarshipComments.value.forEach(
              async (each_store_scholarship_comment: any) => {
                if (comment_id === each_store_scholarship_comment._id) {
                  const { commenter_id } = each_store_scholarship_comment

                  if (storeUsers.value && storeUsers.value.length < 1)
                    await fetchUsers()

                  storeUsers.value.forEach(async (eachUser: any) => {
                    if (eachUser._id === commenter_id) {
                      const {
                        username,
                        profile_picture: { avatar },
                        bio: { gender },
                      } = eachUser

                      const commenter_image: any = await getDisplayProfilePicture(
                        avatar,
                        gender,
                      )

                      const scholarship_comment_info = {
                        comment: each_store_scholarship_comment.comment,
                        commenter_image,
                        commneter_username: username,
                        date: formattedDate,
                        time: formattedTime,
                      }

                      scholarship_comments.value.unshift(
                        scholarship_comment_info,
                      )
                    }
                  })
                }
              },
            )
          })
        }
      })

      await fetchScholarships()
      await fetchAllScholarshipComments()
      await fetchUsers()
    }

    //
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchScholarships() {
      await store.dispatch('_requests/getAllScholarships')
    }
    const fetchAllScholarshipComments = async () => {
      await store.dispatch('_requests/getAllScholarshipComments')
    }

    //
    onBeforeMount(async () => {
      const { scholarship_id } = route.params

      await getScholarshipDetails(scholarship_id)
    })

    //
    return {
      scholarship_info,
      scholarship_comments,
      reactions,
      does_scholarship_have_comment,
      getScholarshipDetails,
    }
  },
}
</script>

<style scoped></style>
