import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // ... другие маршруты ...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

