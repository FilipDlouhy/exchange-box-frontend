import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { MenuItem } from "./Helpers/ComonInterfaces";
import { resetProfileUser } from "../../store/user-state/profileUserSlice";

function MenuButton({
  buttonData,
  clickFunction,
  currentMenu,
}: {
  buttonData: MenuItem;
  clickFunction: (name: string) => void;
  currentMenu: string;
}) {
  const activeMenu = useSelector((state: RootState) =>
    currentMenu === "friends" ? state.friendsMenu.value : state.itemsMenu.value
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      onClick={() => {
        clickFunction(buttonData.name);
        dispatch(resetProfileUser());
      }}
      type="button"
      className={`relative items-center w-full sm:w-40 h-full ${
        activeMenu === buttonData.name ? "bg-blue-700" : "bg-blue-500"
      } px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset hover:bg-blue-700 focus:z-10`}
    >
      {buttonData.displayName}
    </button>
  );
}

export default MenuButton;
