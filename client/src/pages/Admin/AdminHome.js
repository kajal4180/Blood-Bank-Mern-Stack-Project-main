import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container mt-5">
        {/* Welcome Section */}
        <div className="card shadow-lg border-0 rounded-4 mb-4">
          <div className="card-body text-center p-5">
            <h1 className="fw-bold">
              👋 Welcome, <span className="text-danger">{user?.name}</span>
            </h1>
            <p className="text-muted fs-5 mb-0">
              You are logged in as <b>Admin</b>
            </p>
            <p className="text-muted">Manage and monitor the Blood Bank System efficiently</p>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4 h-100 p-4">
              <h3 className="text-danger">🩸 Donations</h3>
              <p className="text-muted">View and manage all blood donations</p>
              <button className="btn btn-outline-danger btn-sm">Manage</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4 h-100 p-4">
              <h3 className="text-primary">🏥 Hospitals</h3>
              <p className="text-muted">Monitor hospitals and requests</p>
              <button className="btn btn-outline-primary btn-sm">View</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4 h-100 p-4">
              <h3 className="text-success">👥 Users</h3>
              <p className="text-muted">Manage donors, organizations, and admins</p>
              <button className="btn btn-outline-success btn-sm">Manage</button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="card shadow-lg border-0 rounded-4 mt-5">
          <div className="card-body">
            <h4 className="text-secondary">📌 About Admin Panel</h4>
            <p className="text-muted">
              This panel allows administrators to efficiently manage blood donations,
              hospital requests, and registered users. You can also track inventory,
              review analytics, and ensure smooth operation of the Blood Bank
              Management System.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
