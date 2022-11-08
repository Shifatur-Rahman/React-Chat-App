import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert, AlertTitle, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [verifyEmail, setVerifyEmail] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setVerifyEmail(user.emailVerified);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      {verifyEmail ? (
        <h1>home page</h1>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Alert severity="warning">
              <AlertTitle>Please verify your email</AlertTitle>
              This is a warning alert — <strong>check your email now!</strong>
            </Alert>
          </Grid>

          <Grid item xs={4}></Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
