import { useEffect, useState } from "react";
import Friend from "./Friend";
import { FriendInfo } from "./Interfaces/FriendInterface";
import generateUrl from "../../../contants/url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { showError } from "../../../store/errorSlice";

function MyFriends() {
  const [yourFriends, setYourFriends] = useState<FriendInfo[]>();
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  useEffect(() => {
    if (yourFriends && yourFriends.length > 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const url = generateUrl(`user/get-friends/${userId}`);
        const response = await axios.get(url);
        setYourFriends(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        handleShowError(error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="p-10">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {yourFriends?.map((friend) => {
          return (
            <Friend
              person={friend}
              key={friend.id}
              isFriend={true}
              setNewFriends={setYourFriends}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default MyFriends;
