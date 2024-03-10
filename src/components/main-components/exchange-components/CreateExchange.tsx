import { useEffect, useState } from "react";
import CreateExchangeForm from "./CreateExchangeForm";
import { ExchangeFriend } from "./interfaces/ExchangeFriendInterface";
import ItemsForExchange from "./ItemsForExchange";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { ExchangeItemInterface } from "./interfaces/ExchnageItem";
import { CreateExchangeDto } from "../../../Dtos/CenterDtos/create.exchnage.dto";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CenterInterface } from "./interfaces/CenterInterFace";
import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";

function CreateExchange({
  setIsCreating,
  setExchanges,
}: {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
  >;
}) {
  const [selectedFriend, setSelectedFriend] = useState<ExchangeFriend>();
  const [itemsSimple, setItemsSimple] = useState<ExchangeItemInterface[]>();
  const [name, setName] = useState<string>("");
  const [pickUpDate, setPickUpDate] = useState<Date>();
  const [size, setSize] = useState<string>("");
  const [itemsInExchnage, setItemsInExchnage] = useState<number[]>([]);
  const [center, setCenter] = useState<CenterInterface | undefined>();
  const userId = useSelector((state: RootState) => state.user.id);

  const handleCoordinatesChange = (center: CenterInterface | undefined) => {
    setCenter(center);
  };

  const handleItemsInExchangeChange = (id: number, isAdding: boolean) => {
    if (isAdding) {
      setItemsInExchnage((prevItems) => [...prevItems, id]);
    } else {
      setItemsInExchnage((prevItems) =>
        prevItems.filter((itemId) => itemId !== id)
      );
    }
  };

  const getItems = async () => {
    const { data } = await axios.get(
      generateUrl(`item/get-user-item-simple/${selectedFriend?.friendId}`),
      { withCredentials: true }
    );

    setItemsSimple(data);
  };

  const createExchange = async () => {
    if (
      typeof selectedFriend === "undefined" ||
      typeof name === "undefined" ||
      typeof size === "undefined" ||
      typeof itemsInExchnage === "undefined" ||
      typeof center === "undefined" ||
      typeof pickUpDate === "undefined"
    ) {
      return;
    }

    const createExchangeDto = new CreateExchangeDto(
      parseInt(userId),
      selectedFriend.friendId,
      size,
      name,
      itemsInExchnage,
      parseInt(center.id),
      pickUpDate
    );
    await axios.post(
      generateUrl("exchange/create-exchange"),
      createExchangeDto
    );

    setIsCreating(false);

    try {
      const { data } = await axios.post(
        generateUrl("exchange/create-exchange"),
        createExchangeDto
      );

      setExchanges((prevExchanges) => {
        const newExchanges = prevExchanges ? [data, ...prevExchanges] : [data];
        return newExchanges;
      });

      setIsCreating(false);
    } catch (error) {
      console.error("Failed to create exchange:", error);

      alert("Failed to create exchange. Please try again.");

      setIsCreating(false);
    }
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
        <div className="w-full h-10 text-center">
          <h1 className="text-2xl font-bold">
            {pickUpDate ? "You have two hours to put items into your box" : ""}
          </h1>
        </div>
        <CreateExchangeForm
          setPickUpDate={setPickUpDate}
          setName={setName}
          setSize={setSize}
          handleCoordinatesChange={handleCoordinatesChange}
          setSelectedFriend={setSelectedFriend}
        />
        <ItemsForExchange
          handleItemsInExchangeChange={handleItemsInExchangeChange}
          itemsInExchnage={itemsInExchnage}
          itemsSimple={itemsSimple}
        />
        <div className=" my-6 flex items-center justify-between">
          <button
            onClick={() => {
              createExchange();
            }}
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
