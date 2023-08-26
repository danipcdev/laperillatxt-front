<template>
  <transition name="fade">
    <div v-if="show" class="toast" :class="{'success-toast': type === 'success', 'error-toast': type === 'error'}">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    message: String,
    type: {
      type: String,
      default: 'info'
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.success-toast {
  background-color: #28a745; /* verde */
}

.error-toast {
  background-color: #dc3545; /* rojo */
}
</style>