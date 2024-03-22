import { useEffect, useState } from "react";
import axios from "axios";
import generateUrl from "../../../../../contants/url";
import { ExchangeFriend } from "../../interfaces/ExchangeFriendInterface";
import { CenterInterface } from "../../interfaces/CenterInterFace";
import CreateUpdateExchangeMap from "./CreateUpdateExchangeMap";
import { CreateUpdateExchangeFormProps } from "../props/ExchnageCreateUpdateProps";
import { useSelector } from "react-redux";

function CreateUpdateExchangeForm({
  setSelectedFriend,
  handleCoordinatesChange,
  setName,
  setSize,
  setPickUpDate,
  size,
  name,
  pickUpDate,
  selectedFriend,
  centerLong,
  centerLat,
  isUpdating,
}: CreateUpdateExchangeFormProps) {
  const [friends, setFiends] = useState<ExchangeFriend[]>();
  const [centers, setCenters] = useState<CenterInterface[]>([]);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);
  const [lockSelect, setLockSelect] = useState<boolean>(false);
  const friendIdFromItems = useSelector(
    (state) => state.createExchangeFromItem.friendId
  );
  const fetchData = async () => {
    const friends = await axios.get(
      generateUrl("user/get-users-friends-simple"),
      { withCredentials: true }
    );

    const centers = await axios.get(generateUrl("center/get-centers"), {
      withCredentials: true,
    });

    setCenters(centers.data);

    setFiends(friends.data);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    if (selectedIndex !== "" && friends) {
      setIsUserSelected(true);
      const selectedFriend = friends[parseInt(selectedIndex)];
      setSelectedFriend(selectedFriend);
    } else {
      setIsUserSelected(false);
      setSelectedFriend(undefined);
    }
  };

  useEffect(() => {
    setSize("Large");
    fetchData();
    setLockSelect(false);
  }, []);

  useEffect(() => {
    if (selectedFriend != null) {
      setIsUserSelected(true);
    }
  }, [selectedFriend]);

  useEffect(() => {
    if (friends !== undefined) {
      friends.map((friend) => {
        if (friend.friendId === friendIdFromItems) {
          setSelectedFriend(friend);
          setIsUserSelected(true);
          setLockSelect(true);
        }
      });
    }
  }, [friendIdFromItems, friends]);

  return (
    <form className="w-full sm:w-3/4 md:w-1/2">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="size"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Size
        </label>
        <select
          onChange={(e) => {
            setSize(e.target.value);
          }}
          id="size"
          name="size"
          value={size}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Pick up date for exchange
        </label>

        <input
          type="datetime-local"
          id="date"
          name="date"
          value={
            pickUpDate instanceof Date
              ? pickUpDate.toISOString().slice(0, 16)
              : ""
          }
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) => {
            setPickUpDate(new Date(e.target.value));
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="other"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select user
        </label>
        <select
          disabled={lockSelect}
          id="other"
          name="other"
          value={selectedFriend?.friendName}
          onChange={(e) => {
            handleSelectChange(e);
          }}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {!isUserSelected && <option value="">Choose user</option>}
          {friends?.map((friend, index) => {
            return (
              <option key={index} value={index}>
                {friend.friendName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="w-full my-3 ">
        <h1 className="my-3 font-semibold text-2xl">
          Choose location for exchange
        </h1>
        {centers.length > 0 ? (
          <CreateUpdateExchangeMap
            centerLong={centerLong}
            isUpdating={isUpdating}
            centerLat={centerLat}
            size={size}
            centers={centers}
            handleCoordinatesChange={handleCoordinatesChange}
          />
        ) : (
          <div>Centers for this size are full</div>
        )}
      </div>
    </form>
  );
}

export default CreateUpdateExchangeForm;
