import { FriendInfo } from "../../friend-components/Interfaces/FriendInterface";
import { CurrentUserExchnageInterface } from "./CurrentUserExchnageInterface";
import { CurrentUserItemInterface } from "./CurrentUserItemInterface";

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
  items?: CurrentUserItemInterface[];
  exchanges?: CurrentUserExchnageInterface[];
}
