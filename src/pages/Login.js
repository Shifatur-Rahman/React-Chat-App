import React, { useState } from "react";
import { Grid, Button, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

const Registration = () => {
  const auth = getAuth();
  const googleprovider = new GoogleAuthProvider();
  const fbprovider = new FacebookAuthProvider();
  let navigate = useNavigate();
  // Form state

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // Form error state

  let [emailErr, setEmailErr] = useState("");
  let [passErr, setPassErr] = useState("");
  let [passLengthErr, setPassLengthErr] = useState("");
  let [checkPassword, setCheckPassword] = useState(false);
  let [existEmail, setExistEmail] = useState("");
  let [existPassword, setExistPassword] = useState("");
  let [existAccessVerify, setExistAccessVerify] = useState(false);

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
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((users) => {
          navigate("/home");
          //  console.log(users);
          // let newUser = users.user;
          // if (newUser.emailVerified === true) {
          //   navigate("/home");
          // } else {
          //   alert("Email is not verified");
          // }
        })
        .catch((error) => {
          const errorCode = error.code;

          let checkEmailErr = errorCode.includes("user");

          let checkPasswordErr = errorCode.includes("password");
          setExistAccessVerify(true);
          if (checkEmailErr) {
            setExistPassword("");
            setExistEmail("Email not found!");
          } else if (checkPasswordErr) {
            setExistEmail("");
            setExistPassword("Wrong Password!");
          }
        });
    }
  };

  let handlEye = () => {
    setCheckPassword(!checkPassword);
  };

  let handleGoogleVerify = () => {
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        // const errorCode = error.code;
      });
  };

  let handleFbVerify = () => {
    signInWithPopup(auth, fbprovider)
      .then((result) => {
        // const user = result.user;
        navigate("/home");
      })
      .catch((error) => {
        // const errorCode = error.code;
        console.log(error.code);
      });
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
                  <div onClick={handleGoogleVerify} className="option">
                    <img src="./assets/images/google.png" alt="google" />
                    Login with Google
                  </div>
                  <div onClick={handleFbVerify} className="option">
                    <img src="./assets/images/facebook.png" alt="facebook" />
                    Login with Facebook
                  </div>
                </div>

                {existAccessVerify ? (
                  <Alert variant="filled" severity="warning">
                    {existEmail ? existEmail : existPassword && existPassword}
                  </Alert>
                ) : (
                  " "
                )}

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
                      passErr ? passErr : passLengthErr && passLengthErr
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
