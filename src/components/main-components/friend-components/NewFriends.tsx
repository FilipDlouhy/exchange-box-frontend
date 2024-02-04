import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import generateUrl from "../../../contants/url";
import axios from "axios";
import Friend from "./Friend";
import { FriendInfo } from "./Interfaces/FriendInterface";
import { showError } from "../../../store/errorSlice";

function NewFriends() {
  const userId = useSelector((state: RootState) => state.user.id);

  const [newFriends, setNewFriends] = useState<FriendInfo[]>();
  const dispatch = useDispatch();

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  useEffect(() => {
    if (newFriends && newFriends.length > 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const url = generateUrl(`user/get-new-friends/${userId}`);
        const response = await axios.get(url);
        setNewFriends(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        handleShowError(error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="p-10">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {newFriends?.map((friend) => {
            return (
              <Friend
                setNewFriends={setNewFriends}
                person={friend}
                key={friend.id}
                isFriend={false}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default NewFriends;
