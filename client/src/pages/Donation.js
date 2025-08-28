import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // find donor records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
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
      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header text-center bg-danger text-white rounded-top-4">
            <h3 className="mb-0">🩸 My Donations</h3>
            <p className="mb-0">Track your life-saving contributions</p>
          </div>
          <div className="card-body">
            {data.length === 0 ? (
              <p className="text-center text-muted">
                You haven’t made any donations yet.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center">
                  <thead className="table-danger">
                    <tr>
                      <th>Blood Group</th>
                      <th>Inventory Type</th>
                      <th>Quantity (ml)</th>
                      <th>Email</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((record) => (
                      <tr key={record._id}>
                        <td>
                          <span className="badge bg-danger fs-6">
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              record.inventoryType === "in"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {record.inventoryType}
                          </span>
                        </td>
                        <td>{record.quantity}</td>
                        <td>{record.email}</td>
                        <td>
                          {moment(record.createdAt).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Donation;
