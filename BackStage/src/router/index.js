import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: ()=>import('../views/home/homeMock.vue')
            },
            {
                path: '/mall',
                name: 'mall',
                component: ()=>import('../views/mall/Mall.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: ()=>import('../views/user/User1.vue')
            },
            {
                path: '/page1',
                name: 'page1',
                component: ()=>import('../views/page1/Page1.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                component: ()=>import('../views/page2/Page2.vue')
            },
        ]
    }
]

const router = createRouter({
        history: createWebHashHistory(),
        routes
    })

export default router