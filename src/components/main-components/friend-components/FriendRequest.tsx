import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { IFriendRequest } from "./Interfaces/FriendRequestInterFace";
import generateUrl from "../../../contants/url";
import { ToggleFriendDto } from "../../../Dtos/UserDtos/toggle.friend.dto";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showError } from "../../../store/errorSlice";

function FriendRequest({
  friendReqeust,
  setNewRequests,
}: {
  friendReqeust: IFriendRequest;
  setNewRequests: React.Dispatch<
    React.SetStateAction<IFriendRequest[] | undefined>
  >;
}) {
  const dispatch = useDispatch();

  const handleShowError = (message: string) => {
    dispatch(showError(message));
  };

  const denyOrAcceptRequest = async (accept: boolean) => {
    try {
      const url = accept
        ? generateUrl(`user/accept-friend-request`)
        : generateUrl(`user/deny-friend-request`);

      const toggleFriendDto = new ToggleFriendDto(
        friendReqeust.userId,
        friendReqeust.friendId
      );

      await axios.post(url, toggleFriendDto);

      setNewRequests((prevRequests) =>
        prevRequests
          ? prevRequests.filter((req) => req.id !== friendReqeust.id)
          : []
      );
    } catch (error) {
      console.error("Error in denyOrAcceptRequest:", error);
      handleShowError(error.message);
    }
  };

  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
          src={friendReqeust.friendImageUrl}
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {friendReqeust.userName}
        </h3>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <p
              onClick={() => {
                denyOrAcceptRequest(true);
              }}
              className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <UserPlusIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Accept
            </p>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <p
              onClick={() => {
                denyOrAcceptRequest(false);
              }}
              className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <UserMinusIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Deny
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default FriendRequest;
