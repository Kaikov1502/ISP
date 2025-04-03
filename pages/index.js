
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(false);

  const handleLogin = async () => {
    try {
      if (newUser) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("נרשמת בהצלחה!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("התחברת בהצלחה!");
        if (email === "kaikov@gmail.com") {
          window.location.href = "/admin";
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center", direction: "rtl" }}>
      <h2>{newUser ? "הרשמה" : "התחברות"}</h2>
      <input placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="סיסמה" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handleLogin}>{newUser ? "הרשם" : "התחבר"}</button><br /><br />
      <a href="#" onClick={() => setNewUser(!newUser)}>
        {newUser ? "כבר יש לך חשבון? התחבר" : "אין לך חשבון? הרשם"}
      </a>
    </div>
  );
}
