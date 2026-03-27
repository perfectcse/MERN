import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";
import StatsCard from "../Components/StatCard";
import "../styles/dashboard.css";

function Dashboard() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPosts({ page: 1, limit: 100 });

        if (data.success) {
          setTotalPosts(data.totalPosts);
        }
      } catch (error) {
        console.log("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="stats-container">
          <StatsCard title="Total Posts" value={totalPosts} />
          <StatsCard title="Users" value="2" />
          <StatsCard title="Admin" value="1" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;