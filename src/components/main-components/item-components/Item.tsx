import axios from "axios";
import { ItemInterface } from "./Interfaces/ItemInterface";
import generateUrl from "../../../contants/url";
import { setItemToEdit } from "../../../store/item-state/itemToEditSlice";
import { useDispatch } from "react-redux";
import { openForm } from "../../../store/user-state/addItemToPersonFormState";
import { setActiveModuleName } from "../../../store/moduleSlice";
import { setExchangeIdFromItem } from "../../../store/exchange-state/exhcnageFromItemsSlice";

function Item({
  item,
  showYourItems,
  setItems,
}: {
  item: ItemInterface;
  showYourItems: boolean;
  setItems: React.Dispatch<React.SetStateAction<ItemInterface[] | undefined>>;
}) {
  const dispatch = useDispatch();

  const handleOpenForm = () => {
    dispatch(openForm());
  };
  const formatName = (name: string) => {
    return name.length > 9 ? `${name.substring(0, 9)}..` : name;
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await axios.delete(generateUrl(`item/delete-item/${itemId}`), {
        withCredentials: true,
      });

      setItems((prevItems) => {
        if (prevItems === undefined) {
          return [];
        }

        const updatedItems = prevItems.filter((item) => item.id !== itemId);
        return updatedItems;
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const showExhcnage = () => {
    dispatch(setExchangeIdFromItem(item.exchangeId));
    dispatch(setActiveModuleName("Exchanges"));
  };

  return (
    <div className="w-96 h-80 shadow-xl m-5  rounded-sm group relative">
      <div className="w-full h-1/2">
        <img
          className="h-full w-full object-cover"
          src={item.imageURL}
          alt="Item"
        />
      </div>
      <div className="w-full h-1/2 flex flex-col justify-between p-2">
        <div className="flex justify-between px-1">
          <p className="text-lg font-semibold">
            Name:
            <span className="text-blue-700 font-bold">
              {" "}
              {formatName(item.name)}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Owner:{" "}
            <span className="text-blue-700 font-bold">{item.ownerName}</span>
          </p>
        </div>
        <div className="flex justify-between px-10">
          <p className="text-sm text-gray-700">
            Length: <span className="font-medium">{item.length} cm</span>
          </p>
          <p className="text-sm text-gray-700">
            Width: <span className="font-medium">{item.width} cm</span>
          </p>
        </div>
        <div className="flex justify-between px-10">
          <p className="text-sm text-gray-700">
            Height: <span className="font-medium">{item.height} cm</span>
          </p>
          <p className="text-sm text-gray-700">
            Weight: <span className="font-medium">{item.weightInGrams} g</span>
          </p>
        </div>
        <div className="flex items-center justify-around py-2">
          {showYourItems && item.exchangeId == null && (
            <button
              onClick={() => {
                handleOpenForm();
                dispatch(setItemToEdit(item));
              }}
              className="rounded-md bg-indigo-600 w-28 h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit item
            </button>
          )}
          {item.exchangeId != null && (
            <button
              onClick={() => {
                showExhcnage();
              }}
              className="rounded-md bg-indigo-600 w-28 h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Show exchange
            </button>
          )}
          {showYourItems && item.exchangeId == null && (
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="rounded-md bg-indigo-600 w-28 h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete item
            </button>
          )}
          {!showYourItems && item.exchangeId == null && (
            <button className="rounded-md bg-indigo-600 w-28 h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Create exchange
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
