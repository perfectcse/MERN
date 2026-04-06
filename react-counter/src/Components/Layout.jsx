import Navbar from "./Navbar";

function Layout({ children, token, role, onLogout }) {
  return (
    <div className="layout">
      <Navbar token={token} role={role} onLogout={onLogout} />

      <main className="layout-container">
        {children}
      </main>
    </div>
  );
}

export default Layout;