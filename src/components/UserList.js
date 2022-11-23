import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  console.log(auth.currentUser);

  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users");
    let userArr = [];
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        //console.log(item.key);
        userArr.push({
          username: item.val().username,
          email: item.val().email,
          id: item.key,
        });
      });
      setUserlist(userArr);
    });
  }, []);

  return (
    <>
      <div className="groupList friends userList">
        <h1>User List</h1>
        {userlist.map(
          (item) =>
            auth.currentUser.uid !== item.id && (
              <div className="item-box">
                <div className="item-img">
                  <img src="assets/images/group1.png" alt="group 1" />
                </div>
                <div className="item-name">
                  <h2>{item.username}</h2>
                  <h5>{item.email}</h5>
                  <h5>{item.id}</h5>
                </div>
                <div className="item-btn">
                  <button> + </button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default UserList;
