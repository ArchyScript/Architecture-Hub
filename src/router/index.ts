import store from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Default Layout and entry point
const DefaultLayout = () => import('@/components/Layout/DefaultLayout.vue')

// User Authentication
const AuthLayout = () => import('@/views/auth/AuthLayout.vue')
const Login = () => import('@/views/auth/Login.vue')
const SignUp = () => import('@/views/auth/SignUp.vue')
const ResetPassword = () => import('@/views/auth/ResetPassword.vue')

//
const HomePage = () => import('@/views/HomePage/index.vue')
const Competitions = () => import('@/views/Competitions/index.vue')
const Scholarships = () => import('@/views/Scholarships/index.vue')
const Profile = () => import('@/views/Profile/index.vue')
const EditProfilePage = () => import('@/views/EditProfilePage/index.vue')
const Users = () => import('@/views/Users/index.vue')
const UserCommunity = () => import('@/views/Users/UserCommunity.vue')

//
const ContentDetailsLayout = () => import('@/views/ContentDetails/index.vue')
const PostDetails = () => import('@/views/ContentDetails/PostDetails.vue')
const CompetitionDetails = () =>
  import('@/views/ContentDetails/CompetitionDetails.vue')
const ScholarshipDetails = () =>
  import('@/views/ContentDetails/ScholarshipDetails.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    redirect: '/auth/login',
    name: 'Auth',
    meta: { isGuest: true },
    component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/auth/signup',
        name: 'SignUp',
        component: SignUp,
      },
      {
        path: '/auth/reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
    name: 'DefaultLayout',
    component: DefaultLayout,
    meta: { requiredAuth: true },
    children: [
      {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
      },
      {
        path: '/profile/:username',
        name: 'Profile',
        component: Profile,
      },
      {
        path: '/competitions',
        name: 'Competitions',
        component: Competitions,
      },
      {
        path: '/scholarships',
        name: 'Scholarships',
        component: Scholarships,
      },

      {
        path: '/users',
        name: 'Users',
        component: Users,
      },

      {
        path: '/profile/:username/edit',
        name: 'EditProfilePage',
        component: EditProfilePage,
      },
      {
        path: '/content-details',
        name: 'ContentDetailsLayout',
        component: ContentDetailsLayout,
        children: [
          {
            path: '/posts/:post_id',
            name: 'PostDetails',
            component: PostDetails,
          },
          {
            path: '/competitions/:competition_id',
            name: 'CompetitionDetails',
            component: CompetitionDetails,
          },
          {
            path: '/scholarships/:scholarship_id',
            name: 'ScholarshipDetails',
            component: ScholarshipDetails,
          },
          {
            path: '/user/:username/:followers_or_followings',
            name: 'UserCommunity',
            component: UserCommunity,
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // First checks if the route we want to access requires a token (login or signup)
  // and as well checks if the user has a token (from the store => token can be goten when user login or signup)
  // If the condition isn't met, then the user is redirected to the login page
  // ELSE IF the user has a token (logged in or signed in) and the user tries to acces the authentication (login or signup) page
  // and redirect the user to his or her dashboard
  // OR better put check if the user is logged in and tries to access any auth page
  // ELSE go to the route the wants to access

  if (to.meta.requiredAuth && !store.state.users.token) {
    router.push('/auth/login')
    next({ name: 'Login' })
  } else if (store.state.users.token && to.meta.isGuest) {
    router.push('/')
    next({ name: 'HomePage' })
  } else {
    next()
  }
})

export default router
