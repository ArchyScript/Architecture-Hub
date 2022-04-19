import store from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//
// Layout
const DefaultLayout = () => import('@/components/Layout/DefaultLayout.vue')
const Dashboard = () => import('@/components/Layout/Dashboard.vue')
const Profile = () => import('@/components/Layout/Profile.vue')
// Dashboard
// User Authentication
const AuthLayout = () => import('@/components/auth/AuthLayout.vue')
const Login = () => import('@/components/auth/Login.vue')
const SignUp = () => import('@/components/auth/SignUp.vue')
const ResetPassword = () => import('@/components/auth/ResetPassword.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'DefaultLayout',
    component: DefaultLayout,
    meta: { requiredAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
      },
    ],
  },
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
  if (to.meta.requiredAuth && !store.state.token) {
    next({ name: 'Login' })
  } else if (store.state.token && to.meta.isGuest) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
