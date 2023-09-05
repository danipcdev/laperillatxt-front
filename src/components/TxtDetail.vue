<template>
  <div class="container-detail">
    <span class="type" v-if="txt.type">{{ txt.type.name }}</span>
    <h2>{{ txt.title }}</h2>
    <p class="line-breaks">{{ txt.text }}</p>
    <div class="actions" v-if="txt.id">
      <router-link :to="{ name: 'txt-edit', params: { id: txt.id } }" class="edit-link">Editar</router-link>
      <button @click="deleteTxt" class="delete-button">Borrar</button>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '@/services/apiService'

export default {
  props: ['id'],
  setup(props) {
    const { id } = toRefs(props)
    const txt = ref({})
    const router = useRouter()
    const toastMessage = ref("")
    const toastType = ref('info')

    apiService.getTxtById(id.value).then(response => {
      txt.value = response.data
    })

    const deleteTxt = async () => {
      try {
        await apiService.deleteTxtById(id.value)
            .then(response => {
              toastType.value = 'success'
              toastMessage.value = "Txt borrado con éxito!"
              sessionStorage.setItem("toastMessage", toastMessage.value)
              router.push({ name: 'Home' })
            })
      } catch (error) {
        console.error("Error deleting the txt: ", error)
      }
    }

    return {
      txt,
      deleteTxt
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

.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
}

.edit-link, .delete-button {
  margin-left: 10px;
  padding: 10px 15px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  background-color: #ddd;
  color: #555;
  border-radius: 5px;
}

.edit-link:hover, .delete-button:hover {
  background-color: #ccc;
}

.delete-button {
  background-color: #f44336;
  color: white;
  margin: 0;
}

.delete-button:hover {
  background-color: #e53935;
}

</style>