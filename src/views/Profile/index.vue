<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <TopBarVue />
    <ProfileHeaderVue />

    <div class="">
      <div class="w-full border-b flex items-center border-archyhub-light">
        <span
          v-for="profile_page_sub_nav in profile_page_sub_navs"
          :key="profile_page_sub_nav.title"
          @click="toggleActiveProfilePageLink(profile_page_sub_nav.title)"
          :class="
            current_active_profile_page_sub_nav === profile_page_sub_nav.title
              ? 'border-b-2 border-red-400 text-red-500'
              : ''
          "
          class="flex-1 py-2 sm:py-3 xl:py-4 space-x-1 sm:space-x-2 items-center cursor-pointer text-center hover:text-red-700 hover:bg-red-500 hover:bg-opacity-10 text-gray-500 font-medium"
        >
          <span
            :class="profile_page_sub_nav.icon"
            class="text-sm md:text-base xl:text-lg hidden sm:inline-flex"
          ></span>
          <span class="text-sm md:text-base xl:text-lg px-2 capitalize">
            {{ profile_page_sub_nav.title }}
          </span>
        </span>
      </div>

      <div class="mt-10 pb-8">
        <div class="">
          <div class="text-center font-medium mb-6">
            <span
              v-if="
                allPostsCreatedByUser.length < 1 &&
                current_active_profile_page_sub_nav === 'posts'
              "
            >
              {{ is_loading ? '' : ' No post found' }}
            </span>
            <span
              v-else-if="
                allPostsWithImageByUser.length < 1 &&
                current_active_profile_page_sub_nav === 'media'
              "
            >
              {{ is_loading ? '' : ' No media post found' }}
            </span>
            <span
              v-else-if="
                allPostsBoomarkedByUser.length < 1 &&
                current_active_profile_page_sub_nav === 'bookmarked'
              "
            >
              {{ is_loading ? '' : ' No bookmarked post found' }}
            </span>
          </div>

          <!-- <div class="text-center">
            <form @submit.prevent="getAllPostsByUser">
              <button
                class="text-md text-archyhub-semi-light bg-opacity-40 bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
              >
                <div class="w-full flex justify-center items-center space-x-2">
                  <span>{{ is_loading ? 'Loading' : 'Reload' }}</span>

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
          </div> -->

          <div class="" v-for="x in 10" :key="x">
            <AnimatedPostContentVue />
          </div>
        </div>

        <!-- <div v-else> -->
        <div>
          <!-- <div class="hidden text-center mb-8">
            <form @submit.prevent="getAllPostsByUser">
              <button
                class="text-md text-archyhub-semi-light bg-archyhub-main hover:text-archyhub-light font-bold rounded-2xl py-2 px-6"
              >
                <div class="w-full flex justify-center items-center space-x-2">
                  <span>{{ is_loading ? 'Loading' : 'More Post' }}</span>

                  {{ allPostsCreatedByUser }}

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
          </div> -->

          <!--  -->
          <div class="">
            <div v-if="current_active_profile_page_sub_nav === 'posts'">
              <div
                class=""
                v-for="eachPostByUser in allPostsCreatedByUser"
                :key="eachPostByUser._id"
              >
                <PostContentVue :eachPost="eachPostByUser" />
              </div>
            </div>

            <div v-else-if="current_active_profile_page_sub_nav === 'media'">
              <div
                class=""
                v-for="eachPostWithImageByUser in allPostsWithImageByUser"
                :key="eachPostWithImageByUser._id"
              >
                <PostContentVue :eachPost="eachPostWithImageByUser" />
              </div>
            </div>

            <div
              v-else-if="current_active_profile_page_sub_nav === 'bookmarked'"
            >
              <div
                class=""
                v-for="eachPostBoomarkedByUser in allPostsBoomarkedByUser"
                :key="eachPostBoomarkedByUser._id"
              >
                <div class="" v-if="eachPostBoomarkedByUser.post_image">
                  <PostContentVue :eachPost="eachPostBoomarkedByUser" />
                </div>
                <div class="" v-if="eachPostBoomarkedByUser.competition_image">
                  <CompetitionContentVue
                    :eachCompetition="eachPostBoomarkedByUser"
                  />
                </div>
                <div class="" v-if="eachPostBoomarkedByUser.scholarship_image">
                  <ScholarshipContentVue
                    :eachScholarship="eachPostBoomarkedByUser"
                  />
                </div>
                <!-- {{ eachPostBoomarkedByUser }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import TopBarVue from './TopBar.vue'
import ProfileHeaderVue from './ProfileHeader.vue'
import PostContentVue from '@/components/Posts/PostContent.vue'

import { useRoute } from 'vue-router'
import { fetchSingleUserByUsername } from '@/controller/api/users.api'
import { BookmarkedPostSchema } from '@/controller/typings'
import { useStore } from 'vuex'
import CompetitionContentVue from '@/components/Competitions/CompetitionContent.vue'
import ScholarshipContentVue from '@/components/Scholarships/ScholarshipContent.vue'
// import { fetchSingleUserByUsername } from '@/controller/api/users.api'

export default {
  name: 'Profile',
  components: {
    TopBarVue,
    ProfileHeaderVue,
    PostContentVue,
    CompetitionContentVue,
    ScholarshipContentVue,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const auth_user = computed(() => store.state.users.auth_user)
    const storeUsers = computed(() => store.state._requests.allUsers)
    const allUsers = ref([])
    const is_loading = ref(false)
    const allPostsCreatedByUser = ref<BookmarkedPostSchema[]>([])
    const allPostsWithImageByUser = ref<BookmarkedPostSchema[]>([])
    const allPostsBoomarkedByUser = ref<BookmarkedPostSchema[]>([])
    const current_active_profile_page_sub_nav = ref('posts')
    const allPosts = ref([])
    const allCompetitions = ref([])
    const allScholarships = ref([])
    const username_param = ref<any>('')
    const storePosts = computed(() => store.state._requests.allPosts)
    const storeCompetitions = computed(
      () => store.state._requests.allCompetitions,
    )
    const storeScholarships = computed(
      () => store.state._requests.allScholarships,
    )
    const profile_page_sub_navs = ref([
      {
        title: 'posts',
        icon: 'fa fa-sticky-note-o',
      },
      {
        title: 'media',
        icon: 'fa fa-image',
      },
      {
        title: 'bookmarked',
        icon: 'fa fa-bookmark-o',
      },
    ])

    const getAllPostsByUser = async () => {
      const { username } = route.params
      is_loading.value = true

      async function fetchUsers() {
        await store.dispatch('_requests/getAllUsers')
        allUsers.value = storeUsers.value
      }

      if (storeUsers.value.length >= 1) {
        allUsers.value = storeUsers.value
      } else {
        await fetchUsers()
      }

      //
      storeUsers.value.forEach(async (eachUser: any) => {
        if (eachUser.username === username) {
          const { posts, bookmarked } = await eachUser

          console.log('posts')
          console.log(posts)
          console.log('posts')
          console.log(posts)
          console.log('posts')
          console.log(posts)

          const post_type = current_active_profile_page_sub_nav.value

          if (post_type === 'bookmarked') {
            await getBookmarkedPostsDetails(bookmarked)
          } else {
            await getPostsDetails(posts, post_type)
          }
        }
      })

      is_loading.value = false
      store.dispatch('_requests/getAllPosts')
      store.dispatch('_requests/getAllScholarships')
      store.dispatch('_requests/getAllCompetitions')
      store.dispatch('_requests/getAllUsers')
    }

    // get data from store
    const fetchPosts = async () => {
      await store.dispatch('_requests/getAllPosts')
      allPosts.value = storePosts.value
    }
    const fetchCompetitions = async () => {
      await store.dispatch('_requests/getAllCompetitions')
      allCompetitions.value = storeCompetitions.value
    }
    const fetchScholarships = async () => {
      await store.dispatch('_requests/getAllScholarships')
      allScholarships.value = storeScholarships.value
    }

    //
    const getPostsDetails = async (posts_array: any, post_type: any) => {
      if (posts_array.length < 1) return

      const all_posts: any = []
      const all_posts_with_image: any = []
      if (storePosts.value && storePosts.value.length >= 1) {
        allPosts.value = storePosts.value
      } else {
        await fetchPosts()
      }

      await posts_array.forEach((post: any) => {
        allPosts.value.forEach((eachPost: any) => {
          const {
            _id,
            post_image: { avatar },
          } = eachPost

          if (post.post_id === _id) {
            if (post_type === 'posts') {
              all_posts.push(eachPost)
            }
            if (post_type === 'media' && avatar !== '') {
              all_posts_with_image.push(eachPost)
            }
          }
        })
      })

      if (post_type === 'posts') {
        allPostsCreatedByUser.value = all_posts
      }
      if (post_type === 'media') {
        allPostsWithImageByUser.value = all_posts_with_image
      }
    }

    //
    const getBookmarkedPostsDetails = async (bookmarked_posts: any) => {
      if (bookmarked_posts.length < 1) return

      const all_bookmarked_posts: any = []

      if (storePosts.value && storePosts.value.length >= 1) {
        allPosts.value = storePosts.value
      } else {
        await fetchPosts()
      }
      if (storeCompetitions.value && storeCompetitions.value.length >= 1) {
        allCompetitions.value = storeCompetitions.value
      } else {
        await fetchCompetitions()
      }
      if (storeScholarships.value && storeScholarships.value.length >= 1) {
        allScholarships.value = storeScholarships.value
      } else {
        await fetchScholarships()
      }

      console.log(allPosts.value)
      console.log(allCompetitions.value)
      console.log(allScholarships.value)

      await bookmarked_posts.forEach((bookmarked_post: any) => {
        const { post_id, post_type } = bookmarked_post

        console.log(bookmarked_post)
        // "post_id": "62d4c20c411a6587c2c3a2e2",
        //                 "post_type": "scholarship"
        if (post_type === 'post') {
          console.log(934748)
          allPosts.value.forEach((eachPost: any) => {
            const { _id } = eachPost

            if (post_id === _id) {
              all_bookmarked_posts.push(eachPost)
            }
          })
        }
        if (post_type === 'competition') {
          console.log(7438479374)

          allCompetitions.value.forEach((eachCompetition: any) => {
            const { _id } = eachCompetition

            if (post_id === _id) {
              all_bookmarked_posts.push(eachCompetition)
            }
          })
        }
        if (post_type === 'scholarship') {
          console.log(28927665)
          allScholarships.value.forEach(async (eachScholarship: any) => {
            // const { _id } = eachScholarship
            const { _id } = await eachScholarship

            console.log(eachScholarship)
            if (post_id === _id) {
              console.log('the same')

              all_bookmarked_posts.push(eachScholarship)
            }
          })
        }
      })

      allPostsBoomarkedByUser.value = all_bookmarked_posts
    }

    const toggleActiveProfilePageLink = async (current_active: string) => {
      current_active_profile_page_sub_nav.value = current_active
      console.log(current_active)

      // if (current_active_profile_page_sub_nav)
      await getAllPostsByUser()
    }

    onBeforeMount(async () => {
      // await store.dispatch('_requests/getAllPosts')
      // await store.dispatch('_requests/getAllUsers')

      await getAllPostsByUser()
    })

    return {
      profile_page_sub_navs,
      current_active_profile_page_sub_nav,
      allPostsCreatedByUser,
      allPostsBoomarkedByUser,
      allPostsWithImageByUser,
      is_loading,
      getAllPostsByUser,
      toggleActiveProfilePageLink,
      getBookmarkedPostsDetails,
    }
  },
}
</script>

<style lang=""></style>
