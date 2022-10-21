<template>
  <NavBar></NavBar>

  <RouterView></RouterView>
</template>

<script lang="ts" setup>
import NavBar from '@/components/Layout/NavBar.vue';
</script>

<style lang="scss">
@import 'bulma/css/bulma.min.css';
</style>
