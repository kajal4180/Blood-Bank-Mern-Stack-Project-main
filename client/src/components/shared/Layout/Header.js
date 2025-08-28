import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-danger d-flex align-items-center" to="/">
          <BiDonateBlood size={28} className="me-2" />
          Blood Bank App
        </Link>

        {/* Right side menu */}
        <ul className="navbar-nav ms-auto align-items-center">
          {/* Welcome User */}
          <li className="nav-item me-3 d-flex align-items-center">
            <BiUserCircle size={22} className="me-1" />
            <span className="fw-semibold">
              Welcome {user?.name || user?.hospitalName || user?.organisationName}
            </span>
            <span className="badge bg-danger ms-2">{user?.role}</span>
          </li>

          {/* Navigation Links */}
          <li className="nav-item me-3">
            {["/", "/donar", "/hospital"].includes(location.pathname) ? (
              <Link className="nav-link text-dark fw-medium" to="/analytics">
                Analytics
              </Link>
            ) : (
              <Link className="nav-link text-dark fw-medium" to="/">
                Home
              </Link>
            )}
          </li>

          {/* Logout Button */}
          <li className="nav-item">
            <button
              className="btn btn-danger px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
