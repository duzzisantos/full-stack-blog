// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
//add yours
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new FacebookAuthProvider();
provider.addScope("user_birthday");
provider.setCustomParameters({
  display: "popup",
});

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//Facebook authentication

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
        photo: user.photoURL,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const gitProvider = new GithubAuthProvider();
gitProvider.addScope("user");
gitProvider.setCustomParameters({
  allow_signup: "false",
});
const signInUsingGithub = async () => {
  try {
    const res = await signInWithPopup(auth, gitProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "github",
        email: user.email,
        photo: user.photoURL,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("Either Email or Password is incorrect!")
    console.log(err);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "google",
      email,
    });
  } catch (err) {
    console.log(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
  } catch (err) {
    console.log(err);
  }
};

const logout = () => {
  signOut(auth);
  
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  signInUsingGithub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
