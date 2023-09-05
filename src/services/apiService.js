import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:1000',
    withCredentials: false,
    headers: {
        Accept: 'application/json'
        //'Content-Type': 'application/json'
    }
})

export default {
    getTxts(query) {
        let url = `/txt/search?sort=title&order=asc&page=${query.page}`;
        if (query.typeId) {
            url += `&typeId=${query.typeId}`;
        }
        return apiClient.get(url).catch(error => {
            console.error("Error fetching data: ", error);
            throw error;
        });
    },
    getTxtById(id) {
        return apiClient.get(`/txt/${id}`).catch(error => {
            console.error("Error fetching data: ", error)
            throw error;
        })
    },
    getTypes: function() {
        return apiClient.get('/type/search?order=asc&sort=name').catch(error => {
            console.error("Error fetching data: ", error)
            throw error
        })
    },
    createTxt: function(data) {
        return apiClient.post('/txt/create', data).catch(error => {
            console.error("Error creating txt: ", error)
            throw error
        })
    }
}