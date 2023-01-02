import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  console.log(auth.currentUser);
  let [friendRequest, setFriendRequest] = useState([]);
  let friendRequestArr = [];
  useEffect(() => {
    // read data from database
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      // const data = snapshot.val();
      snapshot.forEach((items) => {
        // console.log(items.val());
        friendRequestArr.push({
          name: items.val().name,
          email: items.val().email,
          senderId: items.val().senderId,
          receiverId: items.val().receiverId,
        });
        setFriendRequest(friendRequestArr);
      });
      // console.log(data);
    });
  });

  return (
    <>
      <div className="groupList">
        <h1>Friend Request</h1>
        {friendRequest.map(
          (items) =>
            auth.currentUser.uid == items.receiverId && (
              <div className="item-box">
                <div className="item-img">
                  <img src="assets/images/friend1.png" alt="group 1" />
                </div>
                <div className="item-name">
                  <h2>{items.name}</h2>
                  <h5>{items.senderId}</h5>
                  <h5>Hi Guys!</h5>
                </div>
                <div className="item-btn">
                  <button>Accept</button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default FriendRequest;
