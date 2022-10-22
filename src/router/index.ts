import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'notes',
    component: () => import('@/views/ViewNote.vue'),
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: () => import('@/views/ViewEditNote.vue'),
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/views/ViewStats.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'is-active',
});

export default router;
