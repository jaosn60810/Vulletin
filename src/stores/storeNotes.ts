import { defineStore } from 'pinia';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { db } from '@/js/firebase';

interface Note {
  id: string;
  content: string;
}

const notesCollectionRef = collection(db, 'notes');

export const userStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [] as Note[],
    };
  },
  actions: {
    async getNotes() {
      onSnapshot(notesCollectionRef, (querySnapshot) => {
        let notes: Note[] = [];
        querySnapshot.forEach((doc) => {
          notes.push({ id: doc.id, content: doc.data().content });
        });

        this.notes = notes;
      });
    },
    async addNote(newNote: string) {
      await setDoc(doc(notesCollectionRef, new Date().getTime().toString()), {
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
