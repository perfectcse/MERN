import Navbar from "./Navbar";

function Layout({ children, token, onLogout }) {
  return (
    <div>
      <Navbar token={token} onLogout={onLogout} />

      <div className="layout-container">
        {children}
      </div>
    </div>
  );
}

export default Layout;