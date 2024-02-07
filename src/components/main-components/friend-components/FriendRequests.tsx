import { useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";
import { IFriendRequest } from "./Interfaces/FriendRequestInterFace";
import generateUrl from "../../../contants/url";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showError } from "../../../store/errorSlice";
import { PaginationState } from "../../../contants/PaginationInteface";

function FriendRequests() {
  const [newRequests, setNewRequests] = useState<IFriendRequest[]>();
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<PaginationState>({
    starting: 1,
    max: 10,
  });

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  useEffect(() => {
    if (newRequests && newRequests.length > 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const url = generateUrl(`user/get-friend-requests/${userId}`);

        const response = await axios.get(url, {
          params: {
            page: pagination.starting,
            limit: pagination.max,
          },
        });
        setNewRequests(response.data);
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
    </div>
  );
}

export default FriendRequests;
