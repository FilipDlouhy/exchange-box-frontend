import { useState } from "react";
import FriendRequest from "./FriendRequest";
import { IFriendRequest } from "./Interfaces/FriendRequestInterFace";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useFetchData } from "./Hooks/FetchDataHook";
import LoadMoreButton from "../../common-components/LoadMoreButton";

function FriendRequests() {
  const [newRequests, setNewRequests] = useState<IFriendRequest[]>();
  const userId = useSelector((state: RootState) => state.user.id);

  useFetchData<IFriendRequest[]>(
    `user/get-friend-requests/${userId}`,
    setNewRequests
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
