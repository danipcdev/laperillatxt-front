import { createRouter, createWebHistory } from 'vue-router'
import TxtList from './components/TxtList.vue'
import TxtDetail from '@/components/TxtDetail.vue'
import TxtCreate from '@/components/TxtCreate.vue'
import TxtEdit from '@/components/TxtEdit.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: TxtList
    },
    {
        path: '/microrrelatos',
        name: 'Home-Microrrelatos',
        component: TxtList,
        props: { typeId: '992474e2-251c-4e97-8cc6-14f50d251ce4' }
    },
    {
        path: '/poesias',
        name: 'Home-Poesias',
        component: TxtList,
        props: { typeId: 'e8d7e23f-353b-4cdc-a847-d1a53788b370' }
    },
    {
        path: '/opinion',
        name: 'Home-Opinion',
        component: TxtList,
        props: { typeId: 'be99495e-e989-4466-9f65-409e79b502ac' }
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
    },
    {
        path: '/txt/:id/edit',
        name: 'txt-edit',
        component: TxtEdit,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router