import { useEffect, useState } from "react";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.email.charAt(0).toUpperCase()}
        </div>

        <h2 className="profile-email">{user.email}</h2>

        <span className={user.role === "admin" ? "badge admin" : "badge user"}>
          {user.role}
        </span>

        <div className="profile-info">
          <p><strong>User ID:</strong> {user._id}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;