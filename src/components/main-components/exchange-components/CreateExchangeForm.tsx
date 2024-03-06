import { useEffect, useState } from "react";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { ExchangeFriend } from "./Interfaces/ExchangeFriendInterface";
import { CenterInterface } from "./Interfaces/CenterInterFace";
import CreateExchangeMap from "./CreateExchangeMap";

function CreateExchangeForm({
  setSelectedFriend,
  handleCoordinatesChange,
  setName,
  setSize,
  setPickUpDate,
}: {
  setSelectedFriend: React.Dispatch<
    React.SetStateAction<ExchangeFriend | undefined>
  >;
  handleCoordinatesChange: (center: CenterInterface | undefined) => void;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPickUpDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const [friends, setFiends] = useState<ExchangeFriend[]>();
  const [centers, setCenters] = useState<CenterInterface[]>([]);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);
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
  }, []);

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
          id="other"
          name="other"
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
        {centers.length > 0 && (
          <CreateExchangeMap
            centers={centers}
            handleCoordinatesChange={handleCoordinatesChange}
          />
        )}
      </div>
    </form>
  );
}

export default CreateExchangeForm;
