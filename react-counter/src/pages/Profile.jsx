import { useEffect, useState } from "react";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data);
      } else {
        setMessage("Failed to load profile");
      }
    } catch (error) {
      console.error("Profile error:", error);
      setMessage("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= IMAGE PREVIEW ================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= UPLOAD IMAGE ================= */
  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/upload-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage("Profile image updated ✅");
        setImage(null);
        setPreview(null);
        fetchProfile();
      } else {
        setMessage("Upload failed ❌");
      }
    } catch (error) {
      console.log("Upload error:", error);
      setMessage("Upload error");
    }
  };

  /* ================= LOADING ================= */
  if (loading) return <p className="loading">Loading profile...</p>;
  if (!user) return <p className="loading">User not found</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Image */}
        <div className="profile-avatar">
          {preview ? (
            <img src={preview} alt="Preview" className="profile-img" />
          ) : user.profileImage ? (
            <img
              src={`http://localhost:5000${user.profileImage}`}
              alt="Profile"
              className="profile-img"
            />
          ) : (
            <span className="profile-letter">
              {user.email.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <h2 className="profile-email">{user.email}</h2>

        <span
          className={user.role === "admin" ? "badge admin" : "badge user"}
        >
          {user.role}
        </span>

        <div className="profile-info">
          <p>
            <strong>User ID:</strong> {user._id}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toDateString()}
          </p>
          <p>
            <strong>Bookmarks:</strong> {user.bookmarks?.length || 0}
          </p>
          <p>
            <strong>Liked Posts:</strong> {user.likedPosts?.length || 0}
          </p>
        </div>

        {/* Upload Image */}
        <form onSubmit={handleImageUpload} className="upload-form">
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload Image</button>
        </form>

        {/* Message */}
        {message && <p className="profile-message">{message}</p>}
      </div>
    </div>
  );
}

export default Profile;