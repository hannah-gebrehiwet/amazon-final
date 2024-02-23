
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD7PgHn9fUmoWCv3KqLvcDXUAEmG60wdgg",
	authDomain: "clone-9df99.firebaseapp.com",
	projectId: "clone-9df99",
	storageBucket: "clone-9df99.appspot.com",
	messagingSenderId: "374643754128",
	appId: "1:374643754128:web:47a6aa933b1c17c993c415",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db=app.firestore()