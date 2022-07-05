import store from '@/store'
import axios from 'axios'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Default Layout and entry point
const DefaultLayout = () => import('@/components/Layout/DefaultLayout.vue')
// const PageContentLayout = () => import('@/components/Layout/PageContentLayout.vue')

//
const HomePage = () => import('@/views/HomePage/index.vue')
const Competitions = () => import('@/views/Competitions/index.vue')
const Explore = () => import('@/views/Explore/index.vue')
const NewsUpdate = () => import('@/views/NewsUpdate/index.vue')
const Profile = () => import('@/views/Profile/index.vue')
const EditProfilePage = () => import('@/views/EditProfilePage/index.vue')
const Notifications = () => import('@/views/Notifications/index.vue')
const More = () => import('@/views/More/index.vue')

// User Authentication
const AuthLayout = () => import('@/views/auth/AuthLayout.vue')
const Login = () => import('@/views/auth/Login.vue')
const SignUp = () => import('@/views/auth/SignUp.vue')
const ResetPassword = () => import('@/views/auth/ResetPassword.vue')

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
        path: '/profile/:_id',
        name: 'Profile',
        component: Profile,
      },
      {
        path: '/competitions',
        name: 'Competitions',
        component: Competitions,
      },
      {
        path: '/explore',
        name: 'Explore',
        component: Explore,
      },
      {
        path: '/news-update',
        name: 'NewsUpdate',
        component: NewsUpdate,
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: Notifications,
      },
      // {
      //   path: '/more',
      //   name: 'More',
      //   component: More,
      // },

      {
        path: '/profile/:_id/edit',
        name: 'EditProfilePage',
        component: EditProfilePage,
      },
      // {
      //   path: '/',
      //   name: '',
      //   component: HomePage,
      // },
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
  console.log(store.state.users)
  console.log(store.state.users.token)

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
