import React, { useEffect, useState } from "react";
import api from "../apiClient";
import MoodChart from "../components/MoodChart";

function DashboardPage() {
  const [moodHistory, setMoodHistory] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [average, setAverage] = useState(null);
  const [score, setScore] = useState(3);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/analytics/mood");
      setMoodHistory(res.data.history || []);
      setForecast(res.data.forecast || []);
      setAverage(res.data.average_score);
    } catch (err) {
      setError("could not load analytics; the stats are feeling shy.");
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const handleLogMood = async () => {
    setSaving(true);
    setError("");
    try {
      const today = new Date().toISOString().slice(0, 10);
      await api.post("/mood/", { date: today, score });
      await loadAnalytics();
    } catch (err) {
      setError("failed to log mood – please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>dashboard</h2>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#9ca3af",
          marginBottom: "1rem",
        }}
      >
        log how you feel and let MoodBuddy keep an eye on the patterns.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.25rem",
          alignItems: "flex-start",
        }}
      >
        <MoodChart history={moodHistory} forecast={forecast} />
        <div
          style={{
            background: "#020617",
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
          }}
        >
          <h3 style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
            today&apos;s mood
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            1 = rough day, 5 = thriving. be honest – this is just for you.
          </p>
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <input
              type="range"
              min="1"
              max="5"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{score}</span>
          </div>
          <button
            onClick={handleLogMood}
            disabled={saving}
            style={{
              marginTop: "0.75rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              border: "none",
              background: saving ? "#4b5563" : "#22c55e",
              color: "#020617",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "saving..." : "log mood"}
          </button>
          {average != null && (
            <div
              style={{
                marginTop: "0.75rem",
                fontSize: "0.85rem",
                color: "#e5e7eb",
              }}
            >
              average mood:{" "}
              <span style={{ fontWeight: 600 }}>{average.toFixed(2)}</span>
            </div>
          )}
          {error && (
            <div
              style={{
                marginTop: "0.5rem",
                color: "#f97316",
                fontSize: "0.8rem",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
