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
    updateNote(noteId: string, newContent: string) {
      const noteIndex = this.notes.findIndex((note) => note.id === noteId);
      this.notes[noteIndex].content = newContent;
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (noteId: string) =>
        state.notes.find((note) => note.id === noteId)?.content ?? '';
    },
    totalNotesCount: (state) => state.notes.length,
    totalCharactersCount: (state) =>
      state.notes.reduce((acc, cur) => acc + cur.content.length, 0),
  },
});
