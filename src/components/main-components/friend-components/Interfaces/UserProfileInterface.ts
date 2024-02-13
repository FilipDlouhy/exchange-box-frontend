export interface IUserProfileItem {
  lengthInCm?: number | null;
  widthInCm?: number | null;
  heightInCm?: number | null;
  name: string;
  weightInGrams: number;
  id: number;
  imageURL?: string | null;
}

export interface IUserProfileFriend {
  name: string;
  email: string;
  telephone?: string | null;
  address?: string | null;
  id: number;
  imageURL?: string | null;
  friendStatus?: number | null;
}

export interface IUserProfile {
  name: string;
  email: string;
  telephone?: string | null;
  address?: string | null;
  id: number;
  imageURL?: string | null;
  backgroundImageUrl?: string | null;
  friendStatus: number | null;
  userFriends: IUserProfileFriend[];
  userItems: IUserProfileItem[];
}
