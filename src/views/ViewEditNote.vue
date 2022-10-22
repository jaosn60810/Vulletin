<template>
  <AddEditNote
    ref="addEditNoteRef"
    v-model="noteContent"
    bgColor="link"
    placeholder="Edit note"
    label="Edit Note"
  >
    <template #buttons>
      <button @click="$router.back()" class="button is-link is-light mr-2">
        Cancel
      </button>
      <button
        @click="handleSaveClicked"
        class="button is-link has-background-link"
        :disabled="!noteContent"
      >
        Save Note
      </button>
    </template>
  </AddEditNote>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userStoreNotes } from '@/stores/storeNotes';

import AddEditNote from '@/components/Notes/AddEditNote.vue';

// =========================================

const storeNotes = userStoreNotes();

// =========================================

const route = useRoute();
const router = useRouter();

// =========================================

const noteContent = ref('');

noteContent.value = storeNotes.getNoteContent(route.params.id as string);

// =========================================

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id as string, noteContent.value);
  router.push('/');
};
</script>

<style scoped></style>
