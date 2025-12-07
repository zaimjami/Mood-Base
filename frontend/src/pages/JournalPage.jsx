import React, { useEffect, useState } from "react";
import api from "../apiClient";
import JournalEntryForm from "../components/JournalEntryForm";
import JournalEntryList from "../components/JournalEntryList";

function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEntries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/entries/");
      setEntries(res.data || []);
    } catch (err) {
      setError(
        "could not load entries – your thoughts are safe, just not on screen."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleCreated = (entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>journal</h2>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#9ca3af",
          marginBottom: "1rem",
        }}
      >
        free-form writing with a tiny robot quietly tagging the vibes in the
        background.
      </p>
      <JournalEntryForm onCreated={handleCreated} />
      {loading ? (
        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.85rem",
            color: "#9ca3af",
          }}
        >
          loading entries...
        </div>
      ) : error ? (
        <div
          style={{
            marginTop: "1rem",
            color: "#f97316",
            fontSize: "0.85rem",
          }}
        >
          {error}
        </div>
      ) : (
        <JournalEntryList entries={entries} />
      )}
    </div>
  );
}

export default JournalPage;
