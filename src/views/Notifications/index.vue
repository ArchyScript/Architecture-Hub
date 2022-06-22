<template>
  <div class="w-full top-0 h-full bg-archyhub-semi-light z-4 border-r border-l">
    <TopBarVue />

    <div class="pb-16 pt-4">
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
      <BasicNotificationVue />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TopBarVue from './TopBar.vue'
import BasicNotificationVue from '@/components/Notifications/BasicNotification.vue'

export default {
  name: 'Notifications',
  components: {
    TopBarVue,
    BasicNotificationVue,
  },
  setup() {
    const test_ref = ref('testing')

    return { test_ref }
  },
}
</script>

<style lang=""></style>
