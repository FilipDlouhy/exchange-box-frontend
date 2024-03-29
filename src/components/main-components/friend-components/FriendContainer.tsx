import { useEffect } from "react";
import Menu from "../../common-components/Menu";
import { friendsMenuItems } from "./Helpers/FriendsHelper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setActiveMenu } from "../../../store/friend-state/friendMenuSlice";
import { DynamicComponentRenderer } from "../../common-components/helpers/ComonHelpers";
import UserProfile from "./UserProfile";
import { resetStarting } from "../../../store/paginationSlice";
import { clearSearchText } from "../../../store/searchSlice";
import CreateEditItemForm from "../../common-components/common-user-profile-components/CreateEditItemForm";

function FriendContainer() {
  const activeMenu = useSelector((state: RootState) => state.friendsMenu.value);
  const dispatch = useDispatch<AppDispatch>();
  const profileUser = useSelector((state: RootState) => state.profileUser);

  const handleMenuButtonClick = (name: string) => {
    dispatch(setActiveMenu(name));
    dispatch(resetStarting());
    dispatch(clearSearchText());
  };

  useEffect(() => {
    const friendsActiveMenu = localStorage.getItem("friendsActiveMenu");

    if (typeof friendsActiveMenu === "string") {
      handleMenuButtonClick(friendsActiveMenu);
    }
  }, []);

  return (
    <div>
      <Menu
        currentMenu={"friends"}
        menu={friendsMenuItems}
        clickFunction={handleMenuButtonClick}
      />
      {!profileUser.email && !profileUser.id ? (
        DynamicComponentRenderer(activeMenu, friendsMenuItems)
      ) : (
        <UserProfile />
      )}
      <CreateEditItemForm mustEditArray={false} />
    </div>
  );
}

export default FriendContainer;
