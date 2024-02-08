import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Friend from "./Friend";
import { FriendInfo } from "./Interfaces/FriendInterface";
import LoadMoreButton from "../../common-components/LoadMoreButton";
import { useFetchData } from "./Hooks/FetchDataHook";

function NewFriends() {
  const userId = useSelector((state: RootState) => state.user.id);

  const [newFriends, setNewFriends] = useState<FriendInfo[]>();

  useFetchData<FriendInfo[]>(
    `user/get-new-friends/${userId}`,
    setNewFriends,
    newFriends
  );

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

      <LoadMoreButton />
    </div>
  );
}

export default NewFriends;
