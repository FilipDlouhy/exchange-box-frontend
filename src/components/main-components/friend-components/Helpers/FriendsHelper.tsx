import { MenuItem } from "../../../common-components/Helpers/ComonInterfaces";
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
