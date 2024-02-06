import { useEffect, useState } from "react";
import Friend from "./Friend";
import { FriendInfo } from "./Interfaces/FriendInterface";
import generateUrl from "../../../contants/url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { showError } from "../../../store/errorSlice";
import LoadMoreButton from "../../common-components/LoadMoreButton";
import { PaginationState } from "../../../contants/PaginationInteface";
import { loadMoreConstant } from "../../../contants/LoadMoreConstant";

function MyFriends() {
  const [yourFriends, setYourFriends] = useState<FriendInfo[]>();
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<PaginationState>({
    starting: 1,
    max: 10,
  });

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  const fetchData = async () => {
    try {
      const url = generateUrl(`user/get-friends/${userId}`);
      const response = await axios.get(url, {
        params: {
          page: pagination.starting,
          limit: pagination.max,
        },
      });

      setYourFriends(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleShowError(error.message);
    }
  };

  useEffect(() => {
    setPagination({
      starting: 1,
      max: 10,
    });
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

      <LoadMoreButton
        loadMoreFunction={() => {
          if (pagination.starting && pagination.max) {
            setPagination({
              starting: pagination.starting + loadMoreConstant,
              max: pagination.max + loadMoreConstant,
            });
          }
          fetchData();
        }}
      />
    </div>
  );
}

export default MyFriends;
