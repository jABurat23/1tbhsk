import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIDWVCoIfS9WtgE11NoFXLD-qYRBjFNmk",
  authDomain: "portfolio-contact-c4663.firebaseapp.com",
  projectId: "portfolio-contact-c4663",
  storageBucket: "portfolio-contact-c4663.firebasestorage.app",
  messagingSenderId: "356458430275",
  appId: "1:356458430275:web:b973a2104867a15757f9f6",
   measurementId: "G-KHT8XFHZSW",

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const loginSection = document.getElementById("loginSection");
const messageSection = document.getElementById("messageSection");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const messagesList = document.getElementById("messagesList");
const loginError = document.getElementById("loginError");

// LOGIN
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    loginError.textContent = "❌ " + err.message;
  }
});

// LOGOUT
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// AUTH STATE
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.classList.add("hidden");
    messageSection.classList.remove("hidden");
    loadMessages();
  } else {
    loginSection.classList.remove("hidden");
    messageSection.classList.add("hidden");
  }
});

// LOAD MESSAGES
function loadMessages() {
  const q = collection(db, "messages");

  onSnapshot(q, (snapshot) => {
    messagesList.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const div = document.createElement("div");
      div.classList.add("message");
      div.innerHTML = `
        <p><strong>${data.name}</strong> (${data.email})</p>
        <p>${data.message}</p>
         <p><small>${new Date(data.timestamp?.seconds * 1000 || Date.now()).toLocaleString()}</small></p>
        <button data-id="${docSnap.id}">🗑️ Delete</button>
      `;
      div.querySelector("button").addEventListener("click", () => deleteMessage(docSnap.id));
      messagesList.appendChild(div);
    });
  });
  div.querySelector("button").addEventListener("click", () => {
  if (confirm("🗑️ Are you sure you want to delete this message?")) {
    deleteMessage(docSnap.id);
  }
});

}

async function deleteMessage(id) {
  await deleteDoc(doc(db, "messages", id));
}
