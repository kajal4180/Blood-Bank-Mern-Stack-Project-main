import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { FaTint, FaEnvelope, FaBoxOpen, FaCalendarAlt } from "react-icons/fa";

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // fetch hospital inventory (outgoing)
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-4 fw-bold text-primary">🩸 Consumed Blood Records</h2>

        <div className="row g-4">
          {data?.map((record) => (
            <div className="col-md-6 col-lg-4" key={record._id}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-danger">
                    <FaTint className="me-2 text-danger" />
                    {record.bloodGroup}
                  </h5>
                  <p className="card-text mb-1">
                    <FaBoxOpen className="me-2 text-primary" />
                    <strong>Type:</strong> {record.inventoryType}
                  </p>
                  <p className="card-text mb-1">
                    <FaBoxOpen className="me-2 text-success" />
                    <strong>Quantity:</strong> {record.quantity} units
                  </p>
                  <p className="card-text mb-1">
                    <FaEnvelope className="me-2 text-warning" />
                    {record.email}
                  </p>
                  <p className="card-text">
                    <FaCalendarAlt className="me-2 text-secondary" />
                    <small className="text-muted">
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && (
          <p className="text-center text-muted mt-5">
            No consumption records found.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Consumer;
