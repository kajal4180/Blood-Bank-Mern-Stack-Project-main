import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { FaEnvelope, FaPhone, FaTrash } from "react-icons/fa";

const DonarList = () => {
  const [data, setData] = useState([]);

  // fetch donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  // delete function
  const handelDelete = async (id) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this donor?");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      getDonars(); // refresh list instead of reloading page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-4 fw-bold text-danger">🩸 Donor List</h2>

        <div className="row g-4">
          {data?.map((record) => (
            <div className="col-md-6 col-lg-4" key={record._id}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">
                    {record.name || record.organisationName + " (ORG)"}
                  </h5>
                  <p className="card-text text-muted mb-1">
                    <FaEnvelope className="me-2 text-danger" />
                    {record.email}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <FaPhone className="me-2 text-success" />
                    {record.phone}
                  </p>
                  <p className="card-text">
                    <small className="text-secondary">
                      Registered on:{" "}
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-white border-0 text-end">
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    onClick={() => handelDelete(record._id)}
                  >
                    <FaTrash className="me-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && (
          <p className="text-center text-muted mt-5">No donors found.</p>
        )}
      </div>
    </Layout>
  );
};

export default DonarList;
