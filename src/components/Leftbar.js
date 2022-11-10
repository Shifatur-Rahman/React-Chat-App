import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineTextsms, MdLogout } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Leftbar = (props) => {
  const auth = getAuth();
  let navigate = useNavigate();

  let [name, setName] = useState("");

  let handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("log out");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
      }
    });
  }, []);
  return (
    <div className="leftbar">
      <img
        className="profilePic"
        src="./assets/images/login.png"
        alt="profile pic"
      />

      <h4>{name}</h4>

      <div className="icons">
        <ul>
          <li className={props.active === "home" && "active"}>
            <AiOutlineHome className="icon" />
          </li>
          <li className={props.active === "msg" && "active"}>
            <MdOutlineTextsms className="icon" />
          </li>
          <li className={props.active === "alert" && "active"}>
            <IoIosNotifications className="icon" />
          </li>
          <li className={props.active === "settings" && "active"}>
            <FiSettings className="icon" />
          </li>
          <li onClick={handleSignOut}>
            <MdLogout className="icon" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
