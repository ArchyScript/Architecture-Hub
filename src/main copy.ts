// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// tailwind
import '@/assets/css/tailwind.css'
// Import the Auth0 configuration and plugin
// import { domain, clientId, audience } from '../auth_config.json'
// import { Auth0Plugin } from '@/auth/auth0-plugin'

// Install the authentication plugin
// Vue.use(Auth0Plugin, {
//     domain,s
//     clientId,
//     audience,
//     onRedirectCallback: (appState: any) => {
//       router.push(
//         appState && appState.targetUrl
//           ? appState.targetUrl
//           : window.location.pathname
//       )
//     },
//   })

// Vue.config.productionTip = false

createApp(App).use(router).use(store).mount('#app')
