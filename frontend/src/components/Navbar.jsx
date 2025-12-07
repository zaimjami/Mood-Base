import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("mb_token");

  const handleLogout = () => {
    localStorage.removeItem("mb_token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#020617",
        borderBottom: "1px solid #1f2937",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontWeight: 700, color: "#38bdf8" }}>MoodBuddy</span>
        {token && (
          <>
            <Link
              to="/"
              style={{
                color: "#e5e7eb",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              dashboard
            </Link>
            <Link
              to="/journal"
              style={{
                color: "#e5e7eb",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              journal
            </Link>
          </>
        )}
      </div>
      <div>
        {token && (
          <button
            onClick={handleLogout}
            style={{
              border: "1px solid #4b5563",
              background: "transparent",
              color: "#e5e7eb",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            log out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
