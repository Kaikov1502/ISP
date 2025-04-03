
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvp1iz91sx11bx7YrSoSg_RvKHLw5UbRM",
  authDomain: "yossi-dd10f.firebaseapp.com",
  projectId: "yossi-dd10f",
  storageBucket: "yossi-dd10f.firebasestorage.app",
  messagingSenderId: "432171259662",
  appId: "1:432171259662:web:5b551b34131d6f73e5e95f",
  measurementId: "G-SPNEN9G6B6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.email === "kaikov@gmail.com") {
        setUser(u);
      } else {
        window.location.href = "/";
      }
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", textAlign: "center", direction: "rtl" }}>
      <h2>ניהול משתמשים</h2>
      {user ? (
        <div>
          <p>שלום {user.email} (מנהל)</p>
          <p>כאן תוכל לנהל את המשתמשים (נוסיף בקרוב)</p>
        </div>
      ) : (
        <p>טוען...</p>
      )}
    </div>
  );
}
