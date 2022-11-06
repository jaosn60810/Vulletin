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

    <progress
      class="progress is-large is-success"
      max="100"
      v-if="storeNotes.isNotesLoaded"
    ></progress>

    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note"></Note>

    <p
      v-if="storeNotes.notes.length === 0"
      class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
    >
      No notes here yet...
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
