const firebase= require('firebase');
const config={
    apiKey: "AIzaSyA5u-34HJcLP02wo88I416uVEwxvVwjLFo",
  authDomain: "socialmedia-3db57.firebaseapp.com",
  projectId: "socialmedia-3db57",
  storageBucket: "socialmedia-3db57.appspot.com",
  messagingSenderId: "1082955780844",
  appId: "1:1082955780844:web:40dcec360481954a4c8bc9"
}
// Initialize Firebase
firebase.initializeApp(config);
export default firebase;