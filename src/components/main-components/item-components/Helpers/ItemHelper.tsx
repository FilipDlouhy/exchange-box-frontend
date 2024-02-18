import { MenuItem } from "../../../common-components/Helpers/ComonInterfaces";
import Items from "../Items";

export const itemMenuItems: MenuItem[] = [
  {
    name: "yourItems",
    displayName: "Your items",
    component: Items,
  },
  {
    name: "itemsYouForgot",
    displayName: "Items you forgot",
    component: Items,
  },
];
