<template>
  <div class="container">
    <h2 class="heading">Editar txt</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="typeId">Categoría</label>
        <div class="select-container">
          <select v-model="formData.typeId" required>
            <option value="" disabled selected>- Selecciona -</option>
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="title">Título</label>
        <input type="text" id="title" v-model="formData.title" required>
      </div>

      <div class="form-group">
        <label for="text">Texto</label>
        <textarea id="text" v-model="formData.text" required></textarea>
      </div>

      <button type="submit">Actualizar</button>
    </form>
    <Toast :show="showToast" :message="toastMessage" :type="toastType" @click="showToast = false" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '@/components/Toast.vue'
import apiService from '@/services/apiService'

export default {
  props: ['id'],
  components: {
    Toast
  },
  setup(props) {
    const formData = ref({
      title: '',
      text: '',
      typeId: ''
    });

    const types = ref([])
    const toastMessage = ref("")
    const showToast = ref(false)
    const toastType = ref('info')

    const router = useRouter();

    apiService.getTypes().then(response => {
      types.value = response.data.items
    });

    onMounted(() => {
      apiService.getTxtById(props.id).then(response => {
        formData.value = response.data
        formData.value.typeId = response.data.type.id
      })
    })

    const submitForm = () => {
      apiService.updateTxt(props.id, formData.value)
          .then(response => {
            toastType.value = 'success'
            toastMessage.value = "Txt actualizado con éxito!"
            sessionStorage.setItem("toastMessage", toastMessage.value)
            router.push({ name: 'txt-detail', params: { id: props.id } })
          })
          .catch(error => {
            toastType.value = 'error'
            if (error.response && error.response.data && error.response.data.error) {
              toastMessage.value = error.response.data.error
            } else {
              toastMessage.value = "Ocurrió un error desconocido al actualizar el txt."
            }
            showToast.value = true
          })
    }

    return {
      formData,
      types,
      submitForm,
      showToast,
      toastMessage,
      toastType
    }
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
}

.heading {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: white;
  appearance: none;
  outline: none;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #007BFF;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: white;
  resize: none;
}

.select-container {
  position: relative;
  width: 50%;
  margin: 0;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 10px 30px 10px 10px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: block;
}

.select-container::after {
  content: '\25BC';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
  font-size: 0.7rem;
}

button {
  background-color: #000000;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
  display: block;
  margin: 20px auto;
}

button:hover {
  background-color: #333333;
  color: #ffffff;
}

button:active {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>