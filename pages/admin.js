import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvp1iz91sx11bx7YrSoSg_RvKHLw5UbRM",
  authDomain: "yossi-dd10f.firebaseapp.com",
  projectId: "yossi-dd10f",
  storageBucket: "yossi-dd10f.firebasestorage.app",
  messagingSenderId: "432171259662",
  appId: "1:432171259662:web:5b551b34131d6f73e5e95f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.email === "kaikov@gmail.com") {
        setUser(u);
        fetch("/api/users")
          .then((res) => {
            if (!res.ok) throw new Error("שגיאה בטעינת המשתמשים");
            return res.json();
          })
          .then((data) => setUsers(data))
          .catch((err) => setError(err.message));
      } else {
        window.location.href = "/";
      }
    });
    return () => unsub();
  }, []);

  if (!user) return <p style={{ textAlign: "center" }}>טוען...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "50px auto", direction: "rtl" }}>
      <h2 style={{ textAlign: "center" }}>ניהול משתמשים</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {users.length > 0 ? (
        <table border="1" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>שם</th>
              <th>שם משפחה</th>
              <th>אימייל</th>
              <th>סיסמה</th>
              <th>תפקיד</th>
              <th>רמת הרשאה</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>••••••••</td>
                <td>{u.role}</td>
                <td>{u.permission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center" }}>לא נמצאו משתמשים</p>
      )}
    </div>
  );
}
