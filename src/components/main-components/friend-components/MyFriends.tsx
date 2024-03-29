import { useState } from "react";
import Friend from "../../common-components/common-user-profile-components/Friend";
import { FriendInfo } from "./Interfaces/FriendInterface";
import LoadMoreButton from "../../common-components/LoadMoreButton";
import { useFetchDataSearch } from "../../common-components/hooks/FetchSearchDataHook";

function MyFriends() {
  const [yourFriends, setYourFriends] = useState<FriendInfo[]>();

  useFetchDataSearch<FriendInfo[]>(
    `user/get-friends`,
    setYourFriends,
    yourFriends,
    "name"
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
