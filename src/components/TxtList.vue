<template>
  <div class="container-max">
    <Toast :show="showToast" :message="toastMessage" :type="'success'" @click="showToast = false" />
    <ul class="list">
      <li class="list-item" v-for="txt in txts" :key="txt.id">
        <router-link :to="{ name: 'txt-detail', params: { id: txt.id } }" class="full-link">
          <span class="title">{{ txt.title }}</span>
          <p class="text">{{ truncatedText(txt.text) }}</p>
          <span class="type-list">{{ txt.type.name }}</span>
        </router-link>
      </li>
    </ul>
    <div class="pagination">
      <button @click="setPage(page - 1)" :disabled="page === 1" class="page-btn">&#x2190;</button>
      <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ 'active-page': page === pageNumber }"
          @click="setPage(pageNumber)"
          class="page-btn">
        {{ pageNumber }}
      </button>
      <button @click="setPage(page + 1)" :disabled="page === totalPages" class="page-btn">&#x2192;</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import apiService from '@/services/apiService'
import Toast from '@/components/Toast.vue'

export default {
  components: {
    Toast
  },
  setup() {
    const txts = ref([])
    const meta = ref({});
    const page = ref(1);
    const toastMessage = ref("")
    const showToast = ref(false)

    onMounted(() => {
      const message = sessionStorage.getItem("toastMessage");
      if (message) {
        toastMessage.value = message
        showToast.value = true
        sessionStorage.removeItem("toastMessage");
      }
      loadTxts()
    });

    const loadTxts = () => {
      apiService.getTxts(page.value).then(response => {
        txts.value = response.data.items
        meta.value = response.data.meta
      })
    }

    const nextPage = () => {
      if (meta.value.hasNext) {
        page.value++
        loadTxts()
      }
    }

    const prevPage = () => {
      if (page.value > 1) {
        page.value--
        loadTxts()
      }
    }


    const totalPages = computed(() => {
      if (typeof meta.value.total !== 'number' || typeof meta.value.limit !== 'number' || meta.value.limit === 0) {
        return 0
      }
      return Math.ceil(meta.value.total / meta.value.limit)
    });

    const setPage = (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages.value) {
        page.value = pageNumber
        loadTxts()
      }
    };

    const truncatedText = (text) => {
      return text.slice(0, 100) + ' ...'
    }

    return {
      txts,
      truncatedText,
      showToast,
      toastMessage,
      nextPage,
      prevPage,
      meta,
      page,
      setPage,
      totalPages
    }
  }
}
</script>

<style>
.container-max {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
}

.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.list-item {
  padding: 1.2rem;
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  list-style: none;
  transition: box-shadow 0.3s, transform 0.3s;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.text {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #555;
}

.type-list {
  font-size: 0.9rem;
  color: #888;
}

.list-item a {
  color: inherit;
  text-decoration: none;
}

.list-item:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.full-link {
  display: block;
  height: 100%;
  width: 100%;
  color: inherit;
  text-decoration: none;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.page-btn {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  color: #333;
  padding: 5px 10px;
  margin: 0 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.page-btn {
  background-color: #fff;
  border: 2px solid #ddd;
  color: #333;
  padding: 8px;
  margin: 0 3px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.page-btn:hover {
  background-color: #333;
  color: #fff;
  border-color: #333;
}

.page-btn:disabled {
  cursor: not-allowed;
  color: #aaa;
}

.active-page {
  background-color: #333;
  color: #fff;
  border-color: #333;
}
</style>
