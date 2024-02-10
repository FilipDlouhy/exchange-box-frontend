import { useState } from "react";
import FriendRequest from "./FriendRequest";
import { IFriendRequest } from "./Interfaces/FriendRequestInterFace";
import { useFetchData } from "../../common-components/Hooks/FetchDataHook";
import LoadMoreButton from "../../common-components/LoadMoreButton";
import { useFetchDataSearch } from "../../common-components/Hooks/FetchSearchDataHook";

function FriendRequests() {
  const [newRequests, setNewRequests] = useState<IFriendRequest[]>();

  useFetchData<IFriendRequest[]>(
    `user/get-friend-requests`,
    setNewRequests,
    newRequests
  );
  useFetchDataSearch<IFriendRequest[]>(
    `user/get-friend-requests`,
    setNewRequests,
    newRequests,
    "name"
  );

  return (
    <div className="p-10">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {newRequests?.map((friendReqeust) => (
          <FriendRequest
            key={friendReqeust.id}
            friendReqeust={friendReqeust}
            setNewRequests={setNewRequests}
          />
        ))}
      </ul>

      <LoadMoreButton />
    </div>
  );
}

export default FriendRequests;
