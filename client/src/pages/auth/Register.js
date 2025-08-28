import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0" style={{ minHeight: "100vh" }}>
          {/* Left Side with DonorNet Branding */}
          <div
            className="col-md-8 d-flex flex-column justify-content-center align-items-center text-center p-5"
            style={{
              background: "linear-gradient(135deg, #ff4d4d, #b30000)",
              color: "#fff",
            }}
          >
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "3rem",
                letterSpacing: "2px",
                textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              DonorNet
            </h1>
            <p
              style={{
                fontSize: "1.3rem",
                fontStyle: "italic",
                marginTop: "10px",
                textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
              }}
            >
              Be the reason for someone’s heartbeat 💓
            </p>
            <img
              src="./assets/images/banner2.jpg"
              alt="registerImage"
              style={{
                maxWidth: "70%",
                marginTop: "30px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Right Side with Full-Sized Register Panel */}
          <div
            className="col-md-4 d-flex flex-column justify-content-center align-items-center p-5"
            style={{
              background: "linear-gradient(135deg, #fff5f5, #ffe6e6)",
            }}
          >
            <div
              className="w-100 h-100 d-flex flex-column justify-content-center p-5 rounded-0"
              style={{
                background: "#ffffffcc",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              {/* Registration Form (handles fields + button) */}
              <Form
                formTitle={"Register"}
                submitBtn={"Register"}
                formType={"register"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
