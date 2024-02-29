import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import ItemHeading from "./ItemHeadings";
import { RootState } from "../../../store/store";
import { ItemInterface } from "./Interfaces/ItemInterface";
import { useFetchDataSearch } from "../../common-components/Hooks/FetchSearchDataHook";
import { useState } from "react";
import LoadMoreButton from "../../common-components/LoadMoreButton";
import CreateEditItemForm from "../../common-components/common-user-profile-components/CreateEditItemForm";
import { openForm } from "../../../store/user-state/addItemToPersonFormState";

function ForgotenItems() {
  const activeMenu = useSelector((state: RootState) => state.itemsMenu.value);
  const [items, setItems] = useState<ItemInterface[]>();
  const dispatch = useDispatch();

  const handleOpenForm = () => {
    dispatch(openForm());
  };
  useFetchDataSearch<ItemInterface[]>(
    "item/get-user-forgoten-items",
    setItems,
    items,
    "name",
    activeMenu
  );

  return (
    <div>
      <ItemHeading heading={"Items you forgot"} />
      <div className="w-full h-16  flex items-center">
        <button
          onClick={() => {
            handleOpenForm();
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
                showYourItems={false}
                key={item.id}
              />
            );
          })}

        <LoadMoreButton />
      </div>

      <CreateEditItemForm
        mustEditArray={true}
        setItems={setItems}
        hadForgoten={true}
      />
    </div>
  );
}

export default ForgotenItems;
