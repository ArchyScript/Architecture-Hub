<template>
  <div>
    <h2 class="text-green-900 font-bold font-3xl">Welcome {{ username }}</h2>
    <!-- <Alert /> -->

    <!-- <div v-if="authenticated" class="">
      Hey {{ user.name }}, successfull login
      <button @click="logout()">Logout</button>
    </div>
    <div v-else class="">
      please login
      <button @click="login()">Login</button>
    </div> -->
  </div>
</template>

<script>
// C:\Users\HP\Desktop\Code\Personal Project\Fullstack\architecture-hub\src\components\Response\Alert.vue
// import { ref } from 'vue'
// import Alert from '../Response/Alert.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  // components: { Alert },
  name: 'Dashboard',
  data: () => ({
    username: '',
  }),

  methods: {
    ...mapActions(['']),

    setUser() {
      this.username = this.singleUser.username
    },
  },

  computed: mapGetters(['singleUser']),

  created() {
    this.setUser()
  },
}
</script>

<style scoped></style>
