import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

var config = {
  apiKey: "AIzaSyA-XrUf94nx5YM86zMMsw-kPyhdDgIbInI",
  authDomain: "tutoringapp-3f7ac.firebaseapp.com",
  databaseURL: "https://tutoringapp-3f7ac.firebaseio.com",
  projectId: "tutoringapp-3f7ac",
  storageBucket: "tutoringapp-3f7ac.appspot.com",
  messagingSenderId: "1014035877785"
};
var fire = firebase.initializeApp(config);

const auth = fire.auth();

const database = fire.database();
//export default fire;
export { auth, database };
