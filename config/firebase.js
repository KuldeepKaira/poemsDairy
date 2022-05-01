import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDt2LI9gfDTSq-hAFIzMzZofniLMuoH_hw',
  authDomain: 'poemsdairy.firebaseapp.com',
  databaseURL: 'https://poemsdairy-default-rtdb.firebaseio.com',
  projectId: 'poemsdairy',
  storageBucket: 'poemsdairy.appspot.com',
  messagingSenderId: '544426290706',
  appId: '1:544426290706:web:659a085c2d58fa1a7932cb',
  measurementId: 'G-ZHCGJ97X6E',
};

// firebase.initializeApp(firebaseConfig);

// firebase.firestore();
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export default firebase;
export {db, auth};
