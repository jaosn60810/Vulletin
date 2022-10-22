import { defineStore } from 'pinia';

export const userStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        {
          id: 'id1',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem impeditliquid, saepe voluptas placeat vitae itaque illum odit. Quaera aperiam impedit, alias sapiente tenetur fugiat temporibuslestias laborum.',
        },
        {
          id: 'id2',
          content: 'Lorem ipsum dolor sit ame.',
        },
      ],
    };
  },
  actions: {
    addNote(newNote: string) {
      this.notes.unshift({
        id: new Date().getTime().toString(),
        content: newNote,
      });
    },
    deleteNote(noteId: string) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    },
  },
});
