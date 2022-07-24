<template>
  <section
    class="flex flex-col inset-x-0 border-b hover:bg-archyhub-semi-light hover:bg-opacity-20 pb-16"
  >
    <div class="" v-if="competition_info.creator_username === ''">
      <AnimatedSingleContentVue />
    </div>

    <div class="" v-if="competition_info.creator_username !== ''">
      <div class="flex-col w-full p-2 sm:p-3 xl:p-4 pb-2">
        <div class="flex justify-center items-center">
          <span class="flex-shrink-0 mr-3">
            <router-link :to="`/profile/${competition_info.creator_username}`">
              <img
                class="w-14 h-14 sm:h-16 sm:w-16 rounded-full border cursor-pointer"
                :src="competition_info.creator_picture"
              />
            </router-link>
          </span>

          <div class="flex-1 flex-col truncate">
            <p class="items-center flex sm:space-x-2">
              <span
                class="text-base md:text-lg font-semibold text-gray-600 truncate"
              >
                {{
                  competition_info.display_name
                    ? competition_info.display_name
                    : competition_info.creator_username
                }}
              </span>

              <span
                class="text-sm md:text-base font-normal text-gray-500 truncate"
              >
                @{{ competition_info.creator_username || '...' }}
              </span>
            </p>

            <p
              class="hidden sm:flex items-center italic space-x-3 text-xs font-normal text-gray-500 truncate"
              v-if="competition_info.date || competition_info.time"
            >
              <span class="">{{ competition_info.date }}</span>

              <span class="">
                <strong class="font-semibold">@</strong>
                {{ competition_info.time }}
              </span>
            </p>
          </div>
        </div>

        <article class="w-full flex-1 px-1 sm:px-2 mt-6 md:mt-8">
          <div class="mt-2 flex-col space-y-1 sm:space-y-2">
            <span class="text-lg block sm:text-xl font-semibold text-gray-600">
              {{ competition_info.title }}
            </span>

            <span class="block pb-4 h-52 sm:h-56 lg:h-72 xl:h-96">
              <img
                v-if="competition_info.competition_image !== ''"
                class="w-full h-full object-fill border rounded-xl"
                :src="competition_info.competition_image"
              />
            </span>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium mr-1">Host:</span>
              <span class="font-light flex-wrap break-all">
                {{ competition_info.host }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Title:</span>
              <span class="font-light flex-wrap break-all">
                {{ competition_info.title }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Description:</span>
              <span class="font-light flex-wrap break-all">
                {{ competition_info.description }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Content:</span>
              <span class="font-light flex-wrap break-all">
                {{ competition_info.content }}
              </span>
            </p>

            <p class="text-sm space-x-2 sm:text-base text-gray-500">
              <span class="font-medium">Link:</span>
              <a
                class="font-light flex-wrap break-all hover:underline"
                target="_blank"
                :href="competition_info.link"
              >
                {{ competition_info.link }}
              </a>
            </p>
          </div>
        </article>
      </div>

      <div class="">
        <ReactionsVue :reactions="reactions" />
      </div>

      <div class="mt-6">
        <div class="" v-if="does_competition_have_comment === false">
          <span class="block text-center">No comment found</span>
        </div>

        <div v-else>
          <div
            class=""
            v-for="competition_comment in competition_comments"
            :key="competition_comment.creator_username"
          >
            <CommentVue :eachPostComment="competition_comment" />
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
import { fetchSingleCompetition } from '@/controller/api/competitions'
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
  name: 'SingleCompetitionDetails',
  components: { ReactionsVue, AnimatedSingleContentVue, CommentVue },

  setup() {
    const store = useStore()
    const route = useRoute()
    const does_competition_have_comment = ref(false)
    const competition_comments = ref<CommentSchema[]>([])
    const auth_user = computed(() => store.state.users.auth_user)
    const competition_info = ref({
      link: '',
      creator_picture: '',
      competition_image: '',
      content: '',
      title: '',
      host: '',
      description: '',
      creator_username: '',
      display_name: '',
      time: '',
      date: '',
    })
    const storeCompetitions = computed(
      () => store.state._requests.allCompetitions,
    )
    const allCompetitions = ref([])
    const storeUsers = computed(() => store.state._requests.allUsers)
    const allUsers = ref([])

    const reactions = ref({
      no_of_likes: 0,
      no_of_comments: 0,
      post_comment_object: {
        competition_id: '',
        post_type: '',
      },
    })

    const getCompetitionDetails = async (competition_id: any) => {
      async function fetchCompetitions() {
        await store.dispatch('_requests/getAllCompetitions')
        allCompetitions.value = storeCompetitions.value
      }
      async function fetchUsers() {
        await store.dispatch('_requests/getAllUsers')
        allUsers.value = storeUsers.value
      }

      if (storeCompetitions.value && storeCompetitions.value.length >= 1) {
        allCompetitions.value = storeCompetitions.value
      } else {
        await fetchCompetitions()
      }

      allCompetitions.value.forEach(async (eachCompetition: any) => {
        if (eachCompetition._id === competition_id) {
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
            competition_image: { avatar },
          } = eachCompetition
          const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

          competition_info.value.title = title
          competition_info.value.content = content
          competition_info.value.link = link
          competition_info.value.host = host
          competition_info.value.time = formattedTime
          competition_info.value.date = formattedDate
          competition_info.value.description = description
          competition_info.value.competition_image = avatar

          //
          reactions.value.no_of_comments = comments.length
          reactions.value.no_of_likes = likes.length
          reactions.value.post_comment_object.competition_id = _id
          reactions.value.post_comment_object.post_type = 'competition'

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
              competition_info.value.display_name = display_name
              competition_info.value.creator_username = username
              competition_info.value.creator_picture = creator_picture
            }
          })

          if (comments && comments.length <= 0)
            return (does_competition_have_comment.value = false)

          does_competition_have_comment.value = true

          comments.forEach(async (comment: any) => {
            const params = {
              comment_id: comment.comment_id,
              post_type: 'competition',
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
            const competition_comment_info = {
              comment: singleComment.comment,
              commenter_image,
              commneter_username: username,
              date: formattedDate,
              time: formattedTime,
            }

            competition_comments.value.unshift(competition_comment_info)
          })
        }
      })
      return

      // const response = await fetchSingleCompetition(_id)
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
      // competition_image,
      // content,
      // } = data

      // const { formattedDate, formattedTime } = formatDateAndTime(createdAt)

      // //
      // competition_info.value.title = title
      // competition_info.value.content = content
      // competition_info.value.link = link
      // competition_info.value.host = host
      // competition_info.value.time = formattedTime
      // competition_info.value.date = formattedDate
      // competition_info.value.description = description
      // competition_info.value.competition_image = competition_image.avatar

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

      //   competition_info.value.creator_picture = creator_picture
      //   competition_info.value.creator_username = username
      //   competition_info.value.display_name = display_name
      // }
      // getCreatorsInfo()

      // //
      // if (!data.comments || data.comments === undefined) return
      // Handle comment component data
      // if (data.comments <= 0) return (does_competition_have_comment.value = false)

      // does_competition_have_comment.value = true

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

      //   const competition_comment_info = {
      //     comment: data.comment,
      //     commenter_image,
      //     commneter_username: commenter_info.creator_username,
      //     date: formattedDate,
      //     time: formattedTime,
      //   }

      //   competition_comments.value.push(competition_comment_info)
      // })
    }

    onBeforeMount(async () => {
      const { competition_id } = route.params

      // await store.dispatch('_requests/getAllCompetitions')
      // await store.dispatch('_requests/getAllUsers')

      await getCompetitionDetails(competition_id)
    })
    return {
      competition_info,
      competition_comments,
      reactions,
      does_competition_have_comment,
      getCompetitionDetails,
    }
  },
}
</script>

<style scoped></style>
