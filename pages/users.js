// pages/api/users.js
export default function handler(req, res) {
  const dummyUsers = [
    {
      firstName: "יוסי",
      lastName: "כהן",
      email: "kaikov@gmail.com",
      role: "מנהל",
      permission: "מלאה"
    },
    {
      firstName: "דנה",
      lastName: "לוי",
      email: "dana@example.com",
      role: "תמיכה",
      permission: "מוגבלת"
    }
  ];
  res.status(200).json(dummyUsers);
}
