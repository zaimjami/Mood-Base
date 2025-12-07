import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apiClient";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        await api.post("/auth/register", { email, password });
      }
      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);
      const res = await api.post("/auth/token", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("mb_token", res.data.access_token);
      navigate("/");
    } catch (err) {
      setError(
        "Login failed. Either the server is sad or your credentials are off."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "360px", margin: "3rem auto" }}>
      <h1 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
        welcome to MoodBuddy
      </h1>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#9ca3af",
          marginBottom: "1.5rem",
        }}
      >
        sign in or create an account – your feelings get their own database
        table.
      </p>
      <div style={{ marginBottom: "0.75rem", fontSize: "0.8rem" }}>
        <button
          onClick={() => setMode("login")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border:
              mode === "login"
                ? "1px solid #38bdf8"
                : "1px solid #4b5563",
            background: mode === "login" ? "#0ea5e9" : "transparent",
            color: mode === "login" ? "#020617" : "#e5e7eb",
            fontSize: "0.8rem",
            marginRight: "0.35rem",
            cursor: "pointer",
          }}
        >
          log in
        </button>
        <button
          onClick={() => setMode("register")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border:
              mode === "register"
                ? "1px solid #38bdf8"
                : "1px solid #4b5563",
            background: mode === "register" ? "#0ea5e9" : "transparent",
            color: mode === "register" ? "#020617" : "#e5e7eb",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          register
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #4b5563",
            backgroundColor: "#020617",
            color: "#e5e7eb",
            fontSize: "0.9rem",
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #4b5563",
            backgroundColor: "#020617",
            color: "#e5e7eb",
            fontSize: "0.9rem",
          }}
        />
        {error && (
          <div style={{ color: "#f97316", fontSize: "0.8rem" }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "0.25rem",
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "none",
            background: loading ? "#4b5563" : "#38bdf8",
            color: "#020617",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading
            ? "authenticating..."
            : mode === "login"
            ? "log in"
            : "register & log in"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
