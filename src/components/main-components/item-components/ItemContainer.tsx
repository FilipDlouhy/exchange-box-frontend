import { useEffect } from "react";
import { resetStarting } from "../../../store/paginationSlice";
import { clearSearchText } from "../../../store/searchSlice";
import { DynamicComponentRenderer } from "../../common-components/Helpers/ComonHelpers";
import Menu from "../../common-components/Menu";
import { itemMenuItems } from "./Helpers/ItemHelper";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveItemMenu } from "../../../store/item-state/itemMenuSlice";

function ItemContainer() {
  const activeMenu = useSelector((state: RootState) => state.itemsMenu.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuButtonClick = (name: string) => {
    dispatch(setActiveItemMenu(name));
    dispatch(resetStarting());
    dispatch(clearSearchText());
  };

  useEffect(() => {
    const itemsActiveMenu = localStorage.getItem("itemsActiveMenu");
    console.log("AFASF");
    console.log(itemsActiveMenu);
    if (typeof itemsActiveMenu === "string") {
      handleMenuButtonClick(itemsActiveMenu);
    }
  }, []);

  return (
    <div>
      <Menu
        currentMenu={"items"}
        menu={itemMenuItems}
        clickFunction={handleMenuButtonClick}
      />
      {DynamicComponentRenderer(activeMenu, itemMenuItems)}
    </div>
  );
}

export default ItemContainer;
