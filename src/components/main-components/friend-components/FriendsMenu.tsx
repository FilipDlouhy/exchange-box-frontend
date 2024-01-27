import { useState } from "react";
import FriendsMenuButton from "./FriendsMenuButton";
import { FriendsMenuItem } from "./Helpers/friendsInterfaces";
import "./Helpers/friends.css";

export default function FriendsMenu({ menu }: { menu: FriendsMenuItem[] }) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuAnimation, setMenuAnimation] = useState<string>("");

  const toggleMenu = () => {
    if (showMenu) {
      setMenuAnimation("slideOutUp");
      setTimeout(() => {
        setShowMenu(false);
      }, 500);
    } else {
      setShowMenu(true);
      setMenuAnimation("slideInDown");
    }
  };

  return (
    <div>
      <button
        type="button"
        className="sm:hidden block items-center mx-auto bg-blue-500 w-full py-2 text-sm font-semibold text-white ring-1 ring-inset hover:bg-blue-700 focus:z-10"
        onClick={toggleMenu}
      >
        Show menu
      </button>
      <div
        className={`flex-wrap items-center justify-start bg-blue-500 sm:flex ${
          showMenu ? menuAnimation : "hidden"
        }`}
      >
        {menu.map((menuItem) => {
          return (
            <FriendsMenuButton buttonData={menuItem} key={menuItem.name} />
          );
        })}
      </div>
    </div>
  );
}
