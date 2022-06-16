<template>
  <section class="my-6">
    <div class="mt-16 grid space-y-4">
      <div
        class="w-full mx-auto"
        v-for="signinOption in signinOptions"
        :key="signinOption"
      >
        <button
          class="w-full mb-1 py-3 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
        >
          <div class="flex items-center space-x-4 justify-center">
            <img :src="signinOption.logo" class="w-5 mr-4" alt="logo" />
            <!-- :alt="`${signinOption.platform} logo`" -->

            <span
              :class="signinOption.color"
              class="block w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-blue-600 sm:text-base"
            >
              Continue with
              {{ signinOption.platform }}
            </span>
          </div>
        </button>
      </div>
    </div>

    <div class="mt-16 mb-6 space-y-6 text-gray-600 text-center sm:-mb-8">
      <p class="text-xs">
        By proceeding, you agree to our
        <a href="#" class="underline">Terms of Use</a> and confirm you have read
        our <a href="#" class="underline">Privacy and Cookie Statement</a>.
      </p>
      <p class="text-xs">
        This site is protected by reCAPTCHA and the
        <a href="#" class="underline">Google Privacy Policy</a> and
        <a href="#" class="underline">Terms of Service</a> apply.
      </p>
    </div>
  </section>
</template>

<script>
  import { ref } from 'vue'
  export default {
    name: 'OtherSigninOptions',
    setup() {
      const signinOptions = ref([
        {
          logo: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png`,
          platform: 'Google',
          color: 'text-blue-500',
        },
        // {
        //   logo: `https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg`,
        //   platform: 'GitHub',
        //   color: 'text-gray-900',
        // },
        {
          logo: `https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg`,
          platform: 'Facebook',
          color: 'text-blue-800',
        },
        // {
        //   logo: `https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg`,
        //   platform: 'Instagram',
        //   color: 'text-purple-500',
        // },
      ])
      return {
        signinOptions,
      }
    },
  }
</script>
<style lang="css"></style>
