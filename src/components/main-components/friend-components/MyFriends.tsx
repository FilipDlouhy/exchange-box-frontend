import { useState } from "react";
import Friend from "./Friend";
import { FriendInfo } from "./Interfaces/FriendInterface";
import { RootState } from "../../../store/store";
import LoadMoreButton from "../../common-components/LoadMoreButton";
import { useFetchData } from "./Hooks/FetchDataHook";
import { useSelector } from "react-redux";

function MyFriends() {
  const [yourFriends, setYourFriends] = useState<FriendInfo[]>();
  const userId = useSelector((state: RootState) => state.user.id);

  useFetchData<FriendInfo[]>(
    `user/get-friends/${userId}`,
    setYourFriends,
    yourFriends
  );

  return (
    <div className="p-10">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {yourFriends &&
          yourFriends?.map((friend) => {
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

      <LoadMoreButton />
    </div>
  );
}

export default MyFriends;
