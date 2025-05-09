// app.js (must be in the same folder as index.html)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔐 Replace with your own Firebase project config:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global functions for button onclick
window.handleLogin = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("output").innerText = `✅ Logged in as ${userCredential.user.email}`;
  } catch (error) {
    document.getElementById("output").innerText = `❌ Login failed: ${error.message}`;
  }
};

window.fetchProducts = async function () {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    let output = "";
    querySnapshot.forEach((doc) => {
      output += `${doc.id} => ${JSON.stringify(doc.data())}\n`;
    });
    document.getElementById("output").innerText = output || "No products found.";
  } catch (err) {
    document.getElementById("output").innerText = `Error fetching products: ${err.message}`;
  }
};
