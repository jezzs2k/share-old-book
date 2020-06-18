import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCbCbE_JnYA3xeBB-LmlKPCL1kEBp0VSLw',
  authDomain: 'share-old-book.firebaseapp.com',
  databaseURL: 'https://share-old-book.firebaseio.com',
  projectId: 'share-old-book',
  storageBucket: 'share-old-book.appspot.com',
  messagingSenderId: '692941987979',
  appId: '1:692941987979:web:496f59dd10693c14f7f48e',
  measurementId: 'G-N1546TSDV0',
});

const db = firebaseApp.firestore();
const storage = firebase.storage();

export { db, storage };
