<template>
  <div class="container-detail">
    <span class="type" v-if="txt.type">{{ txt.type.name }}</span>
    <h2>{{ txt.title }}</h2>
    <p class="line-breaks">{{ txt.text }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import apiService from '@/services/apiService'

export default {
  props: ['id'],
  setup(props) {
    const txt = ref({})

    apiService.getTxtById(props.id).then(response => {
      txt.value = response.data
    })
    return {
      txt
    }
  }
}
</script>

<style>
.container-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.2rem;
  background-color: #ffffff;
}

h2 {
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.type {
  font-size: 1.1rem;
  font-weight: bold;
  display: block;
  text-align: center;
  color: #888;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: justify;
  color: #555;
  line-height: 1.5;
}

.line-breaks {
  white-space: pre-line;
}

</style>