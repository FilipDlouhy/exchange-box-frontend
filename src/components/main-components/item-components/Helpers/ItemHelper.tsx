import { MenuItem } from "../../../common-components/Helpers/ComonInterfaces";
import ForgotenItems from "../ForgotenItems";
import UserItems from "../UserItems";

export const itemMenuItems: MenuItem[] = [
  {
    name: "yourItems",
    displayName: "Your items",
    component: UserItems,
  },
  {
    name: "itemsYouForgot",
    displayName: "Items you forgot",
    component: ForgotenItems,
  },
];
