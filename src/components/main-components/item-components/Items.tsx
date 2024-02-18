import { useSelector } from "react-redux";
import Item from "./Item";
import ItemHeading from "./ItemHeadings";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { itemMenuItems } from "./Helpers/ItemHelper";

function Items() {
  const activeMenu = useSelector((state: RootState) => state.itemsMenu.value);
  const [showYourItems, setShowYourItems] = useState<boolean>(false);
  useEffect(() => {
    setShowYourItems(activeMenu === itemMenuItems[0].name ? true : false);
  }, [activeMenu]);

  return (
    <div>
      <ItemHeading
        heading={showYourItems ? "Your items" : "Items you forgot"}
      />
      <div className="w-full flex items-center justify-center h-96 overflow-y-auto flex-wrap">
        <Item showYourItems={showYourItems} />
      </div>
    </div>
  );
}

export default Items;
