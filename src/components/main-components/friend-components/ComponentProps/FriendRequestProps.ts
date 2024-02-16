import { IFriendRequest } from "../Interfaces/FriendRequestInterFace";

export interface FriendRequestProps {
  friendReqeust: IFriendRequest;
  setNewRequests: React.Dispatch<
    React.SetStateAction<IFriendRequest[] | undefined>
  >;
}
