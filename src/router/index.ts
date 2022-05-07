import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PersonDetail from '../components/PersonDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/person/:id', component: PersonDetail },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
