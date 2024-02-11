import { FriendInfo } from "../../friend-components/Interfaces/FriendInterface";

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  imageUrlFile?: any;
  imageUrl?: string | null;
  backgroundImageUrl?: string | null;
  backgroundImageUrlFile?: any;
  address?: string | null;
  telephone?: string | null;
  longitude?: number | null;
  latitude?: number | null;
  friends?: FriendInfo[];
  items?: any[];
  exchanges?: any[];
}
