import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Logo */}
      <span
        className="navbar-brand fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        TaskManager
      </span>

      {/* Right Side */}
      <div className="ms-auto d-flex align-items-center">

        {/* Profile Image */}
        <img
          src=""
          alt="profile"
          className="rounded-circle me-2"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />

        {/* Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            My Account
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            </li>

            <li>
              <button className="dropdown-item">
                Profile
              </button>
            </li>

            <li>
              <button className="dropdown-item">
                Settings
              </button>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}