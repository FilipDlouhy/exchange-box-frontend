import axios from "axios";
import { ToggleFriendDto } from "../../../../Dtos/UserDtos/toggle.friend.dto";
import generateUrl from "../../../../contants/url";
import { MenuItem } from "../../../common-components/helpers/ComonInterfaces";
import FriendRequests from "../FriendRequests";
import MyFriends from "../MyFriends";
import NewFriends from "../NewFriends";

export const friendsMenuItems: MenuItem[] = [
  {
    name: "myFriends",
    displayName: "My Friends",
    component: MyFriends,
  },
  {
    name: "findNewFriends",
    displayName: "Find New Friends",
    component: NewFriends,
  },
  {
    name: "friendRequests",
    displayName: "Friend Requests",
    component: FriendRequests,
  },
];

export const addOrRemoveFriend = async (
  isAdding: boolean,
  userId: number,
  friendId: number,
  filterUsers: ((friendId: string) => void) | undefined = undefined
) => {
  try {
    const url = isAdding
      ? generateUrl(`user/create-friend-request`)
      : generateUrl(`user/remove-friend`);

    const toggleFriendDto = new ToggleFriendDto(userId, friendId);

    await axios.post(url, toggleFriendDto);

    if (filterUsers) {
      filterUsers(friendId.toString());
    }
  } catch (error) {
    console.error("Error while adding friend:", error);

    throw error;
  }
};
