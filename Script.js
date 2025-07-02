// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your Firebase config (already set up by you)
const firebaseConfig = {
  apiKey: "AIzaSyAnXGswlCTRtdC60dnAimdQ5yfW2iayFvM",
  authDomain: "urbnwrld-1e5ce.firebaseapp.com",
  projectId: "urbnwrld-1e5ce",
  storageBucket: "urbnwrld-1e5ce.appspot.com",
  messagingSenderId: "223575013891",
  appId: "1:223575013891:web:d63484e3cc0cf897c2ac36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Only show admin dashboard to your Gmail
const adminEmail = "tahtianahfelix9@gmail.com";

onAuthStateChanged(auth, (user) => {
  if (user && user.email === adminEmail) {
    document.getElementById('admin-panel').style.display = 'block';
  } else {
    document.getElementById('admin-panel').style.display = 'none';
  }
});

// Example login (you’ll make real buttons and forms later)
window.login = function(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Logged in!"))
    .catch(err => alert(err.message));
};

window.signup = function(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Signed up!"))
    .catch(err => alert(err.message));
};

window.logout = function() {
  signOut(auth).then(() => alert("Logged out!"));
};
