<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef">
      <template #buttons>
        <button
          @click="addNote"
          :disabled="!newNote"
          class="button is-link has-background-success"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note"></Note>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { userStoreNotes } from '@/stores/storeNotes';

import { useWatchCharacters } from '@/use/useWatchCharacters';

import Note from '@/components/Notes/Note.vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';

// =========================================

const storeNotes = userStoreNotes();

// =========================================

const newNote = ref('');
const addEditNoteRef = ref<InstanceType<typeof AddEditNote> | null>(null);

// =========================================

const addNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = '';

  addEditNoteRef.value?.focusTextArea();
};

// =========================================

useWatchCharacters(newNote);
</script>
