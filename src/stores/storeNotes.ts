import { defineStore } from 'pinia';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/js/firebase';

interface Note {
  id: string;
  content: string;
}

export const userStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [] as Note[],
    };
  },
  actions: {
    async getNotes() {
      onSnapshot(collection(db, 'notes'), (querySnapshot) => {
        let notes: Note[] = [];
        querySnapshot.forEach((doc) => {
          notes.push({ id: doc.id, content: doc.data().content });
        });

        this.notes = notes;
      });
    },
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
