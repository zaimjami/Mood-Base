import React from "react";

function badgeColor(label) {
  if (label === "positive") return "#22c55e";
  if (label === "negative") return "#f97316";
  return "#64748b";
}

function JournalEntryList({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
        no entries yet – future you will be glad you start.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginTop: "1rem",
      }}
    >
      {entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            padding: "0.75rem",
            background: "#020617",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.35rem",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              {entry.title || "untitled thought"}
            </div>
            {entry.sentiment_label && (
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "0.1rem 0.5rem",
                  borderRadius: "999px",
                  backgroundColor: badgeColor(entry.sentiment_label),
                  color: "#020617",
                  textTransform: "lowercase",
                }}
              >
                {entry.sentiment_label}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: "0.82rem",
              color: "#d1d5db",
              whiteSpace: "pre-wrap",
            }}
          >
            {entry.content}
          </div>
          <div
            style={{
              marginTop: "0.35rem",
              fontSize: "0.7rem",
              color: "#6b7280",
            }}
          >
            {new Date(entry.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default JournalEntryList;
