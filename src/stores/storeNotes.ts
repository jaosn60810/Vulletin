import { defineStore } from 'pinia';
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/js/firebase';

interface Note {
  id: string;
  content: string;
}

const notesCollectionRef = collection(db, 'notes');
const notesCollectionQuery = query(notesCollectionRef, orderBy('id', 'desc'));

export const userStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [] as Note[],
    };
  },
  actions: {
    async getNotes() {
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes: Note[] = [];
        querySnapshot.forEach((doc) => {
          notes.push({ id: doc.id, content: doc.data().content });
        });

        this.notes = notes;
      });
    },
    async addNote(newNote: string) {
      const id = new Date().getTime().toString();
      await setDoc(doc(notesCollectionRef, id), {
        content: newNote,
        id,
      });
    },
    async deleteNote(noteId: string) {
      await deleteDoc(doc(notesCollectionRef, noteId));
    },
    async updateNote(noteId: string, content: string) {
      await updateDoc(doc(notesCollectionRef, noteId), {
        content,
      });
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
