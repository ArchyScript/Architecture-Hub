require('dotenv')
// utils/useAuth0.js
import createAuth0Client from '@auth0/auth0-spa-js'
import { reactive } from 'vue'

export const AuthState = reactive({
  user: null,
  loading: false,
  isAuthenticated: false,
  auth0: null,
})

const config = {
  domain: process.env.ArchyHub_AUTH0_DOMAIN,
  client_id: process.env.ArchyHub_CLIENT_ID,
}
