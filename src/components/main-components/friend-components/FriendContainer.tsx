import { useEffect } from "react";
import Menu from "../../common-components/Menu";
import { friendsMenuItems } from "./Helpers/FriendsHelper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setActiveMenu } from "../../../store/friend-state/menuSlice";
import { DynamicComponentRenderer } from "../../common-components/Helpers/ComonHelpers";

function FriendContainer() {
  const activeMenu = useSelector((state: RootState) => state.friendsMenu.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuButtonClick = (name: string) => {
    dispatch(setActiveMenu(name));
  };

  useEffect(() => {
    const friendsActiveMenu = localStorage.getItem("friendsActiveMenu");

    if (typeof friendsActiveMenu === "string") {
      handleMenuButtonClick(friendsActiveMenu);
    }
  }, []);

  return (
    <div>
      <Menu menu={friendsMenuItems} clickFunction={handleMenuButtonClick} />
      {DynamicComponentRenderer(activeMenu, friendsMenuItems)}
    </div>
  );
}

export default FriendContainer;
