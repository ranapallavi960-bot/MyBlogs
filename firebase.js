// import {initializeApp} from 'firebase/app';
// const firebaseConfig = {
//   apiKey: "AIzaSyC44aRJdQM94qxusME7_FTPZ8v_Mxg3_xs",
//   authDomain: "blogs-3e0b4.firebaseapp.com",
//   projectId: "blogs-3e0b4",
//   storageBucket: "blogs-3e0b4.firebasestorage.app",
//   messagingSenderId: "350526218863",
//   appId: "1:350526218863:web:a3510020a0d72d0dbde39a",
//   measurementId: "G-5165G37X3V",
//   databaseURL:"https://blogs-3e0b4-default-rtdb.firebaseio.com/"
// };

// export const app= initializeApp(firebaseConfig)

import firestore from '@react-native-firebase/firestore';

export const blogsCollection = firestore().collection('blogs');