import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // helper to check active link
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light border-end shadow-sm">
      <h5 className="text-danger fw-bold mb-4 text-center">
        {user?.role?.toUpperCase()} PANEL
      </h5>

      <ul className="nav nav-pills flex-column gap-2">
        {user?.role === "organisation" && (
          <>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                <i className="fa-solid fa-warehouse me-2"></i> Inventory
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/donar")}`} to="/donar">
                <i className="fa-solid fa-hand-holding-medical me-2"></i> Donor
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/hospital")}`} to="/hospital">
                <i className="fa-solid fa-hospital me-2"></i> Hospital
              </Link>
            </li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/donar-list")}`} to="/donar-list">
                <i className="fa-solid fa-users me-2"></i> Donor List
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/hospital-list")}`} to="/hospital-list">
                <i className="fa-solid fa-hospital me-2"></i> Hospital List
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/org-list")}`} to="/org-list">
                <i className="fa-solid fa-building me-2"></i> Organisation List
              </Link>
            </li>
          </>
        )}

        {(user?.role === "donar" || user?.role === "hospital") && (
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/orgnaisation")}`} to="/orgnaisation">
              <i className="fa-solid fa-building-ngo me-2"></i> Organisation
            </Link>
          </li>
        )}

        {user?.role === "hospital" && (
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/consumer")}`} to="/consumer">
              <i className="fa-solid fa-user-injured me-2"></i> Consumer
            </Link>
          </li>
        )}

        {user?.role === "donar" && (
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/donation")}`} to="/donation">
              <i className="fa-solid fa-hand-holding-droplet me-2"></i> Donation
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
