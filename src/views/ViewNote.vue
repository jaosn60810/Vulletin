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

    <Note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @deleteNoteClicked="deleteNote"
    ></Note>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Note from '@/components/Notes/Note.vue';

const newNote = ref('');
const newNoteRef = ref<HTMLTextAreaElement | null>(null);
const notes = ref([
  {
    id: 'id1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem impedit          liquid, saepe voluptas placeat vitae itaque illum odit. Quaera aperiam impedit, alias sapiente tenetur fugiat temporibuslestias laborum.',
  },
  {
    id: 'id2',
    content: 'Lorem ipsum dolor sit ame.',
  },
]);
const addNote = () => {
  notes.value.unshift({
    id: new Date().getTime().toString(),
    content: newNote.value,
  });

  newNote.value = '';

  newNoteRef.value?.focus();
};

const deleteNote = (noteId: string) => {
  notes.value = notes.value.filter((note) => note.id !== noteId);
};
</script>
