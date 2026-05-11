import { useEffect, useState, useCallback } from "react";

import StatCard from "../Components/StatCard";

import { getDashboardStats } from "../services/api";

import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalUsers: 0,
    totalLikes: 0,
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD DASHBOARD ================= */

  const loadDashboard = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getDashboardStats(token);

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.log("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      {loading ? (
        <p className="loading">Loading stats...</p>
      ) : (
        <>
          {/* ================= STATS ================= */}

          <div className="stats-container">
            <StatCard title="Total Posts" value={stats.totalPosts} />

            <StatCard
              title="Total Comments"
              value={stats.totalComments}
            />

            <StatCard title="Total Users" value={stats.totalUsers} />

            <StatCard title="Total Likes" value={stats.totalLikes} />
          </div>

          {/* ================= OVERVIEW ================= */}

          <div className="chart-container">
            <h3>Platform Overview</h3>

            <div className="chart-box">
              <p>📝 Posts: {stats.totalPosts}</p>

              <p>💬 Comments: {stats.totalComments}</p>

              <p>👤 Users: {stats.totalUsers}</p>

              <p>❤️ Likes: {stats.totalLikes}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;