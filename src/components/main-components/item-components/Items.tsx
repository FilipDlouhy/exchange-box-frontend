import { useSelector } from "react-redux";
import Item from "./Item";
import ItemHeading from "./ItemHeadings";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { itemMenuItems } from "./Helpers/ItemHelper";
import CreateItemForm from "./CreateItemForm";
import { ItemInterface } from "./Interfaces/ItemInterface";
import axios from "axios";
import generateUrl from "../../../contants/url";

function Items() {
  const activeMenu = useSelector((state: RootState) => state.itemsMenu.value);
  const [showYourItems, setShowYourItems] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ItemInterface[]>();
  const [hadForgoten, setHadForgoten] = useState(false);

  const fetchData = async () => {
    const result = await axios.get(
      !hadForgoten
        ? generateUrl("item/get-user-items")
        : generateUrl("item/get-user-forgoten-items"),
      { withCredentials: true }
    );
    setItems(result.data);
  };

  useEffect(() => {
    setShowYourItems(activeMenu === itemMenuItems[0].name ? true : false);
    setHadForgoten(activeMenu === itemMenuItems[0].name ? false : true);
    fetchData();
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
        {items &&
          items.map((item) => {
            return (
              <Item item={item} showYourItems={showYourItems} key={item.id} />
            );
          })}
      </div>

      <CreateItemForm hadForgoten={hadForgoten} open={open} setOpen={setOpen} />
    </div>
  );
}

export default Items;
