import { defineStore } from 'pinia';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/js/firebase';

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
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          this.userData.id = user.uid;
          this.userData.email = user.email ?? '';
          this.router.push('/');

          // ...
        } else {
          // User is signed out
          // ...
          this.userData = { id: '', email: '' };
          this.router.replace('/auth');
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
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ..
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('Sign-out successful');
        })
        .catch((error) => {
          // An error happened.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    loginUser(credentials: AuthUser) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
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
