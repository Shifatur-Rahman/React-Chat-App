import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Registration = () => {
  // Form state

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // Form error state

  let [emailErr, setEmailErr] = useState("");
  let [passErr, setPassErr] = useState("");
  let [passLengthErr, setPassLengthErr] = useState("");
  let [checkPassword, setCheckPassword] = useState(false);

  let submitHandle = (e) => {
    setEmailErr("");
    setPassErr("");

    setPassLengthErr("");
    if (!email) {
      setEmailErr("Please enter a Email");
    } else if (!password) {
      setPassErr("Please enter a Password");
    } else if (password.length < 8) {
      setPassLengthErr("Password must be 8 digits");
    }
  };

  let handlEye = () => {
    setCheckPassword(!checkPassword);
  };

  return (
    <>
      <section className="registration_part login_part">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="box">
              <div className="register-left">
                <h1>Login to your account!</h1>

                <div className="inputOption">
                  <div className="option">
                    <img src="./assets/images/google.png" alt="google" />
                    Login with Google
                  </div>
                  <div className="option">
                    <img src="./assets/images/facebook.png" alt="facebook" />
                    Login with Facebook
                  </div>
                </div>

                <TextField
                  helperText={emailErr}
                  id="demo-helper-text-aligned"
                  label="Enter Email"
                  style={{ width: "372px", marginTop: "40px" }}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <br />

                <div className="eye">
                  <TextField
                    helperText={
                      passErr ? passErr : passLengthErr ? passLengthErr : ""
                    }
                    id="demo-helper-text-aligned"
                    label="Password"
                    style={{ width: "372px", marginTop: "40px" }}
                    type={checkPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  {checkPassword ? (
                    <AiFillEye onClick={handlEye} className="eyeIcon" />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={handlEye}
                      className="eyeIcon"
                    />
                  )}
                </div>

                <br />

                <Button
                  style={{
                    width: "405px",
                    height: "81px",
                    marginTop: "40px",
                    borderRadius: "8px",
                    fontSize: "20px",
                    fontWeight: "600",
                    background: "#5F35F5",
                    fontFamily: "Open Sans",
                    lineHeight: "29px",
                  }}
                  variant="contained"
                  onClick={submitHandle}
                >
                  Login to Continue
                </Button>

                <p className="popupMsg">
                  Don’t have an account ? <Link to="/"> Sign up </Link>
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="right">
              <img
                src="./assets/images/login.png"
                alt="register img"
                style={{
                  width: "100%",
                  height: "100vh",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Registration;
