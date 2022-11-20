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
  Query,
  type DocumentData,
  type CollectionReference,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/js/firebase';

import { userStoreAuth } from './storeAuth';

interface Note {
  id: string;
  content: string;
  date: string;
}

let notesCollectionRef: CollectionReference<DocumentData>;
let notesCollectionQuery: Query<DocumentData>;
let unsubscribeNotesSnapShot: Unsubscribe;

export const userStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [] as Note[],
      isNotesLoaded: true,
    };
  },
  actions: {
    init() {
      const storeAuth = userStoreAuth();
      notesCollectionRef = collection(
        db,
        'users',
        storeAuth.userData.id,
        'notes'
      );
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
      this.getNotes();
    },
    async getNotes() {
      unsubscribeNotesSnapShot = onSnapshot(
        notesCollectionQuery,
        async (querySnapshot) => {
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
        }
      );
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
    clearNotes() {
      this.notes = [];
      if (unsubscribeNotesSnapShot) {
        unsubscribeNotesSnapShot();
      }
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
