import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';

const routes = [
  { path: '/', component: Home },
  // { path: '/detail', component: Detail },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
