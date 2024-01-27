import React from "react";
import FriendsMenu from "./FriendsMenu";
import { friendsMenuItems } from "./Helpers/FriendsHelper";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function FriendContainer() {
  const activeMenu = useSelector((state: RootState) => state.friendsMenu.value);

  return (
    <div>
      <FriendsMenu menu={friendsMenuItems} />
    </div>
  );
}

export default FriendContainer;
