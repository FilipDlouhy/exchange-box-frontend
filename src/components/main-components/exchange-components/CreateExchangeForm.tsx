import { useEffect, useState } from "react";
import LocationMap from "../../common-components/LocationMap";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { ExchangeFriend } from "./Interfaces/ExchangeFriendInterface";

function CreateExchangeForm({
  setSelectedFriend,
}: {
  setSelectedFriend: React.Dispatch<
    React.SetStateAction<ExchangeFriend | undefined>
  >;
}) {
  const [friends, setFiends] = useState<ExchangeFriend[]>();
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);
  const getFriends = async () => {
    const { data } = await axios.get(
      generateUrl("user/get-users-friends-simple"),
      { withCredentials: true }
    );

    setFiends(data);
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
    getFriends();
  }, []);
  const handleCoordinatesChange = (lat: any, lng: any) => {};

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
          id="size"
          name="size"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
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
        <LocationMap
          handleCoordinatesChange={handleCoordinatesChange}
          position={[44, 55]}
        />
      </div>
    </form>
  );
}

export default CreateExchangeForm;
