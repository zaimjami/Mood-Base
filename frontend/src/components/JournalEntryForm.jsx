import React, { useState } from "react";
import api from "../apiClient";

function JournalEntryForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!content.trim()) {
      setError("Your brain dump cannot be completely empty.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/entries/", { title, content });
      setTitle("");
      setContent("");
      if (onCreated) onCreated(res.data);
    } catch (err) {
      setError("Could not save entry. The feelings will have to wait.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <input
        type="text"
        placeholder="optional title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "0.5rem 0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid #4b5563",
          backgroundColor: "#020617",
          color: "#e5e7eb",
          fontSize: "0.9rem",
        }}
      />
      <textarea
        placeholder="how are you actually feeling today?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        style={{
          padding: "0.75rem",
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
          alignSelf: "flex-end",
          padding: "0.35rem 0.9rem",
          borderRadius: "999px",
          border: "none",
          background: loading ? "#4b5563" : "#22c55e",
          color: "#020617",
          fontWeight: 600,
          fontSize: "0.85rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "saving..." : "save entry"}
      </button>
    </form>
  );
}

export default JournalEntryForm;
