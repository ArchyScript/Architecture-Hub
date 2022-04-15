<template>
  <div>
    <h3 class="text-green-900 font-bold font-3xl">Login</h3>

    <router-link to="/auth/reset-password">Reset Password?</router-link>
    <br />
    <router-link :to="{ name: 'SignUp' }">Signup</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  setup() {
    return {}
  },
}
</script>

<style scoped></style>
