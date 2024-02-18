import { useSelector } from "react-redux";
import Item from "./Item";
import ItemHeading from "./ItemHeadings";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { itemMenuItems } from "./Helpers/ItemHelper";
import CreateItemForm from "./CreateItemForm";

function Items() {
  const activeMenu = useSelector((state: RootState) => state.itemsMenu.value);
  const [showYourItems, setShowYourItems] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setShowYourItems(activeMenu === itemMenuItems[0].name ? true : false);
  }, [activeMenu]);

  return (
    <div>
      <ItemHeading
        heading={showYourItems ? "Your items" : "Items you forgot"}
      />
      <div className="w-full h-16  flex items-center">
        <button
          onClick={() => {
            setOpen(true);
          }}
          type="button"
          className="rounded-sm bg-blue-500 ml-8 w-40 h-6 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create item
        </button>
      </div>

      <div className="w-full flex items-center justify-center h-96 overflow-y-auto flex-wrap">
        <Item showYourItems={showYourItems} />
      </div>

      <CreateItemForm open={open} setOpen={setOpen} />
    </div>
  );
}

export default Items;
