<template>
  <section>{{ test }}</section>
</template>
<script>
  import { ref } from 'vue'
  export default {
    name: 'OtherSigninOptions',
    setup() {
      const test = ref('testing')
      return {
        test,
      }
    },
  }
</script>
<style lang="css"></style>
