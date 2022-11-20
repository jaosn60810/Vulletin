<template>
  <NavBar></NavBar>
  <main class="container is-max-desktop px-2 py-4">
    <RouterView></RouterView>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { userStoreAuth } from '@/stores/storeAuth';

import NavBar from '@/components/Layout/NavBar.vue';

// =========================================

const storeAuth = userStoreAuth();

// =========================================
onMounted(() => {
  storeAuth.init();
});
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
