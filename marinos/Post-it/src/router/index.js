import {createRouter, createWebHistory} from 'vue-router'
import Posts from "@/components/postsP.vue";
import Create from "@/components/CreatE.vue";

import NotFound from "@/components/NotFound.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'posts',
            component: Posts
        },

        {
            path: '/create',
            name: 'create',
            component: Create
        },
        {
            path: '/:pathMatch(.*)*',component: NotFound
            
            
        },

    ]
})

export default router
