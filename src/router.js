import { createRouter, createWebHistory } from 'vue-router'
import TxtList from './components/TxtList.vue'
import TxtDetail from '@/components/TxtDetail.vue'
import TxtCreate from '@/components/TxtCreate.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: TxtList
    },
    {
        path: '/txt/:id',
        name: 'txt-detail',
        component: TxtDetail,
        props: true
    },
    {
        path: '/create',
        name: 'txt-create',
        component: TxtCreate
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router