<template>
  <div>
    <Toast :show="showToast" :message="toastMessage" />
    <Header />
    <router-view />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    Toast,
    Header
  },
  data() {
    return {
      showToast: false,
      toastMessage: ""
    };
  },
  methods: {
    displayToast(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>