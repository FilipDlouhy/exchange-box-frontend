import { useEffect, useState } from "react";
import CreateUpdateExchangeForm from "./CreateUpdateExchangeForm";
import { ExchangeFriend } from "../../interfaces/ExchangeFriendInterface";
import ItemsForExchange from "./ItemsForExchange";
import axios from "axios";
import generateUrl from "../../../../../contants/url";
import { ExchangeItemInterface } from "../../interfaces/ExchnageItem";
import { CreateUpdateExchangeDto } from "../../../../../Dtos/CenterDtos/create.exchnage.dto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { CenterInterface } from "../../interfaces/CenterInterFace";
import { ItemInExchnageInterface } from "../../interfaces/ItemInExchnageInterface";
import { CreateUpdateExchangeProps } from "../props/ExchnageCreateUpdateProps";
import { resetExchangeCreationState } from "../../../../../store/exchange-state/createExchnageFomItemSlice";

function CreateUpdateExchange({
  setIsCreating,
  setExchanges,
  isUpdating = false,
  setIsUpdatingExhcnage,
  fullExchange = undefined,
}: CreateUpdateExchangeProps) {
  const [selectedFriend, setSelectedFriend] = useState<ExchangeFriend>();
  const [itemsSimple, setItemsSimple] = useState<ExchangeItemInterface[]>();
  const [name, setName] = useState<string>("");
  const [pickUpDate, setPickUpDate] = useState<Date>();
  const [size, setSize] = useState<string>("Large");
  const [itemsInExchnage, setItemsInExchnage] = useState<
    ItemInExchnageInterface[]
  >([]);
  const [center, setCenter] = useState<CenterInterface | undefined>();
  const { id, latitude, longitude } = useSelector(
    (state: RootState) => state.user
  );

  const itemIdFromItems = useSelector(
    (state) => state.createExchangeFromItem.itemId
  );
  const friendIdFromItems = useSelector(
    (state) => state.createExchangeFromItem.friendId
  );

  const dispatch = useDispatch();

  const handleCoordinatesChange = (center: CenterInterface | undefined) => {
    setCenter(center);
  };

  const handleItemsInExchangeChange = (item: ItemInExchnageInterface) => {
    const isAdding = !itemsInExchnage.some(
      (itemInExchnage) => itemInExchnage.id === item.id
    );

    if (isAdding) {
      setItemsInExchnage((prevItems) => [...prevItems, item]);
    } else {
      setItemsInExchnage((prevItems) =>
        prevItems.filter((existingItem) => existingItem.id !== item.id)
      );
    }
  };

  const getItems = async (isForgoten: boolean) => {
    const { data } = await axios.get(
      generateUrl(
        isForgoten
          ? `item/get-user-forgoten-item-simple-for-exchange/${selectedFriend?.friendId}`
          : `item/get-user-item-simple-for-exchange/${selectedFriend?.friendId}`
      ),
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
      typeof pickUpDate === "undefined" ||
      typeof fullExchange === "undefined" ||
      typeof setIsCreating === "undefined"
    ) {
      console.error("Missing required data for exchange update.");
      return;
    }

    const itemsInExchnageIds = itemsInExchnage.map((item) => {
      return item.id;
    });

    const createExchangeDto =
      friendIdFromItems != null
        ? new CreateUpdateExchangeDto(
            selectedFriend.friendId,
            parseInt(id),
            size,
            name,
            itemsInExchnageIds,
            parseInt(center.id),
            pickUpDate
          )
        : new CreateUpdateExchangeDto(
            parseInt(id),
            selectedFriend.friendId,
            size,
            name,
            itemsInExchnageIds,
            parseInt(center.id),
            pickUpDate
          );

    try {
      const { data } = await axios.post(
        generateUrl("exchange/create-exchange"),
        createExchangeDto
      );

      data.pickUpDate = new Date(data.pickUpDate);

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

  const updateExchange = async () => {
    if (
      typeof selectedFriend === "undefined" ||
      typeof name === "undefined" ||
      typeof size === "undefined" ||
      typeof itemsInExchnage === "undefined" ||
      typeof center === "undefined" ||
      typeof pickUpDate === "undefined" ||
      typeof fullExchange === "undefined"
    ) {
      console.error("Missing required data for exchange update.");
      return;
    }

    const itemsInExchangeIds = itemsInExchnage.map((item) => item.id);

    const updateExchangeDto = new CreateUpdateExchangeDto(
      parseInt(id),
      selectedFriend.friendId,
      size,
      name,
      itemsInExchangeIds,
      parseInt(center.id),
      pickUpDate
    );

    try {
      const { data } = await axios.post(
        generateUrl("exchange/update-exchange"),
        {
          exchangeId: fullExchange.id,
          updateExchangeDto: updateExchangeDto,
        }
      );
      data.pickUpDate = new Date(data.pickUpDate);
      setExchanges((prevExchanges) => {
        if (!prevExchanges) {
          return [data];
        }

        const index = prevExchanges.findIndex(
          (exchange) => exchange.id === fullExchange.id
        );

        if (index !== -1) {
          const newExchanges = [...prevExchanges];

          newExchanges[index] = data;

          return newExchanges;
        }

        return prevExchanges;
      });

      setIsUpdatingExhcnage(false);
    } catch (error) {
      console.error("Failed to update exchange:", error);
    }
  };

  useEffect(() => {
    if (selectedFriend != null) {
      getItems(false);
    }

    if (itemIdFromItems != null) {
      getItems(true);
    }
  }, [selectedFriend, itemIdFromItems]);

  useEffect(() => {
    setItemsInExchnage([]);
    itemsSimple?.forEach((item) => {
      if (item.id === itemIdFromItems) {
        setItemsInExchnage((prevItems) => [...prevItems, item]);
      }
    });
  }, [itemIdFromItems, itemsSimple]);

  useEffect(() => {
    if (isUpdating && fullExchange) {
      const { pickUpDate, name, boxSize, friend, items } = fullExchange;

      if (pickUpDate !== undefined) setPickUpDate(pickUpDate);
      if (name !== undefined) setName(name);
      if (boxSize !== undefined) setSize(boxSize);
      const itemsForExhcnage: ItemInExchnageInterface[] | undefined =
        items?.map((item) => {
          return { id: item.id, name: item.name };
        });
      setItemsInExchnage(itemsForExhcnage ?? []);
      if (friend) {
        const { id, name } = friend;
        setSelectedFriend({
          friendId: id || 0,
          friendName: name || "",
        });
      }
    }
  }, [isUpdating, fullExchange]);

  return (
    <div>
      {!isUpdating && (
        <div className="w-full h-28 flex justify-around flex-col">
          <h1 className="font-semibold ml-8">Create Exchange</h1>
          <button
            onClick={() => {
              if (setIsCreating) {
                setIsCreating(false);
              }

              dispatch(resetExchangeCreationState());
            }}
            type="button"
            className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center p-8 w-full">
        {!isUpdating && (
          <div className="w-full h-10 text-center">
            <h1 className="text-2xl font-bold">
              {pickUpDate
                ? "You have two hours to put items into your box"
                : ""}
            </h1>
          </div>
        )}

        <CreateUpdateExchangeForm
          centerLong={fullExchange ? fullExchange.longitude : longitude ?? 0}
          centerLat={fullExchange ? fullExchange.latitude : latitude ?? 0}
          selectedFriend={selectedFriend}
          name={name}
          pickUpDate={pickUpDate}
          size={size}
          setPickUpDate={setPickUpDate}
          setName={setName}
          setSize={setSize}
          handleCoordinatesChange={handleCoordinatesChange}
          setSelectedFriend={setSelectedFriend}
          isUpdating={isUpdating}
        />

        <ItemsForExchange
          handleItemsInExchangeChange={handleItemsInExchangeChange}
          itemsInExchnage={itemsInExchnage}
          itemsSimple={itemsSimple}
        />
        <div className=" my-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (isUpdating) {
                updateExchange();
              } else {
                createExchange();
              }
            }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            {isUpdating ? "Update exhnage" : "Create exchange"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUpdateExchange;
