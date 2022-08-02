<template>
  <div class="bg_ image bg-archyhub-semi-light bg-opacity-40">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  setup() {
    return {}
  },
}
</script>

<style scoped>
.bg_image {
  background-color: #ffffff;
  background-image: url('https://media.istockphoto.com/photos/nanjing-international-youth-convention-centerdesigner-zaha-city-in-picture-id924784058?b=1&k=20&m=924784058&s=170667a&w=0&h=efN-DIoZBQHCNwS40XWypC0dTOSsNDFIJa4x6idDnsE=');
  background-image: url('https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
