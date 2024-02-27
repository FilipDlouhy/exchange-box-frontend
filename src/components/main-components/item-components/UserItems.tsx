import { useSelector } from "react-redux";
import Item from "./Item";
import ItemHeading from "./ItemHeadings";
import { RootState } from "../../../store/store";
import { useState } from "react";

import CreateItemForm from "./CreateItemForm";
import { ItemInterface } from "./Interfaces/ItemInterface";
import { useFetchDataSearch } from "../../common-components/Hooks/FetchSearchDataHook";
import LoadMoreButton from "../../common-components/LoadMoreButton";

function UserItems() {
  const activeMenu = useSelector((state: RootState) => state.itemsMenu.value);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ItemInterface[]>();

  useFetchDataSearch<ItemInterface[]>(
    "item/get-user-items",
    setItems,
    items,
    "name",
    activeMenu
  );

  return (
    <div>
      <ItemHeading heading={"Your items"} />
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

      <div className="w-full flex items-center justify-center h-full overflow-y-auto flex-wrap">
        {items &&
          items.map((item) => {
            return (
              <Item
                setItems={setItems}
                item={item}
                showYourItems={true}
                key={item.id}
              />
            );
          })}
        <LoadMoreButton />
      </div>

      <CreateItemForm
        setItems={setItems}
        hadForgoten={false}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default UserItems;
