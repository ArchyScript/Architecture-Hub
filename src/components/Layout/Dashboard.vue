<template>
  <div>
    <h2 class="text-green-900 font-bold font-3xl">Welcome {{ username }}</h2>
  </div>
</template>

<script>
  // import { ref } from 'vue'
  // import OtherSigninOptions from './OtherSigninOptions.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
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
