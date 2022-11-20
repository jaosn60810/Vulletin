import { createRouter, createWebHashHistory } from 'vue-router';

import { userStoreAuth } from '@/stores/storeAuth';

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
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/ViewAuth.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'is-active',
});

router.beforeEach(async (to, from) => {
  const storeAuth = userStoreAuth();
  if (!storeAuth.userData.id && to.name !== 'auth') {
    return { name: 'auth' };
  }

  if (storeAuth.userData.id && to.name === 'auth') {
    return false;
  }
});

export default router;
