import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDpWgrQHYwodjn5NuLiVj3hdzqsZgNAMBQ",
    authDomain: "eventsapp-a1ab3.firebaseapp.com",
    databaseURL: "https://eventsapp-a1ab3.firebaseio.com",
    projectId: "eventsapp-a1ab3",
    storageBucket: "eventsapp-a1ab3.appspot.com",
    messagingSenderId: "952116640987"
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

export default firebase