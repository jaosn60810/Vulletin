<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light">
          <small class="column">{{ dateFormatted }} </small>
          <small class="column has-text-right">{{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">
        Edit
      </RouterLink>
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="modal.deleteNote = true"
      >
        Delete
      </a>
    </footer>
    <ModalDeleteNote
      v-if="modal.deleteNote"
      v-model="modal.deleteNote"
      :noteId="note.id"
    ></ModalDeleteNote>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { userStoreNotes } from '@/stores/storeNotes';

import { useDateFormat } from '@vueuse/shared';

import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue';

// =========================================

const storeNotes = userStoreNotes();

// =========================================

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const characterLength = computed(
  () =>
    `${props.note.content.length} ${
      props.note.content.length <= 1 ? `character` : `characters`
    }`
);

const dateFormatted = computed(
  () =>
    useDateFormat(new Date(parseInt(props.note.date)), 'YYYY-MM-DD HH:mm').value
);

// ============================================

const modal = reactive({
  deleteNote: false,
});
</script>

<style scoped></style>
