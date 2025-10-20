// ===== Import Firebase SDK =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ===== Your Firebase Config (replace with yours) =====
const firebaseConfig = {
  apiKey: "AIzaSyDIDWVCoIfS9WtgE11NoFXLD-qYRBjFNmk",
  authDomain: "portfolio-contact-c4663.firebaseapp.com",
  projectId: "portfolio-contact-c4663",
  storageBucket: "portfolio-contact-c4663.firebasestorage.app",
  messagingSenderId: "356458430275",
  appId: "1:356458430275:web:b973a2104867a15757f9f6",
   measurementId: "G-KHT8XFHZSW",

};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== Form Submission =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      timestamp: new Date()
    });

    alert("✅ Message sent successfully!");
    contactForm.reset();
  } catch (error) {
    console.error("❌ Error adding message: ", error);
    alert("Something went wrong. Try again!");
  }
});
