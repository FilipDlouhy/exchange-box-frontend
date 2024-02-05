import React from "react";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { friendStatusEnum } from "./Enums/FriendEnumStatus";
import { addOrRemoveFriend } from "./Helpers/FriendsHelper";

function UserProfileRemoveAddFriendButton({
  friendStatus,
  setFriendStatus,
  profileUserId,
  userId,
  isSmall,
}: {
  friendStatus: number | null | undefined;
  setFriendStatus: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
  profileUserId: string | null;
  userId: string;
  isSmall: boolean;
}) {
  const isAddFriendVisible =
    friendStatus !== friendStatusEnum.FriendRequestSent &&
    friendStatus !== friendStatusEnum.FriendRequestSentRecieved &&
    friendStatus !== friendStatusEnum.IsFriend;

  const buttonClass = isSmall
    ? "relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
    : "inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

  const iconSizeClass = isSmall ? "h-4 w-4" : "h-5 w-5";

  const handleAddFriend = () => {
    if (profileUserId) {
      addOrRemoveFriend(true, parseInt(userId), parseInt(profileUserId));
      setFriendStatus(friendStatusEnum.FriendRequestSent);
    }
  };

  const handleRemoveFriend = () => {
    if (profileUserId) {
      addOrRemoveFriend(false, parseInt(userId), parseInt(profileUserId));
      setFriendStatus(friendStatusEnum.NotFriend);
    }
  };

  return (
    <>
      {isAddFriendVisible ? (
        <button onClick={handleAddFriend} type="button" className={buttonClass}>
          <UserPlusIcon
            className={`${iconSizeClass} text-gray-400`}
            aria-hidden="true"
          />
          <span>Add Friend</span>
        </button>
      ) : friendStatus === friendStatusEnum.IsFriend ? (
        <button
          onClick={handleRemoveFriend}
          type="button"
          className={buttonClass}
        >
          <UserMinusIcon
            className={`${iconSizeClass} text-gray-400`}
            aria-hidden="true"
          />
          <span>Remove Friend</span>
        </button>
      ) : null}
    </>
  );
}

export default UserProfileRemoveAddFriendButton;
