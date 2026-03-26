import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";
import StatsCard from "../Components/StatCard";
import "../styles/dashboard.css";

function Dashboard() {
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPosts({ page: 1, limit: 100 });

      if (data.success) {
        setTotalPosts(data.totalPosts);
      }
    };

    loadData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-container">
        <StatsCard title="Total Posts" value={totalPosts} />
        <StatsCard title="Users" value="2" />
        <StatsCard title="Admin" value="1" />
      </div>
    </div>
  );
}

export default Dashboard;