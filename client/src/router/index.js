import { createRouter, createWebHistory } from 'vue-router';
import MoviesPage from '@/pages/MoviesPage.vue';

const routes = [
    {
        path: '/',
        name: 'Movies',
        component: MoviesPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
