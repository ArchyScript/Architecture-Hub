<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20 pb-16"
  >
    <div class="" v-if="scholarship_info.creator_username === ''">
      <AnimatedSingleContentVue />
    </div>

    <div class="" v-if="scholarship_info.creator_username !== ''">
      <div class="flex-col w-full p-2 sm:p-3 xl:p-4 pb-2">
        <div class="flex justify-center items-center">
          <span class="flex-shrink-0 mr-3">
            <router-link :to="`/profile/${scholarship_info.creator_username}`">
              <img
                class="w-14 h-14 sm:h-16 sm:w-16 rounded-full border cursor-pointer"
                :src="scholarship_info.creator_picture"
              />
            </router-link>
          </span>

          <div class="flex-1 flex-col truncate">
            <p class="items-center flex sm:space-x-2">
              <span
                class="text-base md:text-lg font-semibold text-gray-600 truncate"
              >
                {{
                  scholarship_info.display_name
                    ? scholarship_info.display_name
                    : scholarship_info.creator_username
                }}
              </span>

              <span
                class="text-sm md:text-base font-normal text-gray-500 truncate"
              >
                @{{ scholarship_info.creator_username || '...' }}
              </span>
            </p>

            <p
              class="hidden sm:flex items-center italic space-x-3 text-xs font-normal text-gray-500 truncate"
              v-if="scholarship_info.date || scholarship_info.time"
            >
              <span class="">{{ scholarship_info.date }}</span>

              <span class="">
                <strong class="font-semibold">@</strong>
                {{ scholarship_info.time }}
              </span>
            </p>
          </div>
        </div>

        <article class="w-full flex-1 px-1 sm:px-2 mt-6 md:mt-8">
          <div class="mt-2 flex-col space-y-1 sm:space-y-2">
            <span class="text-lg block sm:text-xl font-semibold text-gray-600">
              {{ scholarship_info.title }}
            </span>

            <span class="block pb-4 h-52 sm:h-56 lg:h-72 xl:h-96">
              <img
                v-if="scholarship_info.scholarship_image !== ''"
                class="w-full h-full object-fill border rounded-xl"
                :src="scholarship_info.scholarship_image"
              />
            </span>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium mr-1">Host:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.host }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Title:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.title }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Description:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.description }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Content:</span>
              <span class="font-light flex-wrap break-all">
                {{ scholarship_info.content }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Link:</span>
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

      <div class="">
        <ReactionsVue :reactions="reactions" />
      </div>

      <div class="mt-6">
        <div class="" v-if="does_scholarship_have_comment === false">
          <span class="block text-center">No comment found</span>
        </div>

        <div v-else>
          <div
            class=""
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
import type { PropType } from 'vue'
import ReactionsVue from '@/components/Reactions/index.vue'
import {
  formatDateAndTime,
  getDisplayProfilePicture,
} from '@/controller/utilities/index'
import router from '@/router'
// import { default_images } from '@/controller/utils/index'
import { useRoute } from 'vue-router'
import {
  singleCommentOnPost,
  specificComment,
} from '@/controller/api/reactions.api'
import CommentVue from '@/components/Comments/Comment.vue'
import AnimatedSingleContentVue from '@/components/Animation/AnimatedSingleDetail.vue'
import { fetchSingleUserById } from '@/controller/api/users.api'
import { fetchSingleScholarship } from '@/controller/api/scholarships'
import { useStore } from 'vuex'

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
  components: { ReactionsVue, AnimatedSingleContentVue, CommentVue },

  setup() {
    const store = useStore()
    const route = useRoute()
    const does_scholarship_have_comment = ref(false)
    const scholarship_comments = ref<CommentSchema[]>([])
    const auth_user = computed(() => store.state.users.auth_user)
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
    const storeScholarships = computed(
      () => store.state._requests.allScholarships,
    )
    const allScholarships = ref([])
    const storeUsers = computed(() => store.state._requests.allUsers)
    const allUsers = ref([])

    const reactions = ref({
      no_of_likes: 0,
      no_of_comments: 0,
      post_comment_object: {
        scholarship_id: '',
        post_type: '',
      },
    })

    const getScholarshipDetails = async (scholarship_id: any) => {
      async function fetchScholarships() {
        await store.dispatch('_requests/getAllScholarships')
        allScholarships.value = storeScholarships.value
      }
      async function fetchUsers() {
        await store.dispatch('_requests/getAllUsers')
        allUsers.value = storeUsers.value
      }

      if (storeScholarships.value && storeScholarships.value.length >= 1) {
        allScholarships.value = storeScholarships.value
      } else {
        await fetchScholarships()
      }

      allScholarships.value.forEach(async (eachScholarship: any) => {
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
          } = eachScholarship
          const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

          scholarship_info.value.title = title
          scholarship_info.value.content = content
          scholarship_info.value.link = link
          scholarship_info.value.host = host
          scholarship_info.value.time = formattedTime
          scholarship_info.value.date = formattedDate
          scholarship_info.value.description = description
          scholarship_info.value.scholarship_image = avatar

          //
          reactions.value.no_of_comments = comments.length
          reactions.value.no_of_likes = likes.length
          reactions.value.post_comment_object.scholarship_id = _id
          reactions.value.post_comment_object.post_type = 'scholarship'

          //
          if (storeUsers.value.length >= 1) {
            allUsers.value = storeUsers.value
          } else {
            await fetchUsers()
          }

          //
          allUsers.value.forEach(async (eachUser: any) => {
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

              //
              scholarship_info.value.display_name = display_name
              scholarship_info.value.creator_username = username
              scholarship_info.value.creator_picture = creator_picture
            }
          })

          if (comments && comments.length <= 0)
            return (does_scholarship_have_comment.value = false)

          does_scholarship_have_comment.value = true

          comments.forEach(async (comment: any) => {
            const params = {
              comment_id: comment.comment_id,
              post_type: 'scholarship',
            }

            //
            const response = await specificComment(params)

            const { error, data, status } = response
            if (error || status === 400 || !data) return

            //
            const singleComment = data

            const { formattedDate, formattedTime } = formatDateAndTime(
              singleComment.createdAt,
            )

            //
            const result = await fetchSingleUserById(data.commenter_id)
            const commenter_info = result

            //
            if (
              commenter_info.error ||
              commenter_info.status === 400 ||
              !commenter_info.data
            )
              return

            //
            const {
              username,
              profile_picture: { avatar },
              bio: { gender },
            } = commenter_info.data
            const commenter_image: any = await getDisplayProfilePicture(
              avatar,
              gender,
            )

            //
            const scholarship_comment_info = {
              comment: singleComment.comment,
              commenter_image,
              commneter_username: username,
              date: formattedDate,
              time: formattedTime,
            }

            scholarship_comments.value.unshift(scholarship_comment_info)
          })
        }
      })
      return

      // const response = await fetchSingleScholarship(_id)
      // const { error, data, status } = response

      // if (error || status === 400 || !data || typeof data === 'string') return

      // console.log(data)

      // const {
      // creator_id,
      // title,
      // link,
      // host,
      // createdAt,
      // description,
      // scholarship_image,
      // content,
      // } = data

      // const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      // //
      // scholarship_info.value.title = title
      // scholarship_info.value.content = content
      // scholarship_info.value.link = link
      // scholarship_info.value.host = host
      // scholarship_info.value.time = formattedTime
      // scholarship_info.value.date = formattedDate
      // scholarship_info.value.description = description
      // scholarship_info.value.scholarship_image = scholarship_image.avatar

      // const getCreatorsInfo = async () => {
      //   const result = await fetchSingleUserById(creator_id)
      //   const { error, data, status } = result

      //   if (error || status === 400 || !data || typeof data === 'string') return

      //   const {
      //     username,
      //     bio: { gender, display_name },
      //     profile_picture: { avatar },
      //   } = data

      //   // get profile image
      //   const creator_picture: any = await getDisplayProfilePicture(
      //     avatar,
      //     gender,
      //   )

      //   scholarship_info.value.creator_picture = creator_picture
      //   scholarship_info.value.creator_username = username
      //   scholarship_info.value.display_name = display_name
      // }
      // getCreatorsInfo()

      // //
      // if (!data.comments || data.comments === undefined) return
      // Handle comment component data
      // if (data.comments <= 0) return (does_scholarship_have_comment.value = false)

      // does_scholarship_have_comment.value = true

      // data.comments.forEach(async (comment: any) => {
      //   const _id = comment.comment_id

      //   const response = await singleCommentOnPost(_id)
      //   const { error, data, status } = response
      //   if (error || status === 400 || !data || typeof data === 'string') return

      //   const { formattedDate, formattedTime } = formatDateAndTime(
      //     data.createdAt,
      //   )

      //   const result = await fetchSingleUserById(data.commenter_id)

      //   const commenter_info = result.data

      // const commenter_image: any = await getDisplayProfilePicture(
      //   commenter_info.profile_picture.avatar,
      //   commenter_info.bio.gender,
      // )

      //   const scholarship_comment_info = {
      //     comment: data.comment,
      //     commenter_image,
      //     commneter_username: commenter_info.creator_username,
      //     date: formattedDate,
      //     time: formattedTime,
      //   }

      //   scholarship_comments.value.push(scholarship_comment_info)
      // })
    }

    window.addEventListener('click', async () => {
      const scholarship_id = route.params

      if (!scholarship_id || scholarship_id === undefined)
        return console.log('teajl')

      await getScholarshipDetails(scholarship_id)
    })

    onBeforeMount(async () => {
      const scholarship_id = route.params

      // await store.dispatch('_requests/getAllScholarships')
      // await store.dispatch('_requests/getAllUsers')

      await getScholarshipDetails(scholarship_id)
    })
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
