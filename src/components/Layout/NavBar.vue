<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    test1
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <h1 class="navbar-item is-size-4 is-family-monospace">Vulletin</h1>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
      >
        <div class="navbar-end">
          <RouterLink to="/" class="navbar-item">Notes</RouterLink>
          <RouterLink to="stats" class="navbar-item">Stats</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showMobileNav = ref(false);
</script>

<style scoped>
.navbar-menu {
  position: absolute;
  left: 0;
  width: 100%;
}
</style>
