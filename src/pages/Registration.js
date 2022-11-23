import React, { useState } from "react";
import { Grid, Button, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();

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
  let [existEmailVerify, setExistEmailVerify] = useState("");
  let [existEmailCheck, setExistEmailCheck] = useState(false);

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

      //                    firebase

      createUserWithEmailAndPassword(auth, email, password)
        .then((users) => {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("Email Send");
            updateProfile(auth.currentUser, {
              displayName: name,
              // photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                console.log("name set");
                set(ref(db, "users/" + auth.currentUser.uid), {
                  username: name,
                  email: email,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
          navigate("/login");
          console.log(users);
        })
        .catch((err) => {
          const errorCode = err.code;
          console.log(errorCode);
          let existEmailCheckErr = errorCode.includes("email");
          if (existEmailCheckErr) {
            setExistEmailVerify(
              "Email already in used. Please try another email!"
            );
            setExistEmailCheck(true);
          }
        });
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
                <p style={{ marginBottom: "20px" }}>
                  Free register and you can enjoy it
                </p>

                {existEmailCheck ? (
                  <Alert variant="filled" severity="error">
                    {existEmailVerify}
                  </Alert>
                ) : (
                  ""
                )}

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
                  Already have an account ? <Link to="/login"> Login </Link>
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
