import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAzVMoT5X1D75D-mBYxeyt-_D2AA6UscqM",
    authDomain: "hellodoctor-592d2.firebaseapp.com",
    projectId: "hellodoctor-592d2",
    storageBucket: "hellodoctor-592d2.appspot.com",
    messagingSenderId: "111159112997",
    appId: "1:111159112997:web:1145942b5a0123fa09d6cc"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
  }
  
  export default firebase;