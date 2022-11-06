import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
const Registration = () => {
  // Form state

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");

  // Form error state

  let [nameErr, setNameErr] = useState("");
  let [emailErr, setEmailErr] = useState("");
  let [passErr, setPassErr] = useState("");
  let [cofirmPassErr, setCofirmPassErr] = useState("");
  let [passLengthErr, setPassLengthErr] = useState("");

  let submitHandle = (e) => {
    setNameErr("");
    setEmailErr("");
    setPassErr("");
    setCofirmPassErr("");
    setPassLengthErr("");
    if (!name) {
      setNameErr("Please enter a Name");
    } else if (!email) {
      setEmailErr("Please enter a Email");
    } else if (!password) {
      setPassErr("Please enter a Password");
    } else if (password.length < 8) {
      setPassLengthErr("Password must be 8 digits");
    } else if (!confirmpassword) {
      setCofirmPassErr("Please enter a Confirm-Password");
    } else {
      if (password !== confirmpassword) {
        setCofirmPassErr("Password don't match");
      }
    }
  };

  return (
    <>
      <section className="registration_part">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="box">
              <div className="register-left">
                <h1>Get started with easily register</h1>
                <p>Free register and you can enjoy it</p>

                <TextField
                  helperText={nameErr}
                  id="demo-helper-text-aligned"
                  label="Full Name"
                  style={{ width: "368px", marginTop: "40px" }}
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <br />
                <TextField
                  helperText={emailErr}
                  id="demo-helper-text-aligned"
                  label="Enter Email"
                  style={{ width: "368px", marginTop: "40px" }}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <br />

                <TextField
                  helperText={
                    passErr ? passErr : passLengthErr ? passLengthErr : ""
                  }
                  id="demo-helper-text-aligned"
                  label="Password"
                  style={{ width: "368px", marginTop: "40px" }}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <br />

                <TextField
                  helperText={cofirmPassErr}
                  id="demo-helper-text-aligned"
                  label="Confirm Password"
                  style={{ width: "368px", marginTop: "40px" }}
                  type="password"
                  onChange={(e) => {
                    setConfirmpassword(e.target.value);
                  }}
                />

                <br />

                <Button
                  style={{
                    width: "368px",
                    height: "68px",
                    marginTop: "40px",
                    borderRadius: "86px",
                    fontSize: "20px",
                    fontWeight: "600",
                    background: "#5F35F5",
                  }}
                  variant="contained"
                  onClick={submitHandle}
                >
                  Sign Up
                </Button>

                <p className="popupMsg">
                  Already have an account ?{" "}
                  <Link to="/login"> Login </Link>
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="right">
              <img
                src="./assets/images/register.png"
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
