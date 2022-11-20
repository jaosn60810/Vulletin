<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
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
          ref="navbarBurgerRef"
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
        ref="navbarMenuRef"
      >
        <div class="navbar-start is-flex is-align-items-center">
          <button
            v-if="storeAuth.userData.id"
            @click="logout"
            class="button is-small is-info ml-3"
          >
            Log out {{ storeAuth.userData.email }}
          </button>
        </div>

        <div class="navbar-end">
          <RouterLink @click="showMobileNav = false" to="/" class="navbar-item">
            Notes
          </RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            to="/stats"
            class="navbar-item"
            >Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { userStoreAuth } from '@/stores/storeAuth';

// =========================================

const storeAuth = userStoreAuth();

// ============================================

const showMobileNav = ref(false);
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

// ============================================

const logout = () => {
  storeAuth.logoutUser();
  showMobileNav.value = false;
};

// ============================================

onClickOutside(navbarMenuRef, () => (showMobileNav.value = false), {
  ignore: [navbarBurgerRef],
});
</script>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
