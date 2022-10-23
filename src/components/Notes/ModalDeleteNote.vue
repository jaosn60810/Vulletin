<template>
  <div class="modal p-2" :class="{ 'is-active': modelValue }">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="closeModal">Cancel</button>
        <button class="button is-danger" @click="storeNotes.deleteNote(noteId)">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { userStoreNotes } from '@/stores/storeNotes';

import { onClickOutside } from '@vueuse/core';

// ============================================

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  noteId: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['update:modelValue']);

// =========================================

const storeNotes = userStoreNotes();

// =========================================

const modalCardRef = ref(null);

// ============================================

const closeModal = () => {
  emits('update:modelValue', false);
};

const handleKeyboard = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

// ============================================

onClickOutside(modalCardRef, closeModal);

// ============================================

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard);
});
</script>

<style scoped></style>
