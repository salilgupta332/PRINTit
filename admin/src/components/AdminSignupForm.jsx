import { useState } from "react";
import { adminSignup } from "../api/adminAuthApi";

function AdminSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await adminSignup(email, password, adminKey);
      setMessage(data.message || "Admin registered successfully ✅");

      // optional: clear form
      setEmail("");
      setPassword("");
      setAdminKey("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h3>Admin Signup</h3>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br /><br />

      <input
        type="text"
        placeholder="Admin Secret Key"
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
        required
      />
      <br /><br />

      <button type="submit">Sign Up</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default AdminSignupForm;
