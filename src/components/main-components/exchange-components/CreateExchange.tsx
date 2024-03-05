import { useEffect, useState } from "react";
import CreateExchangeForm from "./CreateExchangeForm";
import { ExchangeFriend } from "./Interfaces/ExchangeFriendInterface";
import ItemsForExchange from "./ItemsForExchange";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { ExchangeItemInterface } from "./Interfaces/ExchnageItem";

function CreateExchange({
  setIsCreating,
}: {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) {
  const [selectedFriend, setSelectedFriend] = useState<ExchangeFriend>();
  const [itemsSimple, setItemsSimple] = useState<ExchangeItemInterface[]>();

  const getItems = async () => {
    const { data } = await axios.get(
      generateUrl(`item/get-user-item-simple/${selectedFriend?.friendId}`),
      { withCredentials: true }
    );

    setItemsSimple(data);
  };

  useEffect(() => {
    if (selectedFriend != null) {
      getItems();
    }
  }, [selectedFriend]);

  return (
    <div>
      <div className="w-full h-28 flex justify-around flex-col">
        <h1 className="font-semibold ml-8">Create Exchange</h1>
        <button
          onClick={() => {
            setIsCreating(false);
          }}
          type="button"
          className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-8 w-full">
        <CreateExchangeForm setSelectedFriend={setSelectedFriend} />
        <ItemsForExchange itemsSimple={itemsSimple} />
        <div className=" my-6 flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Create exchange
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateExchange;
