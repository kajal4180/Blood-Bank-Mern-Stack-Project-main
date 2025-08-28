import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container py-4">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2
              style={{
                color: "#b30000",
                fontWeight: "600",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Blood Inventory
            </h2>
            <button
              className="btn btn-danger px-4 py-2 shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ fontWeight: "500", borderRadius: "8px" }}
            >
              <i className="fa-solid fa-plus me-2"></i> Add Inventory
            </button>
          </div>

          {/* Table Section */}
          <div
            className="table-responsive shadow-sm rounded"
            style={{ background: "#fff", borderRadius: "12px" }}
          >
            <table className="table table-hover align-middle mb-0">
              <thead
                className="text-white"
                style={{ background: "#b30000", borderRadius: "12px" }}
              >
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donor Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>
                      <span className="badge bg-danger fs-6">
                        {record.bloodGroup}
                      </span>
                    </td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
