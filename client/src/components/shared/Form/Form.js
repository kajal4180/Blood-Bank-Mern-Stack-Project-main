import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "15px",
          border: "1px solid #f0f0f0",
        }}
      >
        <h2
          className="text-center mb-2"
          style={{ fontWeight: "600", color: "#b30000" }}
        >
          {formTitle}
        </h2>
        <p className="text-center text-muted mb-4">
          {formType === "login"
            ? "Access your account by logging in"
            : "Create your account and join our community"}
        </p>

        <form
          onSubmit={(e) => {
            if (formType === "login")
              return handleLogin(e, email, password, role);
            else if (formType === "register")
              return handleRegister(
                e,
                name,
                role,
                email,
                password,
                phone,
                organisationName,
                address,
                hospitalName,
                website
              );
          }}
        >
          {/* Role Selection */}
          <div className="mb-4 text-center">
            <label className="form-label fw-semibold mb-2">
              Select Role
            </label>
            <div className="d-flex justify-content-center flex-wrap gap-2">
              {["donar", "admin", "hospital", "organisation"].map((r) => (
                <button
                  type="button"
                  key={r}
                  className={`btn ${
                    role === r ? "btn-danger" : "btn-outline-danger"
                  } btn-sm`}
                  onClick={() => setRole(r)}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          {(() => {
            switch (true) {
              case formType === "login": {
                return (
                  <>
                    <InputType
                      labelText={"Email"}
                      labelFor={"forEmail"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputType
                      labelText={"Password"}
                      labelFor={"forPassword"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </>
                );
              }
              case formType === "register": {
                return (
                  <>
                    {(role === "admin" || role === "donar") && (
                      <InputType
                        labelText={"Name"}
                        labelFor={"forName"}
                        inputType={"text"}
                        name={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                    {role === "organisation" && (
                      <InputType
                        labelText={"Organisation Name"}
                        labelFor={"forOrganisationName"}
                        inputType={"text"}
                        name={"organisationName"}
                        value={organisationName}
                        onChange={(e) =>
                          setOrganisationName(e.target.value)
                        }
                      />
                    )}
                    {role === "hospital" && (
                      <InputType
                        labelText={"Hospital Name"}
                        labelFor={"forHospitalName"}
                        inputType={"text"}
                        name={"hospitalName"}
                        value={hospitalName}
                        onChange={(e) =>
                          setHospitalName(e.target.value)
                        }
                      />
                    )}

                    <InputType
                      labelText={"Email"}
                      labelFor={"forEmail"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputType
                      labelText={"Password"}
                      labelFor={"forPassword"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputType
                      labelText={"Website"}
                      labelFor={"forWebsite"}
                      inputType={"text"}
                      name={"website"}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <InputType
                      labelText={"Address"}
                      labelFor={"forAddress"}
                      inputType={"text"}
                      name={"address"}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <InputType
                      labelText={"Phone"}
                      labelFor={"forPhone"}
                      inputType={"text"}
                      name={"phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </>
                );
              }
              default:
                return null;
            }
          })()}

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            {formType === "login" ? (
              <p className="mb-0 text-muted">
                Not registered yet?{" "}
                <Link to="/register" className="fw-semibold text-danger">
                  Register here
                </Link>
              </p>
            ) : (
              <p className="mb-0 text-muted">
                Already a user?{" "}
                <Link to="/login" className="fw-semibold text-danger">
                  Login
                </Link>
              </p>
            )}
            <button className="btn btn-danger px-4" type="submit">
              {submitBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
