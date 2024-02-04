import {
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { setProfileUser } from "../../../store/user-state/profileUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { IUserProfileFriend } from "./Interfaces/UserProfileInterface";
import { RootState } from "../../../store/store";
import { addOrRemoveFriend } from "./Helpers/FriendsHelper";
import { useEffect, useState } from "react";
import { friendStatusEnum } from "./Enums/FriendEnumStatus";

const UserProfileFriend = ({ friend }: { friend: IUserProfileFriend }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const [buttonText, setButtonText] = useState("");
  const [friendStatus, setFriendStatus] = useState<number | null | undefined>(
    friend.friendStatus
  );

  useEffect(() => {
    setButtonText(
      friendStatus === friendStatusEnum.FriendRequestSent
        ? "Friend request sent"
        : "Friend request received"
    );
  }, [friendStatus]);

  return (
    <li
      key={friend.id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-8">
        {friend.imageURL ? (
          <img
            className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
            src={friend.imageURL}
            alt=""
          />
        ) : (
          <UserIcon className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" />
        )}
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {friend.name}
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Tel:</dt>
          <dd className="text-sm text-gray-500">{friend.telephone}</dd>
          <dt className="sr-only">Address:</dt>
          <dd className="mt-3">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {friend.address}
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            {friendStatus === friendStatusEnum.IsFriend && (
              <button
                onClick={() => {
                  addOrRemoveFriend(false, parseInt(userId), friend.id);
                  setFriendStatus(friendStatusEnum.NotFriend);
                }}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <UserMinusIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Remove friend
              </button>
            )}

            {friendStatus === friendStatusEnum.NotFriend && (
              <button
                onClick={() => {
                  addOrRemoveFriend(true, parseInt(userId), friend.id);
                  setFriendStatus(friendStatusEnum.FriendRequestSent);
                }}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <UserPlusIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Add friend
              </button>
            )}

            {(friendStatus === friendStatusEnum.FriendRequestSent ||
              friendStatus === friendStatusEnum.FriendRequestSentRecieved) && (
              <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <UserIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {buttonText}
              </button>
            )}
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              onClick={() => {
                dispatch(
                  setProfileUser({
                    email: friend.email,
                    id: friend.id.toString(),
                    isFriend: friend.friendStatus === friendStatusEnum.IsFriend,
                  })
                );
              }}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Go to Profile
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserProfileFriend;
