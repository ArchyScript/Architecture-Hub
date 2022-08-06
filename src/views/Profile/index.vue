<template>
  <div
    class="w-full top-0 h-full bg-archyhub-semi-light bg-opacity-20 z-4 border-r border-l"
  >
    <TopBarVue />
    <ProfileHeaderVue />

    <div class="">
      <div
        class="w-full border-b flex items-center border-archyhub-semi-light border-opacity-60"
      >
        <span
          v-for="profile_page_sub_nav in profile_page_sub_navs"
          :key="profile_page_sub_nav.title"
          @click="toggleActiveProfilePageLink(profile_page_sub_nav.title)"
          :class="
            current_active_profile_page_sub_nav === profile_page_sub_nav.title
              ? 'border-b-2  border-archyhub-main text-archyhub-main'
              : ''
          "
          class="flex-1 py-2 sm:py-3 xl:py-4 space-x-1 sm:space-x-2 items-center cursor-pointer text-center hover:text-archyhub-main hover:bg-archyhub-main hover:bg-opacity-10 text-gray-500 font-medium"
        >
          <span
            :class="profile_page_sub_nav.icon"
            class="text-xs sm:text-sm lg:text-base xl:text-lg hidden sm:inline-flex"
          ></span>
          <span
            class="text-xs sm:text-sm lg:text-base xl:text-lg px-2 capitalize"
          >
            {{ profile_page_sub_nav.title }}
          </span>
        </span>
      </div>

      <div class="mt-10 pb-8">
        <div class="">
          <div
            class="text-center font-normal text-xs sm:text-sm lg:text-base text-gray-700 mb-6"
          >
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

          <!--  -->
          <div class="" v-for="x in 10" :key="x">
            <AnimatedPostContentVue />
          </div>
        </div>

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

          <div v-else-if="current_active_profile_page_sub_nav === 'bookmarked'">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { BookmarkedPostSchema } from '@/controller/typings'
import TopBarVue from './TopBar.vue'
import ProfileHeaderVue from './ProfileHeader.vue'
import PostContentVue from '@/components/Posts/PostContent.vue'
import CompetitionContentVue from '@/components/Competitions/CompetitionContent.vue'
import ScholarshipContentVue from '@/components/Scholarships/ScholarshipContent.vue'
import router from '@/router'

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
    const storeUsers = computed(() => store.state._requests.allUsers)
    const is_loading = ref(false)
    const allPostsCreatedByUser = ref<BookmarkedPostSchema[]>([])
    const allPostsWithImageByUser = ref<BookmarkedPostSchema[]>([])
    const allPostsBoomarkedByUser = ref<BookmarkedPostSchema[]>([])
    const current_active_profile_page_sub_nav = ref('posts')
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

    const toggleActiveProfilePageLink = async (current_active: string) => {
      current_active_profile_page_sub_nav.value = current_active
      await getAllPostsByUser()
    }

    const getAllPostsByUser = async () => {
      const { username } = route.params
      is_loading.value = true

      if (storeUsers.value && storeUsers.value.length < 1) await fetchUsers()

      storeUsers.value.forEach(async (eachUser: any) => {
        if (eachUser.username === username) {
          const { posts, bookmarked } = await eachUser

          const post_type = current_active_profile_page_sub_nav.value

          if (post_type === 'bookmarked') {
            await getBookmarkedPostsDetails(bookmarked)
          } else {
            await getPostsDetails(posts, post_type)
          }
        }
      })

      is_loading.value = false

      await fetchUsers()
      await fetchPosts()
      await fetchCompetitions()
      await fetchScholarships()
    }

    //
    const getPostsDetails = async (posts_array: any, post_type: any) => {
      if (posts_array.length < 1) return

      const all_posts: any = []
      const all_posts_with_image: any = []

      //
      if (storePosts.value && storePosts.value.length < 1) await fetchPosts()

      await posts_array.forEach((post: any) => {
        storePosts.value.forEach((eachPost: any) => {
          const {
            _id,
            post_image: { avatar },
          } = eachPost

          if (post.post_id === _id) {
            if (post_type === 'posts') {
              all_posts.unshift(eachPost)
            }
            if (post_type === 'media' && avatar !== '') {
              all_posts_with_image.unshift(eachPost)
            }
          }
        })
      })

      //
      if (post_type === 'posts') allPostsCreatedByUser.value = all_posts
      if (post_type === 'media')
        allPostsWithImageByUser.value = all_posts_with_image
    }

    //
    const getBookmarkedPostsDetails = async (bookmarked_posts: any) => {
      if (bookmarked_posts.length < 1) return

      const all_bookmarked_posts: any = []

      //
      if (storePosts.value && storePosts.value.length < 1) await fetchPosts()
      if (storeScholarships.value && storeScholarships.value.length < 1)
        await fetchScholarships()
      if (storeCompetitions.value && storeCompetitions.value.length < 1)
        await fetchCompetitions()

      await bookmarked_posts.forEach((bookmarked_post: any) => {
        const { post_id, post_type } = bookmarked_post

        if (post_type === 'post') {
          storePosts.value.forEach((eachPost: any) => {
            const { _id } = eachPost

            if (post_id === _id) {
              all_bookmarked_posts.push(eachPost)
            }
          })
        }
        if (post_type === 'competition') {
          storeCompetitions.value.forEach((eachCompetition: any) => {
            const { _id } = eachCompetition

            if (post_id === _id) {
              all_bookmarked_posts.push(eachCompetition)
            }
          })
        }
        if (post_type === 'scholarship') {
          storeScholarships.value.forEach(async (eachScholarship: any) => {
            const { _id } = await eachScholarship

            if (post_id === _id) {
              all_bookmarked_posts.push(eachScholarship)
            }
          })
        }
      })

      allPostsBoomarkedByUser.value = all_bookmarked_posts
    }

    // fetch data from store
    async function fetchUsers() {
      await store.dispatch('_requests/getAllUsers')
    }
    async function fetchPosts() {
      await store.dispatch('_requests/getAllPosts')
    }
    async function fetchCompetitions() {
      await store.dispatch('_requests/getAllCompetitions')
    }
    async function fetchScholarships() {
      await store.dispatch('_requests/getAllScholarships')
    }

    //
    const scrollToTop = () => window.scrollTo(0, 0)

    const redirectToLoginPage = async () => {
      await store.dispatch('users/assignToken', null)

      router.push('/auth/login')
    }

    onBeforeMount(async () => {
      const { username } = route.params

      if (username === null || username === undefined || username === '')
        return redirectToLoginPage()

      await fetchUsers()
      await getAllPostsByUser()
      getAllPostsByUser()
      scrollToTop()
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
