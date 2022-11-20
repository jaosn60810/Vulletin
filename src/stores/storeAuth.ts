import { defineStore } from 'pinia';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/js/firebase';

import { userStoreNotes } from './storeNotes';

interface AuthUser {
  email: string;
  password: string;
}

export const userStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      userData: { id: '', email: '' },
    };
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        const storeNotes = userStoreNotes();
        if (user) {
          this.userData.id = user.uid;
          this.userData.email = user.email ?? '';
          this.router.push('/');

          storeNotes.init();
        } else {
          this.userData = { id: '', email: '' };
          this.router.replace('/auth');
          storeNotes.clearNotes();
        }
      });
    },
    registerUser(credentials: AuthUser) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          alert('Sign-out successful');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    loginUser(credentials: AuthUser) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
  },
});
