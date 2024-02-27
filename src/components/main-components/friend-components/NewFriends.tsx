import { useState } from "react";
import Friend from "../../common-components/common-user-profile-components/Friend";
import { FriendInfo } from "./Interfaces/FriendInterface";
import LoadMoreButton from "../../common-components/LoadMoreButton";
import { useFetchDataSearch } from "../../common-components/Hooks/FetchSearchDataHook";

function NewFriends() {
  const [newFriends, setNewFriends] = useState<FriendInfo[]>();

  useFetchDataSearch<FriendInfo[]>(
    `user/get-new-friends`,
    setNewFriends,
    newFriends,
    "name"
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
