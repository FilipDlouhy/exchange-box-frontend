export interface IFriendRequest {
  id: string;

  createdAt: Date;

  friendId: number;

  userId: number;

  friendImageUrl: string;

  friendName: string;
}
