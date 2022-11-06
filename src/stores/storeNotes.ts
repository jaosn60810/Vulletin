import { defineStore } from 'pinia';
import {
  collection,
  onSnapshot,
  addDoc,
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
  date: string;
}

const notesCollectionRef = collection(db, 'notes');
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));

export const userStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [] as Note[],
      isNotesLoaded: true,
    };
  },
  actions: {
    async getNotes() {
      onSnapshot(notesCollectionQuery, async (querySnapshot) => {
        this.isNotesLoaded = true;

        let notes: Note[] = [];
        querySnapshot.forEach((doc) => {
          notes.push({
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          });
        });
        this.notes = notes;

        this.isNotesLoaded = false;
      });
    },
    async addNote(newNote: string) {
      await addDoc(notesCollectionRef, {
        content: newNote,
        date: new Date().getTime().toString(),
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
