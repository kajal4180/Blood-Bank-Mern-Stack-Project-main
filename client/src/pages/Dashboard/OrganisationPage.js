import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";
import { FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // fetch organisation records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-orgnaisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-orgnaisation-for-hospital");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-4 fw-bold text-primary">🏢 Partner Organisations</h2>

        <div className="row g-4">
          {data?.map((record) => (
            <div className="col-md-6 col-lg-4" key={record._id}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-danger">
                    <FaBuilding className="me-2 text-danger" />
                    {record.organisationName}
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
          <p className="text-center text-muted mt-5">
            No organisation records found.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default OrganisationPage;
