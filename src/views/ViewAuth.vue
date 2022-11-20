<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }" @click="register = false">
          <a>Login</a>
        </li>
        <li :class="{ 'is-active': register }" @click="register = true">
          <a>Register</a>
        </li>
      </ul>
    </div>

    <div class="card mx-auto auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>

        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                v-model.trim.lazy="credentials.email"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="Enter a password"
                v-model.trim.lazy="credentials.password"
              />
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button type="submit" class="button is-primary">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { userStoreAuth } from '@/stores/storeAuth';

// =========================================

const storeAuth = userStoreAuth();

// =========================================

const register = ref(false);

const credentials = ref({
  email: '',
  password: '',
});

// =========================================

const onSubmit = () => {
  if (!credentials.value.email || !credentials.value.password) {
    alert('Please enter an email and password');
  }

  if (register.value) {
    storeAuth.registerUser(credentials.value);
  } else {
    storeAuth.loginUser(credentials.value);
  }
};

// =========================================

const formTitle = computed(() => (register.value ? 'Register' : 'Login'));
</script>

<style scoped>
.auth-form {
  max-width: 400px;
}
</style>
