<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note"></Note>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { userStoreNotes } from '@/stores/storeNotes';

import Note from '@/components/Notes/Note.vue';

// =========================================

const storeNotes = userStoreNotes();

// =========================================

const newNote = ref('');
const newNoteRef = ref<HTMLTextAreaElement | null>(null);

// =========================================

const addNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = '';

  newNoteRef.value?.focus();
};
</script>
