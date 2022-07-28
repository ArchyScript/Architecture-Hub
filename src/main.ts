import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
// import Toast from 'vue-toastification'
// Import the CSS or use your own!
// import 'vue-toastification/dist/index.css'
// import toast from '@k90mirzaei/vue-toast'
// import 'vue-toast/dist/index.css'
// import VueNotification from "@kugatsu/vue3-toast";
// import toast from '@k90mirzaei/vue-toast'
// import '@k90mirzaei/vue-toast/dist/index.css'
// import Toaster from "@meforma/vue-toaster";
// createApp(App)
//   .use(VueNotification, { duration: 5000 })
const options: any = {
  duration: 5000,
  positionY: 'bottom', // 'top' or 'bottom'
  positionX: 'right', // 'left', 'right' or 'center'
  disableClick: true,
  styles: {
    color: '#000',
    backgroundColor: '#fff',
    // Vendor prefixes also supported
  },
  class: 'custom-class', // Added to each toast,
  max: 10,
}
// const options = {
//     timeout: 2000,
//     closeOnClick: false,
//     dragable: false,
//     }
import '@dafcoe/vue-notification/dist/vue-notification.css'
import DKToast from 'vue-dk-toast'
// createApp(App).use(Toast, options).use(router).use(store).mount('#app')
import Toast from 'vue3-toast-single'
import 'vue3-toast-single/dist/toast.css'

// createApp(App).use(Toast, { verticalPosition: "bottom", duration: 1500 }).use(router).use(store).mount('#app')
createApp(App).use(router).use(store).mount('#app')
