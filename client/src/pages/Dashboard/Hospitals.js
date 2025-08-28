import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { FaHospital, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Hospitals = () => {
  const [data, setData] = useState([]);

  // fetch hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-4 fw-bold text-primary">🏥 Registered Hospitals</h2>

        <div className="row g-4">
          {data?.map((record) => (
            <div className="col-md-6 col-lg-4" key={record._id}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-danger">
                    <FaHospital className="me-2 text-danger" />
                    {record.hospitalName}
                  </h5>
                  <p className="card-text mb-2">
                    <FaEnvelope className="me-2 text-primary" />
                    {record.email}
                  </p>
                  <p className="card-text mb-2">
                    <FaPhone className="me-2 text-success" />
                    {record.phone}
                  </p>
                  <p className="card-text mb-2">
                    <FaMapMarkerAlt className="me-2 text-warning" />
                    {record.address}
                  </p>
                  <p className="card-text">
                    <FaCalendarAlt className="me-2 text-muted" />
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
          <p className="text-center text-muted mt-5">No hospital records found.</p>
        )}
      </div>
    </Layout>
  );
};

export default Hospitals;
