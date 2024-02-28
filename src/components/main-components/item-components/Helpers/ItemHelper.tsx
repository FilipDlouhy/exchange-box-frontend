import { MenuItem } from "../../../common-components/Helpers/ComonInterfaces";
import ForgotenItems from "../ForgotenItems";
import UserItems from "../UserItems";
import { ItemInterface } from "../Interfaces/ItemInterface";

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

export const useHandleItemToEdit = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setItemToEdit: React.Dispatch<React.SetStateAction<ItemInterface | undefined>>
) => {
  const handleItemToEditFunction = (item: ItemInterface | undefined) => {
    if (item == null) {
      setItemToEdit(undefined);
      setOpen(false);
    } else {
      setItemToEdit(item);
      setOpen(true);
    }
  };

  return handleItemToEditFunction;
};
