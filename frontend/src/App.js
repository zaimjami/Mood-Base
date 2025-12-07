import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import JournalPage from "./pages/JournalPage";
import Navbar from "./components/Navbar";

function useAuth() {
  const token = localStorage.getItem("mb_token");
  return Boolean(token);
}

function ProtectedRoute({ children }) {
  const authed = useAuth();
  return authed ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#020617",
        minHeight: "100vh",
        color: "#e5e7eb",
      }}
    >
      <Navbar />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.5rem" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <JournalPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
